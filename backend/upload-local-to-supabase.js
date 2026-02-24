// upload-local-to-supabase.js
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs').promises;
const mime = require('mime-types');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const BUCKET_NAME = process.env.SUPABASE_BUCKET || 'products';
const LOCAL_IMAGE_FOLDER = path.join(__dirname, 'public', 'uploads', 'products');

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_ANON_KEY.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper to generate unique filename
function generateFileName(originalname) {
  const timestamp = Date.now();
  const random = Math.round(Math.random() * 1e9);
  const ext = path.extname(originalname);
  const baseName = path.basename(originalname, ext);
  return `${baseName}-${timestamp}-${random}${ext}`;
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

function extractFilename(entry) {
  if (entry.startsWith('http')) return path.basename(entry);
  return entry;
}

// Smart file matcher
async function findLocalFile(targetFilename) {
  const exactPath = path.join(LOCAL_IMAGE_FOLDER, targetFilename);
  try {
    await fs.access(exactPath);
    return exactPath;
  } catch {
    const base = path.basename(targetFilename, path.extname(targetFilename));
    const ext = path.extname(targetFilename);
    const files = await fs.readdir(LOCAL_IMAGE_FOLDER);
    const matches = files.filter(f =>
      f.toLowerCase().startsWith(base.toLowerCase()) &&
      f.toLowerCase().endsWith(ext.toLowerCase())
    );
    if (matches.length === 0) return null;
    matches.sort((a, b) => b.length - a.length);
    return path.join(LOCAL_IMAGE_FOLDER, matches[0]);
  }
}

async function migrateFromLocal() {
  // --- DEBUG: List all tables to confirm the exact name ---
  console.log('🔍 Fetching list of tables from Supabase...');
  const { data: tables, error: tablesError } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public');
  if (tablesError) {
    console.error('Could not list tables:', tablesError);
  } else {
    console.log('Tables in public schema:', tables.map(t => t.table_name));
  }
  // ---------------------------------------------------------

  console.log('📦 Fetching products from Supabase...');
  // Try the most likely table name: 'products' (lowercase plural)
  const { data: products, error } = await supabase
    .from('products')
    .select('id, images, productCode, nameEn');

  if (error) {
    console.error('❌ Failed to fetch products:', error);
    return;
  }

  console.log(`✅ Found ${products.length} products.`);

  let localFiles;
  try {
    localFiles = await fs.readdir(LOCAL_IMAGE_FOLDER);
    console.log(`📁 Found ${localFiles.length} files in local folder.`);
  } catch (err) {
    console.warn(`⚠️  Cannot read folder: ${LOCAL_IMAGE_FOLDER}`);
    localFiles = [];
  }

  for (const prod of products) {
    if (!prod.images || !Array.isArray(prod.images) || prod.images.length === 0) {
      console.log(`⏩ Product ${prod.id} has no images, skipping.`);
      continue;
    }

    console.log(`\n🔧 Processing product ${prod.id} (${prod.productCode || prod.nameEn})...`);
    const oldEntries = prod.images;
    const newUrls = [];

    for (const entry of oldEntries) {
      if (entry.includes('supabase.co')) {
        console.log(`   ✅ Already Supabase URL: ${entry}`);
        newUrls.push(entry);
        continue;
      }

      const targetFilename = extractFilename(entry);
      const localPath = await findLocalFile(targetFilename);

      if (!localPath) {
        console.error(`   ❌ Cannot find local file for "${targetFilename}"`);
        newUrls.push(entry);
        continue;
      }

      try {
        const fileBuffer = await fs.readFile(localPath);
        const contentType = mime.lookup(localPath) || 'image/jpeg';
        const actualFilename = path.basename(localPath);
        const newFilename = generateFileName(actualFilename);

        console.log(`   ⬆️ Uploading ${actualFilename} as ${newFilename}...`);
        const newUrl = await uploadToSupabase(fileBuffer, newFilename, contentType);
        newUrls.push(newUrl);
        console.log(`   ✅ Uploaded to ${newUrl}`);
      } catch (err) {
        console.error(`   ❌ Upload failed for ${targetFilename}:`, err.message);
        newUrls.push(entry);
      }
    }

    const { error: updateError } = await supabase
      .from('products')
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

migrateFromLocal().catch(console.error);