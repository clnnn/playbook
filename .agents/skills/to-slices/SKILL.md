---
name: to-slices
argument-hint: "[conversation, PRD, notes or file to slice]"
description: Turn a conversation into slices — activities, then slices cut against eleven criteria, broken by fresh adversarial subagents, published to the project's issue tracker, each carrying the unknowns a grill settles next.
disable-model-invocation: true
---

## Input

The conversation so far, the PRD `AGENTS.md` points at, plus anything named at invocation — text after `/to-slices`, a pasted dump, a referenced file. With nothing to read, ask for the material first. That is the only question the skill asks; from there it runs to published issues on its own.

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

**Cut the first slice.** Walk the eleven criteria in order, answering each criterion's **Check** against the source material. A check that fails reshapes the slice before it is written down. The walk leaves no record of its own: what survives it is the slice's five parts, and the breakers re-derive the rest from the source.

**Cut the next slices.** Criterion 10's ledger names them, in order. Each one gets the same treatment: the full eleven-criteria walk. The last slice's ledger is empty.

**Unknowns.** Criterion 11's questions are kept as one list across all slices, outside any slice. Each names the first slice it gates; Publish files it under that slice.

**Write it down**, in a scratch directory outside the repo:

- `source.md` — the source material, verbatim, when it is not already a file. A file input is used as it stands.
- `slices.md` — the activities row, every slice in its five parts, the unknowns list. This is what the breakers read.

**Done when:** three to eight activities in the user's words, ordered by when a person meets them; every slice has walked all eleven checks; every case the source material covers lands in exactly one slice; every activity in the row is reached by some slice; the source is a file; `slices.md` written.

---

## Stage 2/3 — Break

Breakers are **fresh eyes**: general-purpose subagents, never forks, so each carries none of the author's reasoning. Spawn one per slice, in parallel, in one message.

**Brief** each with absolute paths only — the source file, `criteria.md`, `slices.md` — its target slice, and its charge: run Checks 1 to 10 in `criteria.md` against the source for that slice, and break it.

**Return lean.** Every breaker answers in the same shape, and nothing else: one line naming the passing criteria by number, then one block per `FAIL` — the criterion, the evidence, the smallest reshape that would pass. A passing check costs a number; only a break earns prose.

**Handle verdicts.** Confirm each `FAIL` against the source before acting; breakers over-report. A `FAIL` the source refutes counts as `PASS`. A confirmed `FAIL` reshapes the slice in `slices.md`.

**Round two is narrow.** One breaker per reshaped slice, charged with the reshaped criteria alone. A `FAIL` that survives it joins the unknowns with the breaker's evidence and an owner, and the slice ships as it stands. Two rounds per slice is the cap.

**Set breaker runs once**, on the final `slices.md`, after the last reshape. Its charge: every case in the source lands in exactly one slice; every activity is reached; each slice builds only on slices before it and R1 builds on nothing; each ledger names the slices that follow it; Check 11 in `criteria.md` passes for the unknowns list. Same lean return. Its confirmed `FAIL`s reshape `slices.md` directly, and the stage ends there.

**Done when:** every criterion 1 to 10 on every slice is a breaker `PASS`, a refuted `FAIL`, or an unknown with an owner and a candidate answer; the set breaker's claims are all `PASS` or refuted.

---

## Stage 3/3 — Publish

`AGENTS.md` names the issue tracker and how to publish to it. Without that line, the tracker is the repo: one markdown file per slice in `docs/product/slices/`, named `R1-<slug>.md`, its title the `#` heading, and a `Slices:` line under `## Product docs` in `AGENTS.md` pointing at the directory.

**Source first.** A slice is grilled in a fresh session, so each one must lead back to its source. A source that is already a repo file is cited as it stands; any other is published to `docs/product/slices/source.md`, whatever the tracker.

One item per slice, in order, so each header cites the slice it builds on; R1's header ends at its position. Title `R1 — <name>`, labelled `slice`. Body:

```
**R2 of 3 · builds on** <ref> R1 — <name>

**Source:** <path or link>

**Case:** <one line>

**Flow**
1. <step>
2. <step>

**Fence:** <one line>

**Assumption:** <one line>

**Unknowns**
- <question> · blocks building · settles by <conversation | prototype-logic | prototype-ui> · owner <who> · candidate: <answer>
- <question> · blocks sign-off · owner <who> · candidate: <answer>
```

The unknowns section holds the questions that name this slice as the first they gate, and nothing else; a slice no question gates omits the section.

A part the tracker has no field for — the label, markdown, a reference to another item — goes in the nearest field it does have, named in the closing message.

Close with one message: every slice's link or path in order, then the unknowns list in its two groups with owners and candidate answers.
