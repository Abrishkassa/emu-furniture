const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

class ImageProcessor {
  static async createThumbnail(sourcePath, filename) {
    try {
      const thumbnailsDir = 'public/uploads/thumbnails';
      const thumbnailPath = path.join(thumbnailsDir, filename);
      
      await sharp(sourcePath)
        .resize(300, 300, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 80 })
        .toFile(thumbnailPath);
      
      return `/uploads/thumbnails/${filename}`;
    } catch (error) {
      console.error('Thumbnail creation failed:', error);
      return null;
    }
  }

  static async createMediumSize(sourcePath, filename) {
    try {
      const mediumDir = 'public/uploads/medium';
      if (!fs.existsSync(mediumDir)) {
        fs.mkdirSync(mediumDir, { recursive: true });
      }
      
      const mediumPath = path.join(mediumDir, filename);
      
      await sharp(sourcePath)
        .resize(800, 800, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: 85 })
        .toFile(mediumPath);
      
      return `/uploads/medium/${filename}`;
    } catch (error) {
      console.error('Medium size creation failed:', error);
      return null;
    }
  }

  static async getImageInfo(filePath) {
    try {
      const metadata = await sharp(filePath).metadata();
      return {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        size: metadata.size
      };
    } catch (error) {
      console.error('Image info extraction failed:', error);
      return null;
    }
  }

  static async optimizeImage(sourcePath, destinationPath) {
    try {
      await sharp(sourcePath)
        .jpeg({ 
          quality: 90,
          mozjpeg: true 
        })
        .toFile(destinationPath);
      
      return true;
    } catch (error) {
      console.error('Image optimization failed:', error);
      return false;
    }
  }
}

module.exports = ImageProcessor;