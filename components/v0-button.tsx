"use client"

import { ExternalLink, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface V0ButtonProps {
  prompt?: string
  componentName?: string
  className?: string
}

export function V0Button({ prompt, componentName, className }: V0ButtonProps) {
  const handleV0Click = () => {
    let v0Url: string
    
    if (componentName) {
      // Use the registry endpoint for component-specific opening
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
      const registryUrl = `${baseUrl}/api/r/${componentName}.json`
      v0Url = `https://v0.dev/chat/api/open?url=${encodeURIComponent(registryUrl)}`
    } else if (prompt) {
      // Fall back to simple prompt-based chat
      v0Url = `https://v0.dev/chat?q=${encodeURIComponent(prompt)}`
    } else {
      // Default prompt if nothing provided
      v0Url = `https://v0.dev/chat?q=${encodeURIComponent("Edit this component")}`
    }
    
    window.open(v0Url, '_blank', 'noopener,noreferrer')
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={handleV0Click}
            className={`flex items-center gap-2 ${className}`}
            aria-label="Open in v0"
          >
            <Code className="h-4 w-4" />
            <span className="hidden sm:inline">Open in v0</span>
            <ExternalLink className="h-3 w-3" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Open {componentName ? 'this component' : 'this template'} in v0 for AI-powered editing</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}