const fs = require('fs');
const content = fs.readFileSync('scratch_dump/922-6a4b0a5dd3fe93f1.js', 'utf8');

function showAround(pos, radius = 500) {
  console.log(`\n--- Slice around index ${pos} ---`);
  console.log(content.slice(Math.max(0, pos - radius), Math.min(content.length, pos + radius)));
}

showAround(26887, 800);
showAround(34855, 800);
showAround(69014, 800);
