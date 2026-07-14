const fs = require('fs');
let content = fs.readFileSync('assets/js/core.js', 'utf8');

const newListener = `
function updateElementTranslation(el, text) {
  if (!text) return;
  if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea' || el.tagName.toLowerCase() === 'select') {
    if (el.hasAttribute('placeholder')) el.setAttribute('placeholder', text);
    else if (el.type === 'button' || el.type === 'submit') el.value = text;
    // For selects with options, we need to translate the options, so better to put data-i18n on the <option> itself
  } else if (el.tagName.toLowerCase() === 'option') {
    el.textContent = text;
  } else if (el.hasAttribute('data-tooltip') || el.hasAttribute('title')) {
    if (el.hasAttribute('data-tooltip')) el.setAttribute('data-tooltip', text);
    if (el.hasAttribute('title')) el.setAttribute('title', text);
    if (el.hasAttribute('aria-label')) el.setAttribute('aria-label', text);
    
    // Attempt to replace text node cleanly
    let hasTextNode = false;
    for (let i = 0; i < el.childNodes.length; i++) {
        if (el.childNodes[i].nodeType === 3 && el.childNodes[i].nodeValue.trim().length > 0) {
            el.childNodes[i].nodeValue = ' ' + text + ' ';
            hasTextNode = true;
            break;
        }
    }
    if (!hasTextNode && !el.querySelector('i') && !el.querySelector('svg')) {
       el.textContent = text;
    }
  } else {
    // Attempt to replace text node without killing HTML tags (like icons)
    let hasTextNode = false;
    for (let i = 0; i < el.childNodes.length; i++) {
        if (el.childNodes[i].nodeType === 3 && el.childNodes[i].nodeValue.trim().length > 0) {
            el.childNodes[i].nodeValue = ' ' + text + ' ';
            hasTextNode = true;
            break;
        }
    }
    if (!hasTextNode) {
       el.innerHTML = text;
    }
  }
}

window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'changeLang') {
    const lang = event.data.lang;
    if (window.translations && window.translations[lang]) {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (window.translations[lang][key]) {
          updateElementTranslation(el, window.translations[lang][key]);
        }
      });
    }
  }
});
`;

// remove old listener
content = content.replace(/window\.addEventListener\('message', \(event\) => \{[\s\S]*?\}\);\s*$/, newListener);

// update applyLanguage logic
content = content.replace(/if \(el\.tagName\.toLowerCase\(\) === 'button' && el\.hasAttribute\('data-tooltip'\)\) \{[\s\S]*?\} else \{[\s\S]*?el\.textContent = text;[\s\S]*?\}/, 'updateElementTranslation(el, text);');

fs.writeFileSync('assets/js/core.js', content);
console.log('core.js updated');
