const fs = require('fs');
let content = fs.readFileSync('DelegacionAlmacenes.html', 'utf8');

const replacement = `
                        <div class="p-3 \${iconBgClass} rounded-xl text-white shadow-sm flex-shrink-0 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                            </svg>
                        </div>
                        <div class="min-w-0 flex-1">
                            <h3 class="font-bold \${titleColorClass} truncate tracking-tight text-sm sm:text-base">\${nombre}</h3>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Cód: <span class="font-mono font-bold text-slate-700 dark:text-slate-900 bg-slate-200/80 px-1.5 py-0.5 rounded">\${id}</span></p>
                        </div>
                    \`;
                    
                    listaAlmacenes.appendChild(card);

                    // Animación en cascada
`;

content = content.replace(/card\.innerHTML = `[\s\S]*?\/\/ Animación en cascada/is, 'card.innerHTML = `' + replacement);

fs.writeFileSync('DelegacionAlmacenes.html', content);
console.log('Restored card generation logic and fixed badge text color');
