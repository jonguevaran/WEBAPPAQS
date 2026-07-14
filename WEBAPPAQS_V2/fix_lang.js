const fs = require('fs');

// ===== FIX ALTAS.HTML =====
let altas = fs.readFileSync('Altas.html', 'utf8');

// 1. Change localStorage key from 'appLang' to 'lang' to be consistent
altas = altas.replace("localStorage.getItem('appLang') || 'pt'", "localStorage.getItem('lang') || 'es'");

// 2. Add postMessage listener so it responds to language changes from parent
const altasListenerCode = `
// Listen for language changes from parent frame
window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'changeLang') {
        currentLang = event.data.lang;
        applyTranslations();
    }
});
`;

// Insert it right after the DOMContentLoaded block
const altasAnchor = "window.addEventListener('DOMContentLoaded', () => {\r\n            applyTranslations();\r\n        });";
altas = altas.replace(altasAnchor, altasAnchor + altasListenerCode);

fs.writeFileSync('Altas.html', altas);
console.log('Altas.html fixed');

// ===== FIX ENTREGA.HTML =====
let entrega = fs.readFileSync('entrega.html', 'utf8');

// entrega.html is a React component compiled into the HTML
// We need to add a postMessage listener that triggers a language switch
// Let's check what language mechanism it has

const entregaLangIdx = entrega.indexOf('lang');
console.log('entrega lang context:', entrega.slice(entregaLangIdx, entregaLangIdx + 200));
