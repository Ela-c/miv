"use client"

import React, { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { 
  ChevronDown, 
  ChevronRight, 
  ExternalLink, 
  Copy, 
  Check,
  FileText,
  Hash,
  Link
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface MarkdownReaderProps {
  content: string
  title?: string
  showToc?: boolean
  className?: string
  maxHeight?: string
}

interface TocItem {
  id: string
  text: string
  level: number
  children?: TocItem[]
}

export function MarkdownReader({ 
  content, 
  title, 
  showToc = true, 
  className,
  maxHeight = "calc(100vh - 200px)"
}: MarkdownReaderProps) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeHeading, setActiveHeading] = useState<string>('')
  const [copiedCode, setCopiedCode] = useState<string>('')

  // Parse markdown content and extract headings for TOC
  useEffect(() => {
    const headings = content
      .split('\n')
      .filter(line => line.startsWith('#'))
      .map(line => {
        const level = line.match(/^#+/)?.[0].length || 1
        const text = line.replace(/^#+\s*/, '').trim()
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        return { id, text, level }
      })
    
    setToc(buildTocTree(headings))
  }, [content])

  // Build hierarchical TOC structure
  const buildTocTree = (headings: TocItem[]): TocItem[] => {
    const tree: TocItem[] = []
    const stack: TocItem[] = []

    headings.forEach(heading => {
      const item = { ...heading, children: [] }
      
      while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
        stack.pop()
      }
      
      if (stack.length === 0) {
        tree.push(item)
      } else {
        stack[stack.length - 1].children?.push(item)
      }
      
      stack.push(item)
    })

    return tree
  }

  // Intersection observer for active heading detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -80% 0px' }
    )

    toc.forEach(item => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [toc])

  // Copy code to clipboard
  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(code)
      setTimeout(() => setCopiedCode(''), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  // Render TOC items recursively
  const renderTocItem = (item: TocItem, depth = 0) => {
    const isActive = activeHeading === item.id
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.id} style={{ marginLeft: `${depth * 16}px` }}>
        <button
          onClick={() => {
            const element = document.getElementById(item.id)
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          }}
          className={cn(
            "flex items-center gap-2 w-full text-left py-1 px-2 rounded text-sm transition-colors",
            isActive 
              ? "bg-primary/10 text-primary font-medium" 
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          {hasChildren ? (
            <ChevronRight className="h-3 w-3 flex-shrink-0" />
          ) : (
            <Hash className="h-3 w-3 flex-shrink-0" />
          )}
          <span className="truncate">{item.text}</span>
        </button>
        {hasChildren && (
          <div className="mt-1">
            {item.children?.map(child => renderTocItem(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  // Custom markdown renderer
  const renderMarkdown = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // Headings
        if (line.startsWith('#')) {
          const level = line.match(/^#+/)?.[0].length || 1
          const text = line.replace(/^#+\s*/, '').trim()
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
          const Tag = `h${level}` as keyof JSX.IntrinsicElements
          
          return (
            <Tag 
              key={index} 
              id={id}
              className={cn(
                "scroll-mt-20 font-semibold tracking-tight",
                level === 1 && "text-3xl mb-6",
                level === 2 && "text-2xl mb-4 mt-8",
                level === 3 && "text-xl mb-3 mt-6",
                level === 4 && "text-lg mb-2 mt-4",
                level === 5 && "text-base mb-2 mt-3",
                level === 6 && "text-sm mb-1 mt-2"
              )}
            >
              {text}
            </Tag>
          )
        }

        // Code blocks
        if (line.startsWith('```')) {
          const language = line.replace('```', '').trim()
          const codeStart = index + 1
          const codeEnd = content.split('\n').findIndex((l, i) => i > index && l.startsWith('```'))
          const code = content.split('\n').slice(codeStart, codeEnd).join('\n')
          
          return (
            <div key={index} className="my-4">
              <div className="flex items-center justify-between bg-muted px-4 py-2 rounded-t-lg border">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">{language || 'text'}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(code)}
                  className="h-6 px-2"
                >
                  {copiedCode === code ? (
                    <Check className="h-3 w-3 text-green-600" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
              <SyntaxHighlighter
                language={language || 'text'}
                style={tomorrow}
                customStyle={{
                  margin: 0,
                  borderRadius: '0 0 0.5rem 0.5rem',
                  fontSize: '0.875rem'
                }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          )
        }

        // Inline code
        if (line.includes('`')) {
          const parts = line.split('`')
          return (
            <p key={index} className="mb-4">
              {parts.map((part, partIndex) => 
                partIndex % 2 === 1 ? (
                  <code key={partIndex} className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                    {part}
                  </code>
                ) : (
                  <span key={partIndex}>{part}</span>
                )
              )}
            </p>
          )
        }

        // Links
        if (line.includes('[') && line.includes('](') && line.includes(')')) {
          const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
          const parts = line.split(linkRegex)
          return (
            <p key={index} className="mb-4">
              {parts.map((part, partIndex) => {
                if (partIndex % 3 === 1) {
                  const text = part
                  const url = parts[partIndex + 1]
                  return (
                    <a
                      key={partIndex}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      {text}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )
                } else if (partIndex % 3 === 2) {
                  return null
                } else {
                  return <span key={partIndex}>{part}</span>
                }
              })}
            </p>
          )
        }

        // Lists
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return (
            <li key={index} className="ml-4 mb-1">
              {line.replace(/^[-*]\s*/, '')}
            </li>
          )
        }

        // Numbered lists
        if (/^\d+\.\s/.test(line)) {
          return (
            <li key={index} className="ml-4 mb-1">
              {line.replace(/^\d+\.\s*/, '')}
            </li>
          )
        }

        // Tables
        if (line.includes('|')) {
          const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell)
          return (
            <tr key={index}>
              {cells.map((cell, cellIndex) => (
                <td key={cellIndex} className="border px-3 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          )
        }

        // Blockquotes
        if (line.startsWith('> ')) {
          return (
            <blockquote key={index} className="border-l-4 border-primary/20 pl-4 py-2 my-4 bg-muted/30 italic">
              {line.replace(/^>\s*/, '')}
            </blockquote>
          )
        }

        // Horizontal rules
        if (line.match(/^[-*_]{3,}$/)) {
          return <Separator key={index} className="my-6" />
        }

        // Empty lines
        if (line.trim() === '') {
          return <br key={index} />
        }

        // Regular paragraphs
        return (
          <p key={index} className="mb-4 leading-relaxed">
            {line}
          </p>
        )
      })
  }

  return (
    <div className={cn("flex gap-6", className)}>
      {/* Table of Contents */}
      {showToc && toc.length > 0 && (
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-4">
            <div className="bg-card border rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Table of Contents
              </h3>
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="space-y-1">
                  {toc.map(item => renderTocItem(item))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        <ScrollArea className="h-[calc(100vh-200px)]" style={{ maxHeight }}>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {title && (
              <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="secondary">Markdown</Badge>
                  <span>•</span>
                  <span>{content.split('\n').length} lines</span>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              {renderMarkdown(content)}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
} 