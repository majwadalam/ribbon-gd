"use client"

import { ExternalLink, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface V0ButtonProps {
  prompt?: string
  code?: string
  className?: string
}

export function V0Button({ 
  prompt = "Edit this template in v0", 
  code = "",
  className 
}: V0ButtonProps) {
  const handleV0Click = () => {
    let fullPrompt = prompt
    
    if (code) {
      fullPrompt = `${prompt}\n\nHere's the current code:\n\`\`\`tsx\n${code}\n\`\`\``
    }
    
    const v0Url = `https://v0.dev/chat?q=${encodeURIComponent(fullPrompt)}`
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
          >
            <Code className="h-4 w-4" />
            <span className="hidden sm:inline">Edit in v0</span>
            <ExternalLink className="h-3 w-3" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Open this template in v0 for editing</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}