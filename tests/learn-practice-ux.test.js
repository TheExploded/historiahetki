const fs=require('fs');const [app,css]=['app.js','style.css'].map(f=>fs.readFileSync(f,'utf8'));
for(const needle of ['word-popover','plainFinnish','questionTranslation']) if(!app.includes(needle)) throw new Error('missing '+needle);
if(!css.includes('.word-popover')) throw new Error('popover style missing');
console.log('learn/practice UX contract ok');
