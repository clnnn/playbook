---
name: to-release-slices
argument-hint: "[conversation, PRD, notes or file to slice]"
description: Turn a conversation into release slices — activities, then slices cut against eleven criteria, broken by fresh adversarial subagents, published as GitHub issues.
disable-model-invocation: true
---

## Input

The conversation so far, plus anything named at invocation — text after `/to-release-slices`, a pasted dump, a PRD, a referenced file. With nothing to read, ask for the material first. That is the only question the skill asks; from there it runs to published issues on its own.

## Operating contract

Three stages in order: **Cut**, **Break**, **Publish**. Finish one — **Done when** met — before opening the next. Report one line at each stage boundary.

A judgment the input cannot settle is made, not deferred: take the most likely answer, say so where the judgment is used, and add the question to the unknowns with that answer as its candidate.

---

## Stage 1/3 — Cut

Read [`criteria.md`](criteria.md) on entering. Its eleven criteria govern every slice.

**Activities.** The **10,000-foot view** — the map with only its top row filled. An **activity** is a coarse goal: a big chunk of what people do, named as they would name it — *plan the trip*, *settle the bill*. Three to eight activities, left to right in the order a person meets them. Activities that lie outside what is being built stay off the row.

**The slice.** Each slice holds five parts and nothing else. Everything beyond them is settled later by the `grilling` skill, so the slice bounds that grill rather than pre-empting it:

1. **Header** — position and what it builds on, one line: `R2 of 4 · builds on R1`.
2. **Case** — the one real case that travels the path, one line.
3. **Flow** — the numbered steps, each named in the activities' words. Where the slice has no flow to list, a solution of at most three sentences stands in.
4. **Fence** — the one written rule that decides what enters, one line.
5. **Assumption** — the belief shipping this slice proves or disproves, one line.

**Cut the first slice.** Walk the eleven criteria in order. Run each criterion's **Check** against the source material and write one line of evidence per criterion, answering its Check. A check that fails reshapes the slice before it is written down.

**Cut the next slices.** Criterion 10's ledger names them, in order. Each one gets the same treatment: the full eleven-criteria walk. The last slice's ledger is empty.

**Unknowns.** Criterion 11's questions are kept as one list across all slices, outside any slice.

**Write it down**, in a scratch directory outside the repo:

- `source.md` — the source material, verbatim, when it is not already a file. A file input is used as it stands.
- `slices.md` — the activities row, every slice in its five parts, the unknowns list. This is what the breakers read.

**Done when:** three to eight activities in the user's words, ordered by when a person meets them; every slice has walked all eleven checks; every case the source material covers lands in exactly one slice; every activity in the row is reached by some slice; the source is a file; `slices.md` written.

---

## Stage 2/3 — Break

Breakers are **fresh eyes**: general-purpose subagents, never forks, so each carries none of the author's reasoning. Spawn them in parallel in one message, one per slice plus one for the set.

**Brief** each with absolute paths only — the source file, `criteria.md`, `slices.md` — its target, and its charge:

- **Slice breaker:** run Checks 1 to 10 in `criteria.md` against the source for your slice, and break it. Return one line per criterion, `PASS` or `FAIL`, with the evidence, and for each `FAIL` the smallest reshape that would pass.
- **Set breaker:** break the sequence. Every case in the source lands in exactly one slice; every activity is reached; each slice builds only on slices before it and R1 builds on nothing; each ledger names the slices that follow it; Check 11 in `criteria.md` passes for the unknowns list. Return one line per claim, `PASS` or `FAIL`, with the evidence.

**Handle verdicts.** Confirm each `FAIL` against the source before acting; breakers over-report. A `FAIL` the source refutes counts as `PASS`. A confirmed `FAIL` reshapes the slice in `slices.md`, and the reshaped slice goes to a new breaker. Three rounds per slice at most: a `FAIL` that survives the third round joins the unknowns with the breaker's evidence and an owner, and the slice ships as it stands. After the last reshape, a new set breaker runs on the final `slices.md`.

**Done when:** every slice holds ten `PASS`, each from a breaker or a refuted `FAIL`, or its surviving `FAIL`s sit in the unknowns; a set breaker returns all `PASS` on the final `slices.md`.

---

## Stage 3/3 — Publish

Publish with `gh`: one issue per slice, in order, labelled `release-slice`, creating the label once if absent. Title `R1 — <name>`. Body:

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

Close with one message: every issue URL in order, then the unknowns list in its two groups with owners and candidate answers.
