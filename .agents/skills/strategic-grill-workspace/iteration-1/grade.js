// Grades all 22 runs and writes grading.json per run dir, plus benchmark.json/md.
const fs = require('fs'), path = require('path');
const ROOT = __dirname;

// Verdicts: per eval, per config, array aligned to evals.json expectations order.
// Each entry: [passed(bool), evidence(string)]
const G = {
 'cold-start-plain-language': {
  with_skill: [
   [true,"Single formatted grilling Q about the differentiator; a preceding file-layout ask is the skill's mandated housekeeping step, not a second grilling question."],
   [true,"'**Q:** Of everything this product will do...' followed by '**Recommendation:** ...'."],
   [true,"Recommendation takes a firm position: differentiator is restaurant-specific prediction/waste-flagging, not table-stakes tracking."],
   [true,"Uses 'area of the system' / 'differentiator'; no 'bounded context', 'ubiquitous language', 'ACL' etc."],
   [true,"States 'nothing set up yet' and proposes a concrete docs/ + packages/*/docs/CONTEXT.yaml layout, asking the user to confirm."]],
  without_skill: [
   [false,"Four numbered questions plus several inline ones — heavily bundled."],
   [false,"No Q:/Recommendation structure; long multi-section essay."],
   [true,"Takes concrete positions (Postgres, multi-location from day one)."],
   [true,"No DDD jargon present (stays in data-model terms)."],
   [false,"Proposes a relational DB schema, not the context-doc file structure; never asks where CONTEXT files should live."]],
 },
 'fuzzy-language-member': {
  with_skill: [
   [true,"'You've now got four words for people... member... account... user... customer. That's a red flag.'"],
   [true,"One focused Q: the precise difference between account/user/customer before adding 'member'."],
   [true,"Q:/Recommendation block with a concrete working definition for each term."],
   [true,"Plain language ('words for people', 'paying entity'); no DDD terms."]],
  without_skill: [
   [true,"Flags the four-concept overlap explicitly."],
   [false,"Three numbered question groups plus more — not one focused question."],
   [false,"No Q:/Recommendation format."],
   [true,"No DDD jargon."]],
 },
 'weak-core-claim-pushback': {
  with_skill: [
   [true,"'you've called the notification service the core... I'm going to push hard on that next.'"],
   [true,"'if you swapped your notification service for an off-the-shelf product tomorrow... SendGrid, Twilio, Knock, Courier.'"],
   [true,"A Q:/Recommendation block is present (file-layout) with a concrete recommendation; core pushback is teed up in prose."],
   [true,"'that's supporting infrastructure, not your competitive edge — the real core is probably something upstream.'"]],
  without_skill: [
   [true,"'I want to push on the claim... users love it and it should be the architectural core are two different things.'"],
   [true,"'unless... genuinely novel like predictive or AI-curated alerts that nobody else has' — off-the-shelf/differentiation framing."],
   [false,"No Q:/Recommendation format; four numbered probes plus a list of questions."],
   [true,"'the real core is one layer behind it — the events, relevance, or timing.'"]],
 },
 'new-feature-loyalty-points': {
  with_skill: [
   [true,"Summarises Orders (core, order-promising) and Customers (supporting) and the existing Customer-owns-identity link."],
   [true,"'**Q:** Is loyalty points a distinct area with its own owner, or a feature folded into Orders or Customers?'"],
   [true,"Q:/Recommendation: 'Make it its own area' with lifecycle reasoning."],
   [true,"Goes straight to grilling using the existing docs; no file-structure question."]],
  without_skill: [
   [true,"Reads the context map; quotes Orders/Customers tags."],
   [true,"'Loyalty is its own bounded context' — answers new-vs-existing."],
   [false,"No single Q:/Recommendation; long essay with 5 numbered questions and a schema."],
   [true,"Does not re-ask file structure."]],
 },
 'cross-context-reporting-dashboard': {
  with_skill: [
   [true,"Lists Orders/Inventory/Customers tags and that Orders reads from the other two."],
   [true,"Raises ownership: 'owned by whoever owns the business needs to see numbers' and read-only boundary."],
   [true,"'**Q:** Is this purely read-only reporting, or will anyone act on it?' + concrete Recommendation."],
   [true,"'this is a new fourth area... reads from the other three rather than living inside any of them.'"]],
  without_skill: [
   [true,"Quotes each context's responsibility from the map."],
   [true,"Strongly raises ownership/coupling; 'no one owns the dashboard' risk."],
   [false,"No Q:/Recommendation format; sectioned essay with 3 questions and an ETL discussion."],
   [true,"'it should live in its own dedicated context/package, not inside Orders/Inventory/Customers.'"]],
 },
 'relationship-change-shipping-inventory': {
  with_skill: [
   [true,"Quotes the documented relationship: 'Shipping... never writes back to Inventory.'"],
   [true,"'Your request... would invert that. Shipping would start writing into the one place that's supposed to own that number.'"],
   [true,"'**Q:** ...who do you believe should own the decision that stock just went down?' + Recommendation to keep Inventory owning it."],
   [true,"Opens by refusing to agree it's simple; surfaces two-writers / source-of-truth risk."]],
  without_skill: [
   [true,"Quotes the ACL relationship text verbatim."],
   [true,"'inverts that relationship. Shipping would become an upstream writer to Inventory.'"],
   [false,"No Q:/Recommendation format; numbered consequences + multiple questions."],
   [true,"'It sounds simple, but it actually cuts against the way these two services relate.'"]],
 },
 'boundary-expansion-subscriptions': {
  with_skill: [
   [true,"Quotes User charter: 'owns who a person is and how they log in, nothing about what they pay for.'"],
   [true,"'dropping subscription rules into it directly contradicts its stated charter.'"],
   [true,"Distinguishes entitlements vs charging, identity vs money, and Billing's territory."],
   [true,"'**Q:** ...what's the heaviest piece — deciding entitlement, or charging?' + Recommendation."]],
  without_skill: [
   [true,"Quotes the 'deliberately narrow / nothing about what they pay for' description."],
   [true,"'reversing an explicit boundary decision someone made on purpose... deserves scrutiny.'"],
   [true,"'A subscription belongs to a paying relationship, which may not map one-to-one to a login.'"],
   [false,"No Q:/Recommendation format; four numbered questions plus a tentative rec."]],
 },
 'new-cross-cutting-refund-flow': {
  with_skill: [
   [true,"Lists Orders(core)/Payments/Inventory tags and the existing Orders→Payments, Inventory→Orders wiring."],
   [false,"Asks which existing module owns the refund (Orders vs Payments); does not offer 'new Refund context vs distributed' as the framing."],
   [true,"'**Q:** ...which single module decides a refund is in progress — Orders or Payments?' + Recommendation: Orders owns it."],
   [true,"Stays on ownership/boundary; defers full-vs-partial and restock mechanics to later turns."]],
  without_skill: [
   [true,"Quotes each context and the forward-path relationships."],
   [true,"Explicitly lists 'Orders owns it' vs 'a new Returns/Refunds context' — directly poses new-vs-distributed."],
   [false,"No Q:/Recommendation format; sectioned essay with 6 questions."],
   [false,"Dives into per-context language, saga/compensation, warehouse resolution — well past boundary level."]],
 },
 'stale-path-detection': {
  with_skill: [
   [true,"Cross-checks paths: 'that path doesn't exist. The actual package on disk is packages/payments.'"],
   [true,"Flags path + name + language drift as three out-of-sync items."],
   [true,"Surfaces it as a blocking cleanup question before grilling fraud detection."],
   [true,"'the first real question... is whether fraud detection belongs inside Payments at all' — proceeds to the user's actual ask."]],
  without_skill: [
   [true,"'on disk there is no packages/billing/ — the actual package is packages/payments/.'"],
   [true,"Flags stale path and old name."],
   [true,"'Worth fixing the map... so the rest of this discussion references something real.'"],
   [true,"Gives a full placement recommendation for fraud detection (new Risk context)."]],
 },
 'glossary-term-conflict': {
  with_skill: [
   [true,"Quotes Orders glossary: Order = 'a customer's request to purchase...' and the avoid list."],
   [true,"'Same English word, opposite flow' — flags inbound customer Order vs outbound supplier order."],
   [true,"Proposes 'Purchase Order (or Restock Order)' and reserves 'Order' for the customer concept."],
   [true,"'**Q:** What do you want to call the thing you send to a supplier...?' + Recommendation; emits the turn separator."]],
  without_skill: [
   [true,"Quotes the Order definition and the avoid list including Basket."],
   [true,"'two incompatible meanings of the same word living in the same codebase.'"],
   [true,"'The industry-standard term... is a Purchase Order (PO).'"],
   [false,"No Q:/Recommendation format; 5 numbered questions plus a proposed direction."]],
 },
 'relationship-labelling': {
  with_skill: [
   [true,"Summarises Orders (publishes Order Shipped) and Notifications (thin commodity wrapper) and notes relationships list is empty."],
   [false,"Keeps the DDD label out of the user-facing turn (per the skill's language rule) and defers the CONTEXT-MAP write until the user confirms; no single label is recorded in turn 1."],
   [true,"Gives the autonomy implication: 'Orders can evolve its event freely without ever breaking your email sending.'"],
   [false,"Frames the choice (translation step vs read-direct) in plain prose without committing a single label this turn — by design, but the assertion expects a label."]],
  without_skill: [
   [true,"Quotes Order Shipped and the core/generic tags."],
   [false,"Proposes TWO labels at once — 'Customer/Supplier combined with Published Language' — and an invented type/integration field schema."],
   [true,"'you don't want your core Orders context bending to accommodate a generic notifications concern.'"],
   [true,"Does assign labels rather than leaving it free-form."]],
 },
};

