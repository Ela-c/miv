# 🚀 MIV Platform - Installation & Setup Guide

## Overview
This guide will help you install and set up the Mekong Inclusive Ventures (MIV) platform on your local development environment or production server.

## 📋 Prerequisites

### System Requirements
- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher (comes with Node.js)
- **Git**: Latest version
- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 20.04+)

### Hardware Requirements
- **RAM**: Minimum 4GB, Recommended 8GB+
- **Storage**: Minimum 2GB free space
- **CPU**: Modern multi-core processor

### Development Tools (Recommended)
- **VS Code**: With TypeScript and React extensions
- **Chrome/Firefox**: Latest version for testing
- **Terminal**: Command line interface

## 🛠️ Installation Steps

### 1. Clone the Repository
```bash
# Clone the repository
git clone <repository-url>
cd miv

# Navigate to the application directory
cd my-app
```

### 2. Install Dependencies
```bash
# Install all required packages
npm install

# Verify installation
npm list --depth=0
```

### 3. Environment Setup
```bash
# Copy environment template (if exists)
cp .env.example .env.local

# Edit environment variables
nano .env.local
```

### 4. Start Development Server
```bash
# Start the development server
npm run dev

# The application will be available at:
# Local: http://localhost:3000
# Network: http://[your-ip]:3000
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the `my-app` directory:

```env
# Application Settings
NEXT_PUBLIC_APP_NAME="MIV Platform"
NEXT_PUBLIC_APP_VERSION="1.0.0"

# API Configuration (when backend is available)
NEXT_PUBLIC_API_URL="http://localhost:8000/api"
API_SECRET_KEY="your-secret-key"

# Database Configuration (future)
DATABASE_URL="postgresql://user:password@localhost:5432/miv_db"

# Authentication (future)
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# External Services (future)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

### Theme Configuration
The platform supports three theme modes:
- **Light Mode**: Default professional appearance
- **Dark Mode**: Reduced eye strain for extended use
- **System Mode**: Automatically follows OS preference

Theme preference is automatically saved in localStorage.

## 📦 Package Dependencies

### Core Dependencies
```json
{
  "next": "15.2.4",
  "react": "^19",
  "react-dom": "^19",
  "typescript": "^5",
  "tailwindcss": "^4.1.11"
}
```

### UI Components
```json
{
  "@radix-ui/react-*": "Latest versions",
  "lucide-react": "Latest",
  "recharts": "^2.8.0"
}
```

### Development Tools
```json
{
  "eslint": "^9",
  "eslint-config-next": "15.2.4",
  "@types/react": "^19",
  "@types/react-dom": "^19"
}
```

## 🚀 Deployment

### Development Deployment
```bash
# Start development server
npm run dev

# Build for production testing
npm run build
npm start
```

### Production Deployment

#### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Follow the prompts to configure your deployment
```

#### Option 2: Docker
```dockerfile
# Create Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build and run Docker container
docker build -t miv-platform .
docker run -p 3000:3000 miv-platform
```

#### Option 3: Traditional Server
```bash
# Build the application
npm run build

# Start production server
npm start

# Or use PM2 for process management
npm install -g pm2
pm2 start npm --name "miv-platform" -- start
```

## 🔍 Verification

### 1. Check Application Health
Visit `http://localhost:3000` and verify:
- ✅ Homepage loads correctly
- ✅ Navigation works smoothly
- ✅ Theme toggle functions
- ✅ All pages are accessible

### 2. Test Core Features
- ✅ Dashboard displays metrics
- ✅ Venture intake form works
- ✅ Export functionality operates
- ✅ Help & support page loads
- ✅ Dark mode switches properly

### 3. Performance Check
```bash
# Run build to check for errors
npm run build

# Check bundle size
npm run build -- --analyze

# Run linting
npm run lint
```

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

#### Node Version Issues
```bash
# Check Node version
node --version

# Update Node.js
# Visit https://nodejs.org or use nvm
nvm install 18
nvm use 18
```

#### Package Installation Errors
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Build Errors
```bash
# Check TypeScript errors
npx tsc --noEmit

# Check ESLint issues
npm run lint

# Clear Next.js cache
rm -rf .next
npm run build
```

### Performance Issues
```bash
# Check bundle size
npm run build -- --analyze

# Optimize images (if any)
# Use next/image component

# Enable compression
# Configure in next.config.js
```

## 📚 Additional Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Development Tools
- [VS Code Extensions](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

## 🔐 Security Considerations

### Development Environment
- Never commit `.env.local` files
- Use strong secrets for production
- Keep dependencies updated
- Enable HTTPS in production

### Production Environment
- Configure proper CORS settings
- Set up rate limiting
- Enable security headers
- Use environment-specific configs

## 📞 Support

### Getting Help
- **Documentation**: Check this guide and NAVIGATION.md
- **Issues**: Create GitHub issues for bugs
- **Community**: Join our developer community
- **Support**: Contact the development team

### Reporting Issues
When reporting issues, include:
- Operating system and version
- Node.js and npm versions
- Error messages and stack traces
- Steps to reproduce the issue
- Expected vs actual behavior

---

**🎉 Congratulations! Your MIV platform should now be running successfully.**

For additional configuration and advanced features, refer to the specific documentation files in the project.
