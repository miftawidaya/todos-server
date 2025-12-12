# 📝 Todo API Server

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/miftawidaya/todos-server&env=JWT_SECRET,API_URL&envDescription=Required%20environment%20variables%20for%20the%20API&envLink=https://github.com/miftawidaya/todos-server%23environment-variables&project-name=john-todo-api-server&repository-name=john-todo-api-server)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-lightgrey?logo=express)](https://expressjs.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

**A Todo List REST API** built with TypeScript, Express, and JWT authentication. Perfect for learning modern frontend development with React Query, SWR, or any state management library.

**Features:** ✨ CRUD Operations • 🔐 JWT Authentication • 📄 Pagination & Infinite Scroll • 📚 Interactive Swagger Docs • ✅ Unit Tested

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

**Swagger JSON:** http://localhost:8080/api-docs.json

## 🚀 Deploy to Vercel (1-Click)

Deploy your own instance of this API in seconds:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/miftawidaya/todos-server&env=JWT_SECRET,API_URL&envDescription=Required%20environment%20variables%20for%20the%20API&envLink=https://github.com/miftawidaya/todos-server%23environment-variables&project-name=john-todo-api-server&repository-name=john-todo-api-server)

### 📋 Deployment Checklist

After clicking the button above:

1. **Connect your GitHub account** (if not already connected)
2. **Set Environment Variables** in Vercel:
   - `JWT_SECRET`: A strong random string (e.g., `your-super-secret-key-change-this`)
   - `API_URL`: Fill with placeholder for now (e.g., `https://john-todo-api-server.vercel.app`)
     - 💡 **Tip:** Use your expected project name + `.vercel.app`
     - We'll update this with the actual URL after deployment
3. **Click "Deploy"** and wait ~2 minutes
4. **After deployment completes:**
   - Copy your **actual** production URL from Vercel (e.g., `https://john-todo-api-server.vercel.app`)
   - Go to **Settings** → **Environment Variables**
   - **Edit** `API_URL` and replace with your actual production URL
   - **Click "Save"**
   - **Redeploy** the project (Deployments → ... → Redeploy)

**🎉 Done!** Your API is live and Swagger docs will show the correct URL!

### 🔧 Manual Deployment (Alternative)

If you prefer manual setup:

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Set environment variables
vercel env add JWT_SECRET
vercel env add API_URL

# 4. Deploy to production
vercel --prod
```

---

## 💡 Why This Project?

A **production-ready Todo List API** designed specifically for learning modern frontend development. Most learning APIs are either too simple (just mock data) or too complex (full production systems). This one hits the sweet spot: **real backend functionality** with **beginner-friendly documentation**.

Perfect for building your portfolio or practicing with React Query, SWR, Zustand, or any modern state management library.

- ✅ Interactive API docs (Swagger UI)
- ✅ Real JWT authentication and authorization
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

---

## 📚 API Documentation

### Interactive Swagger UI

Swagger UI is available at `http://localhost:8080/api-docs`

**Authentication:**

- All `/todos` endpoints are protected with JWT
- You must include the JWT token in the `Authorization` header:
  ```
  Authorization: Bearer <your-token>
  ```

### Quick Start: Testing with cURL

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

```bash
curl -X GET http://localhost:8080/todos \
  -H "Authorization: Bearer <your-token>"
```

## 🤖 AI Code Generation (For Frontend Devs)

The easiest way to generate frontend code (React Query, Types, Axios) that is compatible with this backend:

1. Go to **[http://localhost:8080/api-docs.json](http://localhost:8080/api-docs.json)**
2. Copy the entire JSON content
3. Paste it to your AI Chat (ChatGPT/Claude/Cursor) with this prompt:
   > "Here is the backend API Swagger JSON. Please generate the frontend TypeScript types and React Query hooks for these endpoints. Use `Authorization: Bearer` header."

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
3. Check the **Troubleshooting** section below
4. Open an issue on GitHub

---

## 🔧 Troubleshooting

### Deployment Issues

**Problem: Swagger shows wrong URL (preview URL instead of production)**

```
URL shows: https://project-abc123.vercel.app
Expected: https://api-todo-server.vercel.app
```

**Solution:**

1. Go to Vercel Dashboard → Your Project
2. **Settings** → **Environment Variables**
3. Add `API_URL` with your production URL
4. **Deployments** → Click **...** → **Redeploy**

---

**Problem: "Cannot find module" errors after deployment**

**Solution:**

```bash
# Make sure all dependencies are in dependencies, not devDependencies
npm install --save express cors swagger-ui-express

# Commit and push
git add package.json package-lock.json
git commit -m "fix: move dependencies"
git push
```

---

**Problem: Environment variables not working**

**Solution:**

1. Check variable names are EXACTLY correct (case-sensitive)
2. Make sure you selected the right environment (Production/Preview/Development)
3. Redeploy after adding variables
4. Check Vercel logs: **Deployments** → Click deployment → **View Function Logs**

---

**Problem: API returns 404 on Vercel**

**Solution:**
Check your `vercel.json` configuration:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/api/index.ts"
    }
  ]
}
```

---

### Local Development Issues

**Problem: Port already in use**

**Solution:**

**Linux/Mac:**
```bash
# Find and kill process on port 8080
lsof -ti:8080 | xargs kill -9
```

**Windows (PowerShell):**
```powershell
# Find process using port 8080
netstat -ano | findstr :8080

# Kill process by PID (replace <PID> with actual number)
taskkill /PID <PID> /F

# Example:
# netstat -ano | findstr :8080
#   TCP    0.0.0.0:8080    0.0.0.0:0    LISTENING    12345
# taskkill /PID 12345 /F
```

**Or use a different port (all platforms):**
```bash
PORT=3000 npm run dev
```

---

**Problem: TypeScript errors**

**Solution:**

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

---

## 📄 License

ISC
