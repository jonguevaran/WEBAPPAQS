const fs = require('fs');

let content = fs.readFileSync('cartas_v2.html', 'utf8');

const targetStr = "(0,k.jsx)(`p`,{className:`font-bold mb-1`,children:i.idioma===`pt`?`É proibido:`:`Queda prohibido:`})";

const replacementStr = "(0,k.jsx)(`img`,{src:`logo.png`,style:{position:`absolute`,bottom:`20mm`,right:`20mm`,width:`270px`},alt:`Logo Aquaservice`})]}),(0,k.jsxs)(`div`,{className:`pdf-page page-break text-justify small-text`,id:`page-2b`,children:[(0,k.jsx)(`p`,{className:`font-bold mb-1`,children:i.idioma===`pt`?`É proibido:`:`Queda prohibido:`})";

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replacementStr);
    fs.writeFileSync('cartas_v2.html', content);
    console.log("cartas_v2.html updated with page break.");
} else {
    console.log("ERROR: target string not found.");
}
