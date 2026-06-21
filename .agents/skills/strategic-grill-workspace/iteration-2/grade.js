// Iteration 2 grading. Grades all 22 runs against the revised assertions.
const fs=require('fs'),path=require('path');
const ROOT=__dirname, PREV=path.join(path.dirname(ROOT),'iteration-1');

// [passed, evidence] aligned to evals.json expectations order (iteration 2 assertions).
const G={
 'cold-start-plain-language':{
  with_skill:[
   [true,"One differentiator Q in Q:/Rec format; the only other question is the mandated file-layout ask (no docs exist)."],
   [true,"'**Q:** ...the one capability a restaurant could not get off-the-shelf...' + concrete Recommendation."],
   [true,"'area of the system' / 'differentiator'; no bounded-context/ubiquitous-language/ACL."],
   [true,"States nothing is set up and proposes a docs/ + packages/*/docs/CONTEXT.yaml layout."],
   [true,"Stays on what makes the product unique; no DB schema or tech-stack choices."]],
  without_skill:[
   [false,"Four numbered questions plus inline ones."],
   [false,"No Q:/Recommendation structure."],
   [true,"No DDD jargon."],
   [false,"Proposes a relational schema, not a docs/context-file structure."],
   [false,"Leaks implementation: Postgres, restaurant_id, full relational shape."]],
 },
 'fuzzy-language-member':{
  with_skill:[
   [true,"Quotes the Account/User/Customer glossary definitions it read."],
   [true,"'**Q:** ...are you picturing the human who logs in, or the billing entity...?' — the sharpening IS the question."],
   [true,"Single focused question."],
   [true,"Q:/Recommendation with a concrete position ('member' = a status of User, not a new entity)."],
   [true,"Plain language; references the glossary's avoid-list but uses no DDD jargon."],
   [true,"Does not re-ask file structure."]],
  without_skill:[
   [true,"Quotes the Account/User/Customer definitions from CONTEXT.yaml."],
   [false,"Disambiguation is spread across a 3-option list and a 4-question section, not a single Q:/Rec block."],
   [false,"Many bundled questions."],
   [false,"No Q:/Recommendation format."],
   [false,"Leaks jargon: 'a new bounded context', 'ubiquitous-language shorthand'."],
   [true,"Does not re-ask file structure."]],
 },
 'weak-core-claim-pushback':{
  with_skill:[
   [true,"Quotes Orders=core (order promising) and Customers=supporting; notes no notifications area exists."],
   [true,"'**Q:** If a competitor offered the exact same notification experience... would your customers leave...?' directly tests the core claim."],
   [true,"'a well-solved problem you could buy off the shelf (Twilio, Courier, Knock).'"],
   [true,"'I'd push back on notifications being the core... keep it tagged as supporting, not core.'"],
   [true,"Q:/Recommendation format; plain language (uses the map's own core/supporting tags, no bounded-context/ACL)."]],
  without_skill:[
   [true,"Notes the map tags Orders core / Customers supporting and no Notifications context exists."],
   [true,"Pushes back immediately: 'notifications are likely a supporting domain that consumes events.'"],
   [true,"'something most teams can buy or build to parity... a commodity capability.'"],
   [true,"Hypothesis leans to supporting domain."],
   [false,"No Q:/Recommendation format and leaks jargon: 'core domain', 'supporting domain', 'domain events', 'Notifications context'."]],
 },
 'new-feature-loyalty-points':{
  with_skill:[
   [true,"Summarises Orders (core/promising) and Customers (supporting) and the existing identity link."],
   [true,"'**Q:** Is loyalty points a distinct area... or a feature folded into Orders or Customers?'"],
   [true,"Q:/Recommendation: 'Make it its own area' with lifecycle reasoning."],
   [true,"Goes straight to grilling; no file-structure question."],
   [true,"Plain language ('its own area', 'competitive edge'); no DDD jargon."],
   [true,"Proposes no label and invents none; mentions Orders 'never has to know loyalty exists' (deferred to YAML)."],
   [true,"Stays at area/ownership; no ledger or table design."]],
  without_skill:[
   [true,"Quotes Orders/Customers tags."],
   [true,"'Loyalty is its own bounded context' — answers new-vs-existing."],
   [false,"No Q:/Recommendation format; 5-question essay."],
   [true,"Does not re-ask file structure."],
   [false,"Leaks jargon: 'bounded context', 'Customer-Supplier', 'upstream/downstream'."],
   [false,"Invents a non-canonical label: 'label: Publisher-Subscriber' in the proposed map block."],
   [false,"Leaks implementation: append-only points ledger, balance = sum of ledger, schema design."]],
 },
 'cross-context-reporting-dashboard':{
  with_skill:[
   [true,"Lists Orders/Inventory/Customers tags and that Orders reads from the other two."],
   [true,"Raises ownership ('owned by whoever owns the business needs to see numbers') and the read-only boundary."],
   [true,"'**Q:** Is this purely read-only reporting, or will anyone act on it?' + Recommendation."],
   [true,"'a new fourth area... reads from the other three rather than living inside any of them.'"],
   [true,"Plain language ('new area', 'read-only'); no DDD jargon."],
   [true,"Stays at the ownership/boundary level; defers live-vs-copy mechanics, no ETL design."]],
  without_skill:[
   [true,"Quotes each context's responsibility."],
   [true,"Raises ownership/coupling ('no one owns the dashboard')."],
   [false,"No Q:/Recommendation format."],
   [true,"'it should live in its own dedicated context/package.'"],
   [false,"Leaks jargon: 'bounded context', 'Anti-Corruption Layer (ACL)', 'Conformist', 'ubiquitous language', 'Customer-Supplier'."],
   [false,"Leaks implementation: read-time vs event-driven projection vs data-warehouse/ETL mechanics."]],
 },
 'relationship-change-shipping-inventory':{
  with_skill:[
   [true,"Quotes the documented relationship: 'Shipping... never writes back to Inventory.'"],
   [true,"'Your request... would invert that. Shipping would start writing into the one place supposed to own that number.'"],
   [true,"'**Q:** ...who should own the decision that stock just went down?' + Recommendation to keep Inventory owning it."],
   [true,"Refuses to agree it's simple; surfaces two-writers / source-of-truth risk."],
   [true,"Plain language; quotes the YAML implication in plain words and never says 'ACL' in user text."]],
  without_skill:[
   [true,"Quotes the relationship text."],
   [true,"'inverts that relationship. Shipping would become an upstream writer.'"],
   [false,"No Q:/Recommendation format."],
   [true,"'It sounds simple, but it actually cuts against the way these relate.'"],
   [false,"Leaks jargon: spells out 'Anti-Corruption Layer (ACL)' in the user-facing text."]],
 },
 'boundary-expansion-subscriptions':{
  with_skill:[
   [true,"Quotes User charter: 'owns who a person is and how they log in, nothing about what they pay for.'"],
   [true,"'dropping subscription rules into it directly contradicts its stated charter.'"],
   [true,"Distinguishes entitlements vs charging, identity vs money, Billing's territory."],
   [true,"'**Q:** ...the heaviest piece — deciding entitlement, or charging?' + Recommendation."],
   [true,"Plain language ('off-the-shelf identity provider', 'centre of gravity'); no DDD jargon."]],
  without_skill:[
   [true,"Quotes the narrow User description."],
   [true,"'reversing an explicit boundary decision... deserves scrutiny.'"],
   [true,"'a paying relationship... may not map one-to-one to a login.'"],
   [false,"No Q:/Recommendation format; four numbered questions."],
   [false,"Leaks jargon: 'that's the thing bounded contexts exist to prevent', 'Customer-Supplier'."]],
 },
 'new-cross-cutting-refund-flow':{
  with_skill:[
   [true,"Lists Orders(core)/Payments/Inventory tags and the forward-path wiring."],
   [true,"Surfaces ownership: '**Q:** which single module decides a refund is in progress and drives the other two — Orders or Payments?' + Recommendation Orders owns it."],
   [true,"Q:/Recommendation with a concrete position."],
   [true,"Stays on ownership; explicitly defers full-vs-partial and restock mechanics."],
   [true,"Plain language ('owns the word refund and orchestrates'); no bounded-context/ACL."]],
  without_skill:[
   [true,"Quotes contexts and forward relationships."],
   [true,"Poses Orders-owns vs a new Returns/Refunds context."],
   [false,"No Q:/Recommendation format."],
   [false,"Dives into saga/compensating actions, warehouse resolution, per-context language — past boundary level."],
   [false,"Leaks jargon: 'bounded context', 'Customer-Supplier', 'saga'."]],
 },
 'stale-path-detection':{
  with_skill:[
   [true,"'that path doesn't exist. The actual package on disk is packages/payments.'"],
   [true,"Flags path + name + language drift as three out-of-sync items."],
   [true,"Surfaces it as a blocking cleanup question before grilling."],
   [true,"'the first real question... is whether fraud detection belongs inside Payments at all.'"]],
  without_skill:[
   [true,"'on disk there is no packages/billing/ — the actual package is packages/payments/.'"],
   [true,"Flags stale path and old name."],
   [true,"'Worth fixing the map... so the rest references something real.'"],
   [true,"Gives a placement recommendation (new Risk context)."]],
 },
 'glossary-term-conflict':{
  with_skill:[
   [true,"Quotes Orders glossary: Order = 'a customer's request to purchase...' + avoid list."],
   [true,"'Same English word, opposite flow' — inbound customer Order vs outbound supplier order."],
   [true,"Proposes 'Purchase Order (or Restock Order)' and reserves 'Order' for the customer concept."],
   [true,"'**Q:** What do you want to call the thing you send to a supplier...?' + Recommendation; emits turn separator."]],
  without_skill:[
   [true,"Quotes the Order definition and avoid list."],
   [true,"'two incompatible meanings of the same word.'"],
   [true,"'The industry-standard term... is a Purchase Order.'"],
   [false,"No Q:/Recommendation format; 5 numbered questions."]],
 },
 'relationship-labelling':{
  with_skill:[
   [true,"Summarises Orders (publishes Order Shipped) and Notifications (thin commodity); notes relationships list is empty."],
   [true,"'a one-directional dependency from Orders to Notifications, where Orders is the source and Notifications consumes it.'"],
   [true,"'Orders can evolve its event freely without ever breaking your email sending.'"],
   [true,"Keeps it plain — proposes ONE shape (a translation step), never dumps a raw label or invents one."],
   [true,"'**Q:** Does Notifications own a translation step... or read the fields directly?' + Recommendation."]],
  without_skill:[
   [true,"Quotes Order Shipped and the core/generic tags."],
   [true,"'the dependency flows Notifications → Orders... one-directional.'"],
   [true,"'you don't want your core Orders context bending to accommodate a generic notifications concern.'"],
   [false,"Dumps TWO raw labels at once — 'Customer/Supplier combined with Published Language' — plus an invented type/integration field schema."],
   [false,"No Q:/Recommendation format."]],
 },
};

