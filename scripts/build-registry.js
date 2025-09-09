#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the registry configuration
const registryPath = path.join(process.cwd(), 'registry.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

// Create public/r directory if it doesn't exist
const publicDir = path.join(process.cwd(), 'public');
const registryDir = path.join(publicDir, 'r');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

if (!fs.existsSync(registryDir)) {
  fs.mkdirSync(registryDir);
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

    // Create the component JSON
    const componentData = {
      name: item.name,
      type: item.type,
      files: files,
      dependencies: item.dependencies || [],
      devDependencies: item.devDependencies || [],
      registryDependencies: [],
      tailwind: {
        config: registry.tailwind?.config || {}
      },
      cssVars: {},
      meta: {
        description: `${item.name} component from ${registry.name}`,
        source: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/r/${item.name}.json`
      }
    };

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