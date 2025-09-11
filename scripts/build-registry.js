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
      const filePath = path.join(process.cwd(), file.path);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      const isPage = item.type === "page";
      const targetPath = isPage ? `app/${item.name}/page.tsx` : undefined;

      return {
        path: file.path,
        content: content,
        type: isPage ? "registry:page" : "registry:component",
        target: targetPath
      };
    });

    // Map our custom types to official shadcn types
    const typeMapping = {
      "ui": "registry:ui",
      "page": "registry:block",
      "component": "registry:component",
      "lib": "registry:lib",
      "hook": "registry:hook"
    };

    const officialType = typeMapping[item.type] || item.type;

    // Create the component JSON (v0 compatible format)
    // v0 doesn't support cssVars, css, or envVars
    const componentData = {
      "$schema": "https://ui.shadcn.com/schema/registry-item.json",
      name: item.name,
      type: officialType,
      title: item.title || item.name.charAt(0).toUpperCase() + item.name.slice(1),
      description: item.description || `${item.name} component from ${registry.name}`,
      dependencies: item.dependencies || [],
      devDependencies: item.devDependencies || [],
      registryDependencies: item.registryDependencies || [],
      files: files,
      tailwind: registry.tailwind || {
        config: {}
      },
      meta: {
        description: item.description || `${item.name} component from ${registry.name}`,
        source: `https://ribbon-gd.vercel.app/r/${item.name}.json`
      }
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