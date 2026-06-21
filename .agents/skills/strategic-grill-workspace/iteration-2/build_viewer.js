// Builds a self-contained static review.html (Node substitute for generate_review.py,
// which can't run here: this environment's Python is missing the json stdlib package).
const fs=require('fs'),path=require('path');
const ROOT=__dirname;
const bench=JSON.parse(fs.readFileSync(path.join(ROOT,'benchmark.json'),'utf8'));
const order=['cold-start-plain-language','fuzzy-language-member','weak-core-claim-pushback',
 'new-feature-loyalty-points','cross-context-reporting-dashboard','relationship-change-shipping-inventory',
 'boundary-expansion-subscriptions','new-cross-cutting-refund-flow','stale-path-detection',
 'glossary-term-conflict','relationship-labelling'];
const esc=s=>(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function read(p){try{return fs.readFileSync(p,'utf8');}catch{return'(missing)';}}

const data=order.map(name=>{
 const meta=JSON.parse(read(path.join(ROOT,name,'eval_metadata.json')));
 const wsResp=read(path.join(ROOT,name,'with_skill','outputs','response.md'));
 const woResp=read(path.join(ROOT,name,'without_skill','outputs','response.md'));
 const wsG=JSON.parse(read(path.join(ROOT,name,'with_skill','grading.json')));
 const woG=JSON.parse(read(path.join(ROOT,name,'without_skill','grading.json')));
 return {name,prompt:meta.prompt,wsResp,woResp,wsG,woG};
});

const rs=bench.run_summary;
const pct=x=>(x*100).toFixed(1)+'%';

const html=`<!doctype html><html><head><meta charset="utf-8"><title>strategic-grill — eval review</title>
<style>
 body{font:15px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;margin:0;background:#0f1117;color:#e6e8ee}
 header{padding:18px 24px;background:#161a23;border-bottom:1px solid #262c3a;position:sticky;top:0;z-index:5}
 h1{margin:0 0 4px;font-size:20px} .sub{color:#9aa3b2;font-size:13px}
 .wrap{display:flex;min-height:calc(100vh - 70px)}
 nav{width:280px;background:#12151d;border-right:1px solid #262c3a;padding:10px 0;overflow:auto}
 nav button{display:block;width:100%;text-align:left;padding:9px 16px;background:none;border:0;color:#cbd2df;cursor:pointer;font-size:13px;border-left:3px solid transparent}
 nav button:hover{background:#1a1f2b} nav button.active{background:#1d2330;border-left-color:#5b8cff;color:#fff}
 nav .sc{float:right;font-variant-numeric:tabular-nums;font-size:12px}
 main{flex:1;padding:22px 28px;overflow:auto}
 .tag{display:inline-block;font-size:11px;padding:1px 7px;border-radius:10px;margin-left:6px}
 .ok{background:#15361f;color:#5fd07f} .bad{background:#3a1620;color:#ff7a90}
 .prompt{background:#1a1f2b;border:1px solid #2a3142;border-radius:8px;padding:12px 14px;margin:0 0 18px;color:#dfe4ee}
 .cols{display:grid;grid-template-columns:1fr 1fr;gap:18px}
 .col h3{margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:#9aa3b2}
 .resp{background:#12151d;border:1px solid #262c3a;border-radius:8px;padding:14px;white-space:pre-wrap;font-size:13.5px;max-height:560px;overflow:auto}
 .ws h3{color:#5b8cff} .wo h3{color:#c08457}
 .grades{margin:14px 0 4px;border-collapse:collapse;width:100%;font-size:12.5px}
 .grades td{border-top:1px solid #262c3a;padding:6px 8px;vertical-align:top}
 .grades td.v{width:22px;text-align:center;font-weight:700}
 .pass{color:#5fd07f} .fail{color:#ff7a90}
 .summary{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:8px}
 .card{background:#161a23;border:1px solid #262c3a;border-radius:8px;padding:14px}
 .card .big{font-size:26px;font-weight:700} .card .lbl{color:#9aa3b2;font-size:12px}
 .notes li{margin:6px 0;color:#cbd2df;font-size:13px}
 .ev{color:#8b93a3;font-size:11.5px;display:block;margin-top:2px}
 code{background:#222838;padding:1px 5px;border-radius:4px}
</style></head><body>
<header><h1>strategic-grill — eval review <span class="sub">iteration 1</span></h1>
<div class="sub">11 evals · with-skill vs plain Opus 4.8 baseline · first-turn behaviour</div></header>
<div class="wrap">
<nav id="nav"></nav>
<main id="main"></main>
</div>
<script>
const DATA=${JSON.stringify(data)};
const SUMMARY=${JSON.stringify({ws:rs.with_skill,wo:rs.without_skill,delta:rs.delta,notes:bench.notes})};
function gradeTable(g){
 return '<table class="grades">'+g.expectations.map(e=>
  '<td class="v '+(e.passed?'pass':'fail')+'">'+(e.passed?'✓':'✗')+'</td>'
 ).map((c,i)=>'<tr>'+c+'<td>'+esc(g.expectations[i].text)+'<span class="ev">'+esc(g.expectations[i].evidence)+'</span></td></tr>').join('')+'</table>';
}
function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function renderOverview(){
 const s=SUMMARY;
 return '<h2>Benchmark overview</h2><div class="summary">'+
  '<div class="card"><div class="big">'+(s.ws.pass_rate.mean*100).toFixed(1)+'%</div><div class="lbl">with-skill pass rate</div></div>'+
  '<div class="card"><div class="big">'+(s.wo.pass_rate.mean*100).toFixed(1)+'%</div><div class="lbl">baseline pass rate</div></div>'+
  '<div class="card"><div class="big">'+s.delta.pass_rate+'</div><div class="lbl">delta</div></div>'+
  '</div>'+
  '<div class="card" style="margin-top:14px"><div class="lbl" style="margin-bottom:8px">Analyst notes</div><ul class="notes">'+
   s.notes.map(n=>'<li>'+esc(n)+'</li>').join('')+'</ul></div>';
}
function render(i){
 const main=document.getElementById('main');
 if(i<0){main.innerHTML=renderOverview();}
 else{
  const d=DATA[i];
  main.innerHTML='<h2>'+d.name+'</h2>'+
   '<div class="prompt"><b>Prompt:</b> '+esc(d.prompt)+'</div>'+
   '<div class="cols">'+
    '<div class="col ws"><h3>With skill — '+d.wsG.summary.passed+'/'+d.wsG.summary.total+'</h3>'+
     '<div class="resp">'+esc(d.wsResp)+'</div>'+gradeTable(d.wsG)+'</div>'+
    '<div class="col wo"><h3>Baseline (no skill) — '+d.woG.summary.passed+'/'+d.woG.summary.total+'</h3>'+
     '<div class="resp">'+esc(d.woResp)+'</div>'+gradeTable(d.woG)+'</div>'+
   '</div>';
 }
 document.querySelectorAll('nav button').forEach((b,bi)=>b.classList.toggle('active',bi===i+1));
}
const nav=document.getElementById('nav');
const ov=document.createElement('button');ov.textContent='▸ Benchmark overview';ov.onclick=()=>render(-1);nav.appendChild(ov);
DATA.forEach((d,i)=>{
 const b=document.createElement('button');
 b.innerHTML=d.name+'<span class="sc">'+d.wsG.summary.passed+'/'+d.wsG.summary.total+' · '+d.woG.summary.passed+'/'+d.woG.summary.total+'</span>';
 b.onclick=()=>render(i);nav.appendChild(b);
});
document.addEventListener('keydown',e=>{
 const cur=[...document.querySelectorAll('nav button')].findIndex(b=>b.classList.contains('active'));
 if(e.key==='ArrowDown'&&cur<DATA.length){render(cur);} // cur is index+1, so render(cur) -> next
 if(e.key==='ArrowUp'&&cur>0){render(cur-2);}
});
render(-1);
</script></body></html>`;
fs.writeFileSync(path.join(ROOT,'review.html'),html);
console.log('wrote',path.join(ROOT,'review.html'),'('+(html.length/1024).toFixed(0)+'KB)');
