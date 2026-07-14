const fs = require('fs');

// === ENTREGA.HTML: add postMessage listener that translates UI after React renders ===
let entrega = fs.readFileSync('entrega.html', 'utf8');

const entregaScript = `
<script>
// Translations for entrega.html UI labels (React-compiled page)
const entregaTranslations = {
  es: {
    'Generador Entrega Equipos': 'Generador Entrega Equipos',
    'Generar PDF Oficial': 'Generar PDF Oficial',
    'Precargar datos de Altas': 'Precargar datos de Altas',
    'Limpiar': 'Limpiar',
    '-- Seleccionar un alta --': '-- Seleccionar un alta --',
    'Idioma del Documento': 'Idioma del Documento',
    'Datos del Empleado': 'Datos del Empleado',
    'Nombre Completo': 'Nombre Completo',
    'REF/Pedido': 'REF/Pedido',
    'Entrega de Recursos IT': 'Entrega de Recursos IT',
    'Lugar de firma': 'Lugar de firma',
    'Fecha': 'Fecha',
    '+ Añadir otro equipo': '+ Añadir otro equipo',
    'Vista Previa del Documento (A4)': 'Vista Previa del Documento (A4)'
  },
  pt: {
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
    '+ Añadir otro equipo': '+ Adicionar outro equipamento',
    'Vista Previa del Documento (A4)': 'Pré-visualização do Documento (A4)'
  }
};

function applyEntregaTranslations(lang) {
  const dict = entregaTranslations[lang] || entregaTranslations['es'];
  // Walk all text nodes and replace matches
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while ((node = walker.nextNode())) {
    const trimmed = node.nodeValue ? node.nodeValue.trim() : '';
    if (trimmed && dict[trimmed] !== undefined) {
      node.nodeValue = node.nodeValue.replace(trimmed, dict[trimmed]);
    }
  }
  // Also update placeholders
  document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
    const ph = el.getAttribute('placeholder');
    if (ph && dict[ph]) el.setAttribute('placeholder', dict[ph]);
  });
  // Update select default option
  document.querySelectorAll('option').forEach(el => {
    const t = el.textContent.trim();
    if (t && dict[t]) el.textContent = dict[t];
  });
}

// Listen for language messages from parent frame
window.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'changeLang') {
    const lang = event.data.lang;
    localStorage.setItem('lang', lang);
    // Wait briefly for React to have settled
    setTimeout(() => applyEntregaTranslations(lang), 100);
  }
});

// Apply on load based on stored lang
document.addEventListener('DOMContentLoaded', function() {
  const lang = localStorage.getItem('lang') || 'es';
  if (lang !== 'es') {
    // Give React time to mount
    setTimeout(() => applyEntregaTranslations(lang), 500);
  }
});
</script>
`;

// Insert before </body>
entrega = entrega.replace('</body>', entregaScript + '</body>');

fs.writeFileSync('entrega.html', entrega);
console.log('entrega.html fixed with postMessage listener');
