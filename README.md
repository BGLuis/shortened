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
![Lint · ESLint](https://www.shieldcn.dev/badge/Lint-ESLint-4B32C3.svg?logo=eslint&variant=branded&size=sm)
![Format · Prettier](https://www.shieldcn.dev/badge/Format-Prettier-F7B93E.svg?logo=prettier&variant=branded&size=sm)
![MongoDB](https://www.shieldcn.dev/badge/Stack-MongoDB-47A248.svg?logo=mongodb&variant=branded&size=sm)
![TypeORM](https://www.shieldcn.dev/badge/Stack-TypeORM-FE0902.svg?logo=typeorm&variant=branded&size=sm)
![Jest](https://www.shieldcn.dev/badge/Stack-Jest-C21325.svg?logo=jest&variant=branded&size=sm)

![shortened](https://shieldcn.dev/header/surface.svg?title=shortened&subtitle=API+em+NestJS+para+encurtamento+e+gerenciamento+de+URLs&logo=lu%3ALink&size=social&mode=dark)
</div>

# 📖 Sobre 
O **Shortened** é uma API de backend construída com o framework NestJS. Ele utiliza o banco de dados MongoDB para persistência de dados e está totalmente configurado para rodar através de contêineres Docker, possuindo serviços integrados para a aplicação e para o banco de dados.

# 📋 Motivo
O projeto nasceu com o propósito principal de ser um laboratório de estudos e prática aprofundada do framework **NestJS** e de seu ecossistema de bibliotecas. O desenvolvimento foi inspirado e guiado por conteúdos de referência da comunidade, mais especificamente a partir de um vídeo do [Augusto Galego](https://www.youtube.com/@GutoGalego) e outro do [Renato Augusto](https://www.youtube.com/@RenatoAugustoTech).

A escolha de construir um encurtador de URLs serviu como o cenário prático ideal para aplicar os ensinamentos adquiridos e explorar recursos importantes, tais como:
- Integração eficiente com bancos de dados NoSQL (MongoDB).
- Estruturação baseada em módulos e injeção de dependências.
- Criação de rotas, controladores e serviços (arquitetura MVC adaptada para APIs).
- Configuração de infraestrutura e orquestração de ambientes utilizando Docker.

# 💻 Como iniciar
Instruções de como executar o seu projeto
1. Certifique-se de ter o Docker instalado em sua máquina. Caso não tenha, siga as instruções no [site oficial do Docker](https://docs.docker.com/get-docker/).

2. Clone o repositório do projeto:
  ```sh
  git clone https://github.com/bgluis/shortened.git
  ```

3. Navegue até o diretório do projeto:
  ```sh
  cd shortened
  ```

4. Preencha o arquivo `.env` com as variáveis de ambiente necessárias. Utilize o arquivo `.env.example` como referência:
  ```sh
  cp .env.example .env
  # Edite o arquivo .env com suas configurações
  ```

5. Construa e inicie os containers Docker:
  ```sh
  docker-compose up --build
  ```

6. Acesse a aplicação no seu navegador através do endereço configurado no .env:
  ```
  http://localhost:3000
  ```
# 🤝 Contribuidores
  <a href = "https://github.com/bgluis/shortened/graphs/contributors">
   <img src = "https://contrib.rocks/image?repo=bgluis/shortened"/>
  </a>
