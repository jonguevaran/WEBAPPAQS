const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'DelegacionAlmacenes.html');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
    [
        `<select id="delegacion-select" class="w-full bg-white dark:bg-slate-800/50 border border-slate-300 text-black dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none block p-3.5 transition-all cursor-pointer font-medium hover:bg-slate-100 dark:hover:bg-slate-700">
                            <option value="" disabled selected data-i18n="alm_select_deleg">-- Elija una delegación --</option>
                        </select>`,
        `<input type="text" id="delegacion-select" list="delegaciones-list" class="w-full bg-white dark:bg-slate-800/50 border border-slate-300 text-black dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none block p-3.5 transition-all font-medium hover:bg-slate-100 dark:hover:bg-slate-700" placeholder="-- Escriba para buscar delegación --">
                        <datalist id="delegaciones-list"></datalist>`
    ],
    [
        `<select id="almacen-select" class="w-full bg-white dark:bg-slate-800/50 border border-slate-300 text-black dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none block p-3.5 transition-all cursor-pointer font-medium hover:bg-slate-100 dark:hover:bg-slate-700">
                            <option value="" disabled selected data-i18n="alm_select_alm">-- Elija un almacén --</option>
                        </select>`,
        `<input type="text" id="almacen-select" list="almacenes-list" class="w-full bg-white dark:bg-slate-800/50 border border-slate-300 text-black dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none block p-3.5 transition-all font-medium hover:bg-slate-100 dark:hover:bg-slate-700" placeholder="-- Escriba para buscar almacén --">
                        <datalist id="almacenes-list"></datalist>`
    ],
    [
        `const selectDelegacion = document.getElementById('delegacion-select');
        const selectAlmacen = document.getElementById('almacen-select');`,
        `const selectDelegacion = document.getElementById('delegacion-select');
        const listDelegacion = document.getElementById('delegaciones-list');
        const selectAlmacen = document.getElementById('almacen-select');
        const listAlmacen = document.getElementById('almacenes-list');`
    ],
    [
        `opt.value = del.id;
                opt.textContent = \`\${String(del.id).padStart(2, '0')} - \${del.nombre}\`;
                selectDelegacion.appendChild(opt);`,
        `opt.value = \`\${String(del.id).padStart(2, '0')} - \${del.nombre}\`;
                listDelegacion.appendChild(opt);`
    ],
    [
        `opt.value = alm.id;
                opt.textContent = \`\${alm.nombre} (ID: \${alm.id})\`;
                selectAlmacen.appendChild(opt);`,
        `opt.value = \`\${alm.nombre} (ID: \${alm.id})\`;
                listAlmacen.appendChild(opt);`
    ],
    [
        `selectDelegacion.addEventListener('change', (e) => {
            const id = parseInt(e.target.value);
            const delegacion = dbAquaservice.delegaciones.find(d => d.id === id);`,
        `selectDelegacion.addEventListener('change', (e) => {
            const val = e.target.value;
            const match = val.match(/^(\\d+)\\s*-/);
            const id = match ? parseInt(match[1]) : NaN;
            if (isNaN(id)) return;
            const delegacion = dbAquaservice.delegaciones.find(d => d.id === id);`
    ],
    [
        `selectAlmacen.addEventListener('change', (e) => {
            const almacenId = parseInt(e.target.value);
            
            // Encontrar qué delegación tiene este almacén en su lista`,
        `selectAlmacen.addEventListener('change', (e) => {
            const val = e.target.value;
            const match = val.match(/\\(ID:\\s*(\\d+)\\)$/);
            const almacenId = match ? parseInt(match[1]) : NaN;
            if (isNaN(almacenId)) return;
            
            // Encontrar qué delegación tiene este almacén en su lista`
    ],
    [
        `if (delegacion) {
                // Actualizar el selector de delegación visualmente
                selectDelegacion.value = delegacion.id;
                // Renderizar y pasar el ID del almacén para resaltarlo`,
        `if (delegacion) {
                // Actualizar el selector de delegación visualmente
                selectDelegacion.value = \`\${String(delegacion.id).padStart(2, '0')} - \${delegacion.nombre}\`;
                // Renderizar y pasar el ID del almacén para resaltarlo`
    ]
];

for (const [search, replace] of replacements) {
    const s = search.replace(/\\r\\n/g, '\\n');
    const r = replace.replace(/\\r\\n/g, '\\n');
    content = content.replace(s, r);
}

// Convert newlines back to Windows format just in case
// content = content.replace(/\\n/g, '\\r\\n');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done replacement');
