const https = require('https');

async function testModel(modelName) {
  return new Promise((resolve) => {
    const url = `https://image.pollinations.ai/prompt/portrait?width=100&height=100&nologo=true${modelName ? `&model=${modelName}` : ''}`;
    https.get(url, (res) => {
      console.log(`Model "${modelName || 'default'}": status ${res.statusCode}`);
      resolve(res.statusCode);
    }).on('error', (e) => {
      console.log(`Model "${modelName || 'default'}": error ${e.message}`);
      resolve(500);
    });
  });
}

(async () => {
  await testModel('flux');
  await testModel('turbo');
  await testModel('');
})();
