---
name: prd
argument-hint: "[feature or initiative]"
description: Build a lean, engineering-ready PRD — problem through quality requirements — in seven sections, one turn each.
disable-model-invocation: true
---

## Purpose

Guide a product manager through a PRD that says what to build, in seven sections.

The PRD owns two things nothing upstream covers: **the solution's shape** and **the requirements it must hold to**.

The skill is standalone. A lean product canvas is useful input, never a prerequisite. User stories, epics and acceptance criteria come afterward.

## Input

Anything supplied at invocation — text after `/prd`, a pasted dump, discovery notes, a referenced file, a canvas — is material already given. Read it, route each piece through the gate, and never re-ask what it answers. Arriving empty-handed works too: the flow opens at **What & why**.

## Operating contract

Three rules govern every turn. The sections below only apply them.

**Strict flow.** Seven sections in order. Finish one — every field gate-passed, **Advance when** met — before opening the next.

**The gate.** Every field passes one of three ways:

- **Found** — in the invocation, a dump, or a readable file. Restate it and have the user confirm or correct it.
- **Missing** — one focused question carrying an **anchor**: a candidate answer to accept, correct, or reject, since an anchor pulls a sharper reply than a blank does. A vague answer earns one follow-up.
- **Unanswerable** — the user genuinely doesn't know. Tag it 🔶 inline where it sits, and carry it to **Risks & open questions**. Write what is known and mark what isn't; facts, data, quotes and approvals come from the user.

**The cross.** An item carrying risk its own section can't hold **crosses** to **Risks & open questions** and gains a row there.

The document carries no table of contents, no change log and no document-information block.

**Facilitation.**

- Open with a heads-up — ~20–30 min, seven sections — and three ways in: **Guided** (a turn per section), **Context dump** (paste what you have; the skill routes it and gates the gaps), **Best guess** (infer the rest, every inference 🔶).
- One turn per section: ask that section's fields together, then wait. Label progress every turn — `Section 3/7 — Out of scope`.
- Numbered options where a question has natural choices, your recommendation first, `Other (specify)` when open-ended. Accept `1`, `#1`, `1 and 3`, `1,3`, or free text.
- On "how many left?", answer and resume. On "stop", halt and wait for an explicit resume.

## Output

Fill `template.md` — it is the sole authority on the deliverable's layout. Read a section's block on entering that section, and reproduce its structure literally. Each section's item limits live in this contract, not in the template.

---

## Section 1/7 — What & why

**Goal:** a stakeholder knows what is being built, for whom, and why, in 30 seconds.

Three lines:

1. **Building** — *"We're building [solution] for [persona] to solve [problem], which will result in [impact]."* Needing more than one sentence means the scope is still unclear.
2. **Persona** — a type label, one line of build-relevant traits, and the one pain this product removes. Two personas at most, and a second only when it changes what gets built.
3. **Problem** — one sentence, concrete and observable.

A canvas already holds all three: carry the lines across and confirm them. With no canvas, ask for them plainly.

The problem names what the persona cannot do today. "We lack an AI layer" is a solution, "revenue is down" is a business metric, "users need a dashboard" is a feature request — each is a different question than the one this line answers.

**Advance when:** all three lines are filled, the persona is the product's user or buyer, and the problem is observable.

---

## Section 2/7 — Solution & user flow

**Goal:** a builder can see the shape of the thing.

**The flow is the spine.** Draw the end-to-end path as an ASCII diagram — trigger through every step to the terminal state. It carries the section; the prose serves it.

One path, trigger to terminal state — a branch worth its own diagram is a second feature, so name it and move on.

Then at most three sentences on what the product does, and an **Also built** list of at most six naming only what the diagram leaves implicit: an audit trail, a reject-to-user path, a reminder cadence.

**Trace** each feature to the problem line, in conversation. One that traces to nothing moves to **Out of scope** or gets cut. The traces stay out of the document.

Keep it high-level — design owns the UI, so no button labels and no pixels.

**Advance when:** the flow runs trigger to terminal state with no gap, the prose is at most three sentences, and every feature has traced.

---

## Section 3/7 — Out of scope

