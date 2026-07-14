const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'DelegacionAlmacenes.html');
let content = fs.readFileSync(filePath, 'utf8');

// Insert the two missing datalist variables
content = content.replace(
    /const selectDelegacion = document\.getElementById\('delegacion-select'\);\s*const selectAlmacen = document\.getElementById\('almacen-select'\);/,
    `const selectDelegacion = document.getElementById('delegacion-select');
        const listDelegacion = document.getElementById('delegaciones-list');
        const selectAlmacen = document.getElementById('almacen-select');
        const listAlmacen = document.getElementById('almacenes-list');`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed variables');
