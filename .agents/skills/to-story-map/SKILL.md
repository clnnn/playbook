---
name: to-story-map
argument-hint: "[product or feature]"
description: Build a Patton-style user story map on a live board — activities, backbone, body — one row per turn, then cut the release slices and open R1's demos as issues in the repo's tracker.
disable-model-invocation: true
---

## Purpose

A **story map** is a two-dimensional arrangement of **cards**. Across the top runs what people do, in the order they do it. Down each column sits the implementation behind that step, shallow to deep. Three **slices** cut across it to say what ships first.

The horizontal axis is **time**, never priority. Priority lives in the slices. That single rule is what makes a map different from a backlog.

## Input

Anything supplied at invocation — text after `/to-story-map`, a pasted dump, a referenced file — is material already given. Read it all and route each piece to its row. Arriving empty-handed works too: the flow opens at **Activities**.

## Operating contract

**Strict flow.** Four rows in order: Activities, Backbone, Body, Slices. Finish one — **Advance when** met — before opening the next.

**One card, one line.** A card is a verb phrase in the user's words, at most seven words. It is a sticky note: what does not fit on a sticky note is two cards.

**Anchor every question.** Ask with a candidate answer to accept, correct, or reject — an anchor pulls a sharper reply than a blank does. Numbered options where the answer has natural choices, your recommendation first, `Other (specify)` when open-ended. Accept `1`, `1 and 3`, `1,3`, or free text.

**Facilitation.** Open with a heads-up — four rows, a turn each, then the issues. Label progress every turn — `Row 3/4 — Body`. One turn per row: write the whole row into `map.json`, ask, then wait. On "stop", halt and wait for an explicit resume.

## The board

`docs/product/story-map/<slug>/map.json` is the map. The **board** renders it in the browser and re-reads it about once a second, so every edit is on screen before the next question is asked. Steps keep a readable width and the backbone wraps onto the next line when it runs out of room, like text — one drawn spine runs under the steps and carries the narrative round into the next line, and the steps are numbered so the order survives the wrap. The body cards are sticky notes coloured by slice; a chip per slice hides it (keys `1`, `2`, `3`, and `0` for unsliced).

The file grows a row at a time — activities, then their steps, then the cards under each step, then each card's slice:

```json
{
  "subject": "Freelancer invoicing",
  "activities": [
    { "name": "get paid", "steps": [
      { "name": "send invoice", "cards": [
        { "name": "email a PDF", "slice": "R1" },
        { "name": "payment link in the invoice", "slice": null } ] } ] }
  ]
}
```

Array order is the map's order: activities left to right, steps left to right under their activity, cards top to bottom by necessity. A card with `"slice": null` renders unsliced until Row 4 places it.

Every card lands in `map.json` first, and the user reads it on the board. The chat carries the question and where to look — `the body under "send invoice" is on the board`. A card typed into the chat as well is a second copy of the map, and it goes stale on the next edit.

## Setup

Slugify the subject — `Freelancer invoicing` → `freelancer-invoicing`. Write `docs/product/story-map/<slug>/map.json` carrying the subject and whatever the input already gives, then start the board and hand over its URL in one line:

```bash
node <skill-dir>/board/serve.mjs docs/product/story-map/<slug>/map.json 4321 &
```

On a taken port, pick another and say which.

**Advance when:** `map.json` exists and the board is serving it.

## Row 1/4 — Activities

**Goal:** the **10,000-foot view** — the map with only its top row filled.

An **activity** is a coarse goal: a big chunk of what people do, named as they would name it — *plan the trip*, *settle the bill*. Three to eight activities, left to right in the order a person meets them.

Write the row from the input, then ask the user to confirm, rename, merge, or split — the board is showing it.

**Advance when:** three to eight activities, each a goal in the user's words, ordered by when a person meets them, and the user has confirmed the row.

---

## Row 2/4 — Backbone

**Goal:** the **narrative** — left to right, the row reads as someone using the product.

The **backbone** is the row of **steps** under the activities. A step is one thing the user does, named as a short verb phrase — *search*, *compare*, *add to cart*, *pay*, *track*. Each activity owns two to six steps; every step sits under exactly one activity.

Order by **time**: the sequence someone actually follows, first attempt through completion. When two steps could swap places, ask which one the person does first, and place it first.

Write the steps under their activities. Read the backbone left to right on the board, then ask the user where the narrative stumbles — a missing step, a step out of order, a step that is really two.

