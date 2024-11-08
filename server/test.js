const jwt = require('jsonwebtoken');

// Use the same secret for generating and verifying
const secret = 'a1a73bfb68d8da4867e0a2bc9e1b0a3146530d2e327c2a17693989417927aa97bae8144290726ca7eee3f01702992257cbe9aa8f9537610143ccc406025ce098';

// Step 1: Create a token
// const token = jwt.sign({ id: '672354d1b8bff8b4a98f45ed' }, secret, { expiresIn: '1h' });
// console.log('Generated Token:', token);

// Step 2: Verify the token
try {
  const decoded = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjM1ZTAwZjMyMmYzMDBlMzgwOWNkYiIsImlhdCI6MTczMDM3MTA3MiwiZXhwIjoxNzMwMzc0NjcyfQ._qDdds9VDu_luzMiHEa9KfEwRNPW4SXJAY9jQ1RxFSw', secret);
  console.log('Decoded Token ID:', decoded.id);
} catch (error) {
  console.error('JWT Verification Error:', error.message);
}