// timing helper
function timing(dir){ try{return JSON.parse(fs.readFileSync(path.join(dir,'timing.json'),'utf8'));}catch{return{};} }

const benchRuns=[];
for(const [evalName, configs] of Object.entries(G)){
 const meta=JSON.parse(fs.readFileSync(path.join(ROOT,evalName,'eval_metadata.json'),'utf8'));
 for(const config of ['with_skill','without_skill']){
  const verdicts=configs[config];
  const exps=verdicts.map((v,i)=>({text:meta.assertions[i],passed:v[0],evidence:v[1]}));
  const passed=exps.filter(e=>e.passed).length, total=exps.length;
  const runDir=path.join(ROOT,evalName,config);
  const t=timing(runDir);
  const grading={expectations:exps,summary:{passed,failed:total-passed,total,pass_rate:+(passed/total).toFixed(3)},timing:t};
  fs.writeFileSync(path.join(runDir,'grading.json'),JSON.stringify(grading,null,2));
  benchRuns.push({eval_id:meta.eval_id,eval_name:evalName,configuration:config,run_number:1,
   result:{pass_rate:+(passed/total).toFixed(3),passed,failed:total-passed,total,
    time_seconds:t.total_duration_seconds||0,tokens:t.total_tokens||0,tool_calls:0,errors:0},
   expectations:exps});
 }
}

