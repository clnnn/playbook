---
name: backlog
argument-hint: "[initiative, or: promote <release>]"
description: Compile a story map and PRD into a dependency-ordered GitHub issue backlog — milestones, epics, stories, one foundational issue — behind a plan gate.
disable-model-invocation: true
---

# Backlog

Compile the upstream product documents into GitHub issues an agent can execute: milestones, labels, epics, dependency-ordered stories, and one foundational issue. Third step in `/prd → /story-map → /backlog`. The deliverable is GitHub issues only — no backlog document, nothing published to `.okf/`.

A full run has exactly two interaction points — the **stack decision** and the **plan gate**. Everything between them is legwork. GitHub stays untouched until the gate opens.

## Inputs

**Required:** the PRD and the story map. **Optional:** the context map and per-context glossaries from `/grill-and-map`.

Each source is a *resolvable reference*, not necessarily a repo path: an `.okf/` bundle document (discover per `docs/agents/okf-workflows.md`), a file path, a URL, or a GitHub Discussion fetched with `gh`.

**Promote a slice** (`/backlog promote <release>`): a re-run branch. Steps 3 and 4 are skipped — no new stories are derived and the stack is already decided — so the run has one interaction point, the gate. That release's placeholder issues are upgraded to full fidelity and pass through assembly, self-check, and the gate like new ones.

## Flow

### 1. Preflight

`gh auth status` is the first act of every run. Unauthenticated halts the run, handing the user the exact `gh auth login` command to run.

Resolve every source and restate what each one is — initiative, personas, release slices, bounded contexts — so a wrong document is caught before anything derives from it. Announce degradations in the same breath, as one block:

- **No context map** → no `context:` labels, no glossary inlining, no boundary checks. Recommend `/grill-and-map` first; continue only on the user's say-so.
- **PRD §6/§7 missing** → the foundational issue covers stack gaps only, and fitness functions are declared unavailable rather than invented.

**Done when** `gh` is authenticated, every source is restated and confirmed, and every degradation is on the table.

### 2. Read pass

List every issue and parse each body's hidden marker into an inventory, per [`references/GITHUB.md`](references/GITHUB.md).

**Done when** every backlog-created issue on GitHub is known by story id and body-hash.

### 3. Derive stories

Read [`references/DERIVATION.md`](references/DERIVATION.md). Candidates are the (step × release slice) cells of the map, judged and reshaped by its merge and split rules until each is a vertical slice under the one-PR **ceiling**.

**Done when coverage holds** — the criterion DERIVATION.md defines.

### 4. Stack decision — interaction point 1

Read [`references/FOUNDATION.md`](references/FOUNDATION.md) and detect the **gaps** between what the PRD demands and what the repo already provides. Present the proposals as one numbered confirmation point — each traced to the §6 scenario or §7 metric that forces it, alternatives included — and record the user's choices and the rejected options.

**Done when** the user has confirmed or amended every gap proposal.

### 5. Assemble issues

Write the foundational issue per FOUNDATION.md and every story body per [`references/ISSUE-BODY.md`](references/ISSUE-BODY.md). Fidelity is graduated: Release 0 and Release 1 stories get full agent-executable bodies; Release 2/3 stories get the placeholder body ISSUE-BODY.md defines.

Classify each story against the step-2 inventory — **new**, **unchanged**, **upstream changed**, **human-edited**, or **orphan** (GITHUB.md defines the tests).

**Done when** every story carries a body and a classification.

### 6. Self-check

Re-apply every rule to every full-fidelity story — the ISSUE-BODY.md section contracts, DERIVATION.md's judging rules and its coverage criterion — plus the one rule with no other home: **the dependency graph is acyclic.**

One regeneration attempt per violation; a survivor reaches the gate flagged with the specific rule it broke, and the user decides its fate.

A story spanning two bounded contexts is flagged at the gate as a **boundary smell**, and the user rules on it — it is a signal, not a violation.

**Done when** every rule has been applied to every story and every surviving violation carries its flag.

### 7. Plan gate — interaction point 2

Render the plan two ways: a terminal table — one row per story: `N` · title · slice · activity · context · blocked-by · flags/classification — and the published HTML dependency graph per [`references/GRAPH.md`](references/GRAPH.md).

Hold the gate open for commands, refreshing both renders after each:

- `split N` / `merge N,M` — reshape per DERIVATION.md, re-run the self-check on the result
- `drop N` — remove a story and name the coverage hole it opens
- `show N` — print the full issue body
- `retitle N <title>`

Human-edited collisions surface here with their diff — the user picks overwrite / skip / merge. Orphans surface here too — close or keep.

**The gate opens only on the user's explicit go.** Then, and only then, GitHub is written.

### 8. Apply and report

Apply per GITHUB.md, in order: labels + milestones → epics → stories → the relations pass. **Fail fast** on any error, per GITHUB.md's failure contract.

**Done when** every planned mutation is applied and reported with issue numbers — or the failure report names exactly what exists and what remains.
