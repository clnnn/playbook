---
name: backlog
argument-hint: "[initiative, or: promote <release>]"
description: Compile a story map slice into GitHub issues — one thin foundation issue plus the slice's stories, behind a plan gate.
disable-model-invocation: true
---

# Backlog

Compile one **slice** of the story map into GitHub issues an agent can execute. The deliverable is issues — no document, nothing published to the knowledge base.

Two skills split the work, and neither repeats the other:

- **This skill owns the slice** — which tasks are in scope, what the foundation is, how issues are labelled.
- **`/to-user-stories` owns the story** — splitting, the six-section bodies, the checks gate, `gh issue create`, and the native `blocked-by` edges. Step 6 invokes it.

A run is **legwork** with one interaction point: the **gate**. GitHub stays untouched until the gate opens. Report one line per phase as it completes (`Sources resolved · 14 tasks in scope`), and ask a question only when a source will not resolve or the argument is ambiguous.

## Input

Sources are discovered, never guessed. Read `AGENTS.md` for the two conventions `/setup` writes: the **knowledge base** section (`docs/agents/knowledge.md`) locates the story map and the PRD; the **domain docs** section (`docs/agents/domain.md`) locates the context map and its `CONTEXT.yaml` glossaries. A path passed with the invocation overrides discovery. A missing convention section means `/setup` has not run — say so, and continue on the user's word.

| Source | Status | Carries |
|---|---|---|
| Story map | **Required** | release slices, activities, steps, tasks, the Who block |
| PRD | Optional | §6 quality-attribute scenarios, §7 primary metric |
| Context map | Optional | bounded contexts, per-context glossary |

Announce every degradation at preflight, as one block:

- **No PRD** — persona, segment and narrative come from the map's Who block. Foundation applicability is inferred and marked 🔶. Success-metric instrumentation becomes an open line recommending `/prd`.
- **No context map** — the glossary falls back to the PRD, and module boundaries await `/grill-and-align`.

## Branches

- `/backlog` — the **skeleton**: Release 1, the thinnest end-to-end path through every activity.
- `/backlog promote <release>` — the next slice. `R2`, `2` and `enhanced` all resolve against the map's own slice names; restate the resolution before scoping. Promotion never waits for the previous slice to close; its open issues are named at the gate.

Both branches run the flow below.

## Flow

### 1. Preflight

`gh auth status` is the first act of every run. Unauthenticated halts the run, handing the user the exact `gh auth login` command.

Resolve every source and restate each in one line — initiative, persona, slice names — so a wrong document is caught before anything derives from it. Announce the degradations here.

**Done when** `gh` is authenticated, every source is restated, and every degradation is on the table.

### 2. Coverage

Read what already exists for the target slice:

```bash
gh issue list --label release:<slice> --state all --json number,title,body
```

Match each issue to a map task **by meaning**. Titles are written for value and tasks for action, so "Add client email to invoice draft" and "enter the client's email in the Bill To field" are one item. A closed issue covers its task.

**Done when** every task in the slice is marked covered — with its issue number — or uncovered.

### 3. Scope

Turn each uncovered task into a **seed**: a numbered row carrying the task, the activity and step it came from, and the release label. Seeds are candidates for `/to-user-stories`, not finished stories — leave splitting to it.

**Done when** every uncovered task has a seed.

### 4. Foundation

Read [`references/FOUNDATION.md`](references/FOUNDATION.md) and give every category it lists a disposition: **foundation**, **fold** into a named seed, or **exclude** with a reason.

**Done when** every category carries a disposition and the evidence behind it.

### 5. Gate

Print one terminal render:

- **Sources** — one line each, degradations named
- **Coverage** — covered tasks with their issue numbers, and the uncovered ones
- **Seeds** — `N` · title · activity/step · label
- **Foundation** — the three disposition groups
- **Writes** — the labels, the foundation issue, then the `/to-user-stories` run

Accept `show N`, `drop N`, free-text foundation edits ("move payments into seed 3"), and `go`. Refresh the render after each command. Seed splitting belongs to `/to-user-stories` Step 2, which runs its own accept-and-reshape pass on them.

Where the slice already carries issues, the gate leads with one question: create issues for the uncovered tasks? They stay unwritten until the user says yes.

**The gate opens only on an explicit go.** Then, and only then, GitHub is written.

### 6. Write

1. **Labels** — create the missing ones: `release:<slice>`, named from the map's slice names, and `foundation`.
2. **Foundation issue** — write and create it per FOUNDATION.md, ahead of the stories, so each story cites a real number. An open foundation issue from an earlier run is edited in place instead, with its diff shown at the gate.
3. **Stories** — invoke the `to-user-stories` skill with this brief:
   - persona, segment and narrative
   - glossary
   - target repository
   - the seeds, each with its activity and step
   - the release label to apply to every issue
   - the foundation issue number, blocking every story
   - the folded foundation items, per seed, for that story's scope and acceptance criteria
   - the §6 scenarios bearing on these tasks, so acceptance criteria carry real thresholds

**Done when** the foundation issue exists and `/to-user-stories` reports every story published.

### 7. Report

The foundation issue URL, every story URL with its blockers, and the excluded categories with their triggers.

## Pitfalls

- **Fat foundation** — a foundation issue holding payment setup for a skeleton with no payment step. Fold what serves one capability; keep what several stories stand on.
- **Named stacks** — read the stack the repo already runs and write the foundation against that. This skill names no tool, framework or package manager of its own.
- **Story maintenance** — a story that changed after implementation belongs to `/to-user-stories`, invoked directly. This skill compiles slices.
- **Silent truncation** — a task dropped at the gate is named in the report with the coverage hole it opens.
