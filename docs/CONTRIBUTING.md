# Contributing to MIV Platform

<div align="center">

![Contributing](https://img.shields.io/badge/Contributing-Guidelines-blue?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)
![Code of Conduct](https://img.shields.io/badge/Code%20of-Conduct-red?style=for-the-badge)

**Join us in building the future of impact investing**

</div>

---

## 📋 Table of Contents

- [How to Contribute](#how-to-contribute)
- [Bug Reporting](#bug-reporting)
- [Feature Suggestions](#feature-suggestions)
- [Development Setup](#development-setup)
- [Code Standards](#code-standards)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Project Structure](#project-structure)
- [Code Review Process](#code-review-process)
- [Community Guidelines](#community-guidelines)
- [Getting Help](#getting-help)

---

## 🤝 How to Contribute

### Types of Contributions

We welcome contributions of all kinds:

- **🐛 Bug Reports**: Help us identify and fix issues
- **✨ Feature Requests**: Suggest new features and improvements
- **📝 Documentation**: Improve our documentation
- **🧪 Tests**: Add or improve test coverage
- **🔧 Code**: Submit bug fixes and new features
- **🎨 Design**: Improve UI/UX and design

### Before You Start

1. **Check Existing Issues**: Search for existing issues before creating new ones
2. **Read Documentation**: Familiarize yourself with our [documentation](./)
3. **Join Community**: Join our [Discord](https://discord.gg/miv-platform) for discussions
4. **Set Up Environment**: Follow our [development setup guide](./DEVELOPMENT_SETUP.md)

---

## 🐛 Bug Reporting

### Bug Report Template

```markdown
## Bug Description
A clear and concise description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
A clear description of what you expected to happen.

## Actual Behavior
A clear description of what actually happened.

## Environment
- **OS**: [e.g. macOS, Windows, Linux]
- **Browser**: [e.g. Chrome, Firefox, Safari]
- **Version**: [e.g. 22]

## Additional Context
Add any other context about the problem here.
```

---

## ✨ Feature Suggestions

### Feature Request Template

```markdown
## Feature Description
A clear and concise description of the feature you'd like to see.

## Problem Statement
A clear description of the problem this feature would solve.

## Proposed Solution
A clear description of how you envision this feature working.

## Use Cases
Describe specific scenarios where this feature would be useful.

## Additional Context
Add any other context about the feature request.
```

---

## 🔧 Development Setup

### Quick Setup

```bash
# Clone the repository
git clone https://github.com/your-org/miv-platform.git
cd miv-platform

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your configuration

# Set up database
npm run db:setup

# Start development server
npm run dev
```

### Development Workflow

1. **Create Branch**: Create a feature branch from `main`
2. **Make Changes**: Implement your changes
3. **Test**: Run tests and ensure everything works
4. **Commit**: Follow our commit message format
5. **Push**: Push your branch to GitHub
6. **Create PR**: Create a pull request with detailed description

---

## 📝 Code Standards

### General Standards

- **Clean Code**: Write readable, maintainable code
- **Documentation**: Document complex logic and APIs
- **Error Handling**: Implement proper error handling
- **Performance**: Consider performance implications
- **Security**: Follow security best practices

### TypeScript Standards

```typescript
// Use strict TypeScript
interface Venture {
  id: string
  name: string
  description?: string
  stage: VentureStage
  createdAt: Date
  updatedAt: Date
}

enum VentureStage {
  SCREENING = 'screening',
  DUE_DILIGENCE = 'due_diligence',
  INVESTMENT_COMMITTEE = 'investment_committee',
  NEGOTIATION = 'negotiation',
  CLOSING = 'closing',
  PORTFOLIO = 'portfolio'
}

// Use proper typing
const getVentureById = async (id: string): Promise<Venture | null> => {
  try {
    const venture = await prisma.venture.findUnique({
      where: { id }
    })
    return venture
  } catch (error) {
    console.error('Error fetching venture:', error)
    return null
  }
}
```

### React Standards

```typescript
// Use functional components with hooks
import React, { useState } from 'react'
import { Venture } from '@/types/venture'

interface VentureCardProps {
  venture: Venture
  onEdit?: (venture: Venture) => void
  onDelete?: (id: string) => void
}

export const VentureCard: React.FC<VentureCardProps> = ({
  venture,
  onEdit,
  onDelete
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleEdit = async () => {
    if (onEdit) {
      setIsLoading(true)
      try {
        await onEdit(venture)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">{venture.name}</h3>
      <p className="text-gray-600">{venture.description}</p>
      <div className="mt-4 flex gap-2">
        {onEdit && (
          <button
            onClick={handleEdit}
            disabled={isLoading}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            {isLoading ? 'Editing...' : 'Edit'}
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(venture.id)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  )
}
```

### API Standards

```typescript
// Use consistent API response format
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
  meta?: {
    timestamp: string
    requestId: string
    version: string
  }
}

// Example API route
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const createVentureSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  stage: z.enum(['screening', 'due_diligence', 'investment_committee']),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createVentureSchema.parse(body)

    const venture = await prisma.venture.create({
      data: validatedData
    })

    return NextResponse.json({
      success: true,
      data: venture,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: request.headers.get('x-request-id') || 'unknown',
        version: '2.0'
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details: error.errors
        }
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error'
      }
    }, { status: 500 })
  }
}
```

---

## 🔄 Pull Request Process

### Before Submitting

1. **Test Your Changes**: Ensure all tests pass
2. **Update Documentation**: Update relevant documentation
3. **Check Code Style**: Run linter and formatter
4. **Self-Review**: Review your own code before submitting

### Pull Request Template

```markdown
## Description
A clear and concise description of the changes.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring (no functional changes)

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Screenshots added (if applicable)

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
```

### Commit Message Format

```bash
# Format: type(scope): description
feat(ventures): add venture creation form
fix(auth): resolve login authentication issue
docs(api): update API documentation
test(analytics): add unit tests for analytics module
```

---

## 🧪 Testing Guidelines

### Test Structure

```typescript
// __tests__/components/VentureCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { VentureCard } from '@/components/VentureCard'

describe('VentureCard', () => {
  const mockVenture = {
    id: 'ven_123',
    name: 'EcoTech Solutions',
    description: 'Sustainable technology solutions',
    stage: 'due_diligence' as const,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  it('renders venture information correctly', () => {
    render(<VentureCard venture={mockVenture} />)
    
    expect(screen.getByText('EcoTech Solutions')).toBeInTheDocument()
    expect(screen.getByText('Sustainable technology solutions')).toBeInTheDocument()
    expect(screen.getByText('Due Diligence')).toBeInTheDocument()
  })

  it('calls onEdit when edit button is clicked', () => {
    const mockOnEdit = jest.fn()
    render(<VentureCard venture={mockVenture} onEdit={mockOnEdit} />)
    
    fireEvent.click(screen.getByText('Edit'))
    expect(mockOnEdit).toHaveBeenCalledWith(mockVenture)
  })
})
```

### Testing Standards

- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test API endpoints and data flow
- **Coverage**: Aim for 80%+ test coverage
- **Mocking**: Mock external dependencies
- **Assertions**: Use descriptive assertions

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

---

## 📚 Documentation

### Documentation Standards

- **Clear and Concise**: Write clear, easy-to-understand documentation
- **Examples**: Include practical examples
- **Code Snippets**: Add relevant code snippets
- **Keep Updated**: Maintain documentation with code changes

### Code Documentation

```typescript
/**
 * Calculates the GEDSI score for a venture based on various metrics.
 * 
 * @param metrics - The GEDSI metrics object
 * @param metrics.gender_diversity - Gender diversity score (0-100)
 * @param metrics.disability_inclusion - Disability inclusion score (0-100)
 * @param metrics.social_inclusion - Social inclusion score (0-100)
 * @returns The calculated GEDSI score (0-100)
 * 
 * @example
 * ```typescript
 * const score = calculateGEDSIScore({
 *   gender_diversity: 75,
 *   disability_inclusion: 60,
 *   social_inclusion: 80
 * })
 * console.log(score) // 72
 * ```
 */
export function calculateGEDSIScore(metrics: {
  gender_diversity: number
  disability_inclusion: number
  social_inclusion: number
}): number {
  const weights = {
    gender_diversity: 0.4,
    disability_inclusion: 0.3,
    social_inclusion: 0.3
  }

  return (
    metrics.gender_diversity * weights.gender_diversity +
    metrics.disability_inclusion * weights.disability_inclusion +
    metrics.social_inclusion * weights.social_inclusion
  )
}
```

---

## 📁 Project Structure

### Directory Structure

```
miv-platform/
├── app/                         # Next.js app directory
│   ├── api/                     # API routes
│   ├── auth/                    # Authentication pages
│   ├── dashboard/               # Dashboard pages
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                  # React components
│   ├── ui/                      # UI components
│   ├── forms/                   # Form components
│   ├── charts/                  # Chart components
│   └── layout/                  # Layout components
├── lib/                         # Utility libraries
│   ├── prisma.ts                # Prisma client
│   ├── auth.ts                  # Authentication
│   ├── utils.ts                 # Utility functions
│   └── ai-services.ts           # AI services
├── types/                       # TypeScript types
├── prisma/                      # Database schema
├── public/                      # Static assets
├── docs/                        # Documentation
├── __tests__/                   # Test files
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── tailwind.config.ts           # Tailwind config
└── README.md                    # Project README
```

### Naming Conventions

```typescript
// Components: PascalCase
VentureCard.tsx
UserProfile.tsx
DashboardLayout.tsx

// Utilities: camelCase
formatCurrency.ts
calculateGEDSIScore.ts
apiClient.ts

// Constants: UPPER_SNAKE_CASE
API_ENDPOINTS.ts
ERROR_CODES.ts
CONFIG.ts

// Types: PascalCase
Venture.ts
User.ts
ApiResponse.ts

// Variables: camelCase
const ventureName = 'EcoTech Solutions'
const userEmail = 'user@example.com'

// Functions: camelCase
const calculateGEDSIScore = (metrics: GEDSIMetrics) => { /* ... */ }
const formatCurrency = (amount: number, currency: string) => { /* ... */ }
```

---

## 👥 Code Review Process

### Review Guidelines

#### **For Reviewers**

- **Be Constructive**: Provide helpful, actionable feedback
- **Be Specific**: Point out specific issues and suggest solutions
- **Be Respectful**: Maintain a positive and professional tone
- **Check Functionality**: Ensure the code works as intended
- **Check Security**: Look for security vulnerabilities
- **Check Performance**: Consider performance implications

#### **Review Checklist**

- [ ] **Code Quality**: Is the code clean and readable?
- [ ] **Functionality**: Does the code work as intended?
- [ ] **Testing**: Are there adequate tests?
- [ ] **Documentation**: Is the code well-documented?
- [ ] **Security**: Are there any security concerns?
- [ ] **Performance**: Are there performance issues?
- [ ] **Standards**: Does the code follow project standards?

### Review Process

1. **Initial Review**: Reviewer provides initial feedback
2. **Author Response**: Author addresses feedback
3. **Follow-up Review**: Reviewer checks changes
4. **Approval**: Reviewer approves the PR
5. **Merge**: PR is merged to main branch

---

## 🤝 Community Guidelines

### Code of Conduct

We are committed to providing a welcoming and inspiring community for all. We expect all contributors to:

- **Be Respectful**: Treat everyone with respect and dignity
- **Be Inclusive**: Welcome people from all backgrounds
- **Be Collaborative**: Work together to achieve common goals
- **Be Professional**: Maintain professional behavior
- **Be Helpful**: Help others learn and grow

### Communication Channels

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For general discussions and questions
- **Discord**: For real-time chat and community discussions
- **Email**: For private or sensitive matters

### Community Standards

- Use inclusive and welcoming language
- Provide constructive and helpful feedback
- Focus on the code, not the person
- Work together to solve problems
- Share knowledge and resources
- Help others learn and grow

---

## 🆘 Getting Help

### Support Channels

#### **Documentation**

- **[Development Setup](./DEVELOPMENT_SETUP.md)**: Complete setup guide
- **[API Reference](./API_REFERENCE.md)**: API documentation
- **[User Manual](./USER_MANUAL.md)**: User guide
- **[Platform Overview](./MIV_PLATFORM_OVERVIEW.md)**: Platform overview

#### **Community Support**

- **GitHub Issues**: [Create an issue](https://github.com/your-org/miv-platform/issues)
- **GitHub Discussions**: [Start a discussion](https://github.com/your-org/miv-platform/discussions)
- **Discord**: [Join our community](https://discord.gg/miv-platform)
- **Stack Overflow**: [Ask questions](https://stackoverflow.com/questions/tagged/miv-platform)

#### **Direct Support**

- **Email**: dev-support@miv-platform.com
- **Slack**: [miv-platform.slack.com](https://miv-platform.slack.com)
- **Documentation**: [docs.miv-platform.com](https://docs.miv-platform.com)

### Common Questions

#### **How do I get started?**

1. Read the [Development Setup](./DEVELOPMENT_SETUP.md) guide
2. Set up your development environment
3. Join our [Discord community](https://discord.gg/miv-platform)
4. Look for issues labeled "good first issue" or "help wanted"

#### **How do I find something to work on?**

- Check the [Issues page](https://github.com/your-org/miv-platform/issues)
- Look for issues labeled "good first issue"
- Join discussions in [GitHub Discussions](https://github.com/your-org/miv-platform/discussions)
- Ask in our [Discord community](https://discord.gg/miv-platform)

#### **What if I have a question?**

- Check our [documentation](./) first
- Search existing [issues](https://github.com/your-org/miv-platform/issues) and [discussions](https://github.com/your-org/miv-platform/discussions)
- Ask in our [Discord community](https://discord.gg/miv-platform)
- Create a [GitHub discussion](https://github.com/your-org/miv-platform/discussions)

---

<div align="center">

**🚀 Thank you for contributing to the future of impact investing!**

[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://miv-platform.com)
[![Community](https://img.shields.io/badge/Community-Driven-orange?style=for-the-badge)](https://discord.gg/miv-platform)

</div> 