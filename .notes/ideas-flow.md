# PRD-Development Skill Reference Analysis

**Date:** 2026-07-14
**Question:** For the `prd-development` skill, which referenced skills (direct and indirect) are actually useful, given the goal of producing a **PRD + engineering-ready user stories**, typically run **after `domain-discovery`**?

---

## Framing assumptions

Two facts drive every verdict below:

1. **Goal = PRD + engineering-ready user stories** — not a business case, pricing decision, or growth strategy.
2. **`domain-discovery` runs first** — so the idea is already stress-tested and you have a bounded-context / ubiquitous-language map. This makes the *problem-reframing* and *"is this real"* skills largely redundant. It does **not**, however, produce personas, jobs-to-be-done, or user stories.

**Verdict scale:** ✅ Core · 🟢 Recommended · 🟡 Situational · 🔴 Skip

---

## Before `domain-discovery` — is anything needed first?

**Usually no.** `domain-discovery` is deliberately the *front door* — its own guidance says to trigger it the moment someone has an idea, plan, or feature to describe. If you already have something concrete to build, **start there; nothing needs to precede it.**

The only case where a skill belongs *before* domain-discovery is when you are **upstream of having an idea at all** — you have a goal or a vague problem but not yet a concrete thing to stress-test. domain-discovery assumes you bring it an idea; it does not *generate* one.

| Skill | Use before domain-discovery when… | Why it fits here |
|---|---|---|
| **opportunity-solution-tree** 🟢 | You have a **business outcome/goal but no specific feature yet** ("reduce churn" but unsure how) | Takes a desired outcome → generates opportunities (problems) → solutions. It *produces the idea* you then bring to domain-discovery |
| **jobs-to-be-done** 🟢 | You're **unsure what customers actually need**, only that there's a space | Grounds you in real functional/emotional/social jobs before committing to an idea; sharpens both domain-discovery and later personas |
| **discovery-process** / **discovery-interview-prep** 🟡 | You have **zero customer evidence** and must talk to people first | Real research to find a validated problem. Heavy (weeks) — only worth it if starting from nothing |

**Not worth running before domain-discovery:**

- **problem-framing-canvas** — domain-discovery already reframes the problem in plain language; running MITRE's canvas first is redundant.
- **proto-persona, positioning-statement, tam-sam-som-calculator** — these read better *after* domain-discovery has clarified the domain and customer.
- The **finance/growth cluster** — irrelevant this early.

**Full pipeline:**

```
(no idea yet?)  opportunity-solution-tree  /  jobs-to-be-done   ← only if upstream of an idea
        │
        ▼
domain-discovery   ← the real front door; start here if you have an idea
        │
        ▼
prd-development → PRD + user stories
```

---

## Decision tree — which entry point?

Pick the entry point by **what you have** and **how it's validated**. The key insight: `domain-discovery` is the hub almost everything passes through — `opportunity-solution-tree` sits *before* it (makes the idea), `lean-ux-canvas` sits *beside* it (gets evidence when assumptions are risky), and `prd-development` sits *after* it (turns the mapped, validated idea into an engineering spec).

```
Goal but no feature yet      →  opportunity-solution-tree ─┐
                                                           │
Idea, needs market evidence  →  lean-ux-canvas (experiment)┤
                                                           ▼
Any concrete idea            →  domain-discovery (stress-test + map)
                                                           │
Validated + domain mapped    →  prd-development → PRD + user stories
```

**How to read it:**

