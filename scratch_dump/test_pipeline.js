const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.join('d:', 'vivid', 'REA', 'virtualtryon-art', 'public', 'assets', 'generated');
fs.mkdirSync(targetDir, { recursive: true });

const prompt = encodeURIComponent('Korean man wearing cap, light pink shirt and white trousers, photorealistic, 8k, fashion photography, full body portrait, studio lighting');
const url = `https://image.pollinations.ai/prompt/${prompt}?width=768&height=1024&nologo=true&model=flux`;

console.log('Fetching from:', url);
const destFile = path.join(targetDir, 'test_korean_man.jpg');
const file = fs.createWriteStream(destFile);

https.get(url, (res) => {
  console.log('Status code:', res.statusCode);
  if (res.statusCode === 200) {
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      const stats = fs.statSync(destFile);
      console.log('Saved successfully! File size:', stats.size, 'bytes');
    });
  } else {
    console.error('Failed with status:', res.statusCode);
  }
}).on('error', (err) => {
  console.error('Error:', err.message);
});
