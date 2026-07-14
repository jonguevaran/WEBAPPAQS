const fs = require('fs');
let content = fs.readFileSync('entrega.html', 'utf8');

const observerScript = `
<script>
// Prevent dark mode from applying to this document
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
            }
        }
    });
});
observer.observe(document.documentElement, { attributes: true });
if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
}
</script>
</body>
`;

content = content.replace('</body>', observerScript);
fs.writeFileSync('entrega.html', content);
console.log('Added dark mode immunity to entrega.html');
