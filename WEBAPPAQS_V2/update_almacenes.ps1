$path = "c:\Users\ender\Desktop\AQSWEBAPP\WEBAPPAQS\WEBAPPAQS_V2\DelegacionAlmacenes.html"
$content = Get-Content -Path $path -Raw

# Helper to normalize newlines before replacing
$content = $content -replace "`r`n", "`n"

$find1 = '<select id="delegacion-select" class="w-full bg-white dark:bg-slate-800/50 border border-slate-300 text-black dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none block p-3.5 transition-all cursor-pointer font-medium hover:bg-slate-100 dark:hover:bg-slate-700">
                            <option value="" disabled selected data-i18n="alm_select_deleg">-- Elija una delegación --</option>
                        </select>' -replace "`r`n", "`n"
$rep1 = '<input type="text" id="delegacion-select" list="delegaciones-list" class="w-full bg-white dark:bg-slate-800/50 border border-slate-300 text-black dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none block p-3.5 transition-all font-medium hover:bg-slate-100 dark:hover:bg-slate-700" placeholder="-- Escriba para buscar delegación --">
                        <datalist id="delegaciones-list"></datalist>' -replace "`r`n", "`n"
$content = $content.Replace($find1, $rep1)

$find2 = '<select id="almacen-select" class="w-full bg-white dark:bg-slate-800/50 border border-slate-300 text-black dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none block p-3.5 transition-all cursor-pointer font-medium hover:bg-slate-100 dark:hover:bg-slate-700">
                            <option value="" disabled selected data-i18n="alm_select_alm">-- Elija un almacén --</option>
                        </select>' -replace "`r`n", "`n"
$rep2 = '<input type="text" id="almacen-select" list="almacenes-list" class="w-full bg-white dark:bg-slate-800/50 border border-slate-300 text-black dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none block p-3.5 transition-all font-medium hover:bg-slate-100 dark:hover:bg-slate-700" placeholder="-- Escriba para buscar almacén --">
                        <datalist id="almacenes-list"></datalist>' -replace "`r`n", "`n"
$content = $content.Replace($find2, $rep2)

$find3 = "const selectDelegacion = document.getElementById('delegacion-select');
        const selectAlmacen = document.getElementById('almacen-select');" -replace "`r`n", "`n"
$rep3 = "const selectDelegacion = document.getElementById('delegacion-select');
        const listDelegacion = document.getElementById('delegaciones-list');
        const selectAlmacen = document.getElementById('almacen-select');
        const listAlmacen = document.getElementById('almacenes-list');" -replace "`r`n", "`n"
$content = $content.Replace($find3, $rep3)

$find4 = "opt.value = del.id;
                opt.textContent = `${String(del.id).padStart(2, '0')} - ${del.nombre}`;
                selectDelegacion.appendChild(opt);" -replace "`r`n", "`n"
$rep4 = "opt.value = `${String(del.id).padStart(2, '0')} - ${del.nombre}`;
                listDelegacion.appendChild(opt);" -replace "`r`n", "`n"
$content = $content.Replace($find4, $rep4)

$find5 = "opt.value = alm.id;
                opt.textContent = `${alm.nombre} (ID: ${alm.id})`;
                selectAlmacen.appendChild(opt);" -replace "`r`n", "`n"
$rep5 = "opt.value = `${alm.nombre} (ID: ${alm.id})`;
                listAlmacen.appendChild(opt);" -replace "`r`n", "`n"
$content = $content.Replace($find5, $rep5)

$find6 = "selectDelegacion.addEventListener('change', (e) => {
            const id = parseInt(e.target.value);
            const delegacion = dbAquaservice.delegaciones.find(d => d.id === id);" -replace "`r`n", "`n"
$rep6 = "selectDelegacion.addEventListener('change', (e) => {
            const val = e.target.value;
            const match = val.match(/^(\d+)\s*-/);
            const id = match ? parseInt(match[1]) : NaN;
            if (isNaN(id)) return;
            const delegacion = dbAquaservice.delegaciones.find(d => d.id === id);" -replace "`r`n", "`n"
$content = $content.Replace($find6, $rep6)

$find7 = "selectAlmacen.addEventListener('change', (e) => {
            const almacenId = parseInt(e.target.value);
            
            // Encontrar qué delegación tiene este almacén en su lista" -replace "`r`n", "`n"
$rep7 = "selectAlmacen.addEventListener('change', (e) => {
            const val = e.target.value;
            const match = val.match(/\(ID:\s*(\d+)\)$/);
            const almacenId = match ? parseInt(match[1]) : NaN;
            if (isNaN(almacenId)) return;
            
            // Encontrar qué delegación tiene este almacén en su lista" -replace "`r`n", "`n"
$content = $content.Replace($find7, $rep7)

$find8 = "if (delegacion) {
                // Actualizar el selector de delegación visualmente
                selectDelegacion.value = delegacion.id;
                // Renderizar y pasar el ID del almacén para resaltarlo" -replace "`r`n", "`n"
$rep8 = "if (delegacion) {
                // Actualizar el selector de delegación visualmente
                selectDelegacion.value = `${String(delegacion.id).padStart(2, '0')} - ${delegacion.nombre}`;
                // Renderizar y pasar el ID del almacén para resaltarlo" -replace "`r`n", "`n"
$content = $content.Replace($find8, $rep8)

$content = $content -replace "`n", "`r`n"
$content | Set-Content -Path $path -NoNewline -Encoding UTF8
Write-Output 'Done'