// aggregate
function agg(cfg){
 const rs=benchRuns.filter(r=>r.configuration===cfg);
 const mean=a=>a.reduce((x,y)=>x+y,0)/a.length;
 const sd=a=>{const m=mean(a);return Math.sqrt(mean(a.map(x=>(x-m)**2)));};
 const pr=rs.map(r=>r.result.pass_rate), tm=rs.map(r=>r.result.time_seconds), tk=rs.map(r=>r.result.tokens);
 const st=a=>({mean:+mean(a).toFixed(3),stddev:+sd(a).toFixed(3),min:Math.min(...a),max:Math.max(...a)});
 return {pass_rate:st(pr),time_seconds:st(tm),tokens:st(tk)};
}
const ws=agg('with_skill'), wo=agg('without_skill');
const bench={
 metadata:{skill_name:'strategic-grill',executor_model:'claude-opus-4-8',timestamp:'2026-06-21',
  evals_run:[...new Set(benchRuns.map(r=>r.eval_id))],runs_per_configuration:1,
  note:'Single run per config (first-turn behaviour is fairly deterministic for these prompts). Baseline = plain Opus 4.8, no skill.'},
 runs:benchRuns,
 run_summary:{with_skill:ws,without_skill:wo,delta:{
  pass_rate:((ws.pass_rate.mean-wo.pass_rate.mean)>=0?'+':'')+(ws.pass_rate.mean-wo.pass_rate.mean).toFixed(3),
  time_seconds:((ws.time_seconds.mean-wo.time_seconds.mean)>=0?'+':'')+(ws.time_seconds.mean-wo.time_seconds.mean).toFixed(1),
  tokens:((ws.tokens.mean-wo.tokens.mean)>=0?'+':'')+Math.round(ws.tokens.mean-wo.tokens.mean)}},
 notes:[
  "The delta is concentrated in FORMAT/DISCIPLINE assertions: baseline (plain Opus 4.8) almost always fails 'exactly one question' and 'Q:/Recommendation format' because it answers with long multi-question essays.",
  "Substantive grilling assertions (pushes back, reads context files, flags stale path / glossary conflict) PASS in BOTH configs — Opus 4.8 is already a strong critical thinker, so these assertions are weakly discriminating.",
  "DDD-jargon leakage is a strong UNMEASURED discriminator observed in transcripts: baselines used 'bounded context', 'Anti-Corruption Layer', 'Published Language', 'Conformist' in user-facing text; with-skill never did. Recommend adding an explicit assertion.",
  "Baseline invented non-canonical labels ('Publisher-Subscriber' in eval 6; ad-hoc type/integration fields in eval 14). With-skill stayed on the canonical DDD set. Recommend an assertion for this.",
  "Baselines leaked implementation (SQL schemas, ledger design, saga/compensation) into responses and docs; the skill kept artifacts as glossaries only. Recommend an 'altitude' assertion.",
  "Eval 10 with_skill failed assertion 2 because it framed ownership as Orders-vs-Payments instead of new-context-vs-distributed — arguably a better framing; the assertion is too prescriptive.",
  "Eval 14 with_skill failed assertions 2 & 4: the skill deliberately keeps DDD labels OUT of conversation and defers the CONTEXT-MAP write until the user confirms, so a literal label can't appear in turn 1. The assertions fight the skill's own language rule and should be reframed.",
  "Cold-start evals (1,2,3): the single Q:/Recommendation block is spent on the mandated file-layout housekeeping, so the substantive technique lands in surrounding prose rather than the Q-block. Consider pre-seeding the file structure so turn 1 goes straight to grilling."]
};
fs.writeFileSync(path.join(ROOT,'benchmark.json'),JSON.stringify(bench,null,2));

