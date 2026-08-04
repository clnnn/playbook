---
name: story-map
description: Facilitated user story mapping session with a live whiteboard that grows as the map does, ending in a story map document plus an interactive walking-skeleton HTML prototype.
argument-hint: "[system or workflow]"
disable-model-invocation: true
---

# Story Map

Facilitate a Jeff Patton story mapping session in which the user watches the map grow on a **live whiteboard**, then — once the map passes the review gate — receives a high-fidelity HTML prototype of the **walking skeleton**. The session ends with two deliverables: the story map document and the prototype as its visual companion.

The map is a strategic artifact, not a backlog: it shows *how* users reach their goal, which is what tells you what to build. It is not a Gantt chart, not a feature list, and never finished — it changes as the team learns.

## Input

**Works best with:** the system or workflow to map.
**Also useful:** primary users/personas, workflow steps already known, what the map must decide (MVP scope, release plan).

Anything supplied with the invocation itself — text after the skill name, a pasted context dump, or an appended `ARGUMENTS:` line — counts as answers already given. Use it and skip whatever it covers; don't re-ask.

**Arriving empty-handed? That works too.** Open at Q1.

## Facilitation protocol

- **Open with a heads-up** — rough time estimate and about 6 questions — then offer an entry mode:
  1. **Guided** — one question at a time
  2. **Context dump** — paste what you know; I skip whatever it covers
  3. **Best guess** — I infer missing details and label every assumption
- **One question per turn.** Wait for the answer before continuing; asking several at once is bewildering. Show the progress label (`Map Qx/6`) each turn.
- **Quick-select options:** give concise numbered options plus `Other (specify)` when likely answers are open-ended. Accept `1`, `#1`, `1,3`, `1 and 3`, or custom text; synthesize multi-selects.
- **Credit what's already given:** context from the invocation or earlier answers counts as answered — open at the first unanswered question and keep progress labels honest (start at `Map Q2/6` if Q1 was covered).
- **Recommendations only at decision points** (backbone approval, slice cuts, the review gate), numbered, with one marked `(Recommended)` — not after every answer.
- **Interruptions:** answer a meta question directly ("how many left?"), restate progress and the pending question, resume. On stop/pause, halt immediately and wait for an explicit resume.
- **Best-guess sessions** end with an `Assumptions to Validate` list.
- **Fast path:** if the user asks for a single-shot output, skip the questions but still produce the whiteboard, run the review gate, and offer the prototype.

## The map is the single source of truth

Hold session state as one map: subject, segment/persona, narrative, activities → steps → tasks, release slices. The whiteboard, the document, and the prototype are all renders of it. When anything changes — at any point in the session — update the map first, then refresh every render that already exists.

## Session flow

### Q1: Scope — `Map Q1/6`

"What are you mapping?" Offer:

1. **Entire product** — full end-to-end system
2. **Major feature area** — one workflow within a larger product (onboarding, checkout, reporting)
3. **User journey** — one user goal or job-to-be-done
4. **Redesign/refactor** — existing product or feature being rebuilt

### Q2: Users & narrative — `Map Q2/6`

Who is the primary persona (offer options: single persona / multiple sharing a workflow / multiple with distinct workflows / roles within an organization), and what are they trying to get done? Condense to a one-sentence, outcome-focused narrative ("deliver a client project on time and get paid", not "use the product").

Capture the **segment** the persona belongs to as well — specific enough to exclude someone ("freelance graphic designers billing 5–10 clients", not "users"). Infer it from the persona and confirm it in one line rather than spending a separate question on it; the document needs it.

### Q3: Backbone — the whiteboard goes live — `Map Q3/6`

Generate 5–8 **backbone** activities in narrative order, left to right — the sequence you'd use explaining the system to someone. Each activity is something the user *does*, never a product feature or a technical layer. Stay inside 5–8: fewer flattens the journey, and past 8 you're almost certainly listing steps as activities — consolidate them one level up.

