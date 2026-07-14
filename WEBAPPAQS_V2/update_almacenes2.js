const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'DelegacionAlmacenes.html');
let content = fs.readFileSync(filePath, 'utf8');

// selectDelegacion change listener
content = content.replace(
    /selectDelegacion\.addEventListener\('change',\s*\(e\)\s*=>\s*\{\s*const id = parseInt\(e\.target\.value\);\s*const delegacion = dbAquaservice\.delegaciones\.find\(d => d\.id === id\);/,
    `selectDelegacion.addEventListener('change', (e) => {
            const val = e.target.value;
            const match = val.match(/^(\\d+)\\s*-/);
            const id = match ? parseInt(match[1]) : NaN;
            if (isNaN(id)) return;
            const delegacion = dbAquaservice.delegaciones.find(d => d.id === id);`
);

// selectAlmacen change listener
content = content.replace(
    /selectAlmacen\.addEventListener\('change',\s*\(e\)\s*=>\s*\{\s*const almacenId = parseInt\(e\.target\.value\);/,
    `selectAlmacen.addEventListener('change', (e) => {
            const val = e.target.value;
            const match = val.match(/\\(ID:\\s*(\\d+)\\)$/);
            const almacenId = match ? parseInt(match[1]) : NaN;
            if (isNaN(almacenId)) return;`
);

// update selectDelegacion.value inside render block
content = content.replace(
    /selectDelegacion\.value\s*=\s*delegacion\.id;/,
    `selectDelegacion.value = \`\${String(delegacion.id).padStart(2, '0')} - \${delegacion.nombre}\`;`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done replacement');
