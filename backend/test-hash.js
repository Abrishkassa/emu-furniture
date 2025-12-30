const bcrypt = require('bcryptjs');

async function testHash() {
  const password = 'password123';
  const hash = '$2a$10$K7Vq3vL5pP7sZ5Z5Z5Z5Z.5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z';
  
  console.log('Testing hash for password "password123"');
  console.log('Hash:', hash);
  console.log('Hash length:', hash.length);
  console.log('Expected length: 60');
  
  try {
    const isValid = await bcrypt.compare(password, hash);
    console.log('✅ Hash is valid for "password123":', isValid);
    
    // Generate a new hash for comparison
    const newHash = await bcrypt.hash(password, 10);
    console.log('\nNew hash for comparison:');
    console.log('New hash:', newHash);
    console.log('New hash length:', newHash.length);
    
    // Compare with new hash
    const newIsValid = await bcrypt.compare(password, newHash);
    console.log('New hash valid:', newIsValid);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testHash();