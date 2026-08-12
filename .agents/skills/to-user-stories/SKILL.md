---
name: to-user-stories
description: Turn material — a conversation, notes, a PRD, a story map, a backlog slice brief — into 6-section user stories, then publish them as dependency-linked GitHub issues. Use when a feature needs implementation-ready stories, when an implemented story changed, or when a backlog slice brief arrives for writing.
argument-hint: "[epic, notes, PRD, or references]"
---

# To User Stories

Convert whatever material is at hand — the current conversation, pasted notes, a PRD, a story map, linked files or issues — into implementation-ready user stories, each written for a **fresh agent**: an implementer with the code in front of them but none of this conversation. Every story passes the checks gate, the user confirms the set, and only then do the stories become GitHub issues wired with blocked-by edges.

## Input

**Works best with:** an epic or feature plus its PRD (the persona and glossary come from there).
**Also useful:** the story map, discovery notes, existing issues the work hangs off.

## Facilitation

- One question per turn, numbered quick-select options plus `Other (specify)` where natural; accept `1`, `1,3`, or free text.
- Open with a heads-up of the five steps below, then offer entry modes: **1. Guided** · **2. Context dump** (paste everything; the skill routes it) · **3. Best guess** (infer gaps, label every inference 🔶 Assumption).
- Show a progress label each turn (`Step X/5 — name`).

## Step 1/5 — Ground

Establish, from the material or by asking:

- **Persona** — the PRD's named persona. Every story's §1 uses this persona by name; if no PRD exists, name one now with the user and note it as the acting PRD persona.
- **Glossary** — the domain terms the material uses, each with its meaning. This feeds every story's §3.
- **Repository** — where issues will land (`gh repo view` confirms the default).

**Advance when** persona, glossary, and target repo are stated back and confirmed.

## Step 2/5 — Derive

Read [`references/SPLITTING-PATTERNS.md`](references/SPLITTING-PATTERNS.md) and walk it: INVEST pre-check, then the 9 patterns in order, meta-pattern inside whichever fits, split evaluation after. Material already story-sized skips the patterns but still passes the INVEST pre-check.

Present the resulting slice list — title, one-line value, proposed order — with the pattern that produced it and what the split revealed (killable low-value slices are a finding, not a footnote; recommend dropping them).

**Advance when** the user accepts the slice list (adds, drops, and reorders applied).

## Step 3/5 — Write

Write each accepted slice as a story using [`template.md`](template.md) — all six sections, in order. While writing:

- §2 **Out** names the neighbouring work this story's siblings own — pull it straight from the slice list; derivation just told you what got split off.
- §3 is written for the fresh agent: upstream decisions, code touchpoints (project, file, symbol — verify they exist before citing them), and glossary entries for every domain term the body uses.
- §5 is generated from each blocker's §2 **In** list — what that story promises to leave behind — and always phrased **expected — verify against code before trusting it**.
- §6 uses placeholder refs (`#S1`, `#S2`) for stories not yet published; real numbers arrive in the relations pass.

**Advance when** every accepted slice has a complete six-section draft.

## Step 4/5 — Checks gate

Run every check against every story. A failure is fixed in the draft and the story re-checked; the gate passes only when the table is all-green for all stories.

| # | Check |
|---|---|
| 1 | §1 persona is the PRD's named persona, verbatim |
| 2 | §2 Out list is non-empty and names real neighbouring work |
| 3 | Every domain term in the body is defined in §3 or inline at first use — no exceptions |
| 4 | Every §4 scenario has exactly one When and one Then |
| 5 | §4 covers: happy path + every edge case + every failure mode |
| 6 | Every Then is observable — a state, message, or number someone can check ("better/faster/improved" fails) |
| 7 | Each §5 entry traces to a blocker's Scope and carries the expected-verify phrasing |
| 8 | Each §6 dependency line carries its reason |
| 9 | §6 lines and the planned blocked-by edges are the same set |
| 10 | Story is a vertical slice and INVEST-passes — including Small (≈1–5 days) — else back to Derive for that story |

Show the user the gate result as a compact per-story table.

**Advance when** all checks pass for all stories.

## Step 5/5 — Confirm & publish

1. **Confirm** — present the final stories (or a summary plus one full sample) and ask explicitly: publish these N stories as GitHub issues in `<repo>`? Publishing waits for a yes; edits loop back to the step they touch.
2. **Create** — `gh issue create` per story in dependency order (blockers first), title = story title, body = the six sections, labels/milestone as agreed. Record each returned issue number.
3. **Relations pass** — the step that keeps the two renders of each dependency in sync:
   - Replace every placeholder ref in §5 and §6 bodies with the real issue numbers (`gh issue edit`).
   - Create the native blocked-by edges via the GitHub issue-dependencies API (`gh api repos/{owner}/{repo}/issues/{n}/dependencies/blocked_by -f issue_id=...`); if the API is unavailable on this repo, state so and rely on the §6 prose as the single render.
   - Re-read one linked pair to verify prose and native edge agree.
4. **Report** — list each story title with its issue URL, its blockers, and any slices the split flagged as killable that the user chose to defer.

**Done when** every story has an issue URL and every §6 line has a matching native edge (or the stated fallback).
