---
name: lean-product-canvas
description: Facilitate Jeff Gothelf's Lean Product Canvas (v3) for a whole product team — where Business Outcomes follows the money to the final money-capturer before writing any metric, and metrics are stated as "who does what by how much" key results.
argument-hint: "[business problem]"
disable-model-invocation: true
---

Facilitate **Jeff Gothelf's Lean Product Canvas**. It is a one-page tool that frames work around a business *problem* to solve, not a *solution* to implement, filled across 8 boxes in order.

This variant is self-contained (every helper skill is distilled inline) and keeps two deliberate enrichments over the stock canvas:

- **Box 2 follows the money first.** You trace the cashflow to the final money-capturer *before* naming a metric — then write each metric in v3's **"who does what by how much"** key-result format. You cannot state a credible business outcome until you know who ultimately gets paid.
- **Box 4 runs a full Jobs-to-be-Done pass** (functional / social / emotional jobs, plus pains and gains), and **Box 7 uses Hypothesis-Prioritization thinking** (risk × evidence) to pick what to test first.

The canvas is an insurance policy: it turns assumptions into experiments before you commit to building, and shifts the conversation from outputs to outcomes.

## Input

Works best with the business problem you're framing — or the solution someone handed you, which the canvas reframes as a problem. Also useful: known users, evidence so far, and what the team already believes.

Anything supplied at invocation — text after the skill name, a pasted context dump, an appended `ARGUMENTS:` line — counts as answers already given. Use it and skip whatever it covers; never re-ask. Arriving empty-handed works too: open at Box 1.

## How to run this session

This is a workshop, run one turn at a time. Hold to this protocol through all 8 boxes:

- **Open with a heads-up and an entry mode.** Tell the user this is an 8-box canvas for the whole product team, then offer: **Guided** (one question at a time), **Context dump** (they paste everything, you slot it into boxes and ask only about gaps), or **Best guess** (you draft every box from what you have, they correct).
- **One question per turn.** Ask a single box's question in plain language, then wait. Never stack questions.
- **Label progress every turn** — e.g. `Box 3 of 8 — Users`.
- **Offer numbered options and recommend one.** Each box gives the user a way to answer directly, a "help me work it out" path, and — where they're stuck — the distilled helper for that box. Put your recommendation first, marked `(Recommended)`.
- **Validate against the box's completion criterion before advancing.** If it isn't met, ask a follow-up rather than moving on.
- **Pause and resume on request**, and absorb interruptions without losing the current box.

**Completion criterion:** Selected answers must meet the box's completion criterion before advancing. If not, ask a follow-up question rather than moving on.

## The canvas

```
┌─────────────────────┬──────────────┬───────────────────────┐
│ 1. Business Problem │              │ 2. Business Outcomes  │
├─────────────────────┤ 5. Solutions ├───────────────────────┤
│ 3. Users            │  (spans      │ 4. User Outcomes &    │
│                     │   rows 1-2)  │    Benefits (JTBD)    │
├─────────────────────┤──────────────┼───────────────────────┤
│ 6. Hypotheses       │ 7. Learning  │ 8. Experiments        │
│                     │  Priorities  │                       │
└─────────────────────┴──────────────┴───────────────────────┘
```

Fill order is 1 → 8. Two distinctions to hold throughout: **Box 2 is metrics** (behavior change you can measure, written as "who does what by how much"), **Box 4 is human** (jobs, benefits, emotions). And **solutions are hypotheses, not commitments** — you explore the space, you don't sign up to build it.

**What this canvas is *not*:** a feature list (Box 5 is ideas to test, not a backlog), a project plan (it frames learning, not delivery dates), a strategy substitute (it executes strategy, it doesn't create it — that's the Lean Strategy Canvas), or a one-time exercise (revisit and update as evidence arrives). If the problem *and* solution are already validated, or stakeholders are committed to a solution regardless of evidence, this isn't the tool — fix that first.

## Steps

### Box 1 — Business Problem

Ask: **What is the most important problem your business needs to focus on right now — and what changed in the world that created it?** Draw out current state (how the business delivers value today), what changed (market shift, competitive threat, customer-behavior change, new technology or channel) that has reduced the product's ability to deliver the value it used to, and why it matters now versus six months ago.

*Sharp vs. vague:*

- **Good:** "Mobile is now 60% of visits but converts 15% lower than desktop; our checkout wasn't built for it and competitors ship one-tap."
- **Too vague:** "We need to increase revenue" (nothing changed named), or "Users want more features" (no business problem).

*Problem framing — when they only have a solution ("we need to build X"), reframe it.* Behind the named solution sits a person blocked from something that matters. Draw out five beats:

