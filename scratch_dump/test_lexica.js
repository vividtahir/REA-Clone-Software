const https = require('https');

https.get('https://lexica.art/api/v1/search?q=korean%20man%20cap%20pink%20shirt%20white%20pants', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Lexica status:', res.statusCode);
    if (res.statusCode === 200) {
      const json = JSON.parse(data);
      console.log('Found images count:', json.images?.length);
      if (json.images && json.images.length > 0) {
        console.log('Top match URL:', json.images[0].src);
      }
    }
  });
}).on('error', e => console.error(e.message));
