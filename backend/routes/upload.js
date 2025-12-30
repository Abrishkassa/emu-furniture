const express = require('express');
const upload = require('../middleware/upload');
const { requireAuth } = require('../middleware/auth');
const ImageProcessor = require('../utils/imageProcessor');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Helper function to get full URL
const getFullUrl = (req, filePath) => {
  return `${req.protocol}://${req.get('host')}${filePath}`;
};

// Single image upload
router.post('/single', requireAuth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file uploaded'
      });
    }

    // Get image info
    const imageInfo = await ImageProcessor.getImageInfo(req.file.path);
    
    // Create thumbnail
    const thumbnailPath = await ImageProcessor.createThumbnail(req.file.path, req.file.filename);
    
    // Create medium size
    const mediumPath = await ImageProcessor.createMediumSize(req.file.path, req.file.filename);
    
    const responseData = {
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      originalUrl: `/uploads/products/${req.file.filename}`,
      thumbnailUrl: thumbnailPath,
      mediumUrl: mediumPath,
      dimensions: imageInfo ? {
        width: imageInfo.width,
        height: imageInfo.height
      } : null
    };

    // Add full URLs
    responseData.fullUrls = {
      original: getFullUrl(req, responseData.originalUrl),
      thumbnail: thumbnailPath ? getFullUrl(req, thumbnailPath) : null,
      medium: mediumPath ? getFullUrl(req, mediumPath) : null
    };

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: responseData
    });

  } catch (error) {
    console.error('Upload error:', error);
    
    // Clean up uploaded file if error occurred
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Failed to cleanup file:', err);
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to upload image'
    });
  }
});

// Multiple images upload
router.post('/multiple', requireAuth, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No images uploaded'
      });
    }

    const uploadedImages = [];
    const errors = [];

    // Process each image
    for (const file of req.files) {
      try {
        const imageInfo = await ImageProcessor.getImageInfo(file.path);
        const thumbnailPath = await ImageProcessor.createThumbnail(file.path, file.filename);
        const mediumPath = await ImageProcessor.createMediumSize(file.path, file.filename);

        uploadedImages.push({
          filename: file.filename,
          originalname: file.originalname,
          size: file.size,
          mimetype: file.mimetype,
          originalUrl: `/uploads/products/${file.filename}`,
          thumbnailUrl: thumbnailPath,
          mediumUrl: mediumPath,
          dimensions: imageInfo ? {
            width: imageInfo.width,
            height: imageInfo.height
          } : null,
          fullUrls: {
            original: getFullUrl(req, `/uploads/products/${file.filename}`),
            thumbnail: thumbnailPath ? getFullUrl(req, thumbnailPath) : null,
            medium: mediumPath ? getFullUrl(req, mediumPath) : null
          }
        });
      } catch (error) {
        console.error(`Error processing file ${file.originalname}:`, error);
        errors.push(file.originalname);
        
        // Clean up failed file
        if (file.path) {
          fs.unlink(file.path, (err) => {
            if (err) console.error('Failed to cleanup file:', err);
          });
        }
      }
    }

    if (uploadedImages.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Failed to process any images'
      });
    }

    const response = {
      success: true,
      message: `${uploadedImages.length} image(s) uploaded successfully`,
      data: uploadedImages
    };

    if (errors.length > 0) {
      response.warnings = {
        failedFiles: errors,
        message: `${errors.length} file(s) failed to process`
      };
    }

    res.json(response);

  } catch (error) {
    console.error('Upload error:', error);
    
    // Clean up all files if error occurred
    if (req.files) {
      req.files.forEach(file => {
        if (file.path) {
          fs.unlink(file.path, (err) => {
            if (err) console.error('Failed to cleanup file:', err);
          });
        }
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to upload images'
    });
  }
});

// Get all uploaded images
router.get('/list', requireAuth, async (req, res) => {
  try {
    const uploadDir = 'public/uploads/products';
    const files = fs.readdirSync(uploadDir);
    
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => ({
        filename: file,
        url: `/uploads/products/${file}`,
        fullUrl: getFullUrl(req, `/uploads/products/${file}`),
        thumbnailUrl: `/uploads/thumbnails/${file}`,
        thumbnailFullUrl: getFullUrl(req, `/uploads/thumbnails/${file}`)
      }));

    res.json({
      success: true,
      data: {
        total: images.length,
        images: images
      }
    });
  } catch (error) {
    console.error('List images error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to list images'
    });
  }
});

// Delete uploaded image
router.delete('/:filename', requireAuth, (req, res) => {
  try {
    const filename = req.params.filename;
    
    // Define paths
    const originalPath = path.join('public/uploads/products', filename);
    const thumbnailPath = path.join('public/uploads/thumbnails', filename);
    const mediumPath = path.join('public/uploads/medium', filename);
    
    let deletedCount = 0;
    
    // Delete original
    if (fs.existsSync(originalPath)) {
      fs.unlinkSync(originalPath);
      deletedCount++;
    }
    
    // Delete thumbnail
    if (fs.existsSync(thumbnailPath)) {
      fs.unlinkSync(thumbnailPath);
      deletedCount++;
    }
    
    // Delete medium size
    if (fs.existsSync(mediumPath)) {
      fs.unlinkSync(mediumPath);
      deletedCount++;
    }
    
    if (deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Image not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Image deleted successfully',
      data: {
        filesDeleted: deletedCount
      }
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Bulk delete images
router.post('/bulk/delete', requireAuth, (req, res) => {
  try {
    const { filenames } = req.body;
    
    if (!Array.isArray(filenames) || filenames.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No filenames provided'
      });
    }
    
    let deletedCount = 0;
    const errors = [];
    
    filenames.forEach(filename => {
      try {
        const originalPath = path.join('public/uploads/products', filename);
        const thumbnailPath = path.join('public/uploads/thumbnails', filename);
        const mediumPath = path.join('public/uploads/medium', filename);
        
        // Delete original
        if (fs.existsSync(originalPath)) {
          fs.unlinkSync(originalPath);
        }
        
        // Delete thumbnail
        if (fs.existsSync(thumbnailPath)) {
          fs.unlinkSync(thumbnailPath);
        }
        
        // Delete medium size
        if (fs.existsSync(mediumPath)) {
          fs.unlinkSync(mediumPath);
        }
        
        deletedCount++;
      } catch (error) {
        errors.push({ filename, error: error.message });
      }
    });
    
    const response = {
      success: true,
      message: `${deletedCount} image(s) deleted successfully`,
      data: {
        deletedCount,
        totalRequested: filenames.length
      }
    };
    
    if (errors.length > 0) {
      response.warnings = {
        failedDeletions: errors,
        message: `${errors.length} file(s) failed to delete`
      };
    }
    
    res.json(response);
  } catch (error) {
    console.error('Bulk delete error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;