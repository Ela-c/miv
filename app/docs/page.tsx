"use client"

import { useState } from 'react'
import { MarkdownReader } from '@/components/markdown-reader'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  FileText, 
  Code, 
  Shield, 
  Zap, 
  Database, 
  Cloud,
  BookOpen,
  ExternalLink
} from 'lucide-react'

// Sample documentation content
const techStackContent = `# MIV Platform - Tech Stack Summary

## 🎯 **Recommended Tech Stack**

**Frontend**: Next.js 15 + React 19 + TypeScript 5.0  
**Backend**: Node.js 20 + Fastify + Microservices  
**Database**: PostgreSQL 15 + Redis 7 + Elasticsearch 8  
**AI/ML**: Multi-model approach (GPT-4 + Claude + Gemini)  
**Infrastructure**: Kubernetes + Docker + AWS/GCP  
**Monitoring**: DataDog + Prometheus + Grafana  

**Overall Score: 9.2/10** 🏆 **Recommended**

---

## 📊 **Current State Assessment**

| Technology Area | Current Score | Target Score | Status | Priority |
|----------------|---------------|--------------|--------|----------|
| **Frontend** | 9/10 | 10/10 | ✅ Market Leading | Low |
| **AI/ML** | 9/10 | 10/10 | ✅ Market Leading | Low |
| **Backend** | 4/10 | 9/10 | ❌ Needs Upgrade | High |
| **Infrastructure** | 2/10 | 9/10 | ❌ Needs Enterprise | High |
| **Security** | 3/10 | 9/10 | ❌ Needs Compliance | High |

**Overall Market Readiness: 5.4/10** → **Target: 9.2/10**

---

## ✅ **What We're Doing RIGHT**

### **Frontend Excellence**
- **Next.js 15 + React 19** - Latest versions, ahead of competitors
- **TypeScript 5.0** - Industry standard, strict type safety
- **Tailwind CSS 4.0** - Most popular utility-first framework
- **Radix UI + Shadcn/ui** - Modern, accessible components
- **React Hook Form + Zod** - Type-safe form handling
- **TanStack Query + Zustand** - Advanced state management
- **Recharts + Framer Motion** - Data visualization and animations

### **AI/ML Leadership**
- **Multi-Model Approach**: GPT-4 + Claude + Gemini
- **Specialized Use Cases**: Venture analysis, GEDSI assessment
- **Business Integration**: AI directly in workflows
- **Unique Advantage**: No competitor has this level of AI integration
- **LangChain Orchestration**: Advanced AI workflow management
- **Vector Database**: ChromaDB for AI embeddings

---

## ❌ **What Needs UPGRADING**

### **Backend Infrastructure**
- **Database**: SQLite → PostgreSQL 15 (production-ready)
- **Caching**: Add Redis 7 for performance
- **Search**: Add Elasticsearch 8 for full-text search
- **Architecture**: Monolithic → Microservices (Node.js + Fastify)
- **API Gateway**: Kong + Rate Limiting
- **Message Queue**: Apache Kafka + RabbitMQ

### **Infrastructure & DevOps**
- **Containerization**: Add Docker + BuildKit
- **Orchestration**: Add Kubernetes + Helm
- **Cloud Platform**: AWS/GCP (Multi-region)
- **CI/CD**: GitHub Actions + ArgoCD
- **Monitoring**: DataDog + Prometheus + Grafana
- **Logging**: ELK Stack + Jaeger

### **Security & Compliance**
- **Authentication**: NextAuth.js → Auth0/Okta
- **Compliance**: Add SOC 2, GDPR compliance
- **Encryption**: AES-256 at rest, TLS 1.3 in transit
- **Audit Logging**: Comprehensive audit trails
- **Penetration Testing**: Annual security assessments

---

## 🚀 **Upgrade Roadmap**

### **Phase 1: Database Migration (2 weeks)**
\`\`\`sql
-- Migrate to PostgreSQL
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

-- Add Redis for caching
-- Add Elasticsearch for search
-- Add ChromaDB for vector storage
\`\`\`

### **Phase 2: Backend Evolution (1-3 months)**
\`\`\`typescript
// Break down into microservices
- Venture Service (Node.js + Fastify)
- GEDSI Service (Node.js + Fastify)
- AI Service (Python + FastAPI) // Keep Python for ML ecosystem
- Analytics Service (Node.js + Fastify)
- Document Service (Node.js + Fastify)
- Notification Service (Node.js + Fastify)
\`\`\`

### **Phase 3: Infrastructure Setup (3-6 months)**
\`\`\`yaml
# Docker + Kubernetes
services:
  - name: miv-frontend
    image: miv/frontend:latest
    ports:
      - "3000:3000"
  
  - name: miv-backend
    image: miv/backend:latest
    ports:
      - "8000:8000"
  
  - name: miv-ai-service
    image: miv/ai-service:latest
    ports:
      - "8001:8001"
  
  - name: miv-database
    image: postgres:15
    ports:
      - "5432:5432"
  
  - name: miv-cache
    image: redis:7
    ports:
      - "6379:6379"
  
  - name: miv-search
    image: elasticsearch:8
    ports:
      - "9200:9200"
\`\`\`

### **Phase 4: Enterprise Features (6-12 months)**
\`\`\`yaml
# Enterprise features
- Multi-tenant architecture
- Advanced security (SOC 2, GDPR)
- Global deployment (Multi-region)
- Performance optimization
- Disaster recovery
- Advanced monitoring
\`\`\`

---

## 💰 **Investment Requirements**

| Component | Development Cost | Infrastructure Cost | Timeline | ROI |
|-----------|------------------|---------------------|----------|-----|
| **Database Migration** | $5,000 | $2,000/month | 2 weeks | High |
| **Backend Evolution** | $20,000 | $3,000/month | 3 months | High |
| **AI Enhancement** | $15,000 | $2,000/month | 2 months | High |
| **Infrastructure Setup** | $25,000 | $5,000/month | 3 months | High |
| **Enterprise Features** | $35,000 | $6,000/month | 6 months | Medium |
| **Total Investment** | $100,000 | $18,000/month | 12 months | High |

---

## 📊 **Competitive Analysis**

| Platform | Frontend | Backend | AI/ML | Infrastructure | Overall |
|----------|----------|---------|-------|----------------|---------|
| **MIV Platform (Recommended)** | Next.js 15 | Node.js 20 | Multi-Model | Kubernetes | 9.2/10 |
| **Affinity** | Next.js | Python/FastAPI | Basic ML | Kubernetes | 8.5/10 |
| **DealCloud** | Angular | .NET Core | None | Azure | 6.5/10 |
| **Workiva** | React | Java/Spring | Basic NLP | Kubernetes | 7.5/10 |
| **Watershed** | Next.js | Python/FastAPI | Carbon Models | GCP | 8.0/10 |

### **MIV Competitive Advantages**
1. **AI/ML Leadership**: Significantly ahead of all competitors
2. **Modern Frontend**: Latest Next.js + React technology
3. **Performance**: Better than Java/.NET stacks
4. **Developer Experience**: Faster development cycles
5. **Scalability**: Modern microservices architecture

---

## 🎯 **Strategic Recommendations**

### **Immediate Actions (Next 30 days)**
1. **Database Migration**: SQLite → PostgreSQL + Redis + Elasticsearch
2. **Backend Planning**: Design Node.js + Fastify microservices architecture
3. **Infrastructure Planning**: Choose cloud provider (AWS/GCP)

### **Short-term Goals (3-6 months)**
1. **Backend Evolution**: Implement Node.js + Fastify microservices
2. **AI Enhancement**: Implement LangChain + ChromaDB vector database
3. **Performance Optimization**: Edge functions + CDN + caching strategies

### **Long-term Vision (6-12 months)**
1. **Enterprise Features**: Multi-tenancy + SOC 2 + GDPR compliance
2. **Market Leadership**: Maintain AI advantage + expand GEDSI capabilities

---

## 🏆 **Key Benefits**

### **Technical Benefits**
- ✅ **Performance**: Server-side rendering + edge functions
- ✅ **Scalability**: Microservices + auto-scaling
- ✅ **Security**: Enterprise-grade security features
- ✅ **Reliability**: Multi-region + disaster recovery
- ✅ **Type Safety**: TypeScript throughout the stack

### **Business Benefits**
- ✅ **Market Leadership**: Superior technology stack
- ✅ **Competitive Advantage**: AI-first approach
- ✅ **Time to Market**: Faster development cycles
- ✅ **Maintenance**: Lower operational costs
- ✅ **Future Proof**: Modern, evolving technology

### **Developer Benefits**
- ✅ **TypeScript**: Type safety throughout
- ✅ **Hot Reloading**: Fast development cycles
- ✅ **Rich Ecosystem**: Extensive libraries and tools
- ✅ **Documentation**: Excellent community support
- ✅ **Modern Stack**: Latest technologies and best practices

---

## 🚀 **Bottom Line**

**The recommended Node.js stack is optimal for MIV Platform** because it:

1. **Aligns with market leaders** (Affinity, Watershed)
2. **Provides superior performance** over Java/.NET alternatives
3. **Enables faster development** with excellent developer experience
4. **Supports enterprise-scale growth** with modern architecture
5. **Maintains competitive advantages** through AI-first approach
6. **Future-proofs the platform** with evolving technology

**This stack positions MIV Platform to compete directly with $100M+ companies and achieve market leadership in venture pipeline management for impact investors.**

---

## 📚 **Related Documents**

- [Comprehensive Tech Stack Analysis](./BEST_TECH_STACK_ANALYSIS.md)
- [Market Comparison](./TECH_STACK_MARKET_COMPARISON.md)
- [Implementation Guide](./IMPLEMENTATION_GUIDE.md)
- [Migration Strategy](./MIGRATION_STRATEGY.md)
- [Documentation Alignment Analysis](./DOCUMENTATION_ALIGNMENT_ANALYSIS.md)
`

