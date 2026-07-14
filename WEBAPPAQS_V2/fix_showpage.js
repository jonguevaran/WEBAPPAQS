const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Find the broken spot — lines 144-145 have orphaned });
// The showPage function and button.forEach are missing
// We'll add them right before line 144's orphaned '});'

const badCode = `        }\n\n            });\r\n        });\r\n`;
const fixedCode = `        }\n\n        function showPage(page) {\n            frames.forEach(frame => {\n                frame.classList.toggle('hidden-frame', frame.dataset.page !== page);\n            });\n            localStorage.setItem(storageKey, page);\n            // Notify the newly visible iframe of the current language\n            const currentLang = localStorage.getItem('lang') || 'es';\n            const activeFrame = document.getElementById('frame-' + page);\n            if (activeFrame && activeFrame.contentWindow) {\n                setTimeout(() => {\n                    try {\n                        activeFrame.contentWindow.postMessage({ type: 'changeLang', lang: currentLang }, '*');\n                    } catch(e) {}\n                }, 150);\n            }\n        }\n\n        buttons.forEach(button => {\n            button.addEventListener('click', () => {\n                const page = button.dataset.page;\n                setActiveButton(button);\n                showPage(page);\n            });\n        });\n\n`;

content = content.replace(badCode, fixedCode);

fs.writeFileSync('index.html', content);
console.log('Fixed! Contains showPage:', content.includes('function showPage'));
