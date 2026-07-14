const fs = require('fs');
const logPath = 'C:/Users/ender/.gemini/antigravity-ide/brain/f127fe1d-5031-47db-bb76-10d9c12ce02a/.system_generated/logs/transcript.jsonl';
const outPath = 'c:/Users/ender/Desktop/AQSWEBAPP/WEBAPPAQS/WEBAPPAQS_V2/Altas.html';
const linesMap = {};
const data = fs.readFileSync(logPath, 'utf8').split('\n');
data.forEach(l => {
    if(!l.trim()) return;
    try {
        const step = JSON.parse(l);
        if (step.type === 'TOOL_RESPONSE' && step.content) {
            if (step.content.includes('Total Lines: 1736') && step.content.includes('Altas.html')) {
                const parts = step.content.split('\n');
                parts.forEach(line => {
                    const match = line.match(/^(\d+):\s(.*)$/);
                    if (match) {
                        const num = parseInt(match[1], 10);
                        linesMap[num] = match[2];
                    }
                });
            }
        }
    } catch(e){}
});
const nums = Object.keys(linesMap).map(Number).sort((a,b)=>a-b);
const finalLines = [];
let expected = 1;
nums.forEach(n => {
    if (n === expected) {
        finalLines.push(linesMap[n]);
        expected++;
    }
});
fs.writeFileSync(outPath, finalLines.join('\n'), 'utf8');
console.log('Recovered ' + finalLines.length + ' lines');
