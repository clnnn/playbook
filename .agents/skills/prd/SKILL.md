---
name: prd
argument-hint: "[feature or initiative]"
description: Build an engineering-ready PRD — problem through non-functional requirements — via a strict guided, section-by-section flow.
disable-model-invocation: true
---

## Purpose

Guide a product manager through a complete PRD (Product Requirements Document), section by section, from executive summary to open questions — in one self-contained pass.

Contributing methods are embedded inline: problem statement (§2), proto-persona and jobs-to-be-done (§3), Cagan's four risks (§9). Quality attribute scenarios (§6) are the one exception — their attribute list, ranking rubric and tradeoff pairs are large enough to live in [`references/NFR-SIGNALS.md`](references/NFR-SIGNALS.md), read on entry to that section.

User stories, epic breakdown, and acceptance criteria are out of scope — produced separately afterward in the dedicated user-story skill.

The PRD is a living alignment device, not a frozen spec: strategic context, the customer problem, the proposed solution, and how success is measured.

## Input

Anything supplied with the invocation — text after `/prd`, a pasted context dump, discovery notes, or a referenced file — is material already given. Read it, then route each piece through the gate.

Arriving empty-handed works too: the flow starts at the executive summary and builds up.

## Operating contract

Three rules govern every turn. They are the whole skill; the sections below just apply them.

**Strict flow.** Complete Sections 1–10 in order, then the Self-Assessment. Finish one section fully — every field gate-passed and its **Advance when** criterion met — before starting the next.

**The gate.** Every field the PRD needs passes one of three ways:

- **Found** — supplied in the invocation, a dump, or a readable file. Restate it back and ask the user to confirm or correct. Never silently accept found input as final.
- **Missing** — ask one focused question to get it. **Anchor** it: offer a candidate answer to accept, correct, or reject, since an anchor pulls a sharper reply than a blank does. A vague answer earns two follow-ups before you settle for it.
- **Unanswerable** — the user genuinely doesn't know. Tag the gap inline where it appears: 🔶 **Assumption** (plausible but unvalidated) or 🔵 **Open Question** (unknown, needs discovery). Every 🔵 collects into §10; every 🔶 collects into the Self-Assessment table, and a 🔶 carrying stakes also lands in §9 as a risk. Never invent facts, data, quotes, or approvals.

**Facilitation.** Run it as a guided workshop:

- Open with a one-line heads-up (≈90–150 min, 10 sections) and offer three entry modes:
  1. **Guided** — one question at a time.
  2. **Context dump** — paste what you have; the skill routes it and gates the gaps.
  3. **Best guess** — infer missing detail, label every inference 🔶.
- One question per turn. Show an honest progress label each turn — `Section X/10`. If the invocation already answered a field, skip it and advance the label.
- Offer numbered quick-select options when a question has natural choices; include `Other (specify)` when open-ended. Accept `1`, `#1`, `1 and 3`, `1,3`, or free text.
- Surface a numbered recommendation only at genuine decision points (which persona is primary, which metric is the one), not after every answer.
- On an interruption ("how many left?"), answer, restate progress and the pending question, then resume. On "stop/pause", halt and wait for explicit resume.

## Output

Fill `template.md` — it is the deliverable: field structure and inline examples for each section. Read a section's block on entering that section; for §3 and §6 read it before the first question of the section, since their field layouts are what the output has to match. This skill drives the conversation; the template captures the result, in a new document that leaves the template itself untouched.

**Format contract.** Reproduce the template's structure literally — every field its own bullet, every table a table, every NFR scenario a fenced block. The template is the sole authority on the deliverable's layout.

Before publishing it, review the draft with design + engineering — a PRD written alone gets no buy-in.

---

## Section 1 — Executive Summary

**Goal:** A one-paragraph overview a stakeholder reads in 30 seconds.

**Method.** Format: *"We're building [solution] for [persona] to solve [problem], which will result in [impact]."* Draft it first to force clarity, refine it last once Sections 2–8 exist. If it needs more than one sentence to state, the scope is unclear.

**Advance when:** all four slots — solution, persona, problem, impact — are filled, the named problem has evidence (or is tagged 🔶), the persona maps to a real segment you can detail in §3, and the impact is a measurable outcome, not an aspiration.

---

## Section 2 — Problem Statement

**Goal:** Frame the customer problem with evidence, before any solution.

**Method (embedded problem-statement).** Build the statement from the persona's point of view, then synthesize:

