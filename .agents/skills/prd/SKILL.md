---
name: prd
argument-hint: "[feature or initiative]"
description: Build an engineering-ready PRD through a strict guided, section-by-section flow.
disable-model-invocation: true
---

## Purpose

Guide a product manager through a complete PRD (Product Requirements Document), section by section, from problem to success criteria — in one self-contained pass. Every contributing method (problem statement, proto-persona, jobs-to-be-done) is embedded here;

User stories, epic breakdown, and acceptance criteria are out of scope — produced separately afterward in the dedicated user-story skill.

The PRD is a living alignment device, not a frozen spec: strategic context, the customer problem, the proposed solution, and how success is measured.

## Input

Anything supplied with the invocation — text after `/prd`, a pasted context dump, discovery notes, or a referenced file — is material already given. Read it, then route each piece through the gate.

Arriving empty-handed works too: the flow starts at the executive summary and builds up.

## Operating contract

Three rules govern every turn. They are the whole skill; the sections below just apply them.

**Strict flow.** Complete Sections 1–9 in order, then the Self-Assessment. Finish one section fully — every field gate-passed, its **Advance when** criterion met — before starting the next.

**The gate.** Every field the PRD needs passes one of three ways:

- **Found** — supplied in the invocation, a dump, or a readable file. Restate it back and ask the user to confirm or correct. Never silently accept found input as final.
- **Missing** — ask one focused question to get it. One question per turn.
- **Unanswerable** — the user doesn't know. Tag the gap inline: 🔶 **Assumption** (plausible but unvalidated) or 🔵 **Open Question** (unknown, needs discovery). Never invent facts, data, quotes, or approvals.

**Facilitation.** Run it as a guided workshop:

- Open with a one-line heads-up (≈60–120 min, 9 sections) and offer three entry modes: **1. Guided** (one question at a time) · **2. Context dump** (paste what you have; the skill routes it and gates the gaps) · **3. Best guess** (infer missing detail, label every inference 🔶).
- One question per turn. Show an honest progress label each turn — `Section X/9`. If the invocation already answered a field, skip it and advance the label.
- Offer numbered quick-select options when a question has natural choices; include `Other (specify)` when open-ended. Accept `1`, `#1`, `1 and 3`, `1,3`, or free text.
- Surface a numbered recommendation only at genuine decision points (which persona is primary, which metric is the one), not after every answer.
- On an interruption ("how many left?"), answer, restate progress and the pending question, then resume. On "stop/pause", halt and wait for explicit resume.

## Output

Fill `template.md` — it is the deliverable: field structure and inline examples for each section. This skill drives the conversation; the template captures the result. Save the completed PRD as a new markdown file (do not overwrite the template). Before sharing it, review the draft with design + engineering — a PRD written alone gets no buy-in.

---

## Section 1 — Executive Summary

**Goal:** A one-paragraph overview a stakeholder reads in 30 seconds.

**Method.** Format: *"We're building [solution] for [persona] to solve [problem], which will result in [impact]."* Draft it first to force clarity, refine it last once Sections 2–8 exist. If it needs more than one sentence to state, the scope is unclear.

**Gate:** solution, persona, problem, measurable impact.

**Advance when:** the named problem has evidence (or is tagged 🔶), the persona maps to a real segment you can detail in §3, and the impact is a measurable outcome, not an aspiration.

---

## Section 2 — Problem Statement

**Goal:** Frame the customer problem with evidence, before any solution.

**Method (embedded problem-statement).** Build the statement from the persona's point of view, then synthesize:

1. **Framing narrative** — five fields: *I am* (specific persona, not "busy professionals") · *Trying to* (a desired outcome, not a task) · *But* (the barriers) · *Because* (the root cause, not a symptom) · *Which makes me feel* (emotions grounded in research).
2. **Context & constraints** — concrete geographic, technical, time, or demographic factors that shape design.
3. **Final statement** — one sentence: *[Persona] needs a way to [outcome] because [root cause], which currently [emotional/practical impact].*
4. **Evidence** — interviews, analytics, support signals, a verbatim customer quote. If all evidence is missing or 🔶, say so plainly — an unevidenced problem is a risk.

**Reject** solution smuggling ("we lack AI analytics"), business problems ("revenue is down"), feature requests ("users need a dashboard"), and symptoms dressed as root causes.

**Gate:** who has it, what it is, why it's painful (user + business impact), evidence.

**Advance when:** the "who" is specific enough to build a persona around, evidence includes at least one quote or data point (else run discovery first), and the business impact ties to a metric leadership tracks.

---

## Section 3 — Target Users & Personas

**Goal:** Build for a specific person, not an abstraction.

**Method (embedded proto-persona + jobs-to-be-done).**

