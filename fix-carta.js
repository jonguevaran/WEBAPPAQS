const fs = require('fs');

let content = fs.readFileSync('cartas_v2.html', 'utf8');

// The block to move
const blockToMove = "(0,k.jsx)(`p`,{className:`font-bold mb-2`,children:i.idioma===`pt`?`Relativamente aos ficheiros não automatizados`:`Con respecto a ficheros no automatizados`}),(0,k.jsx)(`ul`,{className:`list-disc`,children:i.idioma===`pt`?(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(`li`,{children:`Guardar o necessário sigilo em relação a qualquer tipo de informação de caráter pessoal conhecida no decorrer do trabalho desenvolvido, mesmo após a conclusão da relação laboral com a entidade.`}),(0,k.jsx)(`li`,{children:`Comunicar ao Responsável de Segurança, conforme o procedimento de notificação, os incidentes de segurança dos quais tenha conhecimento.`})]}):(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(`li`,{children:`Guardar el necesario secreto respecto a cualquier tipo de información de carácter personal conocida en función del trabajo desarrollado, incluso una vez concluida la relación laboral con la entidad.`}),(0,k.jsx)(`li`,{children:`Comunicar al Responsable de Seguridad, conforme al procedimiento de notificación, las incidencias de seguridad de las que tenga conocimiento.`})]})}),";

// 1. Remove the block from its original position
if (content.includes(blockToMove)) {
    content = content.replace(blockToMove, "");
    console.log("Block removed from original position.");
} else {
    console.log("ERROR: Block to move not found.");
}

// 2. Insert the block at the beginning of page-3
const page3Start = "(0,k.jsxs)(`div`,{className:`pdf-page page-break text-justify small-text`,id:`page-3`,children:[";
if (content.includes(page3Start)) {
    // Add font-size to make all text the same size
    const newPage3Start = "(0,k.jsxs)(`div`,{className:`pdf-page page-break text-justify`,style:{fontSize:`10pt`},id:`page-3`,children:[";
    content = content.replace(page3Start, newPage3Start + blockToMove);
    console.log("Block inserted into page-3 and font size applied.");
} else {
    console.log("ERROR: page-3 start not found.");
}

// 3. Remove the explicit 11pt font size from the signature block in page 3 so it inherits 10pt
const sigBlock = "(0,k.jsxs)(`div`,{className:`mt-6 mb-8`,style:{fontSize:`11pt`},children:[(0,k.jsx)(`p`,{children:i.idioma===`pt`?(0,k.jsxs)(k.Fragment,{children:[`Tudo o que acima declaro sob minha responsabilidade, em `,(0,k.jsx)(`strong`,{children:i.lugar||`________________`}),`, a `,(0,k.jsx)(`strong`,{children:i.fecha||`________________________`})]}):(0,k.jsxs)(k.Fragment,{children:[`Todo lo cual declaro bajo mi responsabilidad, en `,(0,k.jsx)(`strong`,{children:i.lugar||`________________`}),`, a `,(0,k.jsx)(`strong`,{children:i.fecha||`________________________`})]})}),(0,k.jsx)(`br`,{}),(0,k.jsx)(`br`,{}),(0,k.jsx)(`br`,{}),(0,k.jsx)(`p`,{children:i.idioma===`pt`?`Assinado:`:`Firmado:`})]}),(0,k.jsx)(`img`,{src:`logo.png`,style:{position:`absolute`,bottom:`20mm`,right:`20mm`,width:`270px`},alt:`Logo Aquaservice`})]}),o.length>0";

const newSigBlock = "(0,k.jsxs)(`div`,{className:`mt-6 mb-8`,children:[(0,k.jsx)(`p`,{children:i.idioma===`pt`?(0,k.jsxs)(k.Fragment,{children:[`Tudo o que acima declaro sob minha responsabilidade, em `,(0,k.jsx)(`strong`,{children:i.lugar||`________________`}),`, a `,(0,k.jsx)(`strong`,{children:i.fecha||`________________________`})]}):(0,k.jsxs)(k.Fragment,{children:[`Todo lo cual declaro bajo mi responsabilidad, en `,(0,k.jsx)(`strong`,{children:i.lugar||`________________`}),`, a `,(0,k.jsx)(`strong`,{children:i.fecha||`________________________`})]})}),(0,k.jsx)(`br`,{}),(0,k.jsx)(`br`,{}),(0,k.jsx)(`br`,{}),(0,k.jsx)(`p`,{children:i.idioma===`pt`?`Assinado:`:`Firmado:`})]}),(0,k.jsx)(`img`,{src:`logo.png`,style:{position:`absolute`,bottom:`20mm`,right:`20mm`,width:`270px`},alt:`Logo Aquaservice`})]}),o.length>0";

if (content.includes(sigBlock)) {
    content = content.replace(sigBlock, newSigBlock);
    console.log("Signature block font size removed.");
} else {
    // If not found, let's try a regex for the signature block
    content = content.replace(/className:`mt-6 mb-8`,style:\{fontSize:`11pt`\},children:\[\(0,k\.jsx\)\(`p`,\{children:i\.idioma===`pt`\?\(0,k\.jsxs\)\(k\.Fragment/g, "className:`mt-6 mb-8`,children:[(0,k.jsx)(`p`,{children:i.idioma===`pt`?(0,k.jsxs)(k.Fragment");
    console.log("Signature block font size removed via regex.");
}

fs.writeFileSync('cartas_v2.html', content);
console.log("cartas_v2.html updated successfully!");
