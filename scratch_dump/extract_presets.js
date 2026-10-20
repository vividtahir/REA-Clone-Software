const fs = require('fs');

const pageHome = fs.readFileSync('scratch_dump/page-aad22a1f561cdca0.js', 'utf8');
const pageClothes = fs.readFileSync('scratch_dump/page-ae149758e67cc907.js', 'utf8');

console.log("=== Finding webp/png/jpg images in page chunks ===");
const imgRegex = /https?:\/\/[^"'`\s]+\.(webp|png|jpg|jpeg|svg|mp4|webm)/gi;
const matches = [...new Set([...(pageHome.match(imgRegex)||[]), ...(pageClothes.match(imgRegex)||[])])];
console.log("Found images:", matches);

// Let's inspect presets or examples
console.log("=== Checking presets in pageClothes ===");
let pos = 0;
while ((pos = pageClothes.indexOf('outfit', pos)) !== -1) {
  console.log(pageClothes.slice(Math.max(0, pos - 100), Math.min(pageClothes.length, pos + 200)));
  console.log('---');
  pos += 6;
}
