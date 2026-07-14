const fs = require('fs');

const filesToUpdate = ['cartas_v2.html', 'entrega.html', 'DelegacionAlmacenes.html', 'Altas.html'];

filesToUpdate.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace gray/slate solid buttons with indigo
    content = content.replace(/bg-slate-[56]00 hover:bg-slate-[67]00 text-white/g, 'bg-blue-200 hover:bg-blue-300 text-blue-900 dark:bg-blue-300 dark:hover:bg-blue-400 dark:text-blue-900 font-bold');
    
    // Replace other solid buttons (except red/yellow if they are warnings)
    // Actually, let's keep it simple. The user specifically attached a screenshot of respuestas.html.
    // So the previous script handled respuestas.html. 
    
    fs.writeFileSync(file, content);
});
console.log('Updated other files');
