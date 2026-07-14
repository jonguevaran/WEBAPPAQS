const fs = require('fs');
let c = fs.readFileSync('DelegacionAlmacenes.html', 'utf8');

// The extra </head> and <body> block was injected in duplicate at line ~49
// Find and remove the orphaned </head>\n<body...> that appeared midway
c = c.replace(/\n<\/head>\n<body class="bg-white dark:bg-slate-800\/50 min-h-screen font-sans antialiased text-black dark:text-slate-200">\n\n    <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">\n        \n<\/head>/, '');

fs.writeFileSync('DelegacionAlmacenes.html', c);
console.log('Fixed duplicate tags. head count:', (c.match(/<\/head>/gi) || []).length);
