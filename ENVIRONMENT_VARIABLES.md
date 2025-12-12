# Environment Variables - Complete Reference

## 📋 Quick Summary

**Only 1 variable is REQUIRED:** `JWT_SECRET`

All other variables are optional with sensible defaults or auto-detection.

---

## ✅ Required Variables

### `JWT_SECRET` (Required)

**Purpose:** Secret key for signing JWT tokens

**Example:**
```bash
JWT_SECRET=your-super-secret-key-min-32-characters
```

**How to generate a secure key:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**⚠️ Security Warning:**
- Use a strong, random string (minimum 32 characters)
- Never commit this to version control
- Use different keys for development and production

---

## ⚙️ Optional Variables

### `JWT_EXPIRES_IN` (Optional)

**Purpose:** How long JWT tokens remain valid

**Default:** `24h` (24 hours)

**Examples:**
```bash
JWT_EXPIRES_IN=1h    # 1 hour
JWT_EXPIRES_IN=24h   # 24 hours (default)
JWT_EXPIRES_IN=7d    # 7 days
JWT_EXPIRES_IN=30d   # 30 days
```

---

### `PORT` (Optional)

**Purpose:** Server port for local development

**Default:** `8080`

**Example:**
```bash
PORT=3000
```

**Note:** Vercel automatically assigns a port in production. This only affects local development.

---

### `API_URL` (Optional)

**Purpose:** Base URL for Swagger documentation

**Default:** Auto-detected
- **Vercel:** Uses `VERCEL_URL` automatically
- **Local:** Uses `http://localhost:8080`

**Example:**
```bash
API_URL=https://my-api.vercel.app
```

**When to set:**
- Only if auto-detection doesn't work
- If using a custom domain
- If Swagger docs show wrong URL

---

### `PRIVATE_API_KEY` (Optional)

**Purpose:** API key for private/admin endpoints (if implemented)

**Default:** None

**Example:**
```bash
PRIVATE_API_KEY=your-private-api-key-here
```

**Note:** Only needed if you're using the `validatePrivateApiKey` middleware.

---

### `NODE_ENV` (Optional)

**Purpose:** Environment mode

**Default:**
- **Vercel:** Automatically set to `production`
- **Local:** Defaults to `development`

**Values:**
```bash
NODE_ENV=development  # Local development
NODE_ENV=production   # Production deployment
NODE_ENV=test         # Testing
```

**Note:** You rarely need to set this manually.

---

## 📁 File Locations

### Local Development

**File:** `.env.local` (create from `.env.example`)

```bash
# Copy example file
cp .env.example .env.local

# Edit with your values
# Only JWT_SECRET is required
```

### Vercel Deployment

**Location:** Vercel Dashboard → Settings → Environment Variables

**Steps:**
1. Go to your project on Vercel
2. Click **Settings**
3. Click **Environment Variables**
4. Add variables one by one
5. Click **Save**
6. Redeploy if needed

---

## 🔍 Environment Variable Priority

Variables are loaded in this order (later overrides earlier):

1. **Default values** (in code)
2. **`.env.local`** file (local development only)
3. **Vercel Environment Variables** (production)
4. **System environment variables**

---

## ✅ Verification Checklist

### Local Development

- [ ] Created `.env.local` from `.env.example`
- [ ] Set `JWT_SECRET` to a strong random string
- [ ] Server starts without errors: `npm run dev`
- [ ] Can access Swagger docs: http://localhost:8080/api-docs

### Vercel Deployment

- [ ] Set `JWT_SECRET` in Vercel dashboard
- [ ] Deployment succeeds
- [ ] API is accessible at Vercel URL
- [ ] Swagger docs work correctly
- [ ] Login endpoint works
- [ ] Protected endpoints require JWT token

---

## 🐛 Troubleshooting

### "JWT_SECRET is not defined"

**Problem:** Missing required environment variable

**Solution:**
```bash
# Local: Add to .env.local
JWT_SECRET=your-secret-key-here

# Vercel: Add in dashboard
Settings → Environment Variables → Add JWT_SECRET
```

### Swagger docs show wrong URL

**Problem:** `API_URL` not set correctly

**Solution:**
```bash
# Set explicitly in Vercel
API_URL=https://your-actual-vercel-url.vercel.app
```

### Environment variables not updating

**Problem:** Cached values or deployment not restarted

**Solution:**
```bash
# Local: Restart dev server
npm run dev

# Vercel: Redeploy
Deployments → ... → Redeploy
```

---

## 📚 Additional Resources

- [Vercel Environment Variables Docs](https://vercel.com/docs/environment-variables)
- [dotenv Documentation](https://github.com/motdotla/dotenv)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

## 🔐 Security Best Practices

1. **Never commit `.env.local` to git**
   - Already in `.gitignore`
   - Contains sensitive secrets

2. **Use strong JWT secrets**
   - Minimum 32 characters
   - Random, not predictable
   - Different for each environment

3. **Rotate secrets regularly**
   - Change JWT_SECRET periodically
   - Update in all environments

4. **Use environment-specific values**
   - Different secrets for dev/staging/prod
   - Never reuse production secrets in development

5. **Limit token expiration**
   - Shorter is more secure
   - Balance with user experience
   - Default 24h is reasonable

---

## 📞 Need Help?

If you're still having issues:

1. Check this document
2. Review `.env.example` for correct format
3. Check Vercel deployment logs
4. Verify variable names (case-sensitive!)
5. Open an issue on GitHub
