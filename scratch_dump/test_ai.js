const https = require('https');

https.get('https://image.pollinations.ai/prompt/portrait?width=128&height=128&nologo=true', (res) => {
  console.log('Pollinations status:', res.statusCode);
  console.log('Content-Type:', res.headers['content-type']);
  let chunks = [];
  res.on('data', d => chunks.push(d));
  res.on('end', () => {
    const total = Buffer.concat(chunks);
    console.log('Image bytes received:', total.length);
  });
}).on('error', err => {
  console.error('Network error:', err.message);
});
