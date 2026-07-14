const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'Altas.html');
let content = fs.readFileSync(filePath, 'utf8');

// Modification 1: Sync all name fields
const blockRegex = /\/\/\s*Mantener sincronizados los campos de nombre completo si cambia Nombre o Apellido Normalizado[\s\S]*?if\s*\('Nombres Apellidos'\s*in\s*record\)\s*\{\s*record\['Nombres Apellidos'\]\s*=\s*`\$\{currentName\}\s*\$\{currentLastName\}`\.trim\(\);\s*\}\s*\}/;

const newSyncBlock = `// Sincronizar todos los campos de nombre
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
                                    const current = record[key] || '';
                                    record[key] = isUppercase ? current.toUpperCase() : toTitleCaseStr(current);
                                }
                            }
                        });
                    }`;

content = content.replace(blockRegex, newSyncBlock);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed Altas logic with regex');
