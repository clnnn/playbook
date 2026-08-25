---
name: to-prd
argument-hint: "[feature or initiative]"
description: Build a lean, engineering-ready PRD — problem through quality requirements — in nine sections, one turn each.
disable-model-invocation: true
---

## Purpose

The PRD owns two things nothing upstream covers: **the solution's shape** and **the requirements it must hold to**.

The skill is standalone. A lean product canvas is useful input, never a prerequisite. User stories, epics and acceptance criteria come afterward.

## Input

Anything supplied at invocation — text after `/to-prd`, a pasted dump, discovery notes, a referenced file, a canvas — is material already given. Read it and route each piece through the gate. Arriving empty-handed works too: the flow opens at **What & why**.

## Operating contract

Three rules govern every turn. The sections below only apply them.

**Strict flow.** Nine sections in order. Finish one — every field gate-passed, **Advance when** met — before opening the next.

**The gate.** Every field passes one of three ways:

- **Found** — in the invocation, a dump, or a readable file. Restate it and have the user confirm or correct it.
- **Missing** — one focused question carrying an **anchor**: a candidate answer to accept, correct, or reject, since an anchor pulls a sharper reply than a blank does. A vague answer earns one follow-up.
- **Unanswerable** — the user genuinely doesn't know. Tag it 🔶 inline where it sits, and carry it to **Open questions**. Write what is known and mark what isn't; facts, data, quotes and approvals come from the user.

**The cross.** An item carrying risk its own section can't hold **crosses** to **Open questions** and gains a row there.

**Facilitation.**

- Open with a heads-up — nine sections, a turn each. **Guided** whatever arrives: a dump fills fields ahead of the turn, and the turn still runs so the user confirms them.
- One turn per section: ask that section's fields together, then wait. Label progress every turn — `Section 4/9 — Out of scope`.
- Numbered options where a question has natural choices, your recommendation first, `Other (specify)` when open-ended. Accept `1`, `#1`, `1 and 3`, `1,3`, or free text.
- On "how many left?", answer and resume. On "stop", halt and wait for an explicit resume.

## Output

Fill `template.md` — it is the sole authority on the deliverable's layout: the sections it shows are the sections the document has, and it carries no table of contents, no change log and no document-information block. Read a section's block on entering that section, and reproduce its structure literally. Each section's item limits live in this contract, not in the template.

---

## Section 1/9 — What & why

**Goal:** a stakeholder knows what is being built, for whom, and why, in 30 seconds.

Three lines:

1. **Building** — *"We're building [solution] for [persona] to solve [problem], which will result in [impact]."* Needing more than one sentence means the scope is still unclear.
2. **Persona** — a type label, one line of build-relevant traits, and the one pain this product removes. Two personas at most, and a second only when it changes what gets built.
3. **Problem** — one sentence, concrete and observable.

A canvas already holds all three: carry the lines across and confirm them. With no canvas, ask for them plainly.

The problem names what the persona cannot do today. "We lack an AI layer" is a solution, "revenue is down" is a business metric, "users need a dashboard" is a feature request — each is a different question than the one this line answers.

**Advance when:** all three lines are filled, the persona is the product's user or buyer, and the problem is observable.

---

## Section 2/9 — Solution & user flow

**Goal:** a builder can see the shape of the thing.

**The flow is the spine.** Draw the end-to-end path as an ASCII diagram — trigger through every step to the terminal state. It carries the section; the prose serves it.

One path, trigger to terminal state — a branch worth its own diagram is a second feature, so name it and move on.

Then at most three sentences on what the product does. What the diagram leaves implicit is named in **In scope**.

Keep it high-level — design owns the UI, so no button labels and no pixels.

**Advance when:** the flow runs trigger to terminal state with no gap, and the prose is at most three sentences.

---

## Section 3/9 — In scope

**Goal:** the build list — every workstream this release ships, at a grain a team can break into stories.

**Included** — one line each, `**workstream** — what it covers`, at most eight. **Epic-sized**: "Data ingestion", never "parse the ISIR header row" and never "the platform". Past eight, ask which ones merge.

Derive them from **Solution & user flow**. Every step the diagram draws is built by something here, and so is everything it leaves implicit — the audit trail, the reminder cadence, the authentication behind a reviewer's panel. Reworking something that already exists is a workstream like any other.

**Trace** each entry to the problem line, in conversation. One that traces to nothing moves to **Out of scope** or gets cut. The traces stay out of the document.

