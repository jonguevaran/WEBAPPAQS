const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'DelegacionAlmacenes.html');
let content = fs.readFileSync(filePath, 'utf8');

// Fix delegaciones population
content = content.replace(
    /opt\.value = del\.id;\s*opt\.textContent = `\$\{String\(del\.id\)\.padStart\(2, '0'\)\} - \$\{del\.nombre\}`;\s*selectDelegacion\.appendChild\(opt\);/g,
    `opt.value = \`\${String(del.id).padStart(2, '0')} - \${del.nombre}\`;
                listDelegacion.appendChild(opt);`
);

// Fix almacenes population
content = content.replace(
    /opt\.value = alm\.id;\s*opt\.textContent = `\$\{alm\.nombre\} \(ID: \$\{alm\.id\}\)`;\s*selectAlmacen\.appendChild\(opt\);/g,
    `opt.value = \`\${alm.nombre} (ID: \${alm.id})\`;
                listAlmacen.appendChild(opt);`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed population');
