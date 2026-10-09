---
name: to-questions
argument-hint: "[slice: tracker item or file under docs/product/slices/]"
description: Cut one slice into independent questions, each routed to /grill-with-docs or /prototype, checked by a fresh-eyes breaker, published to the project's issue tracker.
disable-model-invocation: true
---

## Input

One slice, named at invocation: its tracker item or its file under `docs/product/slices/`. With nothing named, ask for the slice first. That is the only question the skill asks; from there it runs to published questions on its own.

Read the slice, the unknowns list `to-slices` left with it, the PRD `AGENTS.md` points at, and `GLOSSARY.md` plus any ADRs. Together these decide what is already settled.

## Operating contract

Three stages in order: **Cut**, **Break**, **Publish**. Finish one — **Done when** met — before opening the next. Report one line at each stage boundary.

A judgment the input cannot settle is made, not deferred: take the most likely answer and mark it in the closing message. The usual case is the kind: a question that could be argued or prototyped gets one, and the session that picks it up may override.

---

## Stage 1/3 — Cut

**The question.** A slice bounds one big grill; a question is the smallest independent **decision** an implementer needs from it, so one fresh session can settle it alone. One sentence, in the slice's words, ending in a question mark, that an implementer could act on once answered. A term that only needs defining folds into the question that needs the term. A flow step that raises several dependent decisions is one question, and the grill walks them as its branches.

**Two kinds**, named for the skill that settles them:

- **grill** — argument settles it. Asks *what* or *which*. Runs through `/grill-with-docs`.
- **prototype** — only seeing it or driving it settles it; no amount of talking would. Asks *how should it look* or *how should it behave*. Runs through `/prototype`, which picks its own branch (logic or UI) from the question.

**Independent.** Every question is settled with only its sentence and the repo, with no other question's answer. Two questions that need each other were one question: merge them.

**Already settled.** Before cutting, walk the slice's flow and the unknowns that *block building*. Whatever the slice, PRD, glossary or an ADR already decides is settled: cite the source and move on. Unknowns that *block sign-off* stay with their domain owner.

**Write it down**, in a scratch directory outside the repo:

- `source.md` — the slice and its unknowns, verbatim, when they are not already files.
- `questions.md` — the questions in order, each with its kind, the already-settled list with citations, the blocks-sign-off unknowns with owners.

**Done when:** every step of the slice's flow and every blocks-building unknown is either already settled with its source cited, or lands in exactly one question; every question is one sentence in the slice's words with a kind; `questions.md` written.

---

## Stage 2/3 — Break

The breaker is **fresh eyes**: one general-purpose subagent, never a fork, so it carries none of the author's reasoning.

**Brief** it with absolute paths only — `source.md`, `questions.md`, the PRD, `GLOSSARY.md` and the ADR directory where they exist — and its charge, the **cold read**: for each question, can a session start on it without asking what was meant; does its kind pass the test (prototype only where talking would never settle it); does it settle with only its sentence and the repo; does it take more than a sentence to settle. Then the set: every flow step and every blocks-building unknown is settled with a citation or lands in exactly one question; no two questions need each other.

**Return lean.** One line naming the passing questions by number and `set` if the set passes, then one block per `FAIL` — the question or `set`, the evidence, the smallest reshape that would pass. A pass costs a number; only a break earns prose.

**Handle verdicts.** Confirm each `FAIL` against the source before acting; breakers over-report. A `FAIL` the source refutes counts as `PASS`. A confirmed `FAIL` reshapes `questions.md`.

**Round two is narrow.** One breaker over the reshaped questions alone, same charge, same return. A `FAIL` that survives it is marked in the closing message with the breaker's evidence, and the question ships as it stands. Two rounds is the cap.

**Done when:** every question and the set is a breaker `PASS`, a refuted `FAIL`, or a marked survivor.

---

## Stage 3/3 — Publish

`AGENTS.md` names the issue tracker and how to publish to it. Without that line, the tracker is the repo: one markdown file per question in `docs/product/questions/`, named `R2-<slice-slug>-<question-slug>.md`, its title the `#` heading, and a `Questions:` line under `## Product docs` in `AGENTS.md` pointing at the directory.

One item per question, in order. Title `R2 · Q3 — <name>`, labelled `question`; the slice is the `R2` item. The body is the question, one sentence, and nothing else: the title carries the slice, the start line carries the kind.

A part the tracker has no field for goes in the nearest field it does have, named in the closing message.

Close with one message:

1. Each question in order: its link or path, then its **start line** to paste into a fresh session — `/grill-with-docs <ref>` or `/prototype <ref>`. Sessions run in parallel; one git worktree per question keeps their glossary and ADR writes apart, with ADR numbers fixed at merge. Each session ends when its skill says settled; `/to-spec` there is the human's call.
2. The already-settled list with citations.
3. The blocks-sign-off unknowns with owners.
4. Judgment calls and breaker survivors, each with its evidence.
