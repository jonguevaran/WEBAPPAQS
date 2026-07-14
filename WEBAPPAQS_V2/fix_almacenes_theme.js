const fs = require('fs');
let content = fs.readFileSync('DelegacionAlmacenes.html', 'utf8');

// Add theme.css if not present
if (!content.includes('assets/css/theme.css')) {
    content = content.replace(/<\/head>/i, '    <link rel="stylesheet" href="assets/css/theme.css">\n</head>');
}

// Add scripts if not present
if (!content.includes('assets/js/core.js')) {
    content = content.replace(/<\/body>/i, '    <script src="assets/js/i18n.js"></script>\n    <script src="assets/js/core.js"></script>\n</body>');
}

// Make body dark-mode friendly
content = content.replace(/<body([^>]*)class="([^"]*)"([^>]*)>/i, (match, p1, p2, p3) => {
    let classes = p2.split(' ');
    if (!classes.includes('bg-transparent')) classes.push('bg-transparent');
    if (!classes.includes('dark:text-slate-200')) classes.push('dark:text-slate-200');
    return `<body${p1}class="${classes.join(' ')}"${p3}>`;
});

// Update bg-white to glass for UI panels
content = content.replace(/class="([^"]*)bg-white([^"]*)"/g, (match, p1, p2) => {
    return `class="${p1}glass dark:border-slate-700${p2}"`;
});

// Fix dark mode text visibility
// The header text "Aquaservice"
content = content.replace(/text-blue-900/g, 'text-indigo-900 dark:text-indigo-200');
content = content.replace(/text-indigo-900/g, 'text-indigo-900 dark:text-indigo-200');

// "Infraestructura Logistica..."
content = content.replace(/text-slate-500/g, 'text-slate-500 dark:text-slate-400');

// The badge "Base de Datos Integrada"
content = content.replace(/bg-blue-50/g, 'bg-indigo-50 dark:bg-indigo-900/40');
content = content.replace(/border-blue-200/g, 'border-indigo-200 dark:border-indigo-700/50');
content = content.replace(/text-blue-800/g, 'text-indigo-800 dark:text-indigo-300');
content = content.replace(/text-slate-700/g, 'text-slate-700 dark:text-slate-300');

// Search select labels
content = content.replace(/text-indigo-500/g, 'text-indigo-500 dark:text-indigo-400');

// "Búsqueda Inversa" separator
content = content.replace(/text-slate-300/g, 'text-slate-300 dark:text-slate-500');
content = content.replace(/border-slate-100/g, 'border-slate-100 dark:border-slate-700/50');

// "Centros de Distribución Vinculados"
content = content.replace(/text-slate-900/g, 'text-slate-900 dark:text-white');
content = content.replace(/text-indigo-600/g, 'text-indigo-600 dark:text-indigo-400');

// "Esperando selección" icon circle
content = content.replace(/bg-slate-50/g, 'bg-slate-50 dark:bg-slate-800/50');

fs.writeFileSync('DelegacionAlmacenes.html', content);
console.log('Fixed theme application in DelegacionAlmacenes.html');