**Goal:** scope creep meets a written boundary.

- **Not included** — one line each, `exclusion — rationale`, at most six. The valuable entries are the ones someone will be disappointed about; give those the strongest rationale.
- **Future considerations** — a bare list, at most five, no rationales. Its only job is stopping a settled question from reopening.

An exclusion that is really a dependency — "mobile out of scope" when the persona is phone-first — is no exclusion: drop it and **cross** it.

**Advance when:** every exclusion carries a rationale, and nothing here also appears in **Solution & user flow**.

---

## Section 4/7 — Success criteria

**Goal:** a number that settles, after launch, whether this worked.

Three to five criteria, one line each: `[observable thing] reaches [number], measured [window]`. Mark exactly one `⭑` — the one to instrument, which is what the downstream story work wires up. Close with one line of what must not regress.

**Anchor** every number. A number with no evidence behind it still gets written, tagged 🔶.

**Advance when:** three to five criteria are present, exactly one carries `⭑`, every criterion holds a number and a measurement window, and one must-not-regress line is present.

---

## Section 5/7 — Quality requirements & constraints

**Goal:** how well the flow must behave, in numbers engineering can design against.

Capabilities live in **Solution & user flow**. This section holds behaviour under named conditions, plus rules nobody gets to tune.

Read [`references/NFR-SIGNALS.md`](references/NFR-SIGNALS.md) on entering — it governs all five moves below.

1. **Derive.** Read **What & why** and **Solution & user flow** against the signal table. Candidates come from this document, not from a checklist walked out of habit.
2. **Admit.** Every candidate names a solution step **and** either the problem or a success criterion. One that names only itself is scope creep.
3. **Rank** survivors on the rubric's two axes, then **cut to five**. Past five, ask which five would delay launch. What is cut is named on the section's **Raised, not pinned** line — a silent cut and a forgotten attribute read identically six months on.
4. **Pin** each survivor on three lines, opening with the attribute's breakage question and **anchoring** the number:

```
PERF-01  Chat turn completes in ≤6s (10s floor) on 4G, 15 turns deep; first token ≤2s
   Why:  Solution step "agent chat" — a stalled chat is the abandonment this product removes
   From: Launch, pilot cohort; tightens to 3s before an award-year peak
```

   Still waving after one follow-up → record a **landing zone**, as above. Genuinely unknown → 🔶.

5. **Reconcile.** Walk the pinned set against the reference's tradeoff pairs and settle each in conversation. Only the amended number and a half-line reason reach the entry.

Then **Constraints**: a bare list of rules nobody gets to tune, each with who mandates it. These carry no number — a threshold on a constraint produces nonsense.

A number the reference's `napkin-math` check calls implausible **crosses**, as does any entry that ranked high on technical risk.

**Advance when:** at most five entries, each carrying a number, a `Why` and a `From`; every attribute the signal table raised is either pinned or named on the **Raised, not pinned** line; every mandated rule sits under Constraints rather than wearing a threshold; and every implausible number has crossed.

---

## Section 6/7 — Dependencies

**Goal:** name what this build waits on.

A flat list of at most eight, each with its state — *built* / *absent today* / *unresolved* / *blocked on X*.

**Advance when:** at most eight dependencies, every one carries a state, and anything unresolved that blocks the build has **crossed**.

---

## Section 7/7 — Risks & open questions

**Goal:** every gap has a name against it.

One table: `Risk or unknown | Why it matters | Owner | Next move`. Three sources fill it:

- Every inline 🔶 in the document.
- Every **cross**.
- A pass over **Cagan's four risks** — value (will they want it?), usability (can they use it?), feasibility (can we build it?), viability (does the business case hold?). Most PRDs fill feasibility and leave value empty; this pass exists to catch that.

Every `Next move` is an action someone takes, with the trigger that fires it. "Monitor closely" is not one.

**Advance when:** every inline 🔶 and every **cross** has a row, all four of Cagan's risks have been walked, and every row names an owner and a next move.

---

## Publishing

Publish as a product document, following whatever product-document convention this repo documents for agents. With no such convention, save it as markdown in the working directory and report the path.