function timing(d){try{return JSON.parse(fs.readFileSync(path.join(d,'timing.json'),'utf8'));}catch{return{};}}
function prevPass(name,cfg){try{const g=JSON.parse(fs.readFileSync(path.join(PREV,name,cfg,'grading.json'),'utf8'));return g.summary.pass_rate;}catch{return null;}}

const benchRuns=[];
for(const[name,configs]of Object.entries(G)){
 const meta=JSON.parse(fs.readFileSync(path.join(ROOT,name,'eval_metadata.json'),'utf8'));
 for(const config of['with_skill','without_skill']){
  const v=configs[config];
  const exps=v.map((x,i)=>({text:meta.assertions[i],passed:x[0],evidence:x[1]}));
  const passed=exps.filter(e=>e.passed).length,total=exps.length;
  const dir=path.join(ROOT,name,config),t=timing(dir);
  fs.writeFileSync(path.join(dir,'grading.json'),JSON.stringify({expectations:exps,summary:{passed,failed:total-passed,total,pass_rate:+(passed/total).toFixed(3)},timing:t},null,2));
  benchRuns.push({eval_id:meta.eval_id,eval_name:name,configuration:config,run_number:1,
   result:{pass_rate:+(passed/total).toFixed(3),passed,failed:total-passed,total,time_seconds:t.total_duration_seconds||0,tokens:t.total_tokens||0,tool_calls:0,errors:0},expectations:exps});
 }
}
function agg(cfg){const rs=benchRuns.filter(r=>r.configuration===cfg);const mean=a=>a.reduce((x,y)=>x+y,0)/a.length;const sd=a=>{const m=mean(a);return Math.sqrt(mean(a.map(x=>(x-m)**2)));};const st=a=>({mean:+mean(a).toFixed(3),stddev:+sd(a).toFixed(3),min:Math.min(...a),max:Math.max(...a)});return{pass_rate:st(rs.map(r=>r.result.pass_rate)),time_seconds:st(rs.map(r=>r.result.time_seconds)),tokens:st(rs.map(r=>r.result.tokens))};}
const ws=agg('with_skill'),wo=agg('without_skill');
const bench={metadata:{skill_name:'strategic-grill',executor_model:'claude-opus-4-8',timestamp:'2026-06-21',iteration:2,evals_run:[...new Set(benchRuns.map(r=>r.eval_id))],runs_per_configuration:1,
  note:'Iteration 2: revised assertions. Evals 2 & 3 re-run with pre-seeded fixtures; the other 9 reuse iteration-1 transcripts (same skill, same inputs) re-graded against the new assertions. Baseline = plain Opus 4.8.'},
 runs:benchRuns,
 run_summary:{with_skill:ws,without_skill:wo,delta:{pass_rate:((ws.pass_rate.mean-wo.pass_rate.mean)>=0?'+':'')+(ws.pass_rate.mean-wo.pass_rate.mean).toFixed(3),time_seconds:((ws.time_seconds.mean-wo.time_seconds.mean)>=0?'+':'')+(ws.time_seconds.mean-wo.time_seconds.mean).toFixed(1),tokens:((ws.tokens.mean-wo.tokens.mean)>=0?'+':'')+Math.round(ws.tokens.mean-wo.tokens.mean)}},
 notes:[
  "Revised assertions are now strongly discriminating: with-skill "+(ws.pass_rate.mean*100).toFixed(1)+"% vs baseline "+(wo.pass_rate.mean*100).toFixed(1)+"% (iteration 1 was 93.2% vs 69.5%).",
  "The added 'no DDD jargon in user-facing text' assertion fails the baseline on evals 2,3,6,7,8,9,10,14 — plain Opus consistently says 'bounded context', 'Anti-Corruption Layer', 'domain events', 'ubiquitous language'. This is the single biggest source of separation.",
  "The 'canonical labels only' assertion (eval 6) catches the baseline inventing 'Publisher-Subscriber'; the 'no implementation leakage' assertion (evals 1,6,7,10) catches SQL/ledger/saga design the skill keeps out.",
  "Eval 2 & 3 re-runs confirm the fixture change worked: with pre-seeded context files, the technique now lands inside the Q:/Recommendation block instead of behind the cold-start housekeeping question.",
  "Eval 10 with-skill now passes the broadened ownership assertion (it framed ownership as Orders-vs-Payments, which the iteration-1 assertion wrongly penalised).",
  "Eval 14 with-skill now passes: the reframed assertions reward keeping the DDD label out of conversation and recommending a single integration shape, instead of demanding a literal label in turn 1.",
  "Eval 11 (stale-path) remains non-discriminating: both configs catch the renamed directory (4/4 each). It validates correct behaviour but does not separate the skill from a strong base model — keep it, but don't read skill value into it.",
  "With-skill now saturates near 100% on these first-turn cases. To keep pressuring the skill in future iterations, add harder cases: multi-turn sessions, a user who pushes back on the recommendation, or a deliberately wrong 'core' justification the skill must not accept."]
};
fs.writeFileSync(path.join(ROOT,'benchmark.json'),JSON.stringify(bench,null,2));

