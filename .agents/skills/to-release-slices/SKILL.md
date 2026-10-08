---
name: to-release-slices
argument-hint: "[conversation, PRD, notes or file to slice]"
description: Turn a conversation into release slices — the activities first, then the slices that achieve them, cut one at a time against eleven criteria, one GitHub issue each.
disable-model-invocation: true
---

## Input

The conversation so far, plus anything named at invocation — text after `/to-release-slices`, a pasted dump, a PRD, a referenced file. With nothing to read, ask for the material first.

## Operating contract

**Strict flow.** Two stages in order. Finish one — **Advance when** met — before opening the next.

**One turn per step:** present, ask, wait. Open by naming the two stages, and label every turn — `Stage 1/2 — Activities`, `Stage 2/2 — Slice 2`.

**Anchor** every question. What the input holds is restated to confirm or correct; what it lacks is asked with a candidate answer to accept, correct or reject. Natural choices go as numbered options, your recommendation first.

---

## Stage 1/2 — Activities

**Goal:** the **10,000-foot view** — the map with only its top row filled.

An **activity** is a coarse goal: a big chunk of what people do, named as they would name it — *plan the trip*, *settle the bill*. Three to eight activities, left to right in the order a person meets them.

Write the row from the input as a numbered list, then ask the user to confirm, rename, merge, or split.

**Advance when:** three to eight activities, each a goal in the user's words, ordered by when a person meets them, and the user has confirmed the row.

---

## Stage 2/2 — Release slices

**Goal:** a sequence of slices that, shipped in order, achieve every activity in the approved row.

Read [`criteria.md`](criteria.md) on entering. Its eleven criteria govern every slice.

**The slice.** Each slice holds five parts and nothing else. Everything beyond them is settled later by the grill, so the slice bounds that grill rather than pre-empting it:

1. **Header** — position and what it builds on, one line: `R2 of 4 · builds on R1`.
2. **Case** — the one real case that travels the path, one line.
3. **Flow** — the numbered steps, each named in the activities' words. Where the slice has no flow to list, a solution of at most three sentences stands in.
4. **Fence** — the one written rule that decides what enters, one line.
5. **Assumption** — the belief shipping this slice proves or disproves, one line.

Checks, rationale and cuts live in the conversation.

**Cut the first slice.** Walk the eleven criteria in order, in conversation. Run each criterion's **Check** against the source material and write one line of evidence per criterion, answering its Check. A check that fails reshapes the slice before it is shown. A check you cannot settle from the input becomes a numbered question with an anchor. Then show the slice and its eleven lines together, and wait.

**Cut the next slices.** Criterion 10's ledger names them, in order. Each one gets the same treatment: the full eleven-criteria walk. Propose the order; the user settles it. The last slice's ledger is empty.

**Unknowns.** Criterion 11's questions are kept as one list across all slices, outside any slice.

**Advance when:** every slice has passed all eleven checks in conversation, every case the source material covers lands in exactly one slice, every activity in the row is reached by some slice, and the user agrees with all release slices.

---

## Publishing

Once the user agrees, publish with `gh`: one issue per slice, in order, labelled `release-slice`, creating the label once if absent. Title `R1 — <name>`. Body:

```
**R2 of 3 · builds on** #<issue> R1 — <name>

**Case:** <one line>

**Flow**
1. <step>
2. <step>

**Fence:** <one line>

**Assumption:** <one line>
```

Publish in order, so each header cites the issue number of the slice it builds on. R1's header ends at its position.

Close with one message: every issue URL in order, then the unknowns list in its two groups with owners.