1. **I am** [specific persona]
2. **trying to** [outcome, not task]
3. **but** [real barrier]
4. **because** [root cause — ask "why" until it stops being a symptom]
5. **which makes me feel** [a real emotion, not marketing-speak]

Then compress to one sentence: `[persona] needs a way to [outcome] because [root cause], which currently [impact]`.

Watch for two dodges — both skip the user's actual problem:

- **Solution-smuggling** — "the problem is we lack X".
- **Company-metric-as-problem** — "churn is up".

*Look inward before advancing — one bias check:* ask **"What's one assumption you're making about this problem that you haven't validated — and how might you be part of the problem?"** Any of these count:

- Solution-first thinking.
- Optimizing for what's easy for the team.
- Assuming you already know what users want.

Tag the answer `[assumption to validate]` so it stays visible as a candidate for Box 7's riskiest assumption.

**Completion criterion:** the statement names what *changed* and why that creates a problem now — not a restated solution, not "we need more revenue" — and one unvalidated assumption is surfaced.

### Box 2 — Business Outcomes

This box runs in two phases, in order. Do not write a metric until the money trail is clear.

#### Phase 2a — Follow the money

Ask questions until you can trace the cashflow end-to-end and name who takes the money at the end. **Follow the money**: don't stop at the first hop ("customers pay us") — trace every step to the **final money-capturer**, the party that ultimately keeps the money when the solution succeeds. Payer, user, and beneficiary are often three different parties; intermediaries (platforms, resellers, ad networks, insurers) skim hops in between.

Probe with questions like:

- Who pays, and for what?
- Where does that money go next?
- Who else sits between the payer and the end?
- Who takes the last cut?
- Would this stakeholder still get paid if the solution worked perfectly?

*Mirror the trail — one status-quo check:* ask **"Who benefits if this problem keeps existing, and who loses if you solve it?"** The party that captures the money when you succeed is rarely the only one with a stake; someone often profits from the status quo (an internal team that avoids extra work, an incumbent, a reseller margin) and will resist. Name them — political resistance is a risk you'd rather see now than in Box 7.

Restate the trail back to the user and advance only on their confirmation.

**Completion criterion — all four hold:**
1. **Every stakeholder is named with their role** — who pays, who uses, who benefits, and every intermediary.
2. **The money path is traced hop-by-hop** — "who pays whom, for what" at each step, with no "…and then revenue happens" gap.
3. **The final money-capturer is explicitly identified.**
4. **The outcome (Phase 2b) will move money toward that capturer** — the trail and the metric are linked, not separate.

#### Phase 2b — Business outcome ("who does what by how much")

Ask: **How will you know you solved the problem — what behavior change will you measure, and how does it move money toward the final money-capturer?** These are your high-level key results: what will people be doing differently if your solutions work? Push for measurable behavior change (leading indicators welcome), not lagging aggregates. If they only have revenue/profit, help find the leading indicator that predicts it. Consider business-success metrics (lifetime value) and product-success metrics (retention rate, usage).

**Write every metric in key-result format: "who — does what — by how much."** That single format carries all four parts a metric needs — the **population/segment** (who), the **behavior change** (does what), and the **baseline → target + timeframe** (by how much). "Cut time" isn't a metric; "field techs (who) cut commissioning time per station from 40 to 10 min (does what, by how much) within one quarter" is.

*Write one key result per hop between the behavior change and the final money-capturer.* The number of layers isn't a style choice — it's set by the money trail from Phase 2a:

- **If the behavior *is* the money event, that's one line — and it's not a compromise.** "Mobile shoppers increase checkout conversion 45%→60% in 3 months": the conversion *is* the cash register firing, so there's no causal gap to expose. Adding a "→ revenue" layer here is padding.
- **If money is downstream, name each hop.** State the leading behavior you'll measure *and* the money it captures, then mark the link between them as an assumption to validate — it's a **viability** risk (candidate for Box 7). Example (mortgage pre-approval):
  - *Leading:* applicants get pre-approval turnaround cut from 5 days to 4 hours, within 2 quarters.
  - *Lagging:* +X% of applicants complete their application → +$Y in origination fees captured by [the lender].
  - *Link (assume, validate):* applicant drop-off is driven by wait time, not by rate competitiveness or credit denials.

The trap is collapsing a multi-hop trail either way: to just the leading metric hides whether money actually moves; to just the lagging aggregate ("increase revenue") is the failure this whole box exists to kill.

*Sharp vs. vague:*

- **Good (one hop):** "Mobile shoppers increase checkout conversion from 45% to 60% in 3 months."
- **Good (multi-hop):** "Pickers cut warehouse pick time 90→30 sec/order this quarter → +40 orders shipped/picker/shift → fulfillment margin captured by the retailer" — with the throughput-is-pick-gated link flagged for Box 7.
- **Too vague:** "Increase revenue" or "Make users happy" — unmeasurable, and you can't tell if the experiment worked.

