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

![shortened](https://shieldcn.dev/header/surface.svg?title=shortened&subtitle=Hyper-Scale+URL+Shortener+in+NestJS&logo=lu%3ALink&size=social&mode=dark)
</div>

*Leia isto em [Português](README.md)*

# 📖 About 
**Shortened** is a backend API built with the NestJS framework for URL shortening and management. Recently remodeled for **Hyper-Scale**, the architecture evolved into a high-availability, ultra-low latency distributed ecosystem.

Using **MongoDB** (Primary Storage), **Redis** (Cache-Aside Pattern) and **RabbitMQ** (Message Broker & Analytics Worker), the system delivers redirects in milliseconds while tracking clicks asynchronously without throttling the end-user. Additionally, the application is fortified against DDoS attacks using dynamic IP-based rate limiting (Throttler).

# 📋 Motivation
The project originally started as a learning laboratory inspired by the Brazilian developer community (e.g. [Augusto Galego](https://www.youtube.com/@GutoGalego) and [Renato Augusto](https://www.youtube.com/@RenatoAugustoTech)).

However, it evolved into an advanced **System Design** challenge: "How to build a URL Shortener tolerant to massive stress?". The final architecture implements solid software engineering concepts:
- **Separation of Concerns (CQRS-ish):** The Analytics click tracking pipeline is fully decoupled from the HTTP redirect route via messaging.
- **Cache-Aside:** Short URL resolutions fetch from Redis cache (P95 response time < 20ms).
- **Collision-free Base62:** Implementation inspired by deterministic Key Generation Services (KGS).
- **Integrated Worker:** A hybrid consumer reads from RabbitMQ and saves clicks in bulk without delaying the redirect thread.
- **Load Testing (K6):** Continuous testing natively embedded through `docker-compose` proving rate limit robustness against 35k concurrent calls.

# 💻 How to start

1. Clone the project repository:
  ```sh
  git clone https://github.com/bgluis/shortened.git
  ```

2. Navigate to the project directory and create the environment variables:
  ```sh
  cd shortened
  cp .env.example .env
  # Edit the .env file if necessary (default ports work natively in Docker)
  ```

3. Build and spin up the entire ecosystem (API, MongoDB, Redis, and RabbitMQ):
  ```sh
  docker-compose up -d --build
  ```

4. Access the application in your browser: `http://localhost:3000`

### 🚀 Running the Hyper-Scale Load Test (K6)
You can prove the architecture's resilience by running the official Grafana K6 test script, already coupled to the Docker Compose network:
```sh
docker-compose run k6
```
*(K6 will fire thousands of requests masking IPs to test the Throttler limits, validating Redis response times and RabbitMQ persistence).*

# 🤝 Contributors
  <a href = "https://github.com/bgluis/shortened/graphs/contributors">
   <img src = "https://contrib.rocks/image?repo=bgluis/shortened"/>
  </a>
