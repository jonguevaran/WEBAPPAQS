const fs = require('fs');
let content = fs.readFileSync('Altas.html', 'utf8');

// The regex will match <!-- Grupo 1: Personalizaci... up to the separator div
content = content.replace(/<!-- Grupo 1: Personalizaci[\s\S]*?<!-- Separador f.sico 20px -->\s*<div class="h-\[20px\][^"]*"><\/div>\s*/s, '');

fs.writeFileSync('Altas.html', content);
console.log('Removed Grupo 1 from menu');