**Completion criterion:** a measurable, observable behavior-change key result in "who does what by how much" form (segment, behavior, baseline→target, timeframe), explicitly tied to the final money-capturer from Phase 2a. If money is more than one hop downstream, each hop is named and the causal link between them is flagged as an assumption to validate.

### Box 3 — Users

Ask: **Which users and customers (personas) should you focus on first?** Push past "everyone" — consider who **buys**, who **uses**, who **configures**, and who is **impacted** by its use; they're often different people.

*Sharp vs. vague:*

- **Good:** "SMB owners (1–10 staff) in professional services."
- **Too vague:** "All users" or "Everyone" — you can't design a targeted experiment for a persona you can't picture.

*Proto-persona — when they're stuck, sketch one working profile.* Assumption-based is fine; tag the guesses `[validate]`. It's a shared working profile, not validated research. Capture:

- A memorable **name**.
- **Behaviors** — not just age/location, but what they do and where they spend time.
- **Pains** in this problem space.
- What they're **trying to accomplish**.
- Their **goals**.
- Their **decision authority** — a user isn't always the buyer, so note who approves the spend.

**Completion criterion:** specific enough to picture a real person, and one primary persona is chosen — not "all users."

### Box 4 — User Outcomes & Benefits (JTBD)

Ask: **Why would this persona seek out your product? What benefit do they gain, and what is their Job To Be Done?** This is the empathy box — jobs, benefits, emotions — not metrics. Frame the job as "When [situation], I want to [motivation], so I can [expected outcome]."

Work through a full Jobs-to-be-Done pass, per primary persona:

1. **Separate the job from any solution** — ask "why?" until you reach the underlying need ("communicate with my team" is the job; "email" is a solution). Jobs are verb-driven and solution-agnostic.
2. **Cover all three job types** — social and emotional drive adoption harder than functional:
   - **Functional** — the task to complete ("reconcile monthly expenses for tax filing").
   - **Social** — how they want to be perceived, and by whom ("look responsive and reliable to clients").
   - **Emotional** — the state they want to feel or avoid ("feel confident I'm not missing details"; "avoid the anxiety of manual errors").
3. **Name the pains** — challenges/obstacles, what's too costly in time-money-effort, frequent preventable mistakes, and problems current solutions leave unresolved.
4. **Name the gains** — what would exceed today's solutions, the time/money/effort savings that delight, the factors that would make them switch, and how life improves.
5. **Rank by intensity** — not all pains are equal. Flag the most acute pain and the must-have (vs. nice-to-have) gain; that focus feeds Box 5 and Box 6.

Keep each specific and measurable — "cut report time from 8h to 1h", not "be more productive". Ground it in real customer signal where you have it; tag anything assumption-based `[validate]`.

**Completion criterion:** explains *why* the user cares — at least one functional, one social/emotional job, and the most acute pain and most-wanted gain — not just what they'll do.

### Box 5 — Solutions

Ask: **What could we make that solves the business problem and meets this user's need at once?** List product, feature, or enhancement ideas. Push for a wide space — big and small, technical and non-technical, even business-model shifts. These are candidates to test, not a backlog.

**Completion criterion:** at least three distinct candidate solutions. One-idea answers get challenged: "What else could solve this? What if that one fails?"

### Box 6 — Hypotheses

Turn the assumptions from Boxes 2, 3, 4 & 5 into testable hypotheses, **one feature each**.

*Hypothesis template:* **We believe** [business outcome from Box 2] **will be achieved if** [user from Box 3] **attains** [benefit from Box 4] **with** [feature from Box 5]. One feature per hypothesis. Keep the outcome a user *result*, not a feature's existence ("PMs respond to assignments 50% faster", not "PMs have notifications") — a hypothesis you can't be wrong about tests nothing. Draft one per solution; let the user accept, edit, or rewrite.

**Completion criterion:** each hypothesis is one testable statement in the template, linking outcome, user, benefit, and a single feature.

### Box 7 — Learning Priorities (what to learn first)

You now have several hypotheses. This box does two things: **pick which hypothesis to test first**, then **name the riskiest assumption inside it**.

