# MIV Platform - Venture Pipeline Management System

A comprehensive, AI-powered venture pipeline management platform for Mekong Inclusive Ventures (MIV), designed to track venture progress, GEDSI metrics, and support activities across Southeast Asia.

## 🚀 **Features**

### **Core Features**
- **Venture Intake & Management**: Multi-step venture application process with AI-powered analysis
- **GEDSI Tracker**: IRIS+ metrics tracking with automated suggestions and verification
- **Readiness Dashboard**: Progress tracking for operational and capital readiness
- **Analytics & Reporting**: Real-time analytics with AI-powered insights
- **Document Management**: Secure file storage and AI-powered document analysis
- **Activity Tracking**: Comprehensive audit trail and activity logging

### **AI-Powered Features**
- **Intelligent Venture Screening**: AI analysis of pitch decks and business plans
- **GEDSI Metrics Suggestions**: Automated IRIS+ metric recommendations
- **Readiness Assessment**: AI-powered venture readiness evaluation
- **Risk Assessment**: Automated risk analysis and mitigation recommendations
- **Document Analysis**: AI-powered document processing and insights
- **Smart Tagging**: Automated venture and document categorization

### **Advanced Features**
- **Capital Facilitation**: Investment tracking and management
- **Impact Reports**: Automated impact measurement and reporting
- **Team Management**: User roles and permissions
- **Google Workspace Integration**: Seamless integration with Google Drive and Docs
- **Real-time Notifications**: Smart alerts and deadline tracking

## 🛠️ **Technology Stack**

### **Frontend**
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Recharts**: Data visualization library

### **Backend**
- **Next.js API Routes**: Serverless API endpoints
- **Prisma 5**: Type-safe database ORM
- **PostgreSQL**: Primary database
- **NextAuth.js**: Authentication and authorization

### **AI & ML**
- **OpenAI GPT-4**: Document analysis and content generation
- **Anthropic Claude**: Advanced reasoning and analysis
- **Google AI (Gemini)**: Multi-modal AI capabilities

### **Infrastructure**
- **Vercel**: Deployment and hosting
- **PostgreSQL**: Database (Supabase/Neon/Railway)
- **Google Cloud**: AI services and storage

## 📊 **Database Schema**

The platform uses a comprehensive database schema with the following main entities:

- **Users**: Authentication and user management
- **Ventures**: Venture information and pipeline stages
- **GEDSIMetrics**: IRIS+ metrics tracking
- **Documents**: File management and storage
- **Activities**: Audit trail and activity logging
- **CapitalActivities**: Investment and funding tracking

## 🚀 **Quick Start**

### **1. Prerequisites**
- Node.js 18+ 
- PostgreSQL database
- AI service API keys (OpenAI, Anthropic, Google AI)

### **2. Installation**

```bash
# Clone the repository
git clone <repository-url>
cd miv-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed database with sample data
npm run db:seed

# Start development server
npm run dev
```

### **3. Environment Configuration**

Create a `.env.local` file with the following variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/miv_platform"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# AI Services
OPENAI_API_KEY="your-openai-api-key"
ANTHROPIC_API_KEY="your-anthropic-api-key"
GOOGLE_AI_API_KEY="your-google-ai-api-key"
```

## 📖 **Usage**

### **Venture Intake**
1. Navigate to `/dashboard/venture-intake`
2. Fill out the multi-step application form
3. AI automatically analyzes the submission
4. GEDSI metrics are suggested based on venture data
5. Venture is added to the pipeline

### **GEDSI Tracking**
1. Access `/dashboard/gedsi-tracker`
2. View all ventures and their GEDSI metrics
3. Add, edit, or verify metrics
4. Track progress towards impact goals
5. Generate compliance reports

### **Dashboard Analytics**
1. Visit `/dashboard` for overview
2. View real-time analytics and trends
3. Monitor venture pipeline stages
4. Track GEDSI compliance rates
5. Analyze performance metrics

## 🔧 **Development**

### **Available Scripts**

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Database
npm run db:generate     # Generate Prisma client
npm run db:push         # Push schema to database
npm run db:migrate      # Run database migrations
npm run db:studio       # Open Prisma Studio
npm run db:seed         # Seed database with sample data
```

### **AI Development Workflow**

The platform includes AI-powered development features:

```typescript
// AI Service Integration
import { AIServices } from '@/lib/ai-services'

// Analyze venture data
const analysis = await AIServices.analyzeGEDSIMetrics(ventureData)

// Assess venture readiness
const assessment = await AIServices.assessVentureReadiness(ventureData)

// Generate tags
const tags = await AIServices.generateTags(ventureData)

// Risk assessment
const riskAnalysis = await AIServices.assessRisk(ventureData)
```

## 📊 **API Endpoints**

### **Ventures**
- `GET /api/ventures` - List ventures with filtering
- `POST /api/ventures` - Create new venture
- `GET /api/ventures/[id]` - Get venture details
- `PUT /api/ventures/[id]` - Update venture
- `DELETE /api/ventures/[id]` - Delete venture

### **GEDSI Metrics**
- `GET /api/ventures/[id]/gedsi` - Get venture metrics
- `POST /api/ventures/[id]/gedsi` - Add metric
- `PUT /api/ventures/[id]/gedsi` - Update metric
- `DELETE /api/ventures/[id]/gedsi` - Delete metric

### **Analytics**
- `GET /api/analytics` - Get comprehensive analytics data

## 🔒 **Security**

### **Authentication**
- Google OAuth 2.0 integration
- Role-based access control (RBAC)
- Session management with NextAuth.js
- Secure JWT tokens

### **Data Protection**
- Encrypted data transmission (HTTPS)
- Secure API endpoints with authentication
- Input validation and sanitization
- Audit logging for all activities

### **AI Security**
- Secure API key management
- Rate limiting for AI services
- Bias detection and mitigation
- Audit trails for AI decisions

## 🚀 **Deployment**

### **Vercel (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Run database migrations
npx prisma migrate deploy
```

### **Docker**

```bash
# Build image
docker build -t miv-platform .

# Run container
docker run -p 3000:3000 miv-platform
```

## 📈 **Performance**

### **Optimizations**
- Server-side rendering (SSR) with Next.js
- Database query optimization with Prisma
- AI response caching
- Image optimization
- Code splitting and lazy loading

### **Monitoring**
- Vercel Analytics integration
- Database performance monitoring
- AI service usage tracking
- Error tracking and logging

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### **Development Guidelines**
- Follow TypeScript best practices
- Use AI-powered code generation
- Maintain accessibility standards
- Write comprehensive documentation
- Follow the established code style

## 📚 **Documentation**

- [Setup Guide](./docs/SETUP_GUIDE.md) - Detailed setup instructions
- [AI Implementation Guide](./docs/AI_ACCELERATED_IMPLEMENTATION.md) - AI-powered development
- [Architecture Documentation](./docs/ARCHITECTURE.md) - System architecture
- [Design Specification](./docs/DESIGN_SPECIFICATION.md) - Complete design overview

## 🆘 **Support**

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the troubleshooting guide

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **IRIS+**: For GEDSI metrics framework
- **Next.js Team**: For the excellent React framework
- **Prisma Team**: For the type-safe database ORM
- **OpenAI, Anthropic, Google**: For AI capabilities
- **Mekong Inclusive Ventures**: For the vision and requirements

---

**Built with ❤️ for inclusive venture capital in Southeast Asia**
