# Vercel Deployment Guide

This guide explains how to deploy your monorepo to Vercel with your React frontend and Express.js API on the same domain, **maintaining your clean monorepo structure**.

## 🎯 Deployment Result

After deployment, you'll have:
- **Frontend**: `https://your-app.vercel.app`
- **API**: `https://your-app.vercel.app/api/items`
- **API Documentation**: `https://your-app.vercel.app/api/api-docs`

## 📁 Monorepo Structure (Preserved!)

Your clean monorepo structure remains **completely intact**:
```
mini-app/
├── apps/
│   ├── server/          # Express.js API (deployed as full Node.js app)
│   └── web/             # React frontend (deployed as static site)
├── package.json         # Root monorepo config
├── vercel.json          # Deployment config
└── pnpm-workspace.yaml  # Workspace config
```

## 🚀 How It Works

### 1. **Full Node.js Deployment (Not Serverless!)**
- Your Express.js app runs as a **complete Node.js application**
- No serverless functions or code duplication
- Your existing controllers, routes, and middleware work unchanged

### 2. **Smart Routing**
- Frontend serves from root: `/`, `/about`, etc.
- API routes automatically go to: `/api/*`
- Same domain, different backends

### 3. **Environment-Aware**
- **Development**: Server runs on `localhost:3000`, Web on `localhost:3333`
- **Production**: Both on same Vercel domain with `/api` routing

## 🛠️ What We've Set Up

### 1. **vercel.json** - Monorepo Deployment Config
```json
{
  "builds": [
    {
      "src": "apps/web/package.json",      // React app build
      "use": "@vercel/static-build"
    },
    {
      "src": "apps/server/vercel-entry.ts", // Express app entry
      "use": "@vercel/node"                 // Full Node.js runtime
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "apps/server/vercel-entry.ts" },
    { "src": "/(.*)", "dest": "apps/web/dist/$1" }
  ]
}
```

### 2. **apps/server/vercel-entry.ts** - Clean Entry Point
- Simple wrapper that exports your Express app
- No code duplication
- Vercel handles the server part

### 3. **Updated apps/server/src/app.ts**
- Added CORS headers for production
- Environment-aware routing (dev vs production)
- Your existing code unchanged

## 🚀 Deployment Steps

### Step 1: Install Dependencies
```bash
pnpm install
```

### Step 2: Test Local Build
```bash
# Test web build
pnpm run build:web

# Test server build  
pnpm run build:server
```

### Step 3: Deploy to Vercel
```bash
# Install Vercel CLI (if needed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from monorepo root
vercel
```

## 🧪 Testing Your Deployment

After deployment, test these endpoints:

```bash
# Frontend
curl https://your-app.vercel.app

# API endpoints (your existing routes work!)
curl https://your-app.vercel.app/api/items
curl -X POST https://your-app.vercel.app/api/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Item"}'

# API Documentation
open https://your-app.vercel.app/api/api-docs
```

## 🔗 Using API in Your React App

Your existing API calls work with minimal changes:

```typescript
// apps/web/src/lib/api.ts
const API_BASE = process.env.NODE_ENV === 'production' 
  ? '' // Same domain in production
  : 'http://localhost:3000'; // Local server in development

export const api = {
  async getItems() {
    const response = await fetch(`${API_BASE}/api/items`);
    return response.json();
  },
  
  async createItem(name: string) {
    const response = await fetch(`${API_BASE}/api/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    return response.json();
  }
};
```

## ✅ Advantages of This Approach

1. **🏗️ Preserves Monorepo Structure** - No pollution of root directory
2. **🚀 Full Express.js App** - Not serverless, your app runs normally
3. **🔄 Same Domain** - `your-app.vercel.app` + `/api` path
4. **💻 Zero Code Changes** - Your existing Express routes work as-is
5. **🔧 Easy Development** - Same dev workflow, just deploy when ready
6. **📈 Performance** - Full Node.js app, no cold starts
7. **🛠️ Full Express Features** - Middleware, static files, everything works

## 🔧 Development vs Production

### Local Development (Unchanged!)
```bash
# Terminal 1: Start API server
pnpm run dev:server  # http://localhost:3000

# Terminal 2: Start web app  
pnpm run dev:web     # http://localhost:3333
```

### Production (Vercel)
- **Frontend**: `https://your-app.vercel.app`
- **API**: `https://your-app.vercel.app/api/*`
- **Same domain, automatic routing** ✨

## 🌐 Alternative: Subdomain Approach

If you still prefer `api.your-domain.com`:

1. **Deploy server separately**:
   ```bash
   cd apps/server
   vercel --prod
   ```

2. **Add custom domain** in Vercel dashboard

3. **Update frontend API calls**:
   ```typescript
   const API_BASE = 'https://api.your-domain.com';
   ```

## 📝 Key Benefits

- ✅ **Monorepo structure preserved**
- ✅ **No serverless complications**  
- ✅ **Same domain `/api` path**
- ✅ **Full Express.js functionality**
- ✅ **Zero code changes required**
- ✅ **Clean separation of concerns**

Your Express.js app runs exactly as it does locally, just hosted on Vercel! 🎉 