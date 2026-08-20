---
name: to-user-stories
description: Turn material — a conversation, notes, a PRD, a story map slice issue — into 6-section user stories, then publish them as dependency-linked GitHub issues. Use when a feature needs implementation-ready stories, or when a release slice issue arrives for breakdown.
argument-hint: "[epic, notes, PRD, or a slice issue]"
---

# To User Stories

Convert whatever material is at hand — the current conversation, pasted notes, a PRD, a release slice issue — into implementation-ready user stories, each written for a **fresh agent**: an implementer with the code in front of them but none of this conversation. Every story passes the checks gate, the user confirms the set, and only then do the stories become GitHub issues wired with blocked-by edges.

## Input

Anything supplied with the invocation counts as material already given — text after the skill name, a pasted dump, the conversation so far.

**A slice issue** given as a number or URL is read from GitHub: `gh issue view <n> --json title,body,labels`. It carries everything a breakdown needs, and the sections map straight onto the steps below:

| Issue section | Feeds |
|---|---|
| `## Who` | the persona for Step 1 |
| `## Map` | the tasks to split, each under the activity and step it came from |
| `## Deferred to later slices` | §2 **Out** — the neighbouring work the next slices own |
| `## Review notes`, `## Assumptions to validate` | decisions already made, and what stays 🔶 |
| `map:` and `release:` labels | the labels every issue this run creates inherits |

**Arriving empty-handed? That works too.** Open by asking for the epic or notes to convert.

## Facilitation

- One question per turn, numbered quick-select options plus `Other (specify)` where natural; accept `1`, `1,3`, or free text.
- Open with a heads-up of the six steps below, then offer entry modes:
  1. **Guided**
  2. **Context dump** — paste everything; the skill routes it.
  3. **Best guess** — infer gaps, label every inference 🔶 Assumption.
- Show a progress label each turn (`Step X/6 — name`).

## Step 1/6 — Ground

Name the **persona** the stories are written for: the slice issue's `## Who` persona, or the PRD's named persona, taken from the material. Neither present — agree one with the user now and note it as the acting PRD persona.

**Advance when** the persona is stated back and confirmed.

## Step 2/6 — Derive

Read [`references/SPLITTING-PATTERNS.md`](references/SPLITTING-PATTERNS.md) and walk it: INVEST pre-check, then the 9 patterns in order, meta-pattern inside whichever fits, split evaluation after. Material already story-sized skips the patterns but still passes the INVEST pre-check.

Present the resulting slice list — title, one-line value, proposed order — with the pattern that produced it and what the split revealed (killable low-value slices are a finding, not a footnote; recommend dropping them). From a slice issue, carry each task's activity and step onto the stories it produced: that provenance is what tells an implementer which workflow moment the story sits in.

**Advance when** the user accepts the slice list (adds, drops, and reorders applied).

## Step 3/6 — Foundation

Read [`references/FOUNDATION.md`](references/FOUNDATION.md) and give every category it lists a disposition: **foundation**, **fold** into a named story, or **exclude** with a reason and its trigger. Read the repo for the stack that already runs and write each item against it.

Present the three disposition groups with the evidence behind each call, 🔶 on every inference. The user strikes the wrong ones here.

**Advance when** every category carries a disposition and its evidence, and the user accepts the groups.

## Step 4/6 — Write

Write each accepted slice as a story using [`template.md`](template.md) — all six sections, in order. While writing:

- §2 **Out** names the neighbouring work this story's siblings own — pull it straight from the slice list, and from `## Deferred to later slices` where the material was a slice issue.
- §2 **In** and §4 carry the categories folded into this story at Step 3.
- §3 cites decisions, it never restates them — an ADR number from `docs/adr/`, or a product or sequencing call made outside the code. Code locations are the implementer's to find;
- §5 is generated from each blocker's §2 **In** list — what that story promises to leave behind — and always phrased **expected — verify against code before trusting it**.
- §6 uses placeholder refs for issues not yet published: `#F` for the foundation issue, which blocks every story, and `#S1`, `#S2` for sibling stories. Real numbers arrive in the relations pass.

**Advance when** every accepted slice has a complete six-section draft.

## Step 5/6 — Checks gate

Run every check against every story. A failure is fixed in the draft and the story re-checked; the gate passes only when the table is all-green for all stories.

| # | Check |
|---|---|
| 1 | §1 persona is the grounded persona, verbatim |
| 2 | §2 Out list is non-empty and names real neighbouring work |
| 3 | Every domain term in the body is a term defined in `CONTEXT.yaml`, never defined inside the story |
| 4 | Every §4 scenario has exactly one When and one Then |
| 5 | §4 covers: happy path + every edge case + every failure mode |
| 6 | Every Then is observable — a state, message, or number someone can check ("better/faster/improved" fails) |
| 7 | Each §5 entry traces to a blocker's Scope and carries the expected-verify phrasing |
| 8 | Each §6 dependency line carries its reason |
| 9 | §6 lines and the planned blocked-by edges are the same set, foundation included |
| 10 | Story is a vertical slice and INVEST-passes — including Small (≈1–5 days) — else back to Derive for that story |

Show the user the gate result as a compact per-story table.

**Advance when** all checks pass for all stories.

## Step 6/6 — Confirm & publish

1. **Confirm** — present the final stories (or a summary plus one full sample) and ask explicitly: publish these N stories as GitHub issues in `<repo>` (`gh repo view` for the default)? Publishing waits for a yes; edits loop back to the step they touch.
2. **Labels** — create the missing ones: `foundation`, plus the `map:` and `release:` labels inherited from the slice issue. Every issue this run creates carries the inherited labels; the foundation issue carries `foundation` too.
3. **Foundation** — write and create the foundation issue per FOUNDATION.md, ahead of the stories, so each story cites a real number. An open foundation issue from an earlier run on this slice is edited in place, with its diff shown at Confirm.
4. **Create** — `gh issue create` per story in dependency order (blockers first), title = story title, body = the six sections. Record each returned issue number.
5. **Relations pass** — the step that keeps the two renders of each dependency in sync:
   - Replace every placeholder ref in §5 and §6 bodies with the real issue numbers (`gh issue edit`).
   - For each edge, fetch the blocker's node id (`gh issue view <n> --json id`) and create the native edge with it: `gh api repos/{owner}/{repo}/issues/{n}/dependencies/blocked_by -f issue_id=<node-id>`. The endpoint takes the node id, not the issue number. A repo whose API lacks the endpoint falls back to the §6 prose as the single render, stated plainly; any other failure is reported as the error it is.
   - Re-read one linked pair to verify prose and native edge agree.
6. **Index the slice** — where the material was a slice issue, append a `## Stories` checklist to it linking every issue this run created (`gh issue edit`), so the slice issue stays the index of its own breakdown.
7. **Report** — list each story title with its issue URL, its blockers, the foundation issue URL, the excluded categories with their triggers, and any slices the split flagged as killable that the user chose to defer.

**Done when** every story has an issue URL, every §6 line has a matching native edge (or the stated fallback), and the slice issue lists them.
