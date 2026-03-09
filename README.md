# ![Feed RSS icon](./assets/rss.png) RSS Feed

> Full Stack RSS platform using polyglot microservices architecture.
> Features a React (TS) frontend, NestJS API and a Go worker for RabbitMQ. Dockerized and scalable

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind](https://img.shields.io/badge/tailwind-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn](https://img.shields.io/badge/shadcn-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

## Product overview

An RSS aggregator platform that enables users to subscribe to multiple RSS feeds, manage their subscriptions, and consume news from various sources in a unified interface. The platform features a modern, responsive UI with real-time feed updates powered by a scalable microservices architecture.

**Core Features:**

- User authentication and management (JWT-based)
- RSS feed subscription and management
- News feed aggregation and display
- Pagination and feed filtering
- User profiles with personalization
- Real-time feed processing via background workers
- RESTful API with comprehensive Swagger documentation

### Demo

TODO: add product video demo

### Project delivery

This project demonstrates a production-ready full-stack implementation using modern web technologies and architectural patterns, including polyglot microservices, containerization, and event-driven processing.

### Demonstrated Skills

- **Full-Stack Development**: Proficiency across frontend, backend, and worker services
- **Microservices Architecture**: Designing scalable systems with independent services communicating via message queues
- **Frontend Development**: Advanced React patterns, component composition, form handling, state management
- **Backend Development**: NestJS with decorators, middleware, guards, interceptors, and validation
- **Database Design**: MongoDB schema design and aggregation pipelines
- **Message Queue Integration**: RabbitMQ for async task processing
- **DevOps & Containerization**: Docker, Docker Compose for local development and deployment
- **API Design**: RESTful principles with proper error handling and documentation (Swagger)
- **Authentication & Security**: JWT implementation with refresh token strategy
- **Cross-language Development**: TypeScript (Frontend/Backend), Go (Worker services)

## Tech documentation

### System architecture

The application follows a **polyglot microservices architecture** with three main services:

1. **Frontend (React + Vite)**: Single Page Application serving the user interface on port 5173
2. **Backend (NestJS)**: RESTful API handling business logic, authentication, and feed management on port 3000
3. **Worker (Go)**: Background service consuming RSS feed jobs from RabbitMQ queue and storing results in MongoDB

**Data Flow:**

1. User submits RSS feed URL via frontend
2. API validates and queues the job in RabbitMQ
3. Go worker fetches and parses the RSS feed
4. Parsed articles stored in MongoDB
5. Frontend fetches and displays the aggregated news

```mermaid
graph LR
    A[React Frontend<br/>Port 5173] -->|HTTP/REST| B[NestJS Backend<br/>Port 3000]
    B -->|JWT Auth| B
    B -->|Queue Jobs| C[RabbitMQ<br/>Port 5672]
    C -->|Consume Jobs| D[Go Worker]
    D -->|Read/Write| E[(MongoDB<br/>Port 27017)]
    B -->|Query| E
    A -->|Query| B
```

### Tech stack and decisions

| Technology           | Layer               | Rationale                                                                       |
| -------------------- | ------------------- | ------------------------------------------------------------------------------- |
| **React 19**         | Frontend            | Modern, declarative UI library with excellent ecosystem and performance         |
| **TypeScript**       | Frontend/Backend    | Type safety, better developer experience, catch errors at compile time          |
| **Tailwind CSS**     | Frontend            | Utility-first CSS framework for rapid UI development with consistency           |
| **shadcn/ui**        | Frontend            | Pre-built, accessible UI components built on Radix UI                           |
| **Vite**             | Frontend Build      | Lightning-fast build tool with HMR, excellent developer experience              |
| **React Hook Form**  | Frontend Forms      | Lightweight, performant form handling with minimal re-renders                   |
| **Zod**              | Frontend Validation | TypeScript-native schema validation                                             |
| **React Query**      | Frontend Data       | Powerful async state management for API data                                    |
| **NestJS**           | Backend             | Full-featured framework with CLI, decorators, and strong architectural patterns |
| **MongoDB**          | Database            | NoSQL database for flexible schema, excellent for semi-structured data          |
| **Mongoose**         | Backend ORM         | Object modeling for MongoDB with validation and middleware support              |
| **JWT (Passport)**   | Authentication      | Stateless authentication, ideal for microservices and SPAs                      |
| **RabbitMQ**         | Message Queue       | Reliable async communication between microservices                              |
| **Go**               | Worker Service      | Lightweight, concurrent processing ideal for CPU-bound RSS parsing tasks        |
| **Docker & Compose** | DevOps              | Containerization for consistency, Compose for local orchestration               |

### Key folders structure

```
rss-feed/
├── backend/rss-feed/          # NestJS API
│   ├── src/
│   │   ├── modules/           # Feature modules (auth, users, rss, feed-source)
│   │   │   ├── auth/          # Authentication logic, JWT strategy, guards
│   │   │   ├── users/         # User management
│   │   │   ├── rss/           # RSS feed endpoints and logic
│   │   │   └── feed-source/   # Feed source management
│   │   ├── infra/             # Infrastructure layer
│   │   │   └── mongodb/       # Database schemas and services
│   │   ├── common/            # Shared utilities
│   │   │   ├── decorators/    # Custom decorators (GetUser, etc.)
│   │   │   ├── filters/       # Global exception filters
│   │   │   └── interceptors/  # Global interceptors (token refresh)
│   │   ├── app.module.ts      # Root module
│   │   └── main.ts            # Application entry point
│   └── package.json           # Backend dependencies
│
├── frontend/rss-feed/         # React + Vite Application
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   │   └── ui/            # shadcn/ui components
│   │   ├── pages/             # Page components (home, login, profile, etc.)
│   │   ├── routes/            # Route definitions and protection
│   │   ├── services/          # API service clients
│   │   ├── contexts/          # React Context (AuthContext)
│   │   ├── hooks/             # Custom React hooks
│   │   ├── interfaces/        # TypeScript interfaces for data
│   │   ├── lib/               # Utilities and API client setup
│   │   └── main.tsx           # Application entry point
│   └── package.json           # Frontend dependencies
│
├── workers/go/                # Go Worker Service
│   ├── main.go                # Worker entry point
│   ├── go.mod                 # Go module definition
│   └── Dockerfile             # Container configuration
│
├── docker-compose.yml         # Local orchestration
└── README.md
```

### How to run

**Prerequisites:**

- Docker and Docker Compose installed
- Node.js 18+ (if running without Docker)
- Go 1.21+ (if building worker locally)

**Option 1: Docker Compose (Recommended)**

```bash
# Clone the repository
git clone <repository-url>
cd rss-feed

# Create .env file with required variables
cat > .env << EOF
JWT_SECRET=your_jwt_secret_key_here
MONGO_URI=mongodb://mongodb:27017/rss-feed
RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672/
EOF

# Start all services
docker compose up --build

# Access the application:
# - Frontend: http://localhost:5173
# - Backend API: http://localhost:3000
# - API Docs: http://localhost:3000/api/docs
# - RabbitMQ Dashboard: http://localhost:15672 (guest/guest)
```

**Option 2: Local Development**

```bash
# Backend
cd backend/rss-feed
npm install
npm run start:dev

# Frontend (separate terminal)
cd frontend/rss-feed
npm install
npm run dev

# Worker (requires Go and local MongoDB/RabbitMQ)
cd workers/go
go mod download
go run main.go
```

**Stopping Services:**

```bash
# Stop all containers
docker compose down

# Stop and remove volumes
docker compose down -v
```

### Where to evaluate code

**Frontend Architecture & Patterns:**

- [App.tsx](frontend/rss-feed/src/App.tsx) - Application setup with React Query and Router
- [AuthContext.tsx](frontend/rss-feed/src/contexts/AuthContext.tsx) - Context API for global authentication state and JWT token management
- [ProtectedRoute.tsx](frontend/rss-feed/src/components/ProtectedRoute.tsx) - Route protection implementation
- [index.routes.tsx](frontend/rss-feed/src/routes/index.routes.tsx) - Route definitions with lazy loading
- [api.ts](frontend/rss-feed/src/lib/api.ts) - Axios configuration with interceptors for token refresh

**Backend Architecture & NestJS Patterns:**

- [app.module.ts](backend/rss-feed/src/app.module.ts) - Module organization and dependency injection
- [auth.module.ts](backend/rss-feed/src/modules/auth/auth.module.ts) - Authentication module with JWT strategy
- [token-refresh.interceptor.ts](backend/rss-feed/src/common/interceptors/token-refresh.interceptor.ts) - Global interceptor for token refresh logic
- [jwt.strategy.ts](backend/rss-feed/src/modules/auth/jwt.strategy.ts) - Passport JWT strategy implementation
- [get-user.decorator.ts](backend/rss-feed/src/common/decorators/get-user.decorator.ts) - Custom decorator for extracting user from JWT
- [rss.service.ts](backend/rss-feed/src/modules/rss/rss.service.ts) - Business logic for RSS feed processing
- [users.service.ts](backend/rss-feed/src/modules/users/users.service.ts) - User management with password hashing (bcrypt)

**Microservices & Async Processing:**

- [main.go](workers/go/main.go) - Go worker consuming RabbitMQ jobs, parsing RSS feeds with gofeed library, and storing in MongoDB
- [docker-compose.yml](docker-compose.yml) - Service orchestration and networking configuration

**Key Concepts to Review:**

- JWT authentication and refresh token implementation
- RabbitMQ producer/consumer pattern
- MongoDB schema design and Mongoose modeling
- React Context + React Query for state management
- NestJS module and service architecture
- TypeScript strict mode usage throughout

## License

Distributed under the **MIT** license. See `LICENSE` for more information.

Developed by Heric Leite Rodrigues.
