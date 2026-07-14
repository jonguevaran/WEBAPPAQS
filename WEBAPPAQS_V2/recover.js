const fs = require('fs');
const logPath = 'C:/Users/ender/.gemini/antigravity-ide/brain/f127fe1d-5031-47db-bb76-10d9c12ce02a/.system_generated/logs/transcript.jsonl';
const outPath = 'c:/Users/ender/Desktop/AQSWEBAPP/WEBAPPAQS/WEBAPPAQS_V2/Altas.html';
const lines = [];
const lines2 = [];
const data = fs.readFileSync(logPath, 'utf8').split('\n');
data.forEach(l => {
    if(!l) return;
    try {
        const step = JSON.parse(l);
        if (step.type === 'TOOL_RESPONSE' && step.content) {
            if (step.content.includes('Total Lines: 1736') && step.content.includes('Altas.html')) {
                step.content.split('\n').forEach(line => {
                    const match = line.match(/^(\d+): (.*)$/);
                    if (match) {
                        const num = parseInt(match[1], 10);
                        const txt = match[2];
                        if (num <= 800 && lines.length < 800) lines.push({n: num, t: txt});
                        else if (num > 800) lines2.push({n: num, t: txt});
                    }
                });
            }
        }
    } catch(e){}
});
const allLines = [...lines, ...lines2].sort((a,b)=>a.n - b.n);
const finalLines = [];
let expected = 1;
allLines.forEach(l => {
    if (l.n === expected) {
        finalLines.push(l.t);
        expected++;
    }
});
fs.writeFileSync(outPath, finalLines.join('\n'), 'utf8');
console.log('Recovered ' + finalLines.length + ' lines');
