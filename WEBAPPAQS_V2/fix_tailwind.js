const fs = require('fs');

const files = ['DelegacionAlmacenes.html', 'Altas.html', 'entrega.html'];
for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        if (!content.includes('tailwind.config = { darkMode:')) {
            content = content.replace(/<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>/, '<script src="https://cdn.tailwindcss.com"></script>\n    <script>tailwind.config = { darkMode: "class" };</script>');
            fs.writeFileSync(file, content);
            console.log('Added tailwind config to ' + file);
        }
    }
}
