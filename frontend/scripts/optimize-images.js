const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images/products');
const QUALITY = 85; // WebP quality (0-100)
const PNG_QUALITY = 80; // PNG compression quality

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  // Skip if not PNG or JPG
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
    return;
  }

  const fileName = path.basename(filePath, ext);
  const dirName = path.dirname(filePath);
  const webpPath = path.join(dirName, `${fileName}.webp`);

  try {
    // Get original file size
    const originalStats = fs.statSync(filePath);
    const originalSize = (originalStats.size / 1024).toFixed(2);

    // Create WebP version
    await sharp(filePath)
      .webp({ quality: QUALITY })
      .toFile(webpPath);

    // Get WebP file size
    const webpStats = fs.statSync(webpPath);
    const webpSize = (webpStats.size / 1024).toFixed(2);

    // Also optimize the original PNG (lossless compression)
    if (ext === '.png') {
      const tempPath = filePath + '.tmp';
      await sharp(filePath)
        .png({ quality: PNG_QUALITY, compressionLevel: 9 })
        .toFile(tempPath);

      const optimizedStats = fs.statSync(tempPath);
      const optimizedSize = (optimizedStats.size / 1024).toFixed(2);

      // Only replace if smaller
      if (optimizedStats.size < originalStats.size) {
        fs.renameSync(tempPath, filePath);
        console.log(`✓ ${path.relative(IMAGES_DIR, filePath)}: ${originalSize}KB → ${optimizedSize}KB (PNG) + ${webpSize}KB (WebP)`);
      } else {
        fs.unlinkSync(tempPath);
        console.log(`✓ ${path.relative(IMAGES_DIR, filePath)}: ${originalSize}KB (kept original) + ${webpSize}KB (WebP)`);
      }
    } else {
      console.log(`✓ ${path.relative(IMAGES_DIR, filePath)}: ${originalSize}KB + ${webpSize}KB (WebP)`);
    }

  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
}

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      await optimizeImage(fullPath);
    }
  }
}

async function main() {
  console.log('🖼️  Optimizing product images...\n');

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Error: ${IMAGES_DIR} does not exist`);
    process.exit(1);
  }

  await processDirectory(IMAGES_DIR);

  console.log('\n✅ Image optimization complete!');
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
