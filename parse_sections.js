const fs = require('fs');
const html = fs.readFileSync('soghat.html', 'utf-8');

// Find all elements with class containing 'shopify-section'
const regex = /<div[^>]*class="[^"]*shopify-section[^"]*"[^>]*>/g;
let match;
let i = 1;
while ((match = regex.exec(html)) !== null) {
  // Extract id and class
  const idMatch = match[0].match(/id="([^"]+)"/);
  const classMatch = match[0].match(/class="([^"]+)"/);
  
  console.log(`Section ${i}:`);
  if (idMatch) console.log(`  ID: ${idMatch[1]}`);
  if (classMatch) console.log(`  Class: ${classMatch[1]}`);
  console.log('');
  i++;
}