*Prioritize with the Hypothesis Prioritization Canvas (risk × evidence).* Plot each Box 6 hypothesis on two axes — **risk** (how catastrophic if we're wrong) and **evidence** (how much data we already have supporting it):

- **High risk + little evidence → experiment now.** This is where Box 8 goes. If we're wrong here it hurts, and we don't yet know if we're wrong.
- **High risk + strong evidence → build/prioritize.** Act on it; you already have the evidence.
- **Low risk + little evidence → defer** (run cheap experiments later).
- **Low risk + strong evidence → just build it** (task, no experiment needed).

Pick the top-left hypothesis. Then, for it, list all the reasons it might fail (its risks), and choose the single riskiest assumption *right now*. Classify that assumption: **value** (do they want it?), **usability** (can they use it?), **feasibility** (can we build it?), **viability** (does it hit the business outcome / move the money?). Early on, weight risks to **value** over feasibility.

**Completion criterion:** the highest-priority hypothesis is chosen via risk × evidence, and within it one riskiest assumption is named with its risk type and a stated reason — the one that, if wrong, would kill the initiative.

### Box 8 — Experiments (least work to learn next)

Ask: **What's the least amount of work we need to do to learn the next most important thing?** Design the smallest experiment that validates or invalidates the Box 7 assumption fast — what could you learn in 1 day / 1 week / 1 month?

*Proof-of-life probes — pick the cheapest probe that tells the harshest truth about the Box 7 risk, not the one that fits your tooling. Write the pass/fail/learn threshold before you build: if you can't describe failure, you can't measure success. One probe, one assumption.*

Match the probe to the **Box 7 risk type** — the classification you already made is the handoff:

- **Value** (do they want it?) → **customer interviews** (the Mom Test: ask about the last time they hit the problem and what they did, never "would you use this?"; leading questions and pitching poison the signal; 5–10 people who *recently* lived the problem), **landing/fake-door test** (measure demand), **smoke test** (announce it, measure signups).
- **Usability** (can they use it?) → **task-focused test** (watch users attempt the job; observe completion, not opinions), **wizard-of-oz** (fake the solution with humans behind it so users hit a real workflow).
- **Feasibility** (can we build it?) → **feasibility check** (a 1–2 day spike-and-delete: API sniff test, prompt chain, data-integrity sweep — surface the blocker, then throw the code away).
- **Viability** (does it move the money?) → **concierge** (deliver the benefit by hand to a few users before automating, and see if the economics hold), **synthetic-data simulation** (model the outcome without production risk).

Recommend by the Box 7 risk type; let the user pick or design their own.

*Disposal — name the delete-by date before you build.* A probe is reconnaissance, meant to be thrown away, not scaled: if it feels too polished to delete, it's prototype theater, not a probe. Write down when and how you'll dispose of it (delete the spike, archive the recordings, keep only the learnings).

**Completion criterion:** the smallest test that can settle the assumption, matched to the Box 7 risk type, with a stated disposal date, runnable in under two weeks. Bigger than that → break it down.

### Export

Render the completed canvas from `template.md`, with Box 2 showing both a **Money trail** line and an **Outcome (key results)** line in "who does what by how much" form. Then offer to: export as a markdown file, refine any box that feels thin, or suggest what to run next.

### After the canvas — the learning loop

The canvas is one iteration, not a deliverable. Close the session by making the loop explicit so `Iteration: [n]` in the template actually increments:

1. **Run the Box 8 experiment** against a timebox (the <2-week limit you already set).
2. **Record the learning** — was the Box 7 assumption validated or invalidated, and what's the evidence?
3. **Update the canvas** — revise the hypotheses that moved, and re-run the Box 7 risk × evidence prioritization to re-pick the next-riskiest assumption.
4. **Repeat Box 7 → Box 8** until confidence is high enough to commit to building — or until the evidence kills the initiative, which is a win, not a failure.

Bump the iteration number and keep the prior canvas; the trail of what you believed and learned is part of the insurance policy.

## Common pitfalls

Watch for these while facilitating — each is a completion-criterion failure with a fix:

- **Solution smuggled into Box 1** ("we need to build X") → ask what *changed* in the world and why it's a problem now.
- **Vague Box 2** ("increase revenue") → force a measurable behavior change in "who does what by how much" form, tied to the final money-capturer; no way to tell success otherwise.
- **"Everyone" in Box 3** → pick one primary persona; you can expand later, but you can't target a crowd.
- **Box 2 / Box 4 swapped** (emotions in 2, metrics in 4) → Box 2 is behavior change you measure, Box 4 is human motivation (jobs, pains, gains).
- **Only functional jobs in Box 4** → social and emotional jobs drive adoption harder; name at least one of each and rank pains by intensity.
- **One idea in Box 5** (the pre-decided feature) → force 3+ candidates; without alternatives there's nothing to test between.
- **Picking the first hypothesis instead of the riskiest** (Box 7) → run the risk × evidence plot; test the high-risk / low-evidence one first, not the comfortable one.
- **Skipping Box 8** ("we'll just build it and see") → design the smallest experiment first; if none comes to mind, that's the signal to slow down, not speed up.
- **Probe with no disposal date** (Box 8) → it silently becomes the MVP; set the delete-by date before you build, or you'll defend the throwaway instead of throwing it away.

## References

Template: `template.md`. Worked example: `examples/sample.md`.
