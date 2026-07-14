const fs = require('fs');
let content = fs.readFileSync('Password.html', 'utf8');

if (!content.includes('font-awesome')) {
    content = content.replace('</title>', '</title>\n    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">');
}

const svgRegex = /<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" class="h-5 w-5"[^>]*>[\s\S]*?<\/svg>/;
if (svgRegex.test(content)) {
    content = content.replace(svgRegex, '<i class="fa-regular fa-copy text-lg"></i>');
}

const componentsRegex = /const components = \[[^\]]*\];/s;
const newComponents = `const components = [
            "ba", "be", "bu", "ca", "ce", "cu", "da", "de", "du", "fa", "fe", "fu", "ga", "ge", "gu", "ha", "he", "hu", "ja", "je",
            "ju", "ka", "ke", "ku", "ma", "me", "mu", "na", "ne", "nu", "pa", "pe", "pu", "qa", "qe", "qu", "ra", "re", "ru", "sa",
            "se", "su", "ta", "te", "tu", "va", "ve", "vu", "wa", "we", "wu", "xa", "xe", "xu", "ya", "ye", "yu", "za", "ze", "zu"
        ];`;
if (componentsRegex.test(content)) {
    content = content.replace(componentsRegex, newComponents);
}

fs.writeFileSync('Password.html', content);
console.log('Password.html updated successfully.');
