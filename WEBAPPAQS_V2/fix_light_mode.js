const fs = require('fs');
let content = fs.readFileSync('DelegacionAlmacenes.html', 'utf8');

// 1. Remove bg-transparent from body
content = content.replace(/bg-transparent /g, '');

// 2. Replace 'glass' with 'bg-white dark:bg-slate-800/80' on aside and main
content = content.replace(/class="glass /g, 'class="bg-white dark:bg-slate-800/80 ');
content = content.replace(/class="lg:col-span-8 glass /g, 'class="lg:col-span-8 bg-white dark:bg-slate-800/80 ');

// 3. Make text colors darker for light mode in headings
content = content.replace(/text-slate-800/g, 'text-slate-900');

// Careful with text-slate-500 because of dark:text-slate-500 and text-slate-500
// Instead of replacing all, I'll just change the ones in the labels and small headings
content = content.replace(/text-slate-500 dark:text-slate-400 uppercase/g, 'text-slate-700 dark:text-slate-400 uppercase');
content = content.replace(/text-slate-500 uppercase/g, 'text-slate-700 uppercase');

fs.writeFileSync('DelegacionAlmacenes.html', content);
console.log('Fixed backgrounds and text colors');