1. **Framing narrative** — five fields:
   - *I am* — a specific persona, not "busy professionals".
   - *Trying to* — a desired outcome, not a task.
   - *But* — the barriers.
   - *Because* — the root cause, not a symptom.
   - *Which makes me feel* — emotions grounded in research.
2. **Context & constraints** — concrete geographic, technical, time, or demographic factors that shape design.
3. **Final statement** — one sentence: *[Persona] needs a way to [outcome] because [root cause], which currently [emotional/practical impact].*
4. **Evidence** — interviews, analytics, support signals, a verbatim customer quote. If all evidence is missing or 🔶, say so plainly — an unevidenced problem is a risk.

**Reject** solution smuggling ("we lack AI analytics"), business problems ("revenue is down"), feature requests ("users need a dashboard"), and symptoms dressed as root causes.

**Advance when:** the problem is stated in concrete, observable terms, the "who" is specific enough to build a persona around, both user impact and business impact are named with the business one tied to a metric leadership tracks, and evidence includes at least one quote or data point (else run discovery first).

---

## Section 3 — Target Users & Personas

**Goal:** Build for a specific person, not an abstraction.

**Method (embedded proto-persona + jobs-to-be-done).** Read the §3 block of `template.md` before the first question — it fixes the field layout this section outputs.

*Proto-persona* — for the primary persona (and secondary if relevant):

- **Name** — a realistic individual name, the kind a real person has.
- **Bio/demographics** — only context-relevant ones.
- **3 Quotes** — reveal mindset, not facts.
- **3 Pains**
- **What they're trying to accomplish** — observable, outcome-focused.
- **3 Goals**
- **Attitudes & influences** — decision authority, influencers, beliefs.

Tag anything inferred 🔶; tag missing quotes as needing research. Start with 1–2 personas, not ten.

*Jobs-to-be-done* — capture jobs verb-driven and solution-agnostic ("communicate with team" ≠ "use Slack"):

- **Jobs**
  - Functional
  - Social
  - Emotional
- **Pains**
  - Challenges
  - Costliness
  - Common mistakes
  - Unresolved problems
- **Gains**
  - Expectations
  - Savings
  - Adoption factors
  - Life improvement

**Advance when:** the primary persona carries every proto-persona field, functional, social and emotional jobs are each captured, the persona's biggest pain matches §2's problem, the persona is the product's *user/buyer* (not your team or PM audience), and any inferred JTBD is tagged 🔶.

---

## Section 4 — Strategic Context

**Goal:** Explain why this matters to the business and why now.

**Method.** Two parts only:

1. **Business goals** — tie the initiative to a company OKR or strategic priority, and to the revenue/retention/cost impact. The quantified goal becomes the success threshold in §7.
2. **Why now** — the urgency: what changed that makes this the right time? A manufactured "why now" reads as manufactured. The root cause behind "why now" scopes what to build.

**Advance when:** the initiative is tied to a named OKR or strategic priority with a quantified impact, the "why now" names what actually changed, and you can draw a straight line — business goal → problem (§2) → persona (§3) → this initiative. A weak link means the solution in §5 may be wrong.

---

## Section 5 — Solution Overview

**Goal:** Describe what you're building at a high level. Keep it high-level — design owns the UI.

**Method.**

1. **Solution description** — 2–3 paragraphs on what the product does and how.
2. **Key features** — the capabilities it provides.
3. **User flows / wireframes** *(optional)* — only for complex features needing a visual.

**Advance when:** every key feature traces to a §2 pain or §3 job (a feature that solves no stated problem is scope creep — move it to §8 or justify it), the description stays high-level (no button labels or pixel dimensions), and you can name a metric that will move if it works.

---

## Section 6 — Non-Functional Requirements

**Goal:** Pin how well the §5 features must behave, in numbers an engineer can design against.

**Method (quality attribute scenarios).** Read two things before the first question: [`references/NFR-SIGNALS.md`](references/NFR-SIGNALS.md) — the ten attributes, their ID prefixes, the breakage question that opens each, the signal table, the ranking rubric, the anchoring and landing-zone rules, and the tradeoff pairs — and the §6 block of `template.md`, which fixes the nine-field layout every pinned scenario is written in. The reference is the authority on all of those; these five moves say only where each lands in the flow:

