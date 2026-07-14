const fs = require('fs');

const logoB64 = fs.readFileSync('logo.png', 'base64');
const dataUri = 'data:image/png;base64,' + logoB64;

['cartas_v2.html', 'entrega.html'].forEach(f => {
    let text = fs.readFileSync(f, 'utf8');
    text = text.replace(/`logo\.png`/g, '`' + dataUri + '`')
               .replace(/"logo\.png"/g, '"' + dataUri + '"')
               .replace(/'logo\.png'/g, "'" + dataUri + "'");
    fs.writeFileSync(f, text);
});

let idx = fs.readFileSync('index.html', 'utf8');
if (!idx.includes("localStorage.getItem('theme') === 'dark'")) {
    idx = idx.replace('<head>', "<head>\n    <script>if(localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');</script>");
    fs.writeFileSync('index.html', idx);
}

let main = fs.readFileSync('main.js', 'utf8');
if (!main.includes('show: false')) {
    main = main.replace('height: 800,', 'height: 800,\n    show: false,\n    backgroundColor: "#f8fafc",');
    main = main.replace('mainWindow.setMenuBarVisibility(false);', "mainWindow.setMenuBarVisibility(false);\n\n  mainWindow.once('ready-to-show', () => {\n    mainWindow.show();\n  });");
    fs.writeFileSync('main.js', main);
}

console.log('Fixed everything');
