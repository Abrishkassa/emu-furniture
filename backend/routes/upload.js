const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const { createClient } = require('@supabase/supabase-js');
const { requireAuth } = require('../middleware/auth');
const path = require('path');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
const BUCKET_NAME = process.env.SUPABASE_BUCKET || 'products';

const router = express.Router();

// Test routes (keep as is)
router.get('/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Upload route is working',
    timestamp: new Date().toISOString()
  });
});

router.post('/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'POST route is working',
    timestamp: new Date().toISOString()
  });
});

// Configure multer to use memory storage (no local files)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Helper to generate unique filename
const generateFileName = (originalname, suffix = '') => {
  const timestamp = Date.now();
  const random = Math.round(Math.random() * 1e9);
  const ext = path.extname(originalname);
  const baseName = path.basename(originalname, ext);
  return `${baseName}${suffix}-${timestamp}-${random}${ext}`;
};

// Upload a file buffer to Supabase Storage
const uploadToSupabase = async (buffer, fileName, contentType) => {
  const filePath = `products/${fileName}`;
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, buffer, {
      contentType,
      cacheControl: '3600',
      upsert: false
    });

  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
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

    const file = req.file;
    const originalName = file.originalname;
    const buffer = file.buffer;
    const contentType = file.mimetype;

    // Generate filenames
    const originalFileName = generateFileName(originalName);
    const thumbnailFileName = generateFileName(originalName, '-thumb');
    const mediumFileName = generateFileName(originalName, '-medium');

    // Process images with sharp
    const image = sharp(buffer);
    const metadata = await image.metadata();

    // Generate thumbnail (300px width)
    const thumbnailBuffer = await image
      .clone()
      .resize({ width: 300, withoutEnlargement: true })
      .toBuffer();

    // Generate medium size (800px width)
    const mediumBuffer = await image
      .clone()
      .resize({ width: 800, withoutEnlargement: true })
      .toBuffer();

    // Upload all three versions to Supabase
    const [originalUrl, thumbnailUrl, mediumUrl] = await Promise.all([
      uploadToSupabase(buffer, originalFileName, contentType),
      uploadToSupabase(thumbnailBuffer, thumbnailFileName, contentType),
      uploadToSupabase(mediumBuffer, mediumFileName, contentType)
    ]);

    // Return the full Supabase URLs
    const responseData = {
      filename: originalFileName,
      originalname: originalName,
      size: file.size,
      mimetype: contentType,
      // You can keep these for backward compatibility if needed
      originalUrl: `/uploads/products/${originalFileName}`,
      thumbnailUrl: `/uploads/thumbnails/${thumbnailFileName}`,
      mediumUrl: `/uploads/medium/${mediumFileName}`,
      dimensions: {
        width: metadata.width,
        height: metadata.height
      },
      fullUrls: {
        original: originalUrl,
        thumbnail: thumbnailUrl,
        medium: mediumUrl
      }
    };

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: responseData
    });

  } catch (error) {
    console.error('Upload error:', error);
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

    for (const file of req.files) {
      try {
        const buffer = file.buffer;
        const originalName = file.originalname;
        const contentType = file.mimetype;

        const originalFileName = generateFileName(originalName);
        const thumbnailFileName = generateFileName(originalName, '-thumb');
        const mediumFileName = generateFileName(originalName, '-medium');

        const image = sharp(buffer);
        const metadata = await image.metadata();

        const thumbnailBuffer = await image
          .clone()
          .resize({ width: 300, withoutEnlargement: true })
          .toBuffer();

        const mediumBuffer = await image
          .clone()
          .resize({ width: 800, withoutEnlargement: true })
          .toBuffer();

        const [originalUrl, thumbnailUrl, mediumUrl] = await Promise.all([
          uploadToSupabase(buffer, originalFileName, contentType),
          uploadToSupabase(thumbnailBuffer, thumbnailFileName, contentType),
          uploadToSupabase(mediumBuffer, mediumFileName, contentType)
        ]);

        uploadedImages.push({
          filename: originalFileName,
          originalname: originalName,
          size: file.size,
          mimetype: contentType,
          originalUrl: `/uploads/products/${originalFileName}`,
          thumbnailUrl: `/uploads/thumbnails/${thumbnailFileName}`,
          mediumUrl: `/uploads/medium/${mediumFileName}`,
          dimensions: {
            width: metadata.width,
            height: metadata.height
          },
          fullUrls: {
            original: originalUrl,
            thumbnail: thumbnailUrl,
            medium: mediumUrl
          }
        });
      } catch (error) {
        console.error(`Error processing file ${file.originalname}:`, error);
        errors.push(file.originalname);
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
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to upload images'
    });
  }
});

// Get all uploaded images from Supabase Storage
router.get('/list', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list('products', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error) throw error;

    const images = data
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name))
      .map(file => {
        const { data: publicUrlData } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(`products/${file.name}`);
        
        return {
          filename: file.name,
          url: `/uploads/products/${file.name}`,
          fullUrl: publicUrlData.publicUrl,
          thumbnailUrl: `/uploads/thumbnails/${file.name}`,
          thumbnailFullUrl: publicUrlData.publicUrl.replace('/products/', '/thumbnails/') // adjust if needed
        };
      });

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

// Delete image from Supabase Storage
router.delete('/:filename', requireAuth, async (req, res) => {
  try {
    const filename = req.params.filename;
    const baseName = path.basename(filename, path.extname(filename));
    const ext = path.extname(filename);

    // Generate expected variant filenames (thumb and medium)
    const thumbnailName = `${baseName}-thumb${ext}`;
    const mediumName = `${baseName}-medium${ext}`;

    const filesToDelete = [
      `products/${filename}`,
      `products/${thumbnailName}`,
      `products/${mediumName}`
    ];

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove(filesToDelete);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Image and its variants deleted successfully',
      data: { filesDeleted: filesToDelete.length }
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete image'
    });
  }
});

// Bulk delete
router.post('/bulk/delete', requireAuth, async (req, res) => {
  try {
    const { filenames } = req.body;
    
    if (!Array.isArray(filenames) || filenames.length === 0) {
      return res.status(400).json({ success: false, error: 'No filenames provided' });
    }

    const filesToDelete = [];
    filenames.forEach(filename => {
      const baseName = path.basename(filename, path.extname(filename));
      const ext = path.extname(filename);
      filesToDelete.push(`products/${filename}`);
      filesToDelete.push(`products/${baseName}-thumb${ext}`);
      filesToDelete.push(`products/${baseName}-medium${ext}`);
    });

    const { error, data } = await supabase.storage
      .from(BUCKET_NAME)
      .remove(filesToDelete);

    if (error) throw error;

    res.json({
      success: true,
      message: `${data?.length || 0} file(s) deleted successfully`,
      data: { deletedCount: data?.length || 0, totalRequested: filenames.length * 3 }
    });
  } catch (error) {
    console.error('Bulk delete error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;