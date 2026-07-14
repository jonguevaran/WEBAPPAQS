const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Replace the first button's hardcoded classes with the generic inactive classes
content = content.replace('class="menu-button icon-button rounded-2xl bg-blue-200 text-white dark:bg-blue-200 shadow-sm active"', 'class="menu-button icon-button rounded-2xl bg-white/20 hover:bg-white/40 dark:bg-black/20 dark:hover:bg-black/40 text-slate-600 dark:text-slate-300 transition-all"');

fs.writeFileSync('index.html', content);
console.log('Fixed first button classes');
