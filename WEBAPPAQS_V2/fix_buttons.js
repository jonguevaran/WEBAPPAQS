const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') || f.endsWith('.js'));
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // For standard buttons
    content = content.replace(/bg-blue-200 hover:bg-blue-300 text-blue-900 dark:bg-blue-300 dark:hover:bg-blue-400 dark:text-blue-900 font-bold/g, 'bg-blue-200 hover:bg-blue-300 text-blue-900 dark:bg-blue-300 dark:hover:bg-blue-400 dark:text-blue-900 font-bold');
    content = content.replace(/bg-blue-200 text-blue-900 dark:bg-blue-300 dark:text-blue-900 font-bold/g, 'bg-blue-200 text-blue-900 dark:bg-blue-300 dark:text-blue-900 font-bold');

    // For index.html active buttons
    if (file === 'index.html' || file === 'main.js' || file === 'assets/js/core.js') {
        content = content.replace(/bg-blue-200', 'hover:bg-blue-200', 'text-white', 'dark:bg-blue-200', 'dark:hover:bg-blue-300'/g, "'bg-blue-200', 'hover:bg-blue-300', 'text-blue-900', 'dark:text-blue-900', 'dark:bg-blue-300', 'dark:hover:bg-blue-400'");
        content = content.replace(/bg-blue-200 hover:bg-blue-200 text-blue-900 dark:bg-blue-300 dark:text-blue-900 font-bold dark:bg-blue-200 dark:hover:bg-blue-300/g, "bg-blue-200 hover:bg-blue-300 text-blue-900 dark:text-blue-900 dark:bg-blue-300 dark:hover:bg-blue-400");
    }

    // Replace explicit CSS classes with matching prefixes in responses.html or core logic
    content = content.replace(/bg-blue-200/g, 'bg-blue-200');
    content = content.replace(/bg-blue-200/g, 'bg-blue-200');
    content = content.replace(/hover:bg-blue-300/g, 'hover:bg-blue-300');
    content = content.replace(/hover:bg-blue-200/g, 'hover:bg-blue-300');

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Updated buttons in ' + file);
    }
}
