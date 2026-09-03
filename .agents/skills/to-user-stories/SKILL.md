---
name: to-user-stories
description: Synthesise the current conversation into implementation-ready user stories and publish them as tickets.
argument-hint: "[optional: the feature or epic to slice]"
disable-model-invocation: true
---

# To User Stories

Synthesise what this conversation already holds into implementation-ready stories, each written for a **fresh agent**: an implementer with the code in front of them but none of this conversation. No interview — the conversation is the material. One checkpoint: the seams.

## Ground rules

- Use the project's domain glossary vocabulary throughout the user story, and respect any ADRs in the area you're touching.
- Tracker verbs this skill names in **bold** — **publish**, **link A blocked by B**, **apply a label** — are defined by the project's issue tracker doc. Read it before the first write.
- The `codebase-design` skill is the seam vocabulary. Read it at Seams; its terms (module, interface, seam, adapter, depth) are the words §4 and §5 use.

## Step 1/5 — Ground

The feature is whatever the invocation named, else the one this conversation is about.

Explore the repo for the current state of the code the feature touches — what already runs, what the change has to reach. Read the glossary and the ADRs covering the area in the same step.

The glossary's vocabulary carries through every story. Where a story's work contradicts an ADR, surface it — *"contradicts ADR-0003, worth reopening because…"* — rather than silently overriding.

**Advance when** the touched code, the glossary terms, and the ADRs covering the area are all in context.

## Step 2/5 — Seams

Sketch the seams at which the feature gets tested, in the `codebase-design` skill's words.

- **Existing over new.** A seam already in the codebase costs nothing to test through.
- **Highest possible.** The seam that observes the most behaviour per unit of interface a test has to learn. A new seam is proposed at the highest point it can sit.
- **Fewest.** One seam across the whole feature is the target; each extra one is a cost to justify.

Present each seam — where it sits, existing or new, what a test sees through it — and ask the user whether they match expectations. This is the skill's one gate: hold until the answer comes, and apply their corrections before splitting.

**Advance when** the user confirms the seams.

## Step 3/5 — INVEST pre-check

Run the material through this before any split:

| Check | Question | On failure |
|---|---|---|
| Independent | Prioritizable without hard technical dependencies? | Flag the dependency; it becomes a **blocked by** edge at publish |
| Negotiable | Room for the team to discover implementation, not a prescriptive spec? | Reframe before splitting |
| Valuable | Observable user value? | **Stop. Don't split a technical task** — combine it with related work into a meaningful increment |
| Estimable | Team can size it roughly? | Run a spike first (Pattern 9) |
| Testable | Concrete pass/fail acceptance criteria? | Refine criteria before splitting |
| Small | Completable in ≈1–5 days? | Too big is the normal case — Step 4 is what fixes it |

**Advance when** every row passes or carries its stated remedy.

## Step 4/5 — Split

Every story is a **vertical slice**: it cuts through all layers and delivers observable user value. Walk the patterns in order and take the first that fits — a clean "no, next pattern" is the correct move.

1. **Workflow Steps** — multi-step workflow? Split into thin end-to-end slices, never step-by-step. Story 1 = the full workflow via the simplest path (upload → live, no reviews); later stories add intermediate steps (editorial review, legal approval). Each story delivers the whole workflow at increasing sophistication.
2. **Operations (CRUD)** — "manage / handle / maintain" signals bundled operations. One story per operation: create, view, edit, delete.
3. **Business Rule Variations** — identical functionality under different rules (tiers, regions, conditions)? One story per rule.
4. **Data Variations** — different data types, formats, or structures? One story per variation, simplest first, added just-in-time.
5. **Data Entry Methods** — fancy UI (date picker, autocomplete, drag-and-drop) riding on core functionality? Story 1 = plain input, later stories = UI polish.
6. **Major Effort** — first implementation carries the weight, additions are trivial (the first card network builds the whole payment pipeline)? Story 1 = implement one, Story 2 = add the remaining variants.
7. **Simple/Complex** — ask "what's the simplest version that still delivers value?" That's Story 1; each stripped-away complexity becomes its own story.
8. **Defer Performance** — split "make it work" from "make it fast." Story 1 = functional, Story 2 = meet the performance/scale target.
9. **Break Out a Spike** — none of 1–8 fit ⇒ uncertainty is the blocker. Time-box a short investigation answering one named question (feasibility, approach, what the API returns). A spike produces learning, not shippable code, so it cannot be split further: write it as a story whose §3 is the question answered, publish it as the only ticket of this run, and stop — the next run restarts at Pattern 1 with the answer in hand.

**Meta-pattern — runs inside whichever pattern fits:**

1. Identify the core complexity — what makes this epic hard?
2. List all variations.
3. Reduce to **one complete slice** — the simplest variation that still delivers end-to-end value.
4. Make every other variation its own story.

**Split evaluation.** A split earns its keep by at least one of:

- **It reveals low-value work** — the 80/20 exposed: a slice to deprioritize or kill ("flexible dates is rarely used → defer"). Report it as a finding and recommend dropping it.
- **It yields roughly equal-sized stories** — equal slices give the product owner reordering freedom.

Neither satisfied → try the next pattern. Any resulting story still failing Small → restart it at Pattern 1 and split again.

**Advance when** every slice is vertical, INVEST-passing including Small, and its producing pattern is named.

## Step 5/5 — Write & publish

Read [`template.md`](template.md) and write each slice with it, then run the checks, then the adversarial pass, then publish.

**Checks** — every story, all-green before publishing:

| # | Check |
|---|---|
| 1 | §2 **Out** is non-empty and names real neighbouring work: the next slice's tasks, the adjacent workflow step, variations split off during the split |
| 2 | Every domain term is a glossary term, used in the glossary's words and never redefined — an `_Avoid_` synonym never appears |
| 3 | Every §3 scenario has exactly one When and one Then |
| 4 | §3 covers the happy path, every edge case, every failure mode |
| 5 | Every Then is observable — a state, message, or number someone can check ("better/faster/improved" fails) |
| 6 | §4 and §5 name modules, interfaces and seams — no file paths, and no code beyond a decision-encoding snippet; both go stale within the week |
| 7 | §5's seams are the seams confirmed at Step 2 |

**Adversarial pass** — dispatch three subagents per story, in parallel, once the checks are green. Each is briefed to *break* the story; a report of "looks fine" is a failed dispatch. Treat every finding as a check failure: rewrite and re-run the checks.

| Agent | Context it gets | Charge |
|---|---|---|
| Fresh agent | The story body and the repo — no conversation, no other story | Plan the implementation, reading only. Every question you have to ask to plan it is a gap. |
| Slice auditor | One story body | Prove this slice is not vertical: name a layer it fails to cut, or user-observable value it fails to deliver. |
| Glossary cop | One story body, the glossary, the ADRs covering the area | Name every term that is not a glossary term, every glossary term used in other words, and every line contradicting an ADR. |

The fresh agent is the one that tests this skill's premise, so its questions outrank the checks table: a story it cannot implement is not ready, all-green or not.

**Publish** — one ticket per story in dependency order, title = story title, body = the five sections. Record each returned number, then **link A blocked by B** for every dependency the INVEST pre-check flagged, and **apply a label** named for the feature to every ticket in the run. Report each story title with its ticket ref and blockers, plus any slice the split flagged as killable.

**Done when** every story has survived the adversarial pass, holds a ticket ref, and every flagged dependency has an edge.