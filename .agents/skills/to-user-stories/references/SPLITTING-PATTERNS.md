# Splitting patterns — Humanizing Work methodology

Richard Lawrence's flowchart for breaking epics into stories. Read on entry to the Derive step. The goal is always a **vertical slice** — work that cuts through all layers and delivers observable user value — never a horizontal slice ("API story" + "UI story", or a workflow step users can't see finish).

## Pre-split validation (INVEST, except Small)

Before splitting, the source material must pass:

| Check | Question | On failure |
|---|---|---|
| Independent | Prioritizable without hard technical dependencies? | Flag the dependency; it becomes a blocked-by edge later |
| Negotiable | Room for the team to discover implementation, not a prescriptive spec? | Reframe before splitting |
| Valuable | Observable user value? | **Stop. Don't split a technical task** — combine it with related work into a meaningful increment |
| Estimable | Team can size it roughly? | Run a spike first (Pattern 9) |
| Testable | Concrete pass/fail acceptance criteria? | Refine criteria before splitting |

## The 9 patterns, in order

Walk them sequentially; take the first that fits. Forcing a pattern that doesn't fit produces an arbitrary split — a clean "no, next pattern" is the correct move.

1. **Workflow Steps** — multi-step workflow? Split into **thin end-to-end slices**, never step-by-step. Story 1 = the full workflow via the simplest path (upload → live, no reviews); later stories add intermediate steps (editorial review, legal approval). Each story delivers the whole workflow at increasing sophistication.
2. **Operations (CRUD)** — "manage / handle / maintain" signals bundled operations. One story per operation: create, view, edit, delete.
3. **Business Rule Variations** — identical functionality under different rules (tiers, regions, conditions)? One story per rule.
4. **Data Variations** — different data types, formats, or structures? One story per variation, simplest first, added just-in-time.
5. **Data Entry Methods** — fancy UI (date picker, autocomplete, drag-and-drop) riding on core functionality? Story 1 = plain input, later stories = UI polish.
6. **Major Effort** — first implementation carries the weight, additions are trivial (first card network builds the whole payment pipeline)? Story 1 = implement one, Story 2 = add the remaining variants.
7. **Simple/Complex** — ask "what's the simplest version that still delivers value?" That's Story 1; each stripped-away complexity becomes its own story.
8. **Defer Performance** — split "make it work" from "make it fast." Story 1 = functional, Story 2 = meet the performance/scale target.
9. **Break Out a Spike** — none of 1–8 fit ⇒ uncertainty is the blocker. Time-box a 1–2 day investigation answering one named question (feasibility, approach, what the API returns). A spike produces learning, not shippable code; afterwards restart at Pattern 1.

## Meta-pattern (runs inside every pattern)

1. Identify the core complexity — what makes this epic hard?
2. List all variations.
3. Reduce to **one complete slice** — the simplest variation that still delivers end-to-end value.
4. Make every other variation its own story.

## Split evaluation

A split earns its keep by at least one of:

- **It reveals low-value work** — the 80/20 exposed: a slice you can now deprioritize or kill ("flexible dates is rarely used → defer").
- **It yields roughly equal-sized stories** — equal slices give the product owner reordering freedom.

Neither satisfied → try the next pattern. Any resulting story still above ~5 days → restart it at Pattern 1 and split again.

## Cynefin check on depth

- **Low uncertainty** (obvious/complicated): enumerate all stories, prioritize by value and risk.
- **High uncertainty** (complex): derive only 1–2 **learning stories**; the work itself will teach what the rest should be — exhaustive enumeration would be fiction.
- **Chaos**: defer splitting until stability emerges.

## Pitfalls

- **Splitting a technical task** — failed the Valuable check but split anyway. Combine, don't split.
- **Step-by-step workflow split** — "Story 1: editorial review" delivers nothing a user can see. Every slice covers the full workflow.
- **Horizontal slicing** — "build API" / "build UI". Every slice touches all layers.
- **Forcing a pattern** — no sequence ⇒ Workflow Steps doesn't apply; move on.
- **Stopping at the first split** — slices still >5 days get re-split, restarting at Pattern 1.
- **Skipping evaluation** — a split that reveals no killable work and no sizing gain is re-attempted with another pattern.
