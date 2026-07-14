const fs = require('fs');
let pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts.build = "vite build && xcopy /E /I /Y assets dist\\assets";
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('Build script updated');
