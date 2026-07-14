const fs = require('fs');

let content = fs.readFileSync('respuestas.html', 'utf8');

// Replace all copy buttons (Español, Portugués) that use glass
content = content.replace(/class="flex-1 glass dark:border-slate-700 border border-[a-z]+-[0-9]+ text-gray-700 hover:text-[a-z]+-[0-9]+ hover:bg-[a-z]+-[0-9]+ /g, 
'class="flex-1 bg-blue-200 hover:bg-blue-300 text-blue-900 dark:bg-blue-300 dark:hover:bg-blue-400 dark:text-blue-900 font-bold border-transparent ');

// Replace Descargar / Cargar buttons
content = content.replace(/class="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-1\.5 px-3 rounded border border-gray-300 /g,
'class="text-xs bg-blue-200 hover:bg-blue-300 text-blue-900 dark:bg-blue-300 dark:hover:bg-blue-400 dark:text-blue-900 font-bold py-1.5 px-3 rounded border-transparent ');

fs.writeFileSync('respuestas.html', content);
console.log('Updated respuestas.html buttons');
