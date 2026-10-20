const fs = require('fs');
const https = require('https');
const path = require('path');

const baseDir = path.join('d:', 'vivid', 'REA', 'virtualtryon-art');
const assetsDir = path.join(baseDir, 'public', 'assets');

fs.mkdirSync(assetsDir, { recursive: true });
fs.mkdirSync(path.join(baseDir, 'src', 'components'), { recursive: true });
fs.mkdirSync(path.join(baseDir, 'src', 'services'), { recursive: true });
fs.mkdirSync(path.join(baseDir, 'server'), { recursive: true });

const images = [
  'https://store.virtualtryon.art/woman_model.webp',
  'https://store.virtualtryon.art/blouse.webp',
  'https://store.virtualtryon.art/hat.webp',
  'https://store.virtualtryon.art/skirt.webp',
  'https://store.virtualtryon.art/woman_output.webp',
  'https://store.virtualtryon.art/summer_casual.webp',
  'https://store.virtualtryon.art/red_hair.webp',
  'https://store.virtualtryon.art/summer_casual_red.webp',
  'https://store.virtualtryon.art/cool_man.webp',
  'https://store.virtualtryon.art/luxury_car.webp',
  'https://store.virtualtryon.art/man_driving_car.webp',
  'https://store.virtualtryon.art/business_professional.webp',
  'https://store.virtualtryon.art/winter_outfit.webp',
  'https://store.virtualtryon.art/party_outfit.webp',
  'https://store.virtualtryon.art/cottagecore.webp',
  'https://store.virtualtryon.art/urban_streetwear.webp'
];

async function fetchImage(url) {
  const filename = path.basename(url);
  const dest = path.join(assetsDir, filename);
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        console.warn('Status ' + res.statusCode + ' for ' + url);
        return resolve();
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => { file.close(); console.log('Saved ' + filename); resolve(); });
    }).on('error', err => { console.warn('Error downloading ' + url, err.message); resolve(); });
  });
}

(async () => {
  console.log('Downloading assets into:', assetsDir);
  for (const img of images) {
    await fetchImage(img);
  }
  console.log('Done downloading assets!');
})();
