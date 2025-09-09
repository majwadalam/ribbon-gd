import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import registry from '@/registry.json'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ component: string }> }
) {
  try {
    const resolvedParams = await params
    const componentName = resolvedParams.component.replace('.json', '')
    
    // Find the component in the registry
    const component = registry.items.find(item => item.name === componentName)
    
    if (!component) {
      return NextResponse.json(
        { error: 'Component not found' },
        { status: 404 }
      )
    }

    // Read the actual file contents
    const files = await Promise.all(
      component.files.map(async (file) => {
        const filePath = path.join(process.cwd(), file.content)
        const content = await fs.readFile(filePath, 'utf-8')
        
        return {
          name: file.name,
          content: content
        }
      })
    )

    // Prepare the response in the format v0 expects
    const response = {
      name: component.name,
      type: component.type,
      files: files,
      dependencies: component.dependencies || [],
      devDependencies: component.devDependencies || [],
      registryDependencies: [],
      tailwind: {
        config: registry.tailwind?.config || {}
      },
      cssVars: {},
      meta: {
        description: `${component.name} component from ${registry.name}`,
        source: request.url
      }
    }

    // Set CORS headers to allow v0.dev to access the endpoint
    const headers = {
      'Access-Control-Allow-Origin': 'https://v0.dev',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    }

    return NextResponse.json(response, { headers })
  } catch (error) {
    console.error('Error serving component:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function OPTIONS(request: NextRequest) {
  // Handle preflight requests
  const headers = {
    'Access-Control-Allow-Origin': 'https://v0.dev',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
  
  return new Response(null, { status: 200, headers })
}