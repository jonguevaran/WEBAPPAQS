function initCore() {
  // Theme Management
  const themeBtn = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Update theme for all iframes
    document.querySelectorAll('iframe').forEach(iframe => {
      try {
        if (iframe.contentWindow && iframe.contentWindow.document) {
          if (theme === 'dark') {
            iframe.contentWindow.document.documentElement.classList.add('dark');
          } else {
            iframe.contentWindow.document.documentElement.classList.remove('dark');
          }
        }
      } catch (e) {
        console.warn('Cannot access iframe content for theme update', e);
      }
    });
  }

  applyTheme(currentTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      const newTheme = isDark ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
    });
  }

  // Language Management
  const langBtn = document.getElementById('lang-toggle');
  const currentLang = localStorage.getItem('lang') || 'es';

  function applyLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = window.translations && window.translations[lang] ? window.translations[lang][key] : null;
      if (text) {
        // If it's a tooltip or title, we might want to update those too
        updateElementTranslation(el, text);
      }
    });
    
    // Send message to iframes to update their languages
    document.querySelectorAll('iframe').forEach(iframe => {
      try {
         iframe.contentWindow.postMessage({ type: 'changeLang', lang: lang }, '*');
      } catch (e) {}
    });
  }

  applyLanguage(currentLang);

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const current = localStorage.getItem('lang') || 'es';
      const newLang = current === 'es' ? 'pt' : 'es';
      localStorage.setItem('lang', newLang);
      applyLanguage(newLang);
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCore);
} else {
  initCore();
}

// Listener for iframes receiving messages

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
