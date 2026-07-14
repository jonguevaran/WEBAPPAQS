const fs = require('fs');
let entrega = fs.readFileSync('entrega.html', 'utf8');

// Remove the old script block entirely
const oldScriptStart = entrega.indexOf('\n<script>\n// Translations for entrega.html');
const oldScriptEnd = entrega.indexOf('</script>\n</body>') + '</script>'.length;

if (oldScriptStart === -1 || oldScriptEnd === -1) {
    console.log('Could not find old script block boundaries');
    console.log('Start:', oldScriptStart, 'End:', oldScriptEnd);
    process.exit(1);
}

const before = entrega.slice(0, oldScriptStart);
const after = entrega.slice(oldScriptEnd);

const newScript = `
<script>
// Bidirectional translations for entrega.html (React-compiled page)
// Keys are ALWAYS the Spanish (original) text
const _entregaDict = {
  'Generador Entrega Equipos': 'Gerador de Entrega de Equipamentos',
  'Generar PDF Oficial': 'Gerar PDF Oficial',
  'Precargar datos de Altas': 'Pré-carregar dados de Cadastros',
  'Limpiar': 'Limpar',
  '-- Seleccionar un alta --': '-- Selecionar um cadastro --',
  'Idioma del Documento': 'Idioma do Documento',
  'Datos del Empleado': 'Dados do Colaborador',
  'Nombre Completo': 'Nome Completo',
  'REF/Pedido': 'REF/Pedido',
  'Entrega de Recursos IT': 'Entrega de Recursos IT',
  'Lugar de firma': 'Local de assinatura',
  'Fecha': 'Data',
  'Vista Previa del Documento (A4)': 'Pré-visualização do Documento (A4)'
};

// Build reverse map: PT -> ES key
const _entregaReverse = {};
for (const [es, pt] of Object.entries(_entregaDict)) {
  _entregaReverse[pt] = es;
}

// On first pass, tag every translatable text node with data-orig-text
let _entregaInitialized = false;

function _entregaTagNodes() {
  if (_entregaInitialized) return;
  _entregaInitialized = true;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while ((node = walker.nextNode())) {
    const trimmed = (node.nodeValue || '').trim();
    if (trimmed && (trimmed in _entregaDict || trimmed in _entregaReverse)) {
      // Store the Spanish (original) key
      const esKey = trimmed in _entregaDict ? trimmed : _entregaReverse[trimmed];
      // Use a custom expando property since text nodes don't have dataset
      node._entregaKey = esKey;
    }
  }

  // Tag placeholders and options too
  document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
    const ph = el.getAttribute('placeholder');
    if (ph in _entregaDict) el.setAttribute('data-orig-ph', ph);
    else if (ph in _entregaReverse) el.setAttribute('data-orig-ph', _entregaReverse[ph]);
  });

  document.querySelectorAll('option').forEach(el => {
    const t = el.textContent.trim();
    if (t in _entregaDict) el.setAttribute('data-orig-text', t);
    else if (t in _entregaReverse) el.setAttribute('data-orig-text', _entregaReverse[t]);
  });
}

function applyEntregaTranslations(lang) {
  _entregaTagNodes();

  // Walk tagged text nodes
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while ((node = walker.nextNode())) {
    if (node._entregaKey) {
      const esKey = node._entregaKey;
      const targetText = lang === 'pt' ? (_entregaDict[esKey] || esKey) : esKey;
      if (node.nodeValue.trim() !== targetText) {
        node.nodeValue = node.nodeValue.replace(node.nodeValue.trim(), targetText);
      }
    }
  }

  // Also re-scan for any new nodes React may have added
  const walker2 = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  while ((node = walker2.nextNode())) {
    if (!node._entregaKey) {
      const trimmed = (node.nodeValue || '').trim();
      if (trimmed in _entregaDict) {
        node._entregaKey = trimmed;
        const targetText = lang === 'pt' ? _entregaDict[trimmed] : trimmed;
        if (trimmed !== targetText) node.nodeValue = node.nodeValue.replace(trimmed, targetText);
      } else if (trimmed in _entregaReverse) {
        node._entregaKey = _entregaReverse[trimmed];
        const targetText = lang === 'pt' ? trimmed : _entregaReverse[trimmed];
        if (trimmed !== targetText) node.nodeValue = node.nodeValue.replace(trimmed, targetText);
      }
    }
  }

  // Placeholders
  document.querySelectorAll('[data-orig-ph]').forEach(el => {
    const esKey = el.getAttribute('data-orig-ph');
    el.setAttribute('placeholder', lang === 'pt' ? (_entregaDict[esKey] || esKey) : esKey);
  });

  // Options
  document.querySelectorAll('[data-orig-text]').forEach(el => {
    const esKey = el.getAttribute('data-orig-text');
    el.textContent = lang === 'pt' ? (_entregaDict[esKey] || esKey) : esKey;
  });
}

// Listen for language messages from parent frame
window.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'changeLang') {
    const lang = event.data.lang;
    localStorage.setItem('lang', lang);
    setTimeout(function() { applyEntregaTranslations(lang); }, 100);
  }
});

// Apply on load based on stored lang
document.addEventListener('DOMContentLoaded', function() {
  const lang = localStorage.getItem('lang') || 'es';
  if (lang !== 'es') {
    setTimeout(function() { applyEntregaTranslations(lang); }, 500);
  }
});
</script>`;

entrega = before + newScript + after;
fs.writeFileSync('entrega.html', entrega);
console.log('entrega.html translation script replaced successfully');
