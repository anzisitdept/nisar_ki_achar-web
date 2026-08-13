const fs = require('fs');
const html = fs.readFileSync('soghat.html', 'utf-8');

const extractSection = (id) => {
  const startIdx = html.indexOf(`id="${id}"`);
  if (startIdx === -1) return 'Not found';
  const chunk = html.substring(startIdx - 50, startIdx + 2000); 
  return chunk;
}

console.log("Section 9 (Video Slider):");
console.log(extractSection("shopify-section-template--22227775488131__video_slider_fLegM6"));

console.log("Section 13 (Image Banner):");
console.log(extractSection("shopify-section-template--22227775488131__image_banner_WaFEUg"));

console.log("Section 19 (1770071140e5a28183):");
console.log(extractSection("shopify-section-template--22227775488131__1770071140e5a28183"));

console.log("Section 20 (1769542181df552f1e):");
console.log(extractSection("shopify-section-template--22227775488131__1769542181df552f1e"));
