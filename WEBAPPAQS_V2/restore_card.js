const fs = require('fs');
let content = fs.readFileSync('DelegacionAlmacenes.html', 'utf8');

const cardHTML = `
                    <!-- Selector Almacén -->
                    <div>
                        <label for="almacen-select" class="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                            <svg class="w-4 h-4 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                            Buscar por Almacén
                        </label>
                        <select id="almacen-select" class="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-300 text-slate-900 dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none block p-3.5 transition-all cursor-pointer font-medium hover:bg-slate-100 dark:hover:bg-slate-700">
                            <option value="" disabled selected>-- Elija un almacén --</option>
                        </select>
                    </div>
                </div>

                <!-- Tarjeta Info Delegación (Oculta por defecto) -->
                <div id="info-delegacion" class="hidden bg-gradient-to-br from-indigo-900 to-indigo-950 p-6 rounded-2xl text-white shadow-md relative overflow-hidden">
                    <p class="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Delegación Activa</p>
                    <p id="nombre-delegacion-activa" class="text-2xl font-black mt-1 tracking-tight relative z-10 text-white"></p>
                    <div class="mt-5 pt-4 border-t border-indigo-800/60 flex justify-between items-center text-xs text-indigo-200 relative z-10">
                        <span class="text-indigo-200">ID Registro:</span>
                        <span id="id-delegacion-activa" class="font-mono bg-indigo-800/50 px-2.5 py-1 rounded-md text-white font-bold tracking-wider"></span>
                    </div>
                </div>
            </aside>
`;

content = content.replace(/<!-- Selector Almacén -->[\s\S]*?<\/aside>/i, cardHTML);

fs.writeFileSync('DelegacionAlmacenes.html', content);
console.log('Restored info card');