const securityContent = `# Security & Privacy Checklist

## 🔐 **Security & Privacy Overview**

This checklist ensures the MIV platform meets the highest standards for data protection, security, and privacy compliance across all aspects of the system.

## 📋 **Data Protection & Privacy**

### **Data Classification**
- [ ] **Sensitive Data Identification**
  - [ ] Personal identifiable information (PII)
  - [ ] Financial information and investment data
  - [ ] Business confidential information
  - [ ] GEDSI metrics and impact data
  - [ ] Legal and compliance documents

- [ ] **Data Handling Procedures**
  - [ ] Data retention policies defined
  - [ ] Data deletion procedures implemented
  - [ ] Data backup and recovery processes
  - [ ] Data access logging and monitoring
  - [ ] Data encryption at rest and in transit

### **Privacy Compliance**
- [ ] **GDPR Compliance**
  - [ ] Data processing legal basis documented
  - [ ] User consent mechanisms implemented
  - [ ] Right to access and portability
  - [ ] Right to erasure (data deletion)
  - [ ] Data protection impact assessments (DPIA)

## 🔒 **Authentication & Authorization**

### **User Authentication**
- [ ] **Multi-Factor Authentication (MFA)**
  - [ ] SMS/Email verification codes
  - [ ] Authenticator app support (TOTP)
  - [ ] Hardware security keys (FIDO2)
  - [ ] Biometric authentication (mobile)
  - [ ] Backup authentication methods

### **Access Control**
- [ ] **Role-Based Access Control (RBAC)**
  - [ ] User roles and permissions defined
  - [ ] Principle of least privilege implemented
  - [ ] Role assignment and review processes
  - [ ] Temporary access provisioning
  - [ ] Access revocation procedures

## 🛡️ **Application Security**

### **Input Validation & Sanitization**
- [ ] **Form Validation**
  - [ ] Client-side validation implemented
  - [ ] Server-side validation enforced
  - [ ] Input sanitization for all user inputs
  - [ ] File upload validation and scanning
  - [ ] SQL injection prevention

### **Vulnerability Prevention**
- [ ] **OWASP Top 10 Mitigation**
  - [ ] SQL injection prevention
  - [ ] Cross-site scripting (XSS) protection
  - [ ] Cross-site request forgery (CSRF) protection
  - [ ] Insecure direct object references prevention
  - [ ] Security misconfiguration prevention

## 🔐 **Data Encryption**

### **Encryption Standards**
- [ ] **Data at Rest**
  - [ ] AES-256 encryption for database
  - [ ] File system encryption
  - [ ] Backup encryption
  - [ ] Key management procedures
  - [ ] Encryption key rotation

- [ ] **Data in Transit**
  - [ ] TLS 1.3 for all communications
  - [ ] HTTPS enforcement
  - [ ] API encryption
  - [ ] Database connection encryption
  - [ ] Email encryption for sensitive data

## 🤖 **Web Crawler & SEO Security**

### **Robots.txt Configuration**
- [ ] **Robots.txt File Implementation**
  - [ ] Robots.txt file created and configured
  - [ ] Proper disallow directives for sensitive areas
  - [ ] Allow directives for public content
  - [ ] Sitemap.xml reference included
  - [ ] Regular robots.txt review and updates

### **Search Engine Security**
- [ ] **SEO Security Measures**
  - [ ] Meta robots tags implementation
  - [ ] Noindex directives for sensitive pages
  - [ ] Canonical URLs for duplicate content
  - [ ] Structured data security review
  - [ ] Search engine access logging

## 📄 **Sample Robots.txt Configuration**

### **Recommended Robots.txt Content**
\`\`\`txt
# MIV Platform - Robots.txt Configuration
# Last updated: [Date]
# Contact: [Email]

# Allow all crawlers by default
User-agent: *

# Disallow sensitive areas
Disallow: /api/
Disallow: /admin/
Disallow: /dashboard/
Disallow: /auth/
Disallow: /internal/
Disallow: /docs/internal/
Disallow: /staging/
Disallow: /dev/
Disallow: /test/

# Disallow specific file types
Disallow: /*.json$
Disallow: /*.xml$
Disallow: /*.txt$
Disallow: /config/
Disallow: /logs/

# Allow public content
Allow: /public/
Allow: /about/
Allow: /contact/
Allow: /help/
Allow: /docs/public/

# Sitemap location
Sitemap: https://mivplatform.com/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1
\`\`\`

### **Security Considerations for Robots.txt**
- ✅ **Sensitive API endpoints**: Blocked via \`/api/\` disallow
- ✅ **Admin areas**: Protected via \`/admin/\` and \`/dashboard/\` disallow
- ✅ **Authentication**: Secured via \`/auth/\` disallow
- ✅ **Internal documentation**: Restricted via \`/docs/internal/\` disallow
- ✅ **Development environments**: Blocked via \`/staging/\`, \`/dev/\`, \`/test/\` disallow
- ✅ **Configuration files**: Protected via file type and \`/config/\` disallow
- ✅ **Public content**: Explicitly allowed for SEO optimization
`

