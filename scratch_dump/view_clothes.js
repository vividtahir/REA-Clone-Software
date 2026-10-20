const fs = require('fs');
const pageClothes = fs.readFileSync('scratch_dump/page-ae149758e67cc907.js', 'utf8');
console.log("Length:", pageClothes.length);
console.log("Content preview:");
console.log(pageClothes.slice(0, 3000));
console.log("\n...\n");
console.log(pageClothes.slice(3000, 6000));
console.log("\n...\n");
console.log(pageClothes.slice(6000));