*Proto-persona* — for the primary persona (and secondary if relevant): **Name** (alliterative, memorable) · **Bio/demographics** (only context-relevant ones) · **3 Quotes** (reveal mindset, not facts) · **3 Pains** · **What they're trying to accomplish** (observable, outcome-focused) · **3 Goals** · **Attitudes & influences** (decision authority, influencers, beliefs). Tag anything inferred 🔶; tag missing quotes as needing research. Start with 1–2 personas, not ten.

*Jobs-to-be-done* — capture jobs verb-driven and solution-agnostic ("communicate with team" ≠ "use Slack"):
- **Jobs**: Functional · Social · Emotional
- **Pains**: Challenges · Costliness · Common Mistakes · Unresolved Problems
- **Gains**: Expectations · Savings · Adoption Factors · Life Improvement

**Gate:** primary persona, secondary personas (if any), functional/emotional/social jobs.

**Advance when:** the persona's biggest pain matches §2's problem, the persona is the product's *user/buyer* (not your team or PM audience), and any inferred JTBD is tagged 🔶.

---

## Section 4 — Strategic Context

**Goal:** Explain why this matters to the business and why now.

**Method.** Two parts only:

1. **Business goals** — tie the initiative to a company OKR or strategic priority, and to the revenue/retention/cost impact. The quantified goal becomes the success threshold in §6.
2. **Why now** — the urgency: what changed that makes this the right time? A manufactured "why now" reads as manufactured. The root cause behind "why now" scopes what to build.

**Gate:** business-goal/OKR link, why now.

**Advance when:** you can draw a straight line — business goal → problem (§2) → persona (§3) → this initiative. A weak link means the solution in §5 may be wrong.

---

## Section 5 — Solution Overview

**Goal:** Describe what you're building at a high level. Keep it high-level — design owns the UI.

**Method.**

1. **Solution description** — 2–3 paragraphs on what the product does and how.
2. **Key features** — the capabilities it provides.
3. **User flows / wireframes** *(optional)* — only for complex features needing a visual.

**Gate:** solution description, key features.

**Advance when:** every key feature traces to a §2 pain or §3 job (a feature that solves no stated problem is scope creep — move it to §7 or justify it), the description stays high-level (no button labels or pixel dimensions), and you can name a metric that will move if it works.

---

## Section 6 — Success Metrics

**Goal:** Define how you'll know it worked.

**Method.**

1. **Primary metric** — the ONE metric this must move. If you can't name one, the initiative isn't focused. It must directly measure the §2 problem.
2. **Secondary metrics** — monitored, not optimized for.
3. **Guardrail metrics** — what must NOT regress. Every initiative has side effects; name at least one.

For each: current baseline → target → timeline. A missing baseline is tagged 🔶 and flagged for analytics now, not after launch.

**Gate:** primary metric + baseline/target/timeline, secondary metrics, ≥1 guardrail.

**Advance when:** the primary metric directly measures the §2 problem, every metric has a baseline (or a 🔶 flagged to analytics), and at least one guardrail is named.

---

## Section 7 — Out of Scope

**Goal:** State what you're NOT building, so scope doesn't creep.

**Method.** List excluded capabilities, each with a rationale, plus future considerations. The valuable entries are the ones someone will be disappointed about — give those the strongest rationale.

**Gate:** excluded features + rationale, future considerations.

**Advance when:** nothing here also appears in §5, and any exclusion that is a dependency in disguise (e.g. "mobile out of scope" when 40% of the persona is mobile) is moved to §8 as a risk.

---

## Section 8 — Dependencies & Risks

**Goal:** Surface what could block or derail you, with mitigations.

**Method.** Map technical, external, and team dependencies. Assess risk with **Cagan's four risks** — value (will they want it?), usability (can they use it?), feasibility (can we build it?), viability (does the business case hold?); most PRDs overweight feasibility and underweight value. Each mitigation needs an owner and a trigger — "monitor closely" is not a mitigation.

**Gate:** dependencies (technical/external/team), risks + mitigations.

**Advance when:** all four of Cagan's risks are considered, every mitigation has an owner and a trigger, and every stakes-carrying 🔶 Assumption from earlier sections appears here as a risk.

---

## Section 9 — Open Questions

**Goal:** Make the unknowns visible so they're resolved deliberately.

**Method.** A table of unresolved decisions, each with an owner, a deadline, and a status. Every 🔵 Open Question tagged earlier collects here.

**Gate:** open questions, owners, deadlines.

---

## Self-Assessment

After Section 9, run the diagnostic (template's final section): name the **strongest** and **weakest** sections, collect every 🔶 Assumption into the risk table (assumption · section · risk if wrong · proposed validation), and state the single **recommended next step** before the PRD goes to stakeholders. Share this alongside the PRD.
