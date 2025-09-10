#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the registry configuration
const registryPath = path.join(process.cwd(), 'registry.json');

if (!fs.existsSync(registryPath)) {
  console.error('Error: registry.json not found at:', registryPath);
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

// Create public/r directory if it doesn't exist
const publicDir = path.join(process.cwd(), 'public');
const registryDir = path.join(publicDir, 'r');

// Create directories recursively
if (!fs.existsSync(registryDir)) {
  fs.mkdirSync(registryDir, { recursive: true });
  console.log('Created directory:', registryDir);
}

// Process each component in the registry
registry.items.forEach(item => {
  try {
    // Read the actual file contents
    const files = item.files.map(file => {
      const filePath = path.join(process.cwd(), file.content);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      return {
        name: file.name,
        content: content
      };
    });

    // Create the component JSON (v0 compatible format)
    const componentData = {
      "$schema": "https://ui.shadcn.com/schema/registry-item.json",
      name: item.name,
      type: item.type === "page" ? "registry:block" : "registry:ui",
      description: `${item.name} component from ${registry.name}`,
      registryDependencies: item.registryDependencies || [],
      files: files.map(file => ({
        path: file.name,
        content: file.content,
        type: item.type === "page" ? "registry:page" : "registry:component",
        target: item.type === "page" ? `app/${item.name}/page.tsx` : `components/ui/${file.name}`
      })),
      dependencies: item.dependencies || [],
      devDependencies: item.devDependencies || [],
      tailwind: {
        config: registry.tailwind?.config || {}
      },
      cssVars: {
        light: {},
        dark: {}
      }
    };
    
    // Add categories based on type
    if (item.type === "page") {
      componentData.categories = ["pages"];
    } else {
      componentData.categories = ["components"];
    }

    // Write the component JSON file
    const outputPath = path.join(registryDir, `${item.name}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(componentData, null, 2));
    
    console.log(`✓ Generated ${item.name}.json`);
  } catch (error) {
    console.error(`✗ Error processing ${item.name}:`, error.message);
  }
});

// Create an index file with all components
const indexData = {
  name: registry.name,
  description: registry.description,
  version: registry.version,
  components: registry.items.map(item => ({
    name: item.name,
    type: item.type,
    url: `/r/${item.name}.json`
  }))
};

fs.writeFileSync(
  path.join(registryDir, 'index.json'),
  JSON.stringify(indexData, null, 2)
);

console.log('\n✓ Registry build complete!');
console.log(`Generated ${registry.items.length} component files in public/r/`);