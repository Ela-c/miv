"use client"

import { MarkdownReader } from '@/components/markdown-reader'

const sampleMarkdown = `# MIV Platform - Markdown Reader Demo

## 🚀 Features

This markdown reader provides GitHub-like functionality with:

### Syntax Highlighting
\`\`\`typescript
interface Venture {
  id: string
  name: string
  description: string
  gedsiMetrics: GedsiMetrics
  impactScore: number
}

const analyzeVenture = async (venture: Venture) => {
  const analysis = await aiService.analyze(venture)
  return analysis
}
\`\`\`

### Interactive Table of Contents
- Automatically generated from headings
- Smooth scrolling navigation
- Active section highlighting
- Hierarchical structure support

### Code Copy Functionality
\`\`\`bash
# Install dependencies
npm install react-syntax-highlighter

# Start development server
npm run dev

# Build for production
npm run build
\`\`\`

## 📊 Data Visualization

| Feature | Status | Priority |
|---------|--------|----------|
| Syntax Highlighting | ✅ Complete | High |
| Table of Contents | ✅ Complete | High |
| Code Copy | ✅ Complete | Medium |
| Link Handling | ✅ Complete | Medium |
| Responsive Design | ✅ Complete | High |

## 🔗 External Links

- [MIV Platform Documentation](./docs/)
- [GitHub Repository](https://github.com/Aero-red/miv)
- [Tech Stack Analysis](./docs/TECH_STACK_MARKET_COMPARISON.md)

## 📝 Lists and Formatting

### Unordered Lists
- Feature 1: Syntax highlighting with multiple languages
- Feature 2: Interactive table of contents
- Feature 3: Code copy to clipboard
- Feature 4: Responsive design

### Ordered Lists
1. First step: Install dependencies
2. Second step: Configure the component
3. Third step: Add your markdown content
4. Fourth step: Customize styling

## 💡 Blockquotes

> This is a blockquote example. It's great for highlighting important information or quotes from stakeholders.

> **Pro tip**: Use blockquotes to emphasize key points in your documentation.

## 🔧 Inline Code

You can use \`inline code\` for technical terms or short code snippets. For example, the \`MarkdownReader\` component accepts a \`content\` prop.

## 🎨 Styling Features

### Headings Hierarchy
The component supports all heading levels (H1-H6) with proper styling and spacing.

#### H4 Heading
##### H5 Heading
###### H6 Heading

## 📱 Responsive Design

The markdown reader is fully responsive and works great on:
- Desktop computers
- Tablets
- Mobile devices

## 🔄 Dynamic Content

The component automatically:
- Generates table of contents from headings
- Highlights active sections during scroll
- Provides smooth navigation
- Maintains proper spacing and typography

---

## 🏆 Conclusion

This markdown reader provides a professional, GitHub-like experience for viewing documentation and technical content within the MIV Platform.

### Key Benefits
- **Professional Appearance**: Clean, modern design
- **Easy Navigation**: Interactive table of contents
- **Code Support**: Syntax highlighting and copy functionality
- **Responsive**: Works on all devices
- **Accessible**: Proper semantic HTML and keyboard navigation

> **Ready to use**: Simply import the \`MarkdownReader\` component and pass your markdown content!
`

export default function MarkdownDemoPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Markdown Reader Demo
        </h1>
        <p className="text-muted-foreground">
          Experience GitHub-like markdown rendering with interactive features
        </p>
      </div>
      
      <MarkdownReader 
        content={sampleMarkdown}
        title="MIV Platform Documentation"
        showToc={true}
        className="min-h-screen"
      />
    </div>
  )
} 