const fs = require('fs');
let html = fs.readFileSync('respuestas.html', 'utf8');

// Update UI titles and colors
html = html.replace(/<h3 class=\"text-sm font-bold text-gray-700 mb-3\">(\d\.\s+.*?)<\/h3>/g, '<h3 class=\"text-lg font-bold text-blue-900 mb-3\">$1</h3>');

// Update Escalar UI
html = html.replace(
  '<div class=\"mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200\">\n                <h3 class=\"text-lg font-bold text-blue-900 mb-3\">1. Escalar</h3>',
  '<div class=\"mb-4 bg-orange-50 p-4 rounded-lg border border-orange-200\">\n                <h3 class=\"text-lg font-bold text-blue-900 mb-3\">1. Escalar</h3>'
);
html = html.replace(
  '<button id=\"btnCopyEscalar\" class=\"w-full bg-white border border-gray-300 text-gray-700 hover:text-indigo-600 hover:border-indigo-400',
  '<button id=\"btnCopyEscalar\" class=\"w-full bg-white border border-orange-300 text-gray-700 hover:text-orange-600 hover:border-orange-500 hover:bg-orange-50'
);
html = html.replace(
  '<i class=\"fa-regular fa-copy\"></i> Copiar Respuesta Escalar',
  '<i class=\"fa-solid fa-arrow-up-right-dots text-orange-500\"></i> Copiar Respuesta Escalar'
);

// Update Solucion UI
html = html.replace(
  '<div class=\"mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200\">\n                <h3 class=\"text-lg font-bold text-blue-900 mb-3\">4. Solución</h3>',
  '<div class=\"mb-4 bg-green-50 p-4 rounded-lg border border-green-200\">\n                <h3 class=\"text-lg font-bold text-blue-900 mb-3\">4. Solución</h3>'
);
html = html.replace(
  '<button id=\"btnCopySolucion\" class=\"w-full bg-white border border-gray-300 text-gray-700 hover:text-green-600 hover:border-green-400',
  '<button id=\"btnCopySolucion\" class=\"w-full bg-white border border-green-300 text-gray-700 hover:text-green-600 hover:border-green-500 hover:bg-green-50'
);
html = html.replace(
  '<i class=\"fa-regular fa-copy\"></i> Copiar Solución',
  '<i class=\"fa-solid fa-check text-green-500\"></i> Copiar Solución'
);

// Add custom replies HTML
const customHTML = `
            <!-- Plantillas Personalizadas -->
            <div id="customRepliesContainer"></div>

            <div class="mt-6 border-t border-gray-200 pt-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-md font-bold text-gray-800 flex items-center gap-2">
                        <i class="fa-solid fa-plus-circle text-blue-500"></i> Agregar Nueva Respuesta
                    </h3>
                    <div class="flex gap-2">
                        <button onclick="downloadCustomReplies()" class="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 px-3 rounded border border-gray-300 flex items-center gap-1 transition-colors" title="Descargar respuestas">
                            <i class="fa-solid fa-download"></i> Descargar
                        </button>
                        <label class="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 px-3 rounded border border-gray-300 flex items-center gap-1 transition-colors cursor-pointer" title="Cargar desde JSON">
                            <i class="fa-solid fa-upload"></i> Cargar
                            <input type="file" id="uploadJson" accept=".json" class="hidden" onchange="uploadCustomReplies(event)">
                        </label>
                    </div>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col gap-3">
                    <input type="text" id="customTitle" placeholder="Título (ej: Confirmación de datos)" class="w-full text-sm p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 text-gray-700">
                    <textarea id="customTextES" rows="2" class="w-full text-sm p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-700" placeholder="Texto en Español (sin saludo inicial ni firma)"></textarea>
                    <textarea id="customTextPT" rows="2" class="w-full text-sm p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-700" placeholder="Texto en Portugués (sin saludo inicial ni firma)"></textarea>
                    <button onclick="saveCustomReply()" class="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md shadow-sm transition-colors mt-1">
                        <i class="fa-solid fa-save mr-1"></i> Guardar Respuesta
                    </button>
                </div>
            </div>
`;
html = html.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<!-- Toast Notification -->/g, customHTML + '\n        </div>\n    </div>\n\n    <!-- Toast Notification -->');

