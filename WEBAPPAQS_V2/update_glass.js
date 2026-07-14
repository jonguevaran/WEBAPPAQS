const fs = require('fs');
const path = require('path');

const files = ['Altas.html', 'entrega.html', 'DelegacionAlmacenes.html'];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // Replace the specific container styles with glass
    content = content.replace(/bg-white([^>]*rounded-(xl|lg|md)[^>]*(shadow|border)[^>]*)/g, 'glass$1');
    content = content.replace(/bg-white([^>]*shadow-[^>]*rounded-[^>]*)/g, 'glass$1');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated glass on ${file}`);
});
