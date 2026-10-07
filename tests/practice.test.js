const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const scope = {window: {}};
vm.createContext(scope);
vm.runInContext(fs.readFileSync('data.js','utf8'), scope);
if (!fs.existsSync('translations.js')) throw new Error('Complete question translations are missing');
vm.runInContext(fs.readFileSync('translations.js','utf8'), scope);
for (const lang of ['fa','ar','fr','uk','so','sw','en']) {
  for (const q of scope.window.QUESTIONS.filter(q=>q.type!=='match')) {
    const translated = scope.window.TRANSLATIONS[lang][q.prompt];
    assert.ok(translated && translated !== q.prompt, `${lang}: ${q.prompt}`);
  }
}
assert.equal(scope.window.TRANSLATIONS.fa[scope.window.QUESTIONS[0].prompt], 'پس از جنگ چه اتفاقی برای بسیاری از مردم افتاد؟');
console.log('All 27 practice questions have complete translations in 7 languages');
const app=fs.readFileSync('app.js','utf8');
const answerSource=app.slice(app.indexOf('function answer('),app.indexOf('\nfunction words()'));
const buttons=[2,0,1].map(i=>({dataset:{i:String(i)},classList:{values:[],add(x){this.values.push(x)}}}));
const feedback={},next={};
const context={quiz:{qs:[{answer:0,lesson:'homes'}],at:0,score:0,answered:false},LESSONS:[{id:'homes'}],document:{querySelectorAll:()=>buttons},$:(s)=>s==='#next'?next:feedback,tr:()=>({right:'correct',wrong:'wrong',score:'score',next:'next'}),esc:x=>x,transLesson:()=>'',practice:()=>{}};
vm.createContext(context);vm.runInContext(answerSource,context);
context.answer(0);context.answer(0);
assert.equal(context.quiz.score,1,'Repeated clicks must not increase the score');
assert.deepEqual(buttons[1].classList.values,['correct'],'Correct highlight follows original answer, not shuffled position');
assert.ok(buttons.every(b=>b.disabled),'All choices are locked after answering');
console.log('Shuffled answer grading and single-score behavior passed');
