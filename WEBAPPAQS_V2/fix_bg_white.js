const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Replace standalone bg-white with glass and some dark adjustments
    let newContent = content.replace(/\bbg-white\b/g, 'glass dark:border-slate-700');
    
    if (content !== newContent) {
        fs.writeFileSync(f, newContent, 'utf8');
        console.log('Fixed bg-white in ' + f);
    }
});
