const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');const s={window:{}};vm.createContext(s);for(const f of ['data.js','glossary.js'])vm.runInContext(fs.readFileSync(f,'utf8'),s);
const clean=x=>x.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu,'').toLowerCase();
const dictionary=Object.fromEntries(Object.entries(s.window.GLOSSARY).map(([k,v])=>[k.toLowerCase(),v]));
assert.equal(dictionary.monet?.fa,'بسیاری / خیلی‌ها','monet must translate in Persian');
for(const l of s.window.LESSONS)for(const w of l.fi.split(/\s+/))for(const lang of ['fa','ar','fr','uk','so','sw','en'])assert.ok(dictionary[clean(w)]?.[lang],`${lang}: ${w}`);
console.log('Every Learn word has translations in seven languages, including monet');
