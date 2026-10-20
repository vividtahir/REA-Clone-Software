const fs = require('fs');

const content319 = fs.readFileSync('scratch_dump/319-96e1fd3069ae33ef.js', 'utf8');
const content922 = fs.readFileSync('scratch_dump/922-6a4b0a5dd3fe93f1.js', 'utf8');

console.log("=== 319 CHUNK LENGTH:", content319.length);
console.log("=== 922 CHUNK LENGTH:", content922.length);

// Search for API calls, task statuses, try-on options in 319
function extractContexts(content, terms) {
  for (const term of terms) {
    let pos = 0;
    console.log(`\n--- Matches for term: "${term}" ---`);
    let count = 0;
    while ((pos = content.indexOf(term, pos)) !== -1 && count < 5) {
      console.log(content.slice(Math.max(0, pos - 150), Math.min(content.length, pos + 250)));
      console.log('---');
      pos += term.length;
      count++;
    }
  }
}

console.log("=== 319 DETAILS ===");
extractContexts(content319, ['/api/generate', 'batch_try_on', 'ImageStandard', 'outfits', 'aspect_ratio', 'resolution']);

console.log("\n=== 922 DETAILS ===");
extractContexts(content922, ['/api/', 'handleSubmit', 'onSubmit', 'task', 'upload', 'polling', 'status']);
