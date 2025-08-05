# 🚀 MIV Platform - Deployment Guide

## Overview
This guide covers deployment options for the MIV platform across different environments and hosting providers.

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] All tests passing
- [ ] TypeScript compilation successful
- [ ] ESLint checks passing
- [ ] Build process completes without errors
- [ ] Performance optimization applied

### Environment Setup
- [ ] Environment variables configured
- [ ] Database connections tested (if applicable)
- [ ] API endpoints verified
- [ ] Security headers configured
- [ ] SSL certificates ready

### Performance Verification
- [ ] Lighthouse score > 90
- [ ] Bundle size optimized
- [ ] Images optimized
- [ ] Caching strategies implemented

## 🌐 Deployment Options

### 1. Vercel (Recommended)

**Best for**: Quick deployment, automatic CI/CD, global CDN

#### Setup Steps
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd my-app
vercel

# Follow interactive prompts
```

#### Configuration
Create `vercel.json` in project root:
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["sin1", "hkg1"],
  "env": {
    "NEXT_PUBLIC_APP_NAME": "MIV Platform"
  }
}
```

#### Environment Variables
Set in Vercel dashboard:
- `NEXT_PUBLIC_API_URL`
- `DATABASE_URL`
- `NEXTAUTH_SECRET`

### 2. Netlify

**Best for**: Static site hosting, form handling, serverless functions

#### Setup Steps
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=.next
```

#### Configuration
Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. AWS (Amazon Web Services)

**Best for**: Enterprise deployments, custom infrastructure

#### Option A: AWS Amplify
```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure Amplify
amplify configure

# Initialize project
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

#### Option B: AWS EC2 + Load Balancer
```bash
# Create EC2 instance
# Install Node.js and npm
# Clone repository
# Install dependencies
# Build application
# Configure reverse proxy (nginx)
# Set up SSL certificates
# Configure auto-scaling
```

### 4. Google Cloud Platform

**Best for**: Google ecosystem integration, global scale

#### Cloud Run Deployment
```bash
# Build Docker image
docker build -t gcr.io/PROJECT_ID/miv-platform .

# Push to Container Registry
docker push gcr.io/PROJECT_ID/miv-platform

# Deploy to Cloud Run
gcloud run deploy miv-platform \
  --image gcr.io/PROJECT_ID/miv-platform \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### 5. Docker Deployment

**Best for**: Containerized environments, Kubernetes

#### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  miv-platform:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=https://api.example.com
    restart: unless-stopped
    
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - miv-platform
    restart: unless-stopped
```

## 🔧 Environment Configuration

### Production Environment Variables
```env
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_NAME="MIV Platform"
NEXT_PUBLIC_APP_VERSION="1.0.0"

# API Configuration
NEXT_PUBLIC_API_URL="https://api.miv-platform.com"
API_SECRET_KEY="your-production-secret"

# Database
DATABASE_URL="postgresql://user:pass@host:5432/miv_prod"

# Authentication
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="https://miv-platform.com"

# Email Service
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASS="your-sendgrid-api-key"

# Monitoring
SENTRY_DSN="your-sentry-dsn"
ANALYTICS_ID="your-analytics-id"
```

## 🔒 Security Configuration

### SSL/TLS Setup
```bash
# Using Let's Encrypt with Certbot
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d miv-platform.com
```

### Security Headers
Configure in `next.config.js`:
```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
```

## 📊 Monitoring & Analytics

### Performance Monitoring
```javascript
// Add to _app.tsx
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
```

### Error Tracking
```bash
# Install Sentry
npm install @sentry/nextjs

# Configure in sentry.client.config.js
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
})
```

## 🔄 CI/CD Pipeline

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build application
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🚨 Troubleshooting

### Common Deployment Issues

#### Build Failures
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

#### Environment Variable Issues
```bash
# Verify environment variables
printenv | grep NEXT_PUBLIC
```

#### Memory Issues
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

#### SSL Certificate Issues
```bash
# Verify SSL certificate
openssl s_client -connect miv-platform.com:443
```

## 📞 Support

For deployment issues:
- Check the deployment logs
- Verify environment variables
- Test locally with production build
- Contact the development team

---

**🎉 Your MIV platform is now ready for production deployment!**
