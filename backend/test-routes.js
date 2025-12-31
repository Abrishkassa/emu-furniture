const fs = require('fs');
const path = require('path');

const routeFiles = [
  'routes/auth.js',
  'routes/upload.js',
  'routes/products.js',
  'routes/blogs.js',
  'routes/admin/products.js',
  'routes/admin/dashboard.js',
  'routes/admin/users.js',
  'routes/admin/blogs.js'
];

console.log('Checking route files...');
routeFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  const exists = fs.existsSync(fullPath);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
  
  if (exists) {
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      const hasExport = content.includes('module.exports') || content.includes('export default');
      console.log(`   ${hasExport ? '✅ Has export' : '❌ Missing export'}`);
    } catch (err) {
      console.log(`   ❌ Error reading: ${err.message}`);
    }
  }
});