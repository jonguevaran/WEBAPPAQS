const fs = require('fs');
let content = fs.readFileSync('cartas_v2.html', 'utf8');
content = content.replace(/width:`150px`/g, 'width:`270px`');
fs.writeFileSync('cartas_v2.html', content);
console.log('cartas_v2.html updated');
