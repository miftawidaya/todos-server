# Vercel Deployment Guide

## 📋 Prerequisites

1. Vercel account (sign up at https://vercel.com)
2. Vercel CLI installed (optional): `npm i -g vercel`

## 🚀 Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git push origin main
   ```

2. **Import Project to Vercel**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your `todos-server` repository
   - Click "Import"

3. **Configure Build Settings**
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Set Environment Variables**
   Click "Environment Variables" and add:
   
   **Required:**
   ```
   JWT_SECRET=your-super-secret-jwt-key-min-32-characters
   ```
   
   **Optional (recommended):**
   ```
   JWT_EXPIRES_IN=24h
   API_URL=https://your-project-name.vercel.app
   ```
   
   **Optional (if using private endpoints):**
   ```
   PRIVATE_API_KEY=your-private-api-key
   ```
   
   > **Note:** `NODE_ENV` is automatically set to `production` by Vercel.
   > `PORT` is automatically assigned by Vercel.

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your API will be live at: `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Login to Vercel**
   ```bash
   vercel login
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   ```bash
   # Required
   vercel env add JWT_SECRET
   
   # Optional
   vercel env add JWT_EXPIRES_IN
   vercel env add API_URL
   vercel env add PRIVATE_API_KEY  # if using private endpoints
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## 🔧 Configuration Files

### `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/app.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### `package.json` scripts
- `build`: Compiles TypeScript to JavaScript
- `prebuild`: Generates Swagger documentation
- `start`: Runs the production server
- `vercel-build`: Alias for build (Vercel-specific)

## 📝 Environment Variables Reference

| Variable | Required? | Description | Example | Default |
|----------|-----------|-------------|---------|---------|
| `JWT_SECRET` | ✅ **Yes** | Secret key for JWT signing | `your-super-secret-key-min-32-chars` | None |
| `JWT_EXPIRES_IN` | ❌ No | JWT token expiration time | `24h`, `7d`, `30d` | `24h` |
| `API_URL` | ❌ No | API URL for Swagger docs | `https://your-api.vercel.app` | Auto-detected |
| `PRIVATE_API_KEY` | ❌ No | API key for private endpoints | `your-private-api-key` | None |
| `PORT` | ❌ No | Server port (local only) | `8080`, `3000` | `8080` |
| `NODE_ENV` | ❌ No | Environment mode | `production`, `development` | Auto-set by Vercel |

> **💡 Tip:** Only `JWT_SECRET` is truly required. All other variables have sensible defaults or are auto-detected.

## ✅ Post-Deployment Checklist

- [ ] API is accessible at your Vercel URL
- [ ] Swagger docs available at `/api-docs`
- [ ] Login endpoint works: `POST /auth/login`
- [ ] Protected endpoints require JWT token
- [ ] All environment variables are set
- [ ] CORS is configured properly
- [ ] No errors in Vercel logs

## 🔍 Testing Your Deployment

1. **Test Health Check**
   ```bash
   curl https://your-project.vercel.app/
   ```

2. **Test Swagger Docs**
   Open in browser: `https://your-project.vercel.app/api-docs`

3. **Test Login**
   ```bash
   curl -X POST https://your-project.vercel.app/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"user@example.com","password":"password123"}'
   ```

4. **Test Protected Endpoint**
   ```bash
   curl https://your-project.vercel.app/todos \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

## 🐛 Troubleshooting

### Build Fails
- Check Vercel build logs
- Ensure all dependencies are in `dependencies`, not `devDependencies`
- Verify TypeScript compiles locally: `npm run build`

### Runtime Errors
- Check Vercel function logs
- Verify environment variables are set correctly
- Ensure `dist/app.js` exports the Express app correctly

### 404 Errors
- Verify `vercel.json` routes configuration
- Check that `dist/app.js` exists after build
- Ensure Express routes are defined correctly

### Environment Variables Not Working
- Re-deploy after adding environment variables
- Check variable names match exactly (case-sensitive)
- Verify variables are set for "Production" environment

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Node.js Runtime](https://vercel.com/docs/runtimes#official-runtimes/node-js)
- [Environment Variables](https://vercel.com/docs/environment-variables)

## 🔄 Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Run your build command automatically
- Apply environment variables

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review this guide
3. Check Vercel community forums
4. Contact Vercel support
