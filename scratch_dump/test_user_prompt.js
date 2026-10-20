const http = require('http');

async function postJSON(url, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const u = new URL(url);
    const req = http.request({
      hostname: u.hostname,
      port: u.port,
      path: u.pathname + u.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, res => {
      let resBody = '';
      res.on('data', chunk => resBody += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(resBody) }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function getJSON(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let resBody = '';
      res.on('data', chunk => resBody += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(resBody) }));
    }).on('error', reject);
  });
}

(async () => {
  console.log('Testing User Specific Try-On Prompt: "Koran man wear cap, light pink shirt and white touser"');
  
  const initRes = await postJSON('http://localhost:3000/api/generate/image', {
    formState: {
      ai_model: 'ImageStandard',
      prompt: 'Koran man wear cap, light pink shirt and white touser',
      reference_images: ['/assets/cool_man.webp'],
      aspect_ratio: '3:4',
      resolution: '4K'
    },
    user_id: 'test_user_screenshot',
    is_public: true
  });

  console.log('1. Initiated Task:', initRes.data);
  const batchId = initRes.data.batchId;

  // Poll status until completion
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 1200));
    const statusRes = await getJSON(`http://localhost:3000/api/generate/batch/status?batchId=${batchId}`);
    const status = statusRes.data.status;
    const progress = statusRes.data.data?.progress;
    const output = statusRes.data.data?.output_url;
    console.log(`Poll ${i + 1}: status = ${status}, progress = ${progress}%, output = ${output}`);
    
    if (status === 'completed') {
      console.log('>>> SUCCESS! Live AI generation finished. Output URL:', output);
      break;
    }
  }
})();
