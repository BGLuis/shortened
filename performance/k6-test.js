import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 200 }, // Sobe rápido para 200 Usuários Virtuais
    { duration: '1m', target: 200 },  // Mantém estresse contínuo por 1 min
    { duration: '10s', target: 0 },   // Desce para zero
  ],
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3001';

export default function () {
  // 1. Testa a Rota de Criação de URL
  const payload = JSON.stringify({
    url: 'https://example.com/test-' + Math.random(),
  });

  // Gera um IP aleatório para simular um usuário diferente por requisição
  const randomIP = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'X-Forwarded-For': randomIP, // Passando pelo proxy (NestJS vai ler isso)
    },
  };

  const createRes = http.post(`${BASE_URL}/url`, payload, params);
  
  // No caso da criação falhar (ex: por causa do rate limit que impusemos de 100/min), ignoramos o resto.
  // Lembre-se que configuramos o Throttler para barrar muitos requests, 
  // então no load test é normal ver falhas 429 Too Many Requests se a taxa for atingida.
  check(createRes, {
    'URL criada (201)': (r) => r.status === 201,
  });

  if (createRes.status === 201) {
    const shortUrl = createRes.json('shortUrl');
    
    // 2. Testa o Redirecionamento (Foco principal da Hiper-Escala)
    // Usamos redirects: 0 para o k6 não tentar abrir o site da Apple/Google e apenas checar se a API deu 302.
    const redirectRes = http.get(`${BASE_URL}/url/short/${shortUrl}`, {
      headers: {
        'X-Forwarded-For': randomIP,
      },
      redirects: 0 
    });
    
    check(redirectRes, {
      'Redirecionou com Sucesso (302)': (r) => r.status === 302,
      'Cache ou DB resgataram (Menos de 20ms)': (r) => r.timings.duration < 20, 
    });
  }

  // Uma pequena pausa para o loop
  sleep(1);
}
