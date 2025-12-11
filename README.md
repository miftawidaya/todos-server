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

## 🔑 About JWT Authentication

This API uses **JWT (JSON Web Token)** Bearer authentication to protect `/todos` endpoints.

### What is JWT Authentication?

JWT is a secure way to authenticate API requests. After logging in, you receive a token that proves your identity for subsequent requests.

### How does it work?

1. **Login** → Get a JWT token
2. **Use the token** → Include it in the `Authorization: Bearer <token>` header for protected endpoints

### Environment Variables

In your `.env.local` file:

```bash
PORT=8080
JWT_SECRET=your-super-secret-key-change-this-in-production
JWT_EXPIRES_IN=24h

# API URL for Swagger documentation (optional)
# If not set, automatically detects:
#   - Vercel deployment → uses VERCEL_URL
#   - Local development → uses http://localhost:8080
# Only set this if you need to override auto-detection
API_URL=https://your-api.example.com
```

**⚠️ Security Note:** Always use a strong, random secret in production!

**💡 Smart URL Detection:**

- **Local Development**: No configuration needed! Automatically uses `http://localhost:8080`
- **Vercel Deployment**: Automatically detects deployment URL from `VERCEL_URL`
  - ⚠️ **For Production**: Set `API_URL` in Vercel Environment Variables to use your production domain
  - Without `API_URL`, it will use the auto-generated Vercel URL (e.g., `project-abc123.vercel.app`)
- **Custom Domain**: Set `API_URL` environment variable to your custom domain

**📝 How to set API_URL in Vercel:**

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add new variable:
   - **Name**: `API_URL`
   - **Value**: `https://api-todo-server.vercel.app` (your production URL)
   - **Environment**: Production (or all environments)
4. Redeploy your project

This ensures your Swagger documentation always points to the correct URL! ✨

### How to use it?

**Step 1: Login to get a token**

```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "user@example.com",
      "name": "user"
    }
  }
}
```

**Step 2: Use the token in protected endpoints**

**Option 1: Via Swagger UI (for testing)**

## 📚 API Documentation

Swagger UI is available at `http://localhost:8080/api-docs`

**Authentication:**

- All `/todos` endpoints are protected
- You must include the JWT token in the `Authorization` header:
  ```
  Authorization: Bearer <your-token>
  ```

## 🤖 AI Code Generation (For Frontend Devs)

To easiest way to generate frontend code (React Query, Types, Axios) that is compatible with this backend:

1. Go to **[http://localhost:8080/api-docs.json](http://localhost:8080/api-docs.json)**
2. Copy the entire JSON content
3. Paste it to your AI Chat (ChatGPT/Claude/Cursor) with this prompt:
   > "Here is the backend API Swagger JSON. Please generate the frontend TypeScript types and React Query hooks for these endpoints. Use `Authorization: Bearer` header."

**Option 2: Via Code (for frontend)**

```javascript
// Save token after login
const loginResponse = await fetch('http://localhost:8080/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com', password: 'password123' }),
});
const { data } = await loginResponse.json();
localStorage.setItem('token', data.token);

// Use token in subsequent requests
const token = localStorage.getItem('token');
fetch('http://localhost:8080/todos', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

---

## 📚 API Endpoints

### 🔓 Public (no authentication required)

| Method | Endpoint      | Description |
| ------ | ------------- | ----------- |
| POST   | `/auth/login` | User login  |

### 🔒 Protected (JWT authentication required)

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