const apiContent = `# API Reference Documentation

## 🔌 **API Overview**

The MIV Platform provides a comprehensive REST API for managing venture pipeline data, GEDSI metrics, and AI-powered analysis.

## 🚀 **Authentication**

### **Bearer Token Authentication**
\`\`\`bash
curl -H "Authorization: Bearer YOUR_TOKEN" \\
     https://api.mivplatform.com/v1/ventures
\`\`\`

### **API Key Authentication**
\`\`\`bash
curl -H "X-API-Key: YOUR_API_KEY" \\
     https://api.mivplatform.com/v1/ventures
\`\`\`

## 📊 **Ventures API**

### **Get All Ventures**
\`\`\`http
GET /api/v1/ventures
\`\`\`

**Response:**
\`\`\`json
{
  "ventures": [
    {
      "id": "venture_123",
      "name": "EcoTech Solutions",
      "description": "Sustainable technology solutions",
      "stage": "Series A",
      "funding": 5000000,
      "gedsiMetrics": {
        "genderEquality": 0.85,
        "socialInclusion": 0.92,
        "environmentalImpact": 0.78
      },
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-20T14:45:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
\`\`\`

### **Create New Venture**
\`\`\`http
POST /api/v1/ventures
Content-Type: application/json

{
  "name": "New Venture",
  "description": "Venture description",
  "stage": "Seed",
  "funding": 1000000,
  "gedsiMetrics": {
    "genderEquality": 0.75,
    "socialInclusion": 0.80,
    "environmentalImpact": 0.85
  }
}
\`\`\`

## 🤖 **AI Analysis API**

### **Analyze Venture**
\`\`\`http
POST /api/v1/ai/analyze-venture
Content-Type: application/json

{
  "ventureId": "venture_123",
  "analysisType": "comprehensive",
  "includeGedsi": true,
  "includeRecommendations": true
}
\`\`\`

**Response:**
\`\`\`json
{
  "analysis": {
    "ventureId": "venture_123",
    "overallScore": 8.5,
    "riskAssessment": "Low",
    "recommendations": [
      "Consider expanding to underserved markets",
      "Enhance gender diversity in leadership",
      "Implement stronger environmental policies"
    ],
    "gedsiInsights": {
      "strengths": ["Strong social inclusion metrics"],
      "areas": ["Gender equality could be improved"],
      "opportunities": ["Market expansion potential"]
    },
    "generatedAt": "2024-01-20T15:00:00Z"
  }
}
\`\`\`

## 📈 **GEDSI Metrics API**

### **Get GEDSI Metrics**
\`\`\`http
GET /api/v1/gedsi/metrics?ventureId=venture_123
\`\`\`

### **Update GEDSI Metrics**
\`\`\`http
PUT /api/v1/gedsi/metrics/venture_123
Content-Type: application/json

{
  "genderEquality": 0.90,
  "socialInclusion": 0.85,
  "environmentalImpact": 0.88,
  "disabilityInclusion": 0.75
}
\`\`\`

## 🔍 **Search API**

### **Search Ventures**
\`\`\`http
GET /api/v1/search/ventures?q=sustainable&stage=Series+A&minFunding=1000000
\`\`\`

### **Advanced Search**
\`\`\`http
POST /api/v1/search/advanced
Content-Type: application/json

{
  "query": "sustainable technology",
  "filters": {
    "stage": ["Seed", "Series A"],
    "minFunding": 1000000,
    "maxFunding": 10000000,
    "gedsiScore": {
      "min": 0.7,
      "max": 1.0
    }
  },
  "sort": {
    "field": "gedsiScore",
    "order": "desc"
  }
}
\`\`\`

## 📊 **Analytics API**

### **Get Dashboard Analytics**
\`\`\`http
GET /api/v1/analytics/dashboard
\`\`\`

### **Export Data**
\`\`\`http
GET /api/v1/analytics/export?format=csv&dateRange=last30days
\`\`\`

## 🚨 **Error Handling**

### **Standard Error Response**
\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid venture data provided",
    "details": [
      {
        "field": "name",
        "message": "Venture name is required"
      }
    ],
    "timestamp": "2024-01-20T15:30:00Z",
    "requestId": "req_123456789"
  }
}
\`\`\`

### **HTTP Status Codes**
- \`200\` - Success
- \`201\` - Created
- \`400\` - Bad Request
- \`401\` - Unauthorized
- \`403\` - Forbidden
- \`404\` - Not Found
- \`422\` - Validation Error
- \`429\` - Rate Limited
- \`500\` - Internal Server Error

## 📝 **Rate Limiting**

- **Standard Plan**: 1000 requests/hour
- **Professional Plan**: 10000 requests/hour
- **Enterprise Plan**: 100000 requests/hour

Rate limit headers:
\`\`\`http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642683600
\`\`\`

## 🔗 **SDKs and Libraries**

### **JavaScript/TypeScript**
\`\`\`bash
npm install @mivplatform/sdk
\`\`\`

\`\`\`typescript
import { MIVClient } from '@mivplatform/sdk'

const client = new MIVClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.mivplatform.com'
})

const ventures = await client.ventures.list()
const analysis = await client.ai.analyzeVenture('venture_123')
\`\`\`

### **Python**
\`\`\`bash
pip install mivplatform-sdk
\`\`\`

\`\`\`python
from mivplatform import MIVClient

client = MIVClient(api_key='your-api-key')
ventures = client.ventures.list()
analysis = client.ai.analyze_venture('venture_123')
\`\`\`

## 📚 **Additional Resources**

- [API Changelog](./api-changelog.md)
- [SDK Documentation](./sdk-docs.md)
- [Webhook Guide](./webhooks.md)
- [Rate Limiting Guide](./rate-limiting.md)
`

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState('tech-stack')

  const getContent = () => {
    switch (activeTab) {
      case 'tech-stack':
        return techStackContent
      case 'security':
        return securityContent
      case 'api':
        return apiContent
      default:
        return techStackContent
    }
  }

  const getTitle = () => {
    switch (activeTab) {
      case 'tech-stack':
        return 'Tech Stack Documentation'
      case 'security':
        return 'Security & Privacy Checklist'
      case 'api':
        return 'API Reference Documentation'
      default:
        return 'Documentation'
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          MIV Platform Documentation
        </h1>
        <p className="text-muted-foreground">
          Comprehensive documentation with GitHub-like markdown rendering
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tech-stack" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Tech Stack
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            API Reference
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <MarkdownReader 
            content={getContent()}
            title={getTitle()}
            showToc={true}
            className="min-h-screen"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
} 