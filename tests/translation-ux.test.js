const fs=require('fs');const s=fs.readFileSync('app.js','utf8');
for(const needle of ['translateFinnish','optionTranslation','questionTranslation','Math.random']) if(!s.includes(needle)) throw new Error('missing '+needle);
console.log('translation UX contract ok');
