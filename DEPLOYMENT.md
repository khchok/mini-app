# 🚀 Separate Domain Deployment Guide

Your monorepo is now configured for **separate deployments** with each app running on its own domain as independent applications.

## 🎯 **Deployment Architecture**

✅ **Frontend (React)**: `https://your-frontend.vercel.app`
✅ **API Server (Express.js)**: `https://your-api.vercel.app`
✅ **Separate domains** for different behaviors
✅ **Clean monorepo structure** preserved

## 🏗️ **Project Structure**

```
mini-app/
├── apps/
│   ├── server/                    # Express.js API Server
│   │   ├── api/
│   │   │   └── index.ts          # Vercel entry point
│   │   ├── src/
│   │   │   ├── app.ts            # Express app
│   │   │   ├── controllers/      # API controllers
│   │   │   ├── routes/           # API routes
│   │   │   └── models/           # Data models
│   │   ├── vercel.json           # Server deployment config
│   │   └── package.json          # Server dependencies
│   └── web/                      # React Frontend
│       ├── src/                  # React components
│       ├── vercel.json           # Frontend deployment config
│       ├── package.json          # Frontend dependencies
│       └── dist/                 # Build output
├── package.json                  # Root monorepo config
└── pnpm-workspace.yaml          # Workspace config
```

## ⚙️ **Deployment Configurations**

### **Frontend (`apps/web/vercel.json`)**
```json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install",
  "framework": null
}
```
- Deploys React app as static site
- Builds using Vite
- Serves from `dist` directory

### **API Server (`apps/server/vercel.json`)**
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
      "dest": "api/index.ts"
    }
  ]
}
```
- Deploys Express.js as full Node.js application
- Uses `api/index.ts` as entry point
- Routes all requests to Express app

## 🚀 **Deployment Steps**

### **Step 1: Deploy Frontend**
```bash
# Navigate to frontend app
cd apps/web

# Deploy to Vercel
vercel --prod

# Result: https://your-frontend.vercel.app
```

### **Step 2: Deploy API Server**
```bash
# Navigate to server app
cd apps/server

# Deploy to Vercel
vercel --prod

# Result: https://your-api.vercel.app
```

### **Step 3: Update Frontend API Configuration**
Update your frontend to point to the API server domain:

```typescript
// apps/web/src/lib/api.ts
const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://your-api.vercel.app'  // Your API server domain
  : 'http://localhost:3000';       // Local development

export const api = {
  async getItems() {
    const response = await fetch(`${API_BASE}/api/items`);
    return response.json();
  },
  
  async createItem(name: string) {
    const response = await fetch(`${API_BASE}/api/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    return response.json();
  },
};
```

## 🧪 **Testing Deployments**

### **Test Frontend**
```bash
curl https://your-frontend.vercel.app/
# Should return React app HTML
```

### **Test API Server**
```bash
# Health check
curl https://your-api.vercel.app/

# API endpoints
curl https://your-api.vercel.app/api/items
curl -X POST https://your-api.vercel.app/api/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Item"}'

# API Documentation
open https://your-api.vercel.app/api-docs
```

## 🔧 **Environment Variables**

### **Frontend Environment Variables**
Set in your frontend Vercel project:
- `VITE_API_URL`: Your API server domain
- Any other frontend-specific variables

### **API Server Environment Variables**
Set in your API server Vercel project:
- `API_DOMAIN`: Your API server domain for Swagger docs
- `NODE_ENV`: Set to `production`
- Any database connection strings or API keys

## 💻 **Local Development**

Development workflow remains the same:

```bash
# Terminal 1: Start API server
pnpm run dev:server  # http://localhost:3000

# Terminal 2: Start frontend
pnpm run dev:web     # http://localhost:3333
```

## ✅ **Benefits of Separate Deployments**

1. **🎯 Different Behaviors**: Each app optimized for its purpose
   - Frontend: Static site with CDN optimization
   - API: Full Node.js server with persistent connections

2. **🚀 Independent Scaling**: Scale frontend and API separately

3. **🔧 Independent Deployments**: Deploy frontend and API independently

4. **🛡️ Better Security**: Separate domains, different access controls

5. **📊 Better Monitoring**: Separate metrics and logs for each service

6. **🌍 Geographic Distribution**: Deploy to different regions if needed

## 🎨 **Custom Domains (Optional)**

### **Frontend Custom Domain**
1. Add custom domain in frontend Vercel project
2. Configure DNS: `your-app.com` → frontend deployment

### **API Custom Domain**
1. Add custom domain in API Vercel project  
2. Configure DNS: `api.your-app.com` → API deployment

### **Update Frontend Configuration**
```typescript
const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://api.your-app.com'    // Custom API domain
  : 'http://localhost:3000';
```

## 🔄 **Continuous Deployment**

Both apps will auto-deploy when you push changes:

- **Frontend changes** in `apps/web/` → Redeploys frontend only
- **API changes** in `apps/server/` → Redeploys API only
- **Monorepo structure** preserved and clean

## 📝 **Summary**

✅ **Frontend**: Static React app optimized for performance
✅ **API**: Full Express.js server with all features
✅ **Separate domains**: Different deployment behaviors
✅ **Clean architecture**: No pollution of monorepo structure
✅ **Independent scaling**: Each service optimized separately

Your deployment setup is now **production-ready** with proper separation of concerns! 🎉 