# Todo API Server

A professional REST API for managing todos built with Express.js and TypeScript.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Validation**: Zod
- **Documentation**: Swagger/OpenAPI
- **Linting**: ESLint + Prettier

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x

### Installation

```bash
# Clone the repository
git clone <your-repository-url>
cd todos-server

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Configuration

Edit `.env.local` with your values:

```bash
PRIVATE_API_KEY=your-secret-api-key
PORT=8080
```

### Running the Server

```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm run build
npm start
```

The server will run on `http://localhost:8080`

## API Documentation

Interactive API documentation is available at:

```
http://localhost:8080/api-docs
```

## API Endpoints

### Authentication

| Method | Endpoint      | Description |
| ------ | ------------- | ----------- |
| POST   | `/auth/login` | User login  |

### Todos

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| GET    | `/todos`         | Get all todos (paginated)   |
| GET    | `/todos/scroll`  | Get todos (infinite scroll) |
| POST   | `/todos`         | Create a new todo           |
| PUT    | `/todos/:id`     | Update a todo               |
| DELETE | `/todos/:todoId` | Delete a todo               |

> **Note**: Todo endpoints require `api-key` header for authentication.

## Available Scripts

| Script                 | Description               |
| ---------------------- | ------------------------- |
| `npm run dev`          | Start development server  |
| `npm run build`        | Build for production      |
| `npm start`            | Start production server   |
| `npm run lint`         | Run ESLint                |
| `npm run lint:fix`     | Fix ESLint errors         |
| `npm run format`       | Format code with Prettier |
| `npm run format:check` | Check code formatting     |

## Project Structure

```
src/
├── app.ts              # Express app configuration
├── middlewares/        # Express middlewares
│   └── validatePrivateApiKey.ts
├── routes/             # API routes
│   ├── auth/           # Authentication routes
│   └── todos/          # Todo CRUD routes
├── types/              # TypeScript type definitions
│   ├── api.ts          # API response types
│   ├── auth.ts         # Auth types
│   └── todos.ts        # Todo types
├── utils/              # Utility functions
│   └── error/          # Error handling utilities
└── mockup/             # Mock data for development
```

## License

ISC
