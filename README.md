# 📝 Todo API Server

REST API for learning frontend development - CRUD, Authentication, Pagination, and more.

## ⚡ Quick Start (5 minutes)

```bash
# 1. Clone & install
git clone <your-repository-url>
cd todos-server
npm install

# 2. Setup environment
cp .env.example .env.local

# 3. Run the server
npm run dev
```

**Server runs at:** http://localhost:8080

**Swagger Docs:** http://localhost:8080/api-docs

---

## 💡 Why This Project?

Most learning APIs are either too simple (just mock data) or too complex (full production systems). This one hits the sweet spot: **real backend functionality** with **beginner-friendly documentation**. Perfect for building your portfolio or learning React Query, SWR, or any modern state management library.

- ✅ Interactive API docs (Swagger UI)
- ✅ Real authentication and authorization patterns
- ✅ Both traditional and infinite scroll pagination
- ✅ Comprehensive error handling examples
- ✅ Unit tested with 90%+ coverage

---

## 🔑 About API Key

This API uses an **API Key** to protect `/todos` endpoints.

### What is an API Key?

An API Key is a "password" that must be sent with every request to protected endpoints.

### Where is the API Key stored?

In your `.env.local` file:

```bash
PRIVATE_API_KEY=mysecretkey123   # <- This is your API Key
PORT=8080
```

### How to use it?

**Option 1: Via Swagger UI (for testing)**

1. Open http://localhost:8080/api-docs
2. Click the **🔓 Authorize** button (top right)
3. Enter your API Key (example: `mysecretkey123`)
4. Click **Authorize** → **Close**
5. Now try any `/todos` endpoint ✅

**Option 2: Via Code (for frontend)**

```javascript
// Example: fetch with API Key header
fetch('http://localhost:8080/todos', {
  headers: {
    'api-key': 'mysecretkey123', // Replace with your API Key
  },
});
```

---

## 📚 API Endpoints

### 🔓 Public (no API Key required)

| Method | Endpoint      | Description |
| ------ | ------------- | ----------- |
| POST   | `/auth/login` | User login  |

### 🔒 Protected (API Key required)

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| GET    | `/todos`         | Get todos (paginated)       |
| GET    | `/todos/scroll`  | Get todos (infinite scroll) |
| POST   | `/todos`         | Create todo                 |
| PUT    | `/todos/:id`     | Update todo                 |
| DELETE | `/todos/:todoId` | Delete todo                 |

All endpoints return proper HTTP status codes and detailed error messages. Perfect for learning error handling.

---

## 🎓 What Can You Learn?

This isn't just a CRUD API. It's designed to teach you real-world patterns that you'll use in production applications.

### Authentication Patterns

- Implementing login/logout flows
- Token-based authentication
- Protected route handling
- Session management strategies

### Data Fetching & Caching

Works great with:

- **React Query / TanStack Query** (recommended)
- **SWR**
- **RTK Query**
- **Zustand** with async actions
- **Jotai** atoms

### Pagination Strategies

- **Traditional pagination** (`/todos`) for page-based UIs
- **Infinite scroll** (`/todos/scroll`) for mobile-style feeds
- Cursor-based pagination
- "Load more" patterns

### Optimistic Updates

- Update UI instantly before server confirms
- Rollback changes on errors
- Handle pending states
- Manage race conditions

### Error Handling

- Parse different HTTP error codes
- Display validation errors
- Implement toast notifications
- Add retry logic
- Handle offline scenarios

### Loading States

- Skeleton screens
- Spinner components
- Progressive loading
- React Suspense integration

### Form Management

- Client validation with Zod
- Server validation messages
- Real-time feedback
- Field-level errors

### Filtering & Search

- Client vs server-side filtering
- Multi-column sorting
- Debounced search
- Complex filter combinations

---

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Validation**: Zod
- **Docs**: Swagger/OpenAPI

## 📁 Project Structure

```
src/
├── app.ts              # Express config
├── routes/
│   ├── auth/           # Login endpoint
│   └── todos/          # CRUD endpoints
├── middlewares/        # API key validation
├── types/              # TypeScript types
└── mockup/             # Mock data
```

## 📜 Available Scripts

| Script                  | Description              |
| ----------------------- | ------------------------ |
| `npm run dev`           | Start dev server         |
| `npm run build`         | Build for production     |
| `npm test`              | Run tests                |
| `npm run test:watch`    | Run tests in watch mode  |
| `npm run test:coverage` | Generate coverage report |
| `npm run lint`          | Check linting            |

---

## 🤝 Contributing

Found a bug? Have an idea? Contributions are welcome! This project is meant to help people learn, so:

- Keep code beginner-friendly
- Add comments for complex logic
- Update tests for new features
- Maintain the documentation

## ❓ Questions?

Having trouble? Here's how to get help:

1. Check the Swagger docs at http://localhost:8080/api-docs
2. Look at the test files in `__tests__/` for usage examples
3. Open an issue on GitHub

---

## 📄 License

ISC