**Advance when:** at most eight entries, each naming a workstream and what it covers on one line, every diagram step covered by one of them, and every entry traced.

---

## Section 4/9 — Out of scope

**Goal:** scope creep meets a written boundary.

**Not included** — one line each, `exclusion — rationale`, at most six. The valuable entries are the ones someone will be disappointed about; give those the strongest rationale.

**Future considerations** — its own bulleted list under the exclusions, at most five, one line each, no rationales. Its only job is stopping a settled question from reopening.

An exclusion that is really a dependency — "mobile out of scope" when the persona is phone-first — is no exclusion: drop it and **cross** it.

**Advance when:** every exclusion carries a rationale, future considerations are their own bulleted list, and nothing here also appears in **Solution & user flow** or **In scope**.

---

## Section 5/9 — Success criteria

**Goal:** a number that settles, after launch, whether this worked.

One criterion carries `⭑` — the one to instrument, which is what the downstream story work wires up. Write that one always. Add up to four more where a distinct outcome needs its own number; one number that settles it beats four that hedge.

One line each: `[observable thing] reaches [number], measured [window]`.

**Anchor** every number. A number with no evidence behind it still gets written, tagged 🔶.

**Advance when:** exactly one criterion carries `⭑`, and every criterion written holds a number and a measurement window.

---

## Section 6/9 — Quality requirements

**Goal:** how well the flow must behave, in numbers engineering can design against.

Capabilities live in **Solution & user flow**. This section holds behaviour under named conditions.

Read [`references/NFR-SIGNALS.md`](references/NFR-SIGNALS.md) on entering — it governs all five moves below.

1. **Derive.** Read **What & why** and **Solution & user flow** against the signal table. Candidates come from this document, not from a checklist walked out of habit.
2. **Admit.** Every candidate names a solution step **and** either the problem or a success criterion. One that names only itself is scope creep.
3. **Rank** survivors on the rubric's two axes, then **cut to five**. Past five, ask which five would delay launch. What is cut is named in the section's **Raised, not pinned** list, one bullet per attribute — a silent cut and a forgotten attribute read identically six months on.
4. **Pin** each survivor in the template's four parts — `PREFIX-NN`, a 2–4 word label naming what the requirement is about, the number under its named conditions, and the `Why` / `From` pair — opening with the attribute's breakage question and **anchoring** the number. The label names the requirement, not its attribute: "Reply latency" earns its line where "Speed" restates the prefix. Still waving after one follow-up → record a **landing zone**. Genuinely unknown → 🔶.

5. **Reconcile.** Walk the pinned set against the reference's tradeoff pairs and settle each in conversation. Only the amended number and a half-line reason reach the entry.

Every entry carries a number. A mandated rule the breakage questions surface — a regulation, a contract term, a residency policy — is pinned when it holds a number engineering designs against, and otherwise belongs to **Solution & user flow** or **In scope** as a fact about what gets built.

A number the reference's `napkin-math` check calls implausible **crosses**, as does any entry that ranked high on technical risk.

**Advance when:** at most five entries, each carrying a label, a number, a `Why` and a `From`; every attribute the signal table raised is either pinned or carries its own bullet in the **Raised, not pinned** list; and every implausible number has crossed.

---

## Section 7/9 — Dependencies

**Goal:** name what this build waits on.

A flat list of at most eight, each with its state — *built* / *absent today* / *unresolved* / *blocked on X*.

**Advance when:** at most eight dependencies, every one carries a state, and anything unresolved that blocks the build has **crossed**.

---

## Section 8/9 — Open questions

**Goal:** every gap has a name against it.

One table: `Open question | Why it matters`. Two sources fill it:

- Every inline 🔶 in the document.
- Every **cross**.

**Advance when:** every inline 🔶 and every **cross** has a row.

---

## Section 9/9 — Risks

**Goal:** catch the risk a PRD is most likely to skip.

One table: `Risk | Why it matters`, filled by a pass over **Cagan's four risks** — value (will they want it?), usability (can they use it?), feasibility (can we build it?), viability (does the business case hold?). Most PRDs fill feasibility and leave value empty; this pass exists to catch that. A risk raised here that turns out to be an unknown someone must go answer **crosses** to **Open questions** instead.

**Advance when:** all four of Cagan's risks have been walked and each surfaced risk has a row.

---

## Publishing

Publish as a product document, following whatever product-document convention this repo documents for agents. With no such convention, save it as markdown in the working directory and report the path.
