const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Fix double single quotes
content = content.replace(/''bg-blue-200'/g, "'bg-blue-200'");

// Ensure the remove method removes all the new pastel blue classes
const oldRemove = /btn\.classList\.remove\([^)]*\);/g;
content = content.replace(oldRemove, "btn.classList.remove('bg-blue-200', 'hover:bg-blue-300', 'text-blue-900', 'dark:text-blue-900', 'dark:bg-blue-300', 'dark:hover:bg-blue-400', 'active');");

fs.writeFileSync('index.html', content);
console.log('Fixed index.html syntax');
