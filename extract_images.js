const fs = require('fs');

const html = fs.readFileSync('soghat.html', 'utf-8');
const imgRegex = /<img[^>]+src="([^">]+)"/g;
const images = [];
let match;
while ((match = imgRegex.exec(html)) !== null) {
  images.push(match[1]);
}
fs.writeFileSync('images.json', JSON.stringify([...new Set(images)], null, 2));