// Add JS logic
const customJS = `
        let customReplies = JSON.parse(localStorage.getItem('customReplies') || '[]');

        function renderCustomReplies() {
            const container = document.getElementById('customRepliesContainer');
            if(!container) return;
            container.innerHTML = '';
            
            customReplies.forEach((reply, index) => {
                const num = 5 + index;
                const div = document.createElement('div');
                div.className = "mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200 relative group";
                div.innerHTML = \`
                    <button onclick="deleteCustomReply(\${index})" class="absolute top-3 right-3 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity" title="Eliminar respuesta">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <h3 class="text-lg font-bold text-blue-900 mb-3">\${num}. \${reply.title}</h3>
                    <button onclick="copyCustomReply(\${index})" class="w-full bg-white border border-gray-300 text-gray-700 hover:text-indigo-600 hover:border-indigo-400 text-sm font-medium py-2.5 px-4 rounded-md shadow-sm flex items-center justify-center gap-2 transition-colors" id="btnCopyCustom_\${index}">
                        <i class="fa-regular fa-copy"></i> Copiar \${reply.title}
                    </button>
                \`;
                container.appendChild(div);
            });
            updateTooltips();
        }

        function saveCustomReply() {
            const title = document.getElementById('customTitle').value.trim();
            const textES = document.getElementById('customTextES').value.trim();
            const textPT = document.getElementById('customTextPT').value.trim();
            
            if(!title || !textES || !textPT) {
                alert("Por favor, completa el título y los textos en ambos idiomas.");
                return;
            }
            
            customReplies.push({ id: Date.now(), title, textES, textPT });
            localStorage.setItem('customReplies', JSON.stringify(customReplies));
            
            document.getElementById('customTitle').value = '';
            document.getElementById('customTextES').value = '';
            document.getElementById('customTextPT').value = '';
            
            renderCustomReplies();
            showToast("¡Respuesta guardada!");
        }

        function deleteCustomReply(index) {
            if(confirm("¿Seguro que deseas eliminar esta respuesta?")) {
                customReplies.splice(index, 1);
                localStorage.setItem('customReplies', JSON.stringify(customReplies));
                renderCustomReplies();
            }
        }

        function copyCustomReply(index) {
            const reply = customReplies[index];
            const isPT = chkIdiomaPT.checked;
            const greeting = getGreeting(isPT);
            const text = isPT ? reply.textPT : reply.textES;
            const signoff = isPT ? "Com os melhores cumprimentos," : "Saludos";
            
            const fullText = \`\${greeting}\\n\\n\${text}\\n\\n\${signoff}\`;
            copyToClipboard(fullText);
        }

        function downloadCustomReplies() {
            if (customReplies.length === 0) {
                alert("No hay respuestas personalizadas para descargar.");
                return;
            }
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(customReplies, null, 2));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "respuestas_personalizadas.json");
            document.body.appendChild(downloadAnchorNode); 
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        }

        function uploadCustomReplies(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const parsed = JSON.parse(e.target.result);
                    if (Array.isArray(parsed)) {
                        customReplies = [...customReplies, ...parsed];
                        localStorage.setItem('customReplies', JSON.stringify(customReplies));
                        renderCustomReplies();
                        showToast("¡Respuestas cargadas!");
                    } else {
                        alert("El archivo no tiene un formato válido.");
                    }
                } catch (err) {
                    alert("Error al leer el archivo JSON.");
                }
            };
            reader.readAsText(file);
            event.target.value = '';
        }
`;

html = html.replace('function updateTooltips() {', customJS + '\n\n        function updateTooltips() {');

// Inside updateTooltips we need to update titles for custom replies
const updateTooltipsInject = `
            customReplies.forEach((reply, idx) => {
                const btn = document.getElementById(\`btnCopyCustom_\${idx}\`);
                if (btn) {
                    const text = isPT ? reply.textPT : reply.textES;
                    const signoff = isPT ? "Com os melhores cumprimentos," : "Saludos";
                    btn.title = \`\${getGreeting(isPT)}\\n\\n\${text}\\n\\n\${signoff}\`;
                }
            });
`;
html = html.replace('btnCopySolucion.title = getSolucionText(isPT);', 'btnCopySolucion.title = getSolucionText(isPT);\n' + updateTooltipsInject);

// Call renderCustomReplies on init
html = html.replace('// Initialize tooltips on load', 'renderCustomReplies();\n        // Initialize tooltips on load');

fs.writeFileSync('respuestas.html', html);
console.log('Done!');
