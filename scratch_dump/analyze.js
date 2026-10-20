const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('scratch_dump').filter(f => f.endsWith('.js'));
for (const f of files) {
  const content = fs.readFileSync(path.join('scratch_dump', f), 'utf8');
  console.log(`\n======================================================`);
  console.log(`=== FILE: ${f} (len: ${content.length}) ===`);
  console.log(`======================================================`);
  
  // Look for API endpoints
  const apiMatches = content.match(/["'`](\/api\/[^"'`]+|https?:\/\/[^"'`\s]+)["'`]/g) || [];
  const cleanApis = [...new Set(apiMatches.map(s => s.slice(1, -1)))]
    .filter(a => !a.includes('w3.org') && !a.includes('schema.org') && !a.includes('next/static'));
  console.log('Endpoints & External URLs:');
  console.log(cleanApis.slice(0, 40));

  // Search for keywords like "generate", "try-on", "upload", "credits", "model", "prompt"
  const keywords = ['/api/', 'task', 'credit', 'generate', 'prediction', 'model_version', 'aspect_ratio', 'resolution'];
  for (const kw of keywords) {
    let idx = 0;
    let foundCount = 0;
    while ((idx = content.indexOf(kw, idx)) !== -1 && foundCount < 3) {
      const start = Math.max(0, idx - 80);
      const end = Math.min(content.length, idx + 120);
      console.log(`  [Keyword '${kw}' @ ${idx}]: ...${content.slice(start, end).replace(/\n/g, ' ')}...`);
      idx += kw.length;
      foundCount++;
    }
  }
}
