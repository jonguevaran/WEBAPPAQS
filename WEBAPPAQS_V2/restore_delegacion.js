const fs = require('fs');
let content = fs.readFileSync('DelegacionAlmacenes.html', 'utf8');

const missingBlock = `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <!-- PANEL LATERAL (4 Columnas) -->
            <aside class="lg:col-span-4 flex flex-col gap-6">
                <!-- Tarjeta de Controles (Selectores) -->
                <div class="glass dark:border-slate-700 p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-5">
                    
                    <!-- Selector Delegación -->
                    <div>
                        <label for="delegacion-select" class="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                            <svg class="w-4 h-4 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            Buscar por Delegación
                        </label>
                        <select id="delegacion-select" class="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-300 text-slate-800 dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none block p-3.5 transition-all cursor-pointer font-medium hover:bg-slate-100 dark:hover:bg-slate-700">
                            <option value="" disabled selected>-- Elija una delegación --</option>
                        </select>
                    </div>

                    <!-- Divisor Visual -->
                    <div class="relative flex items-center py-2">
`;

content = content.replace(/<\/header>\s*<div class="flex-grow border-t border-slate-100/i, '</header>\n' + missingBlock + '                        <div class="flex-grow border-t border-slate-100');

fs.writeFileSync('DelegacionAlmacenes.html', content);
console.log('Restored and fixed delegacion block');
