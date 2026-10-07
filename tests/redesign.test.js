const fs=require('fs'); const html=fs.readFileSync('index.html','utf8'); const glossary=fs.readFileSync('glossary.js','utf8'); const app=fs.readFileSync('app.js','utf8');
if(!app.includes('sw:')) throw new Error('Swahili language option missing');
if(!app.includes('en:')) throw new Error('English language option missing');
if(!app.includes('const SW=')) throw new Error('Swahili glossary translations missing');
if(!app.includes('data-mode="learn"')) throw new Error('Study view missing');
console.log('redesign contract ok');
