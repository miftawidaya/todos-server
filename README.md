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

| Script                  | Description               |
| ----------------------- | ------------------------- |
| `npm run dev`           | Start development server  |
| `npm run build`         | Build for production      |
| `npm start`             | Start production server   |
| `npm run lint`          | Run ESLint                |
| `npm run lint:fix`      | Fix ESLint errors         |
| `npm run format`        | Format code with Prettier |
| `npm run format:check`  | Check code formatting     |
| `npm test`              | Run all tests             |
| `npm run test:watch`    | Run tests in watch mode   |
| `npm run test:coverage` | Generate coverage report  |

## Testing

This project includes comprehensive test suites using Jest and Supertest:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage

- **Auth Routes**: Login validation, token generation
- **Todos CRUD**: Create, Read, Update, Delete operations
- **Security**: API key authorization, protected vs public endpoints

## 🎓 Learning Use Cases

This API is designed for **learning purposes**. Here are practical use cases for frontend developers:

### 1. 🔐 Authentication & Authorization

Learn how to implement protected routes:

```typescript
// Protected endpoint - requires API key
fetch('/todos', {
  headers: { 'api-key': 'your-api-key' },
});

// Public endpoint - no auth needed
fetch('/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password }),
});
```

### 2. ⚡ Optimistic UI Updates

Practice optimistic updates with rollback:

```typescript
// 1. Update UI immediately (optimistic)
setTodos([...todos, newTodo]);

// 2. Send request
const response = await fetch('/todos', { method: 'POST', body: newTodo });

// 3. Rollback if failed
if (!response.ok) {
  setTodos(todos); // Restore previous state
}
```

### 3. 📄 Pagination Patterns

**Traditional Pagination** (`page` + `limit`):

```typescript
GET /todos?page=1&limit=10
// Response: { todos, totalTodos, hasNextPage, nextPage }
```

**Infinite Scroll** (cursor-based):

```typescript
GET /todos/scroll?nextCursor=0&limit=10
// Response: { todos, nextCursor, hasNextPage }
```

### 4. 🔍 Filtering & Sorting

```typescript
// Filter by status
GET /todos?completed=true

// Sort by title/date
GET /todos?sort=title&order=asc
```

### 5. ✅ Form Validation

Learn server-side validation with Zod:

```typescript
// Valid request
POST /auth/login { email: "test@example.com", password: "123456" }

// Invalid - returns 400 with validation errors
POST /auth/login { email: "invalid-email", password: "123" }
// Response: { error: "Wrong front-end request format", detail: [...] }
```

### 6. 🛡️ Error Handling

Consistent error response format:

```typescript
// 400 - Validation error
{ error: "Wrong front-end request format", detail: [...] }

// 401 - Unauthorized
{ error: "Unauthorized" }

// 404 - Not found
{ error: "Todo not found" }

// 500 - Server error
{ error: "Failed to create todo" }
```

## Project Structure

```
src/
├── app.ts              # Express app configuration
├── __tests__/          # Test suites
│   ├── routes/         # Route tests
│   └── security/       # Security tests
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