**Advance when:** every activity owns two to six steps, the narrative runs without a gap or a backtrack, and the user has confirmed it.

---

## Row 3/4 — Body

**Goal:** depth under every step — each column a **deep module**.

A step is a **narrow interface**: the one thing the user does there. The **body** beneath it is the column of **substitutable** implementations of that same thing, ordered by **necessity**: the top card is the one the step cannot ship without, the plainest way to get it done; each card below is a richer way to do the same step, one the top card can be swapped for later.

Apply the **substitution test** to every card: with this card swapped in for the one above, does the user still do the same step? Yes — it deepens the module and stays in the column. No — it is a **widening**: a new step or a new activity in disguise. Move it to the backbone and re-read the narrative there.

One to five cards per column. A column holding one card has no depth to slice; ask whether a richer implementation exists, or whether the step belongs inside its neighbour.

Write every column at once, top card first. Ask the user which cards fail the substitution test and which columns are missing their plainest card.

**Advance when:** every step has one to five cards, the top card of each column is the plainest implementation that completes the step, every card has passed the substitution test, and the user has confirmed the body.

---

## Row 4/4 — Slices

**Goal:** three horizontal cuts, **R1**, **R2**, **R3**, each a set of cards that ships together.

**R1 is a tracer bullet.** It is the thinnest slice that runs the narrative end to end: the top card — the plainest implementation — of every step the narrative cannot be read without. Its job is to validate the map itself: walked once, it proves the backbone is the right sequence and the columns are the right modules. It buys that proof with the least building. A step the narrative reads past without a gap may sit out of R1.

**R2 deepens where it hurts.** The next card down in the columns where R1's plainest implementation is what users will complain about first. Ask the user which columns those are.

**R3 is the rest.** Every card not yet placed.

Simple first, complex later: a column ships top-down, so a card's slice is the same as or later than the slice of the card above it. Every card lands in exactly one slice.

Set every card's slice, then ask the user to confirm R1 is walkable end to end and to move cards between R2 and R3. Hiding R2 and R3 on the board leaves R1 alone on screen, which is how the user sees a step the tracer bullet skips.

**Advance when:** every card carries one of R1, R2, R3; R1 holds at most one card per step and its narrative runs end to end; every column ships top-down; and the user has confirmed the slices.

---

## Publishing

The map is the record: `map.json` carries every card and its slice, and it outlives the session. Only R1 becomes issues — walking R1 is what tells you whether R2 and R3 were sliced right, so they stay on the map until then.

**R1 ships as demos.** A **demo** is a group of R1's cards you can show to someone who does not read code, and a day or two of work. Group every R1 card into demos in backbone order, then order them so the earliest demos reach a walk of the whole narrative — the cheapest path from the first step to the last — before any later one deepens it. A group nobody can be shown is a layer: fold it into the first demo that needs it.

Thin a demo that runs past that:

- **Path** — the happy path now, the alternates later.
- **Data** — one input variant now: one task type, one channel, one file format.
- **Rule** — a quality rule relaxed now and restored as its own demo: no validation, hardcoded config, no retries.
- **Interface** — the crudest surface that shows the thing: a flat list, a printed link, a JSON dump.
- **Spike** — the demo becomes a timeboxed question when its cards cannot be sized until something is learned, and its cards follow in the demo behind it.

A rule thinned out of a demo that no R2 or R3 card already carries goes back on the board as a card in its column, so the map stays the single record.

Show the user the demos and their order in one message, ask them to merge, split or reorder, then create the issues where the repo says issues go — its `CLAUDE.md` or `AGENTS.md`, and whatever they point at. No convention written down: use GitHub via `gh issue create`.

Titles: `R1.1 — [demo]` through `R1.N — [demo]`.

Body, three parts in this order:

- **Walk it.** The narrative the demo covers, one sentence per step, so a reader can walk it. Each demo walks its own steps, and the demos together walk end to end.
- **Cards.** A checklist in backbone order, one line per card as `- [ ] [step] — [card]`.
- **Done when.** One line: the demo is shown against the built thing.

Label each issue `story-map` and `R1`, creating a missing label first.

Close with the URLs, and with any card dropped along the way, one per line as `[card] — [why]`.

Tracker unreachable — no repo, or its CLI unauthenticated: print the issue bodies in the chat and say what blocked the create.

**Published when:** every R1 card appears in exactly one demo issue, `map.json` carries every card with its slice, and the user has the URLs.
