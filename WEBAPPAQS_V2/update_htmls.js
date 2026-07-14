const fs = require('fs');
const path = require('path');

const files = ['Altas.html', 'entrega.html', 'DelegacionAlmacenes.html'];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${file}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Add theme.css if not present
    if (!content.includes('assets/css/theme.css')) {
        content = content.replace(/<\/head>/i, '    <link rel="stylesheet" href="assets/css/theme.css">\n</head>');
    }

    // Add scripts if not present
    if (!content.includes('assets/js/core.js')) {
        content = content.replace(/<\/body>/i, '    <script src="assets/js/i18n.js"></script>\n    <script src="assets/js/core.js"></script>\n</body>');
    }

    // Update body background to transparent
    content = content.replace(/body\s*{\s*font-family:[^;]+;\s*background-color:\s*#[0-9a-fA-F]+;\s*}/i, (match) => {
        return match.replace(/background-color:\s*#[0-9a-fA-F]+;/, 'background-color: transparent;');
    });

    // Make body dark-mode friendly
    content = content.replace(/<body([^>]*)class="([^"]*)"([^>]*)>/i, (match, p1, p2, p3) => {
        let classes = p2.split(' ');
        if (!classes.includes('bg-transparent')) classes.push('bg-transparent');
        if (!classes.includes('dark:text-slate-200')) classes.push('dark:text-slate-200');
        return `<body${p1}class="${classes.join(' ')}"${p3}>`;
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
});
