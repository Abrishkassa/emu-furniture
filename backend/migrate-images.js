// migrate-images.js
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const BUCKET_NAME = process.env.SUPABASE_BUCKET || 'products';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment variables.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function generateFileName(originalname) {
  const timestamp = Date.now();
  const random = Math.round(Math.random() * 1e9);
  const ext = path.extname(originalname);
  const baseName = path.basename(originalname, ext);
  return `${baseName}-${timestamp}-${random}${ext}`;
}

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const buffer = await response.arrayBuffer();
  const contentType = response.headers.get('content-type') || 'image/jpeg';
  return { buffer: Buffer.from(buffer), contentType };
}

async function uploadToSupabase(buffer, filename, contentType) {
  const filePath = `products/${filename}`;
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, buffer, {
      contentType,
      cacheControl: '3600',
      upsert: false,
    });
  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);
  return publicUrlData.publicUrl;
}

async function migrateAllProducts() {
  console.log('📦 Fetching products from Supabase...');

  // Use lowercase table name
  const { data: products, error } = await supabase
    .from('Product')
    .select('id, images, productCode, nameEn');

  if (error) {
    console.error('❌ Failed to fetch products:', error);
    return;
  }

  console.log(`✅ Found ${products.length} products.`);

  for (const prod of products) {
    if (!prod.images || !Array.isArray(prod.images) || prod.images.length === 0) {
      console.log(`⏩ Product ${prod.id} has no images, skipping.`);
      continue;
    }

    console.log(`\n🔧 Processing product ${prod.id} (${prod.productCode || prod.nameEn})...`);
    const oldUrls = prod.images;
    const newUrls = [];

    for (const oldUrl of oldUrls) {
      // If it's already a full Supabase URL, keep it (though unlikely)
      if (oldUrl.includes('supabase.co')) {
        newUrls.push(oldUrl);
        continue;
      }

      // If it's a simple filename (no http), we cannot migrate automatically
      if (!oldUrl.startsWith('http')) {
        console.log(`   ⏩ Filename "${oldUrl}" is not a full URL – needs manual handling.`);
        newUrls.push(oldUrl); // keep as is for now
        continue;
      }

      // Only migrate URLs that belong to the old Render backend
      if (!oldUrl.includes('emu-furniture-backend.onrender.com')) {
        console.log(`   ⏩ URL ${oldUrl} is not from old backend, keeping as is.`);
        newUrls.push(oldUrl);
        continue;
      }

      // Try to download and upload
      try {
        console.log(`   ⬇️ Downloading ${oldUrl}...`);
        const { buffer, contentType } = await downloadImage(oldUrl);
        const originalFilename = path.basename(oldUrl);
        const newFilename = generateFileName(originalFilename);
        console.log(`   ⬆️ Uploading as ${newFilename}...`);
        const newUrl = await uploadToSupabase(buffer, newFilename, contentType);
        newUrls.push(newUrl);
        console.log(`   ✅ Uploaded to ${newUrl}`);
      } catch (err) {
        console.error(`   ❌ Failed to migrate ${oldUrl}:`, err.message);
        newUrls.push(oldUrl); // keep old as fallback
      }
    }

    // Update with lowercase table name
    const { error: updateError } = await supabase
      .from('product')
      .update({ images: newUrls })
      .eq('id', prod.id);

    if (updateError) {
      console.error(`   ❌ Failed to update product ${prod.id}:`, updateError);
    } else {
      console.log(`   ✅ Updated product ${prod.id} successfully.`);
    }
  }

  console.log('\n🎉 Migration completed!');
}

migrateAllProducts().catch(console.error);