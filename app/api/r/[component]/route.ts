import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ component: string }> }
) {
  try {
    const resolvedParams = await params
    const componentName = resolvedParams.component.replace('.json', '')
    
    // Read the component JSON file directly from public/r/
    const jsonFilePath = path.join(process.cwd(), 'public', 'r', `${componentName}.json`)
    
    let componentData
    try {
      const jsonContent = await fs.readFile(jsonFilePath, 'utf-8')
      componentData = JSON.parse(jsonContent)
    } catch (error) {
      return NextResponse.json(
        { error: 'Component not found' },
        { status: 404 }
      )
    }

    // The JSON files already contain the component data in the correct format
    // Just add some additional metadata that v0 expects
    const response = {
      ...componentData,
      registryDependencies: componentData.registryDependencies || [],
      cssVars: componentData.cssVars || {},
      meta: {
        description: `${componentData.name} component from ribbon-gd`,
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