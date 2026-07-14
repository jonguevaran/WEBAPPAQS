const fs = require('fs');

const files = ['entrega.html', 'cartas_v2.html', 'Altas.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Restore bg-white to sidebar
    content = content.replace(/class=\"w-full md:w-1\/3 glass([^>]*)\"/g, 'class="w-full md:w-1/3 bg-white$1"');

    // Restore section backgrounds in the form
    content = content.replace(/class=\"glass([^\"]*)border-green-100\"/g, 'class="bg-green-50$1border-green-100"');
    content = content.replace(/class=\"glass([^\"]*)border-yellow-200\"/g, 'class="bg-yellow-50$1border-yellow-200"');
    content = content.replace(/class=\"glass([^\"]*)border-blue-100\"/g, 'class="bg-blue-50$1border-blue-100"');
    
    // For general empty sections
    content = content.replace(/<section class=\"glass([^\"]*)\">/g, '<section class="bg-white$1">');
    
    // Restore the header Generador logo
    content = content.replace(/<div class=\"flex items-center gap-2 mb-6 text-blue-600\">/g, '<div class="flex items-center gap-2 mb-6 text-blue-600">');

    fs.writeFileSync(file, content);
});
console.log('Reverted glass to light backgrounds');
