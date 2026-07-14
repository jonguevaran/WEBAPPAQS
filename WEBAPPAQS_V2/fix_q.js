const fs = require('fs');
let content = fs.readFileSync('Password.html', 'utf8');

content = content.replace('"qa", "qe", "qu", ', '"que", ');

fs.writeFileSync('Password.html', content);
console.log('Q updated successfully.');
