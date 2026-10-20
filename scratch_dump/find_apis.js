const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('scratch_dump').filter(f => f.endsWith('.js'));
for (const f of files) {
  const content = fs.readFileSync(path.join('scratch_dump', f), 'utf8');
  let pos = 0;
  while ((pos = content.indexOf('/api/', pos)) !== -1) {
    const start = Math.max(0, pos - 100);
    const end = Math.min(content.length, pos + 200);
    console.log(`[${f} @ ${pos}]:\n${content.slice(start, end)}\n---`);
    pos += 5;
  }
}
