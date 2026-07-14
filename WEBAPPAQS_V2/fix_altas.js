const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'Altas.html');
let content = fs.readFileSync(filePath, 'utf8');

// Modification 1: Sync all name fields
const originalSyncBlock = `                    // Mantener sincronizados los campos de nombre completo si cambia Nombre o Apellido Normalizado
                    if (realKey === 'Nombre Normalizado' || realKey === 'Apellido Normalizado') {
                        const isUppercase = (newText === newText.toUpperCase());
                        
                        const otherKey = realKey === 'Nombre Normalizado' ? 'Apellido Normalizado' : 'Nombre Normalizado';
                        const otherTargetKeyId = sanitizeId(otherKey);
                        const otherId = \`field_\${otherTargetKeyId}_\${id.substring(id.lastIndexOf('_') + 1)}\`;
                        const otherEl = document.getElementById(otherId);
                        
                        if (otherEl) {
                            const otherCurrent = otherEl.textContent.trim();
                            const otherOriginal = otherEl.dataset.original || otherCurrent;
                            const otherNewText = isUppercase ? otherCurrent.toUpperCase() : toTitleCaseStr(otherOriginal);
                            otherEl.textContent = otherNewText;
                            record[otherKey] = otherNewText;
                        }

                        const currentName = record['Nombre Normalizado'] || '';
                        const currentLastName = record['Apellido Normalizado'] || '';
                        
                        if ('Nombre Completo Normalizado' in record) {
                            record['Nombre Completo Normalizado'] = \`\${currentName} \${currentLastName}\`.trim();
                        }
                        if ('Nombres Apellidos' in record) {
                            record['Nombres Apellidos'] = \`\${currentName} \${currentLastName}\`.trim();
                        }
                    }`;

const newSyncBlock = `                    // Sincronizar todos los campos de nombre
                    const nameFields = ['Nombre Normalizado', 'Apellido Normalizado', 'Nombre Completo Normalizado', 'Nombres Apellidos'];
                    if (nameFields.includes(realKey)) {
                        const isUppercase = (newText === newText.toUpperCase());
                        
                        nameFields.forEach(key => {
                            if (key !== realKey && (key in record)) {
                                const targetKeyId = sanitizeId(key);
                                const otherId = \`field_\${targetKeyId}_\${id.substring(id.lastIndexOf('_') + 1)}\`;
                                const otherEl = document.getElementById(otherId);
                                
                                if (otherEl) {
                                    const otherCurrent = otherEl.textContent.trim();
                                    const otherOriginal = otherEl.dataset.original || otherCurrent;
                                    const otherNewText = isUppercase ? otherCurrent.toUpperCase() : toTitleCaseStr(otherOriginal);
                                    otherEl.textContent = otherNewText;
                                    record[key] = otherNewText;
                                } else {
                                    // Update memory if not rendered
                                    const current = record[key] || '';
                                    record[key] = isUppercase ? current.toUpperCase() : toTitleCaseStr(current);
                                }
                            }
                        });
                    }`;

content = content.replace(originalSyncBlock, newSyncBlock);

// Modification 2: Color orange for user
content = content.replace(
    /else if\(lk === 'usuario' \|\| lk === 'user' \|\| lk === 'utilizador'\) dk = i18n\[currentLang\]\.lbl_user;/,
    `else if(lk === 'usuario' || lk === 'user' || lk === 'utilizador') { dk = i18n[currentLang].lbl_user; labelClasses = "text-orange-500 dark:text-orange-400"; }`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed Altas logic');