1. **Derive.** Read §2, §3 and §5 against the signal table. Candidates come from this document, not from a checklist walked out of habit.
2. **Admit.** Every candidate names a §5 key feature **and** a §2 pain or the §7 primary metric. One that names only itself is scope creep — drop it.
3. **Rank** survivors on the rubric's two axes and pin what it says to pin. Past ~8 pinned, ask which three would delay launch and rule out the rest — a silent truncation reads as coverage.
4. **Pin** each survivor as a scenario on the template's nine fields, opening with the attribute's **breakage** question and **anchoring** the number. Three follow-ups is the floor here, one more than the contract's two: still waving → a **landing zone**; genuinely unknown → 🔵 into §10; a measure with no evidence behind it → 🔶.
5. **Reconcile.** Walk the pinned set against the reference's **tradeoff** pairs and settle each one there — eight individually plausible numbers make a collectively impossible set.

A pinned number the reference's `napkin-math` check calls implausible is mirrored into §9 as a feasibility risk, as is any pinned scenario that ranked high on technical risk.

A rule nobody gets to tune — a mandated database, an enterprise licence, a data-residency decree — is a **constraint**, not a quality attribute: it goes in its own subsection, since forcing a threshold onto it produces nonsense.

**Advance when:** every pinned scenario carries a Response Measure or landing zone and traces to a feature and a pain/metric, every attribute the signal table raised is pinned or ruled out with a stated reason, every tradeoff pair the reference lists has a named winner or a 🔵 owner, every mandated rule sits under Constraints rather than wearing a threshold, and every implausible or high-risk number appears in §9.

---

## Section 7 — Success Metrics

**Goal:** Define how you'll know it worked.

**Method.**

1. **Primary metric** — the ONE metric this must move. If you can't name one, the initiative isn't focused. It must directly measure the §2 problem.
2. **Secondary metrics** — monitored, not optimized for.
3. **Guardrail metrics** — what must NOT regress. Every initiative has side effects; name at least one. Guardrails are business outcomes; system qualities are §6's job, so a threshold like "p99 under 400ms" belongs there as a scenario.

For each: current baseline → target → timeline.

**Advance when:** exactly one primary metric is named and it directly measures the §2 problem, every metric carries baseline → target → timeline (a missing baseline tagged 🔶 and flagged to analytics now, not after launch), secondary metrics read as monitored rather than optimised for, and at least one guardrail is named.

---

## Section 8 — Out of Scope

**Goal:** State what you're NOT building, so scope doesn't creep.

**Method.** List excluded capabilities, each with a rationale, plus future considerations. The valuable entries are the ones someone will be disappointed about — give those the strongest rationale.

**Advance when:** every exclusion carries a rationale, future considerations are listed, nothing here also appears in §5, and any exclusion that is a dependency in disguise (e.g. "mobile out of scope" when 40% of the persona is mobile) is moved to §9 as a risk.

---

## Section 9 — Dependencies & Risks

**Goal:** Surface what could block or derail you, with mitigations.

**Method.** Map technical, external, and team dependencies. Assess risk with **Cagan's four risks** — value (will they want it?), usability (can they use it?), feasibility (can we build it?), viability (does the business case hold?); most PRDs overweight feasibility and underweight value. Each mitigation needs an owner and a trigger — "monitor closely" is not a mitigation.

**Advance when:** technical, external and team dependencies are each mapped, all four of Cagan's risks are considered, every §6 feasibility risk has crossed over into the template's Feasibility Risks table, every mitigation has an owner and a trigger, and every stakes-carrying 🔶 Assumption from earlier sections appears here as a risk.

---

## Section 10 — Open Questions

**Goal:** Make the unknowns visible so they're resolved deliberately.

**Method.** A table of unresolved decisions, each with an owner, a deadline, and a status.

**Advance when:** every 🔵 tagged earlier in the document appears in the table, and each row names an owner and a deadline — an open question with no name against it is one nobody will answer.

---

## Self-Assessment

**Goal:** A one-page read on how far this PRD can be trusted, shared alongside it.

**Method.** Reopen §1 first and refine the executive summary against the finished §2–§8, as §1 promised. Then run the diagnostic in the template's final section: name the **strongest** and **weakest** sections, collect every 🔶 Assumption into its risk table, and state the single **recommended next step** before the PRD goes to stakeholders.

**Advance when:** §1 has been reread against the finished sections and either refined or confirmed as still accurate, the strongest and weakest calls each name a section and the reason for it, every 🔶 in the document appears in the table with a risk-if-wrong and a proposed validation, and the recommended next step is one action with a named first move — not a list.

---

## Publishing

Publish the finished PRD as a product document, following whatever product-document convention this repo documents for agents. Where the repo has no such convention, save it as a markdown file in the working directory and report the path.
