const https = require('https');

function fetchWithHeaders(url) {
  return new Promise((resolve) => {
    const u = new URL(url);
    const options = {
      hostname: u.hostname,
      path: u.pathname + u.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8'
      }
    };
    https.get(options, (res) => {
      console.log('Status code with browser UA:', res.statusCode);
      resolve(res.statusCode);
    }).on('error', e => {
      console.error('Error:', e.message);
      resolve(500);
    });
  });
}

fetchWithHeaders('https://image.pollinations.ai/prompt/Korean%20man%20with%20cap%20and%20pink%20shirt?width=512&height=512&nologo=true&model=flux');
