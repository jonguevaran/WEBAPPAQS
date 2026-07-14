const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const badBlock = /function setActiveButton\(activeButton\) \{[\s\S]*?\}\s*function showPage\(page\) \{/i;
const goodBlock = `function setActiveButton(activeButton) {
            buttons.forEach(btn => {
                btn.classList.remove('bg-blue-200', 'text-white', 'dark:bg-blue-200', 'active', 'hover:bg-blue-200', 'dark:hover:bg-blue-300');
                btn.classList.add('bg-white/20', 'hover:bg-white/40', 'dark:bg-black/20', 'dark:hover:bg-black/40', 'text-slate-600', 'dark:text-slate-300');
            });
            activeButton.classList.remove('bg-white/20', 'hover:bg-white/40', 'dark:bg-black/20', 'dark:hover:bg-black/40', 'text-slate-600', 'dark:text-slate-300');
            activeButton.classList.add('bg-blue-200', 'hover:bg-blue-200', 'text-white', 'dark:bg-blue-200', 'dark:hover:bg-blue-300', 'active');
        }

        function showPage(page) {`;

content = content.replace(badBlock, goodBlock);
fs.writeFileSync('index.html', content);
console.log('Fixed setActiveButton syntax error');
