const fs = require('fs');
let html = fs.readFileSync('respuestas.html', 'utf8');

// 1. Fix the missing div for Solucion and add a clear separation
// Right now we have:
//                </button>
//            <!-- Plantillas Personalizadas -->
html = html.replace(
    '</button>\n            \n            <!-- Plantillas Personalizadas -->',
    '</button>\n            </div>\n\n            <!-- Plantillas Personalizadas -->\n            <div class=\"mt-6 pt-6 border-t border-gray-200\">\n                <h2 class=\"text-md font-bold text-gray-800 mb-4 flex items-center gap-2\">\n                    <i class=\"fa-solid fa-user-pen text-blue-500\"></i> Respuestas Personalizadas\n                </h2>'
);

// We need to also close the new separator div if we wrapped it, actually let's just make sure it's structurally sound.
// Let's replace the whole custom section down to "mt-6 border-t" to insert our separator cleanly.
// Let's use a more robust regex to find the start of Plantillas Personalizadas
html = html.replace(
    /<\/button>\s*<!-- Plantillas Personalizadas -->\s*<div id=\"customRepliesContainer\"><\/div>\s*<div class=\"mt-6 border-t border-gray-200 pt-6\">/,
    `</button>
            </div>

            <div class="mt-8 mb-4 flex items-center">
                <div class="flex-grow border-t border-gray-200"></div>
                <span class="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium"><i class="fa-solid fa-bookmark"></i> Personalizadas</span>
                <div class="flex-grow border-t border-gray-200"></div>
            </div>

            <!-- Plantillas Personalizadas -->
            <div id="customRepliesContainer"></div>

            <div class="mt-6 border-t border-gray-200 pt-6">`
);

// 2. Add Editing logic
// Update renderCustomReplies to add edit button
let oldRender = `
                    <button onclick="deleteCustomReply(\${index})" class="absolute top-3 right-3 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity" title="Eliminar respuesta">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <h3 class="text-lg font-bold text-blue-900 mb-3">\${num}. \${reply.title}</h3>`;
let newRender = `
                    <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <button onclick="editCustomReply(\${index})" class="text-blue-400 hover:text-blue-600" title="Editar respuesta">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button onclick="deleteCustomReply(\${index})" class="text-red-400 hover:text-red-600" title="Eliminar respuesta">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    <h3 class="text-lg font-bold text-blue-900 mb-3">\${num}. \${reply.title}</h3>`;
html = html.replace(oldRender, newRender);

// 3. Update JS for editing
// Add editingIndex
html = html.replace("let customReplies = JSON.parse(localStorage.getItem('customReplies') || '[]');", "let customReplies = JSON.parse(localStorage.getItem('customReplies') || '[]');\n        let editingIndex = -1;");

// Add editCustomReply function
const editFunc = `
        function editCustomReply(index) {
            editingIndex = index;
            const reply = customReplies[index];
            document.getElementById('customTitle').value = reply.title;
            document.getElementById('customTextES').value = reply.textES;
            document.getElementById('customTextPT').value = reply.textPT;
            
            const btnSave = document.getElementById('btnSaveCustom');
            if(btnSave) {
                btnSave.innerHTML = '<i class="fa-solid fa-save mr-1"></i> Actualizar Respuesta';
                btnSave.classList.replace('bg-blue-600', 'bg-indigo-600');
                btnSave.classList.replace('hover:bg-blue-700', 'hover:bg-indigo-700');
            }
            
            // Scroll to form
            document.getElementById('customTitle').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
`;
html = html.replace('function saveCustomReply() {', editFunc + '\n        function saveCustomReply() {');

// Add ID to save button so we can change it
html = html.replace(
    '<button onclick="saveCustomReply()" class="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md shadow-sm transition-colors mt-1">',
    '<button id="btnSaveCustom" onclick="saveCustomReply()" class="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md shadow-sm transition-colors mt-1">'
);

// Update saveCustomReply to handle update
const oldSaveBody = `
            customReplies.push({ id: Date.now(), title, textES, textPT });
            localStorage.setItem('customReplies', JSON.stringify(customReplies));
            
            document.getElementById('customTitle').value = '';
            document.getElementById('customTextES').value = '';
            document.getElementById('customTextPT').value = '';
            
            renderCustomReplies();
            showToast("¡Respuesta guardada!");
`;
const newSaveBody = `
            if (editingIndex >= 0) {
                customReplies[editingIndex].title = title;
                customReplies[editingIndex].textES = textES;
                customReplies[editingIndex].textPT = textPT;
                editingIndex = -1;
                const btnSave = document.getElementById('btnSaveCustom');
                btnSave.innerHTML = '<i class="fa-solid fa-save mr-1"></i> Guardar Respuesta';
                btnSave.classList.replace('bg-indigo-600', 'bg-blue-600');
                btnSave.classList.replace('hover:bg-indigo-700', 'hover:bg-blue-700');
                showToast("¡Respuesta actualizada!");
            } else {
                customReplies.push({ id: Date.now(), title, textES, textPT });
                showToast("¡Respuesta guardada!");
            }
            localStorage.setItem('customReplies', JSON.stringify(customReplies));
            
            document.getElementById('customTitle').value = '';
            document.getElementById('customTextES').value = '';
            document.getElementById('customTextPT').value = '';
            
            renderCustomReplies();
`;
html = html.replace(oldSaveBody, newSaveBody);

fs.writeFileSync('respuestas.html', html);
console.log('Done!');
