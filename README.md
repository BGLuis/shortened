<div align="center">

![GitHub Stars](https://www.shieldcn.dev/github/stars/BGLuis/shortened.svg?variant=secondary&size=sm)
![GitHub Forks](https://www.shieldcn.dev/github/forks/BGLuis/shortened.svg?variant=secondary&size=sm)
![Watchers](https://www.shieldcn.dev/github/watchers/BGLuis/shortened.svg?variant=secondary&size=sm)
![Branches](https://www.shieldcn.dev/github/branches/BGLuis/shortened.svg?variant=ghost&size=sm)
![Contributors](https://www.shieldcn.dev/github/contributors/BGLuis/shortened.svg?theme=emerald&size=sm)
![Last commit](https://www.shieldcn.dev/github/last-commit/BGLuis/shortened.svg?variant=secondary&size=sm)
![Commits](https://www.shieldcn.dev/github/commits/BGLuis/shortened.svg?variant=secondary&size=sm)
![License](https://www.shieldcn.dev/github/license/BGLuis/shortened.svg?variant=ghost&size=sm)

<br/>

![Container · Docker](https://www.shieldcn.dev/badge/Container-Docker-2496ED.svg?logo=docker&variant=branded&size=sm)
![Language · TypeScript](https://www.shieldcn.dev/badge/Language-TypeScript-3178C6.svg?logo=typescript&variant=branded&size=sm)
![MongoDB](https://www.shieldcn.dev/badge/Stack-MongoDB-47A248.svg?logo=mongodb&variant=branded&size=sm)
![Redis](https://www.shieldcn.dev/badge/Stack-Redis-DC382D.svg?logo=redis&variant=branded&size=sm)
![RabbitMQ](https://www.shieldcn.dev/badge/Stack-RabbitMQ-FF6600.svg?logo=rabbitmq&variant=branded&size=sm)
![NestJS](https://www.shieldcn.dev/badge/Stack-NestJS-E0234E.svg?logo=nestjs&variant=branded&size=sm)
![K6](https://www.shieldcn.dev/badge/Test-K6-7D64FF.svg?logo=k6&variant=branded&size=sm)

![shortened](https://shieldcn.dev/header/surface.svg?title=shortened&subtitle=URL+Shortener+de+Hiper-Escala+em+NestJS&logo=lu%3ALink&size=social&mode=dark)
</div>

*Read this in [English](README.en.md)*

# 📖 Sobre 
O **Shortened** é uma API de backend construída com o framework NestJS para encurtamento e gerenciamento de URLs. Recentemente remodelada para **Hiper-Escala**, a arquitetura evoluiu para um ecossistema distribuído de alta disponibilidade e latência ultrabaixa. 

Utilizando **MongoDB** (Persistência Principal), **Redis** (Cache-Aside Pattern) e **RabbitMQ** (Mensageria e Analytics Worker), o sistema consegue entregar redirecionamentos em milissegundos enquanto rastreia cliques assincronamente sem onerar o usuário final. Além disso, a aplicação está fortificada contra ataques DDoS usando limites dinâmicos de requisição via IP (Throttler).

# 📋 Motivo
O projeto nasceu como um laboratório de estudos inspirado na comunidade (como [Augusto Galego](https://www.youtube.com/@GutoGalego) e [Renato Augusto](https://www.youtube.com/@RenatoAugustoTech)). 

Contudo, ele evoluiu para um desafio avançado de **System Design**: "Como construir um Encurtador de URL tolerante a estresse maciço?". A arquitetura final implementa os conceitos mais sólidos de engenharia de software:
- **Separação de Preocupações (CQRS base):** O pipeline de *Analytics* e cliques é totalmente desacoplado da rota de redirecionamento HTTP via mensageria.
- **Cache-Aside:** Resoluções da URL encurtada buscam no cache do Redis (Tempo de resposta P95 < 20ms).
- **Sem Colisões de Base62:** Implementação inspirada em Key Generation Service (KGS) determinístico.
- **Worker Integrado:** Um consumidor híbrido que lê o RabbitMQ e salva os cliques em massa sem atrasar a thread de redirecionamento.
- **Load Testing (K6):** Testes contínuos embutidos nativamente pelo `docker-compose` provando a robustez do rate limiter contra 35 mil chamadas simultâneas.

# 💻 Como iniciar

1. Clone o repositório do projeto:
  ```sh
  git clone https://github.com/bgluis/shortened.git
  ```

2. Navegue até o diretório do projeto e crie as variáveis de ambiente:
  ```sh
  cd shortened
  cp .env.example .env
  # Edite o arquivo .env se necessário (as portas padrões funcionam no Docker out-of-the-box)
  ```

3. Construa e inicie todo o ecossistema (API, MongoDB, Redis e RabbitMQ):
  ```sh
  docker-compose up -d --build
  ```

4. Acesse a aplicação no seu navegador: `http://localhost:3000`

### 🚀 Rodando o Teste de Carga de Hiper-Escala (K6)
Você pode comprovar a resiliência da arquitetura rodando o script oficial de testes do Grafana K6, já acoplado à rede do Docker Compose:
```sh
docker-compose run k6
```
*(O K6 irá disparar milhares de acessos mascarando IPs para testar os limites do Throttler, validando o tempo de resposta do Redis e a persistência do RabbitMQ).*

# 🤝 Contribuidores
  <a href = "https://github.com/bgluis/shortened/graphs/contributors">
   <img src = "https://contrib.rocks/image?repo=bgluis/shortened"/>
  </a>