Before the first render, read [`references/WHITEBOARD.md`](references/WHITEBOARD.md). Create the whiteboard showing the backbone, publish it, and give the user the link. Ask whether to add, remove, or reorder activities — every accepted change lands on the board.

Done when the user approves the backbone *and* the whiteboard shows exactly the approved activities.

### Q4: Steps — `Map Q4/6`

Under each activity, generate 3–5 steps: actionable, observable (you could watch someone perform it), in natural order. Refresh the whiteboard, ask for corrections, apply them to the board.

Done when every activity has approved steps and the board shows them.

### Q5: Tasks — `Map Q5/6`

Under each step, generate 3–7 tasks — small, specific, prioritizable actions — stacked vertically, most essential on top. Cover both halves of the step: the user-facing action *and* the behind-the-scenes work it depends on ("send the invoice" **and** "receive payment confirmation"), or the map will read as UI-only and the slices will miss real work. Refresh the whiteboard, ask whether tasks and their vertical order are right.

Done when every step has approved, ordered tasks and the board shows them.

### Q6: Release slices — `Map Q6/6`

Cut the map into three horizontal slices:

- **Release 1 — Walking Skeleton:** the top task of every step — the thinnest end-to-end path through *all* activities
- **Release 2 — Enhanced:** next-priority tasks that deepen the core workflow
- **Release 3 — Polish:** nice-to-haves, edge cases, optimizations

Refresh the whiteboard — slices now color the task cards, and the slice chips let the user collapse slices to view one at a time. Ask whether the slices make sense.

Done when the user approves all three slices and the board renders them collapsible.

### Review gate

Walk the board with the user and ask exactly:

- Are there missing steps or tasks?
- Are there pain points we're not addressing?
- Are there opportunities to delight users?
- Do all activities flow logically?

Fold every accepted answer into the map and refresh the whiteboard. Loop until the user confirms the map is right — only then does the gate open to the prototype.

### Prototype

Read [`references/PROTOTYPE.md`](references/PROTOTYPE.md) for the build and [`references/PROTOTYPE-UI.md`](references/PROTOTYPE-UI.md) for the craft bar it has to clear, then build `prototype.html`: one file, vanilla JS, mocked data — an interactive, high-fidelity click-through of the walking skeleton, published the same way the whiteboard is. Iterate on the user's feedback: UI-only feedback edits the prototype; feedback that reveals a map change updates the map, the whiteboard, and the prototype.

### Close

When the user agrees with both the story map and the prototype flow:

1. Write the story map document per [`references/MAP-FORMAT.md`](references/MAP-FORMAT.md) and publish the product document.
2. Save `prototype.html` in the repo (default `docs/prototypes/<subject-slug>.html`) and link it from the document as its visual companion — the published URL when there is one, otherwise the repo path.
3. Report the document location, the prototype's link, and its repo path, and end the session.

## Pitfalls

- **Backbone = technical layers** ("UI → API → DB"): remap to the user's workflow; each slice must deliver end-to-end user value.
- **Waterfall slices** ("Release 1 = Activity 1 complete"): the walking skeleton is a thin slice across *all* activities, not one activity finished.
- **Whiteboard drift:** never rewrite the board's render code between turns — edit only the embedded map data, so every refresh is a data change.
- **Feature-speak:** activities and tasks describe what the user does ("compare quotes"), not what the product provides ("comparison dashboard").
- **Backbone sprawl** (10+ activities): the map stops being readable and the walking skeleton stops being thin. It means activities and steps got mixed — roll the fine-grained ones down into steps under a broader activity.
- **Vague tasks** ("handle the payment"): unprioritizable and unbuildable, so the slice cut becomes guesswork. Name the object and the action — "enter the client's email in the Bill To field".

## References

- Jeff Patton, *User Story Mapping* (2014) — origin of the backbone / walking-skeleton framework