let md=`# strategic-grill — Benchmark (iteration 2)\n\nBaseline = plain Opus 4.8 (no skill). 11 evals, 1 run each per config.\n\n`;
md+=`| Configuration | Pass rate | Avg time (s) | Avg tokens |\n|---|---|---|---|\n`;
md+=`| with_skill | ${(ws.pass_rate.mean*100).toFixed(1)}% ± ${(ws.pass_rate.stddev*100).toFixed(1)} | ${ws.time_seconds.mean.toFixed(1)} | ${Math.round(ws.tokens.mean)} |\n`;
md+=`| without_skill | ${(wo.pass_rate.mean*100).toFixed(1)}% ± ${(wo.pass_rate.stddev*100).toFixed(1)} | ${wo.time_seconds.mean.toFixed(1)} | ${Math.round(wo.tokens.mean)} |\n`;
md+=`| **delta** | **${bench.run_summary.delta.pass_rate}** | ${bench.run_summary.delta.time_seconds} | ${bench.run_summary.delta.tokens} |\n\n`;
md+=`## Per-eval pass rate (with_skill | baseline | iter-1 with_skill)\n\n| Eval | with_skill | baseline | iter-1 ws |\n|---|---|---|---|\n`;
for(const name of Object.keys(G)){const w=benchRuns.find(r=>r.eval_name===name&&r.configuration==='with_skill').result;const b=benchRuns.find(r=>r.eval_name===name&&r.configuration==='without_skill').result;const p=prevPass(name,'with_skill');md+=`| ${name} | ${w.passed}/${w.total} | ${b.passed}/${b.total} | ${p!==null?Math.round(p*100)+'%':'—'} |\n`;}
md+=`\n## Analyst notes\n\n`+bench.notes.map(n=>`- ${n}`).join('\n')+'\n';
fs.writeFileSync(path.join(ROOT,'benchmark.md'),md);
console.log('iteration-2: with_skill',(ws.pass_rate.mean*100).toFixed(1)+'%','| baseline',(wo.pass_rate.mean*100).toFixed(1)+'%','| delta',bench.run_summary.delta.pass_rate);