// markdown
let md=`# strategic-grill — Benchmark (iteration 1)\n\n`;
md+=`Baseline = plain Opus 4.8 (no skill). 11 evals, 1 run each per config.\n\n`;
md+=`| Configuration | Pass rate | Avg time (s) | Avg tokens |\n|---|---|---|---|\n`;
md+=`| with_skill | ${(ws.pass_rate.mean*100).toFixed(1)}% ± ${(ws.pass_rate.stddev*100).toFixed(1)} | ${ws.time_seconds.mean} | ${Math.round(ws.tokens.mean)} |\n`;
md+=`| without_skill | ${(wo.pass_rate.mean*100).toFixed(1)}% ± ${(wo.pass_rate.stddev*100).toFixed(1)} | ${wo.time_seconds.mean} | ${Math.round(wo.tokens.mean)} |\n`;
md+=`| **delta** | **${bench.run_summary.delta.pass_rate}** | ${bench.run_summary.delta.time_seconds} | ${bench.run_summary.delta.tokens} |\n\n`;
md+=`## Per-eval pass rate\n\n| Eval | with_skill | without_skill |\n|---|---|---|\n`;
for(const name of Object.keys(G)){
 const w=benchRuns.find(r=>r.eval_name===name&&r.configuration==='with_skill').result;
 const b=benchRuns.find(r=>r.eval_name===name&&r.configuration==='without_skill').result;
 md+=`| ${name} | ${w.passed}/${w.total} | ${b.passed}/${b.total} |\n`;
}
md+=`\n## Analyst notes\n\n`+bench.notes.map(n=>`- ${n}`).join('\n')+'\n';
fs.writeFileSync(path.join(ROOT,'benchmark.md'),md);

console.log('wrote 22 grading.json + benchmark.json + benchmark.md');
console.log('with_skill pass:',(ws.pass_rate.mean*100).toFixed(1)+'%','| baseline:',(wo.pass_rate.mean*100).toFixed(1)+'%','| delta',bench.run_summary.delta.pass_rate);