- **No feature yet (just an outcome/goal):** start with `opportunity-solution-tree` — it turns a desired outcome into opportunities → solutions, *producing* the idea you then bring to `domain-discovery`. (`jobs-to-be-done` is the alternative upstream skill when you're unsure what customers actually need.)
- **Idea, not validated — two flavors:**
  - *Not stress-tested by reasoning* (is it coherent? what are the boundaries?) → `domain-discovery`. This is thinking-based validation.
  - *Not validated by evidence* (will users want/use it? too many assumptions?) → `lean-ux-canvas`. This ends in a real-world experiment (interviews, fake-door, Wizard-of-Oz). Often you do both: canvas to validate the bet, then domain-discovery to structure it.
- **Idea, validated:** still usually run `domain-discovery` first — its bounded-context / ubiquitous-language map pre-fills the PRD's Problem (§2), Strategic Context (§4), and Solution boundaries (§5). Jump straight to `prd-development` only if you *already* have that domain map.

**Bottom line:** `domain-discovery` rarely gets skipped, and `lean-ux-canvas` is specifically the *evidence/experiment* path — not a catch-all for any unvalidated idea.

---

## How `prd-development` pulls in skills

References come from **two places**, which is why the list is long:

- **`SKILL.md`** (the 8-phase workflow) — 12 skills
- **`template.md`** (per-section "Contributing Skills" coaching blocks) — adds 14 more

All **26 are direct** references. Tracing what *those* skills reference adds **10 more indirect-only** skills (mostly a self-contained SaaS finance/growth cluster). The graph then closes. **36 skills total** in the transitive closure (excluding `domain-discovery` and `prd-development` itself).

`domain-discovery` references **none** of these — the hand-off from domain-discovery to prd-development is manual. Its output pre-fills the PRD's Problem (§2), part of Strategic Context (§4), and Solution boundaries (§5).

---

## ✅ Core — the spine of PRD + stories (always use)

| Skill | Type | What it does | Why it's core |
|---|---|---|---|
| **workshop-facilitation** | interactive | Interaction protocol: one question at a time, entry modes, progress labels, pause/resume | It's the engine every interactive skill in the flow runs on — not optional |
| **problem-statement** | component | User-centered "I am / trying to / but / because / feel" statement | Formats §2 so every story traces to a real blocker; domain-discovery gives the raw material |
| **proto-persona** | component | Working customer profile (goals, pains, behaviors) with assumption tags | domain-discovery produces *contexts*, not *people* — this is the "As a [persona]" anchor |
| **epic-hypothesis** | component | Testable "we believe X → Y" bet with success measures | Frames the initiative; feeds §7 and keeps stories from being a wishlist |
| **epic-breakdown-advisor** | interactive | Applies Richard Lawrence's 9 split patterns + INVEST checks | The actual engine that generates the story list |
| **user-story** | component | Mike Cohn format + Gherkin acceptance criteria | The literal deliverable engineering consumes (~5–10 min/story) |

---

## 🟢 Recommended — high value, low regret

| Skill | Type | Verdict rationale |
|---|---|---|
| **user-story-splitting** | component | 🟢 Use only when a story is *still* too big after breakdown (5–6+ acceptance criteria). Overlaps heavily with `epic-breakdown-advisor` — you rarely need both |
| **jobs-to-be-done** | component | 🟢 Cheap; makes personas and acceptance criteria reflect real motivation instead of guessed features. Enriches §3 + §7 |
| **user-story-mapping-workshop** (interactive) / **user-story-mapping** (component) | both | 🟢 Lays workflow out as backbone activities → tasks → **release slices**. Component = fast solo pass; workshop = team input. Recommended for any multi-step feature; skip for a single-screen change |
| **opportunity-solution-tree** | interactive | 🟢 (lite) Confirms the solution ladders back to a validated outcome. Partly redundant post-domain-discovery — use as a quick cross-check for §1/§5, not a full discovery pass |

---

## 🟡 Situational — pull in only when the case fits

| Skill | Type | When to use |
|---|---|---|
| **customer-journey-mapping-workshop** | interactive | When the problem spans multiple touchpoints/stages — sharpens personas and surfaces stories you'd otherwise miss. (Keep this one; the `customer-journey-map` component is a duplicate — see Skip) |
| **prioritization-advisor** | interactive | When you have more candidate stories than room and scope is contested (informs §7 selection + §8 Out of Scope) |
| **pol-probe-advisor** → **pol-probe** | interactive / component | If a key assumption is high-risk and unvalidated — design a cheap experiment before committing PRD scope |
| **positioning-statement** | component | Borderline — cheap (~10 min), sharpens §4. Keep for narrative clarity; trim for the leanest flow |

> **Trimmed from situational (2026-07-14):** `tam-sam-som-calculator`, `feature-investment-advisor`, `recommendation-canvas`, `pestel-analysis`, the duplicate `customer-journey-map`, and the stakeholder pair (`stakeholder-identification`, `stakeholder-mapping`) were moved to 🔴 Skip below — each serves a business/investment/org-alignment decision rather than the requirements-and-stories job.

---

# Section 7 Deep-Dive — the User-Stories Trio

**Date:** 2026-07-22
**Question:** In `prd-development` §7 ("User Stories & Requirements"), which skills are referenced, how do they work together, and can they run **without** `prd-development` — e.g. given only domain-discovery context files + an already-written PRD?

---

## The three skills §7 orchestrates

§7 = Phase 7 (the longest phase, 90–120 min). It turns the high-level solution (§5) into an engineering-actionable backlog via three skills in sequence:

| Order | Skill | Type | Role in §7 |
|---|---|---|---|
| 1 | **epic-hypothesis** | component | Frame the initiative as a falsifiable **If/Then** bet + tiny-acts-of-discovery experiments + validation measures. Outcome over output. |
| 2 | **epic-breakdown-advisor** | interactive | Split the (validated) epic into **vertical slices**: pre-split INVEST check → 9 Humanizing-Work patterns in order → evaluate split (reveals low-value work? equal-sized?). Iterative + Cynefin-aware. |
| 3 | **user-story** | component | Write each slice in **Mike Cohn + Gherkin** (As a / I want / so that + Given/When/Then). "One When / one Then" rule doubles as a split tripwire. |

## How they work together (standalone pipeline)

```
   epic-hypothesis          epic-breakdown-advisor            user-story
   (WHY / the bet)   ───▶   (WHAT / right size)      ───▶    (HOW / spec-ready)
        ▲                                                          │
        └──────── feedback: multiple When/Then ⇒ re-split ─────────┘
```

- **hypothesis → breakdown:** only a *validated* hypothesis feeds the split (epic-hypothesis Step 6; advisor Step 0 accepts a hypothesis as its epic input).
- **breakdown → user-story:** advisor's output template already embeds Cohn+Gherkin — it effectively calls `user-story` inline; lists it as a dependency.
- **user-story → back to splitting:** the one-When/one-Then rule kicks oversized stories back to splitting. Not strictly linear.
- **Shared connective tissue:** INVEST runs through all three; vertical-slice / outcome-over-output philosophy is consistent; all three point upstream at `proto-persona` + `problem-statement` for the "who" and "why".

`prd-development` §7 only *orchestrates* this chain — the trio stands on its own.

---

## Can I use them with domain-discovery files + an existing PRD (no prd-development)?

**Yes.** All three are standalone and context-hungry by design — each Input section says pasted context "counts as answers already given… don't re-ask." They need the *upstream facts* (persona, problem, outcome, solution), not the orchestrator.

**What each input supplies:**

| Input | Feeds |
|---|---|
| domain-discovery **ubiquitous-language glossary** | consistent domain terms in stories/AC |
| domain-discovery **bounded contexts** + ownership answers | natural seams for vertical slices; maps to INVEST **Independent** |
| domain-discovery **moat context** | which epic/stories to sequence first |
| PRD **problem + persona** | the "for/as a [persona]" and the "why" |
| PRD **solution overview** | raw material the advisor slices |
| PRD **success metrics** | the epic hypothesis **validation measures** |

**Run order (same as §7):**
```
1. epic-hypothesis        ← PRD problem + solution + metrics
2. epic-breakdown-advisor ← epic + PRD acceptance criteria + bounded contexts
3. user-story             ← each slice + glossary
```

**Caveats:**
1. **May skip `epic-hypothesis`** if the PRD already has a hypothesis or the bet is validated — the advisor accepts a plain epic. Only run it if the initiative is still an unvalidated bet.
2. **Skills read pasted context, not the filesystem** — they won't auto-discover the PRD or `CONTEXT.yaml`; point them at paths or paste content inline.

---

# End-to-End Delivery Workflow — Skills → Linear

**Date:** 2026-07-23
**Question:** After domain-discovery + PRD, what's the workflow through the epic/story skills, and what goes into Linear so developers can work? Also: for a *new feature*, do I need a PRD?
**Chosen setup:** epics = Linear **Projects**; **full hypothesis loop** (willing to kill epics on negative experiments).

---

## The funnel (uncertainty → shippable work)

Each skill answers one question and hands off to the next:

| Stage | Skill | Question | Artifact |
|---|---|---|---|
| 1. Domain | `domain-discovery` | Problem space, language, bounded contexts? | CONTEXT-MAP.yaml |
| 2. Product | `prd` / `prd-development` | What/for whom/why/success? | PRD |
| 3. Shape journey | `user-story-mapping` | End-to-end journey + thinnest releasable slice? | Story map → **epics + release slices** |
| 4. Frame each epic | `epic-hypothesis` | What do we believe this achieves; how'd we know we're wrong? | If/Then + validation measures |
| 5. Split the epic | `epic-breakdown-advisor` (front door) → `user-story-splitting` (raw patterns) | How to cut into sprint-sized vertical slices? | Story titles |
| 6. Write each story | `user-story` | Story + testable AC a dev can build? | Story w/ Gherkin AC |

**`epic-breakdown-advisor` vs `user-story-splitting`:** same Humanizing-Work methodology at different grain. Advisor = guided interview for one epic (the front door). Splitting = raw pattern library it draws on, usable standalone when a *single story* turns out too big. Rarely invoke splitting directly.

```
CONTEXT-MAP.yaml ✅ ─► PRD ✅ ─► ① user-story-mapping ─► (per epic) ② epic-hypothesis
   ─► [risky? run tiny experiment → validated? build / invalidated? kill] ─► ③ epic-breakdown-advisor
   ─► ④ user-story (+ user-story-splitting if still too big) ─► Linear
```

## What enters Linear at each step

```
Initiative:  <the PRD / whole app>
  └─ Project (=Epic):  <a story-map slice>
        │  description = epic hypothesis (If/Then + success measures)
        ├─ Issue (spike):  <tiny act of discovery / experiment>
        ├─ Issue (story):  <Mike Cohn story + Gherkin AC>   ← what a dev picks up
        └─ Issue (story):  ...
```

- **Initiative** = PRD / whole app.
- **Project = Epic**; the epic hypothesis lives in the **Project description**; experiments become **spike Issues** in it. Project stays out of build cycles until validated.
- **Issue = user story**; story + Gherkin AC in the description — the unit devs work on. Optional eng **sub-issues**, but AC (not tasks) define "done".
- **Release slices** from the map → Linear **Cycles / Milestones / labels**; they cut *across* Projects (pull top story from several epics into MVP).

## Full hypothesis loop without theater — triage by risk

Per epic ask: "if I'm wrong here, how expensive is that?"
- **Low risk / obvious** → write If/Then + success measures for framing only; proceed to build. No experiment.
- **High risk / uncertain** (installer field behavior, offline-sync assumptions, guessed workflows) → run a **tiny act of discovery** (clickable prototype w/ real users, concierge test) *before* engineering. Validated → build; invalidated → kill/pivot.

> The loop only pays off if you're actually willing to kill an epic. If you'd build anyway, skip the experiment and use the hypothesis purely for outcome framing.

## Definition of Ready (the one rule that unblocks devs)

An Issue is "ready" only with: a **persona**, an **outcome** ("so that…"), and **testable Gherkin AC**. Everything upstream (map, hypothesis, breakdown) exists to make that Issue trustworthy.

---

## New feature: do I need a PRD? — enter the funnel at the right level

The funnel is **scalable** — enter at the level matching the feature's size. The real question is **"is this feature one epic, or several?"**

| Adding | Enter at | In Linear |
|---|---|---|
| New product / major initiative (many epics) | **PRD** → map → hypothesis → breakdown → stories | new Initiative (or group of Projects) |
| **One feature** (~one epic) | **epic-hypothesis** → breakdown → stories | **one new Project** under existing Initiative |
| Small enhancement (a few stories) | `epic-breakdown-advisor` or straight to `user-story` | Issues in an existing Project |
| Tweak (one story) | `user-story` | one Issue |

**Key insight:** for a single feature, **the epic-hypothesis *is* the mini-PRD** — it captures persona, outcome, and success measures (the PRD's core job at epic grain). Writing a full PRD for one epic is over-engineering (both the `epic-hypothesis` "when NOT to use" and PRD skills warn against it). Reserve PRDs for multi-epic initiatives that need shared problem/users/success alignment.

**On updating domain artifacts for a new feature:** only update `CONTEXT-MAP.yaml` if the feature introduces new domain concepts / bounded contexts / ubiquitous language. If it lives entirely inside existing contexts, skip it. Whatever new language it surfaces should flow into the hypothesis + story wording so devs use the domain's terms.

**Decision rule:**
> One epic → `epic-hypothesis` → breakdown → stories → one new Project.
> Several epics → lightweight PRD → story-map → epics → stories.
> Genuinely tiny → straight to `user-story`.

---
