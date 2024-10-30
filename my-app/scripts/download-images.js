const fs = require('fs');
const https = require('https');
const path = require('path');

const imageUrls = {
  'tagine.jpg': 'https://example.com/path-to-tagine-image.jpg',
  'spices.jpg': 'https://example.com/path-to-spices-image.jpg',
  'tea-set.jpg': 'https://example.com/path-to-tea-set-image.jpg',
  'serving-bowl.jpg': 'https://example.com/path-to-serving-bowl-image.jpg',
  'argan-oil.jpg': 'https://example.com/path-to-argan-oil-image.jpg',
  'couscous-pot.jpg': 'https://example.com/path-to-couscous-pot-image.jpg',
  'plates-set.jpg': 'https://example.com/path-to-plates-set-image.jpg',
  'preserved-lemons.jpg': 'https://example.com/path-to-preserved-lemons-image.jpg',
  'coffee-pot.jpg': 'https://example.com/path-to-coffee-pot-image.jpg',
  'harissa.jpg': 'https://example.com/path-to-harissa-image.jpg',
  'serving-tagine.jpg': 'https://example.com/path-to-serving-tagine-image.jpg',
  'spice-set.jpg': 'https://example.com/path-to-spice-set-image.jpg'
};

const imagesDir = path.join(__dirname, '../public/images');

// Create images directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Download images
Object.entries(imageUrls).forEach(([filename, url]) => {
  const filePath = path.join(imagesDir, filename);
  https.get(url, (response) => {
    response.pipe(fs.createWriteStream(filePath));
  });
}); 