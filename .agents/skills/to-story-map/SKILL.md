---
name: to-story-map
description: Facilitated story mapping on a live whiteboard, adversarially reviewed, ending in one issue per release slice in the project issue tracker.
argument-hint: "[system or workflow, or an initiative already mapped]"
disable-model-invocation: true
---

# To Story Map

Facilitate a story mapping session in which the user watches the map grow on a **live whiteboard**, put the finished map in front of three adversaries, then cut one issue per release slice.

The three slice issues are the map's record — the map itself, what the review changed, what stayed an assumption. A later reader, and a resumed session, get only what rides in them.

## Repo wiring

Two pointers. A missing one stops the session: name the file, say it is the repo's playbook wiring, and hold.

- **`docs/agents/issue-tracker.md`** — reached from the `### Issue tracker` sub-block of `## Agent skills` in `AGENTS.md` or `CLAUDE.md`. Its operation table defines every tracker verb this skill names in **bold** — **publish**, **list**, **link A blocked by B** and the rest — and is the authority on both the command to run and the fallback when a tracker cannot express an edge. Read it at the write gate.
- **`docs/agents/domain.md`** — the rules for reading this repo's `CONTEXT.md` glossary and its ADRs. Followed at Preflight.

## Input

**Works best with:** the system or workflow to map.
**Also useful:** primary users/personas, workflow steps already known, what the map must decide (MVP scope, release plan).

## Facilitation protocol

- **Open with a heads-up** — rough time estimate, about six questions, and an invitation to paste whatever is already known so those questions can be skipped. Then ask **one question per turn**, carrying the progress label (`Map Qx/6`).
- **Credit what's already given.** Anything arriving with the invocation — text after the skill name, a pasted dump, an appended `ARGUMENTS:` line — and every earlier answer counts as answered. Open at the first unanswered question, with honest progress labels (`Map Q2/6` when Q1 was covered).
- **Recommendations only at decision points** (backbone approval, slice cuts, the review gate, adversary findings), numbered, one marked `(Recommended)`.
- **Interruptions:** answer a meta question directly, restate progress and the pending question, resume. On stop/pause, halt and wait for an explicit resume.
- **Inferred detail** — anything filled in rather than answered — is labelled as an assumption and carried into every slice issue's `Assumptions to validate` list.
- **Fast path:** on a request for single-shot output, skip the questions but still produce the whiteboard, run the review gate and the adversarial pass, and cut the issues.

## The map is the single source of truth

Hold session state as one map: subject, segment/persona, narrative, activities → steps → tasks, release slices. The whiteboard and the slice issues are both renders of it. When anything changes — at any point in the session — update the map first, then refresh every render that already exists.

## Session flow

### Preflight

Read the domain docs per `docs/agents/domain.md` — the `CONTEXT.md` glossary and the ADRs touching this area. Name activities, steps, and tasks in the glossary's words, honouring its `_Avoid_` synonyms, so the stories written from this map inherit the domain's vocabulary. A missing `CONTEXT.md`, no glossary: proceed silently.

Slugify the subject once — `Freelancer invoicing` → `freelancer-invoicing`. That slug is the initiative's identity for the rest of the session and the `map:` label on every issue it cuts.

Then check whether this initiative is already mapped: **list** the tracker's tickets carrying `map:<slug>`, any state. Tickets found take the resume branch. Nothing found opens at Q1.

**Done when** the slug is fixed and the initiative is known to be new or already mapped.

### Resume — an initiative already mapped

Reconstruct the map from the slice issues found at preflight, per the reconstruction rules in [`references/SLICE-FORMAT.md`](references/SLICE-FORMAT.md). Build and publish the board from it, then offer:

1. **Review again** — re-enter at the review gate, board live
2. **Write only** — go straight to the write gate with the map as reconstructed
3. **New initiative instead** — the subject is different work; take a new slug and open at Q1

Report what reconstruction recovered — three slices or fewer, how many activities, steps, and tasks — so a gap in the record is visible before it is built on.

**Done when** the user picks a branch and, for 1 and 2, the board shows the reconstructed map.

### Q1: Scope — `Map Q1/6`

"What are you mapping?" Offer:

1. **Entire product** — full end-to-end system
2. **Major feature area** — one workflow within a larger product (onboarding, checkout, reporting)
3. **User journey** — one user goal or job-to-be-done
4. **Redesign/refactor** — existing product or feature being rebuilt

### Q2: Users & narrative — `Map Q2/6`

Who is the primary persona (offer options: single persona / multiple sharing a workflow / multiple with distinct workflows / roles within an organization), and what are they trying to get done? Condense to a one-sentence, outcome-focused narrative ("deliver a client project on time and get paid", not "use the product").

Capture the **segment** the persona belongs to as well — specific enough to exclude someone ("freelance graphic designers billing 5–10 clients", not "users"). Infer it from the persona and confirm it in one line rather than spending a separate question on it; every slice issue carries it.

### Q3: Backbone — the whiteboard goes live — `Map Q3/6`

Generate 5–8 **backbone** activities in narrative order, left to right — the sequence you'd use explaining the system to someone. Each activity is something the user *does*, never a product feature or a technical layer. Stay inside 5–8: fewer flattens the journey, and past 8 you're almost certainly listing steps as activities — consolidate them one level up.

Once the user has seen the activities, dispatch a subagent to build the board: hand it [`references/WHITEBOARD.md`](references/WHITEBOARD.md), the scratchpad path for `whiteboard.html`, and the current map data, and have it return the published link. It writes the render code once; every later refresh in this session is a data edit made here, so the render never re-enters context.

Give the user the link. Ask whether to add, remove, or reorder activities — every accepted change lands on the board.

With the backbone settled the map's size is known, so offer how Q5 fills it in: all activities in one turn, or one activity per turn. Recommend one-per-turn from 6 activities up, where a single turn's worth of tasks stops being reviewable. Steps stay one-shot either way.

**Done when** the user approves the backbone, picks the Q5 mode, *and* the whiteboard shows exactly the approved activities.

### Q4: Steps — `Map Q4/6`

Under each activity, generate 3–5 steps: actionable, observable (you could watch someone perform it), in natural order. Refresh the whiteboard, ask for corrections, apply them to the board.

**Done when** every activity has approved steps and the board shows them.

### Q5: Tasks — `Map Q5/6`

Under each step, generate 3–7 tasks — small, specific, prioritizable actions — stacked vertically, most essential on top. Cover both halves of the step: the user-facing action *and* the behind-the-scenes work it depends on ("send the invoice" **and** "receive payment confirmation"), so the slices carry real work rather than reading as UI-only. Refresh the whiteboard, ask whether tasks and their vertical order are right.

Per-activity mode works one activity per turn: carry the label `Map Q5/6 · Activity N/M — <name>`, refresh the board after each, and switch mode mid-loop whenever the user asks, in either direction.

**Done when** every step has approved, ordered tasks and the board shows them.

### Q6: Release slices — `Map Q6/6`

Cut the map into three horizontal slices:

- **Release 1 — Walking Skeleton:** the top task of every step — the thinnest end-to-end path through *all* activities
- **Release 2 — Enhanced:** next-priority tasks that deepen the core workflow
- **Release 3 — Polish:** nice-to-haves, edge cases, optimizations

Three slices is the cut. A fourth ambition is a new initiative with its own slug, mapped on its own and chained to this one at that session's write gate.

Refresh the whiteboard — slices now color the task cards, and the slice chips let the user collapse slices to view one at a time. Ask whether the slices make sense.

**Done when** the user approves all three slices and the board renders them collapsible.

### Review gate

Walk the board with the user and ask exactly:

- Are there missing steps or tasks?
- Are there pain points we're not addressing?
- Are there opportunities to delight users?
- Do all activities flow logically?

A pain point or an opportunity the user names is recorded as a `note` on the step it lands on, in their words, and rides the map into the slice issues. One the model spots rather than hears is an assumption.

Fold every accepted answer into the map and refresh the whiteboard. Loop until the user confirms the map is right.

**Done when** the user confirms the map and the board matches it.

### Adversarial pass

Put the reviewed map in front of three adversaries, per [`references/ADVERSARIES.md`](references/ADVERSARIES.md) — one attacking the skeleton claim, one attacking coverage and vocabulary, one attacking continuity. They run once, in parallel, on the post-review map.

That file also holds how findings are collapsed, presented, and ruled, and the four checks that run once the rulings are folded in — an accepted change can break what an adversary already cleared. Both outcomes of every ruling reach the slice issues as review notes.

Re-run the pass only when the user asks for it.

**Done when** every finding carries a ruling, the four checks pass or their findings are ruled too, and the board matches the ruled map.

### Approval gate

Show the map's final shape — slice by slice, task counts, what the pass changed — and ask for approval to cut issues.

**Done when** the user approves the map.

### Write gate

**Check auth** on the tracker here, at the first step that needs it. A failed check stops at this gate with the map approved and the board live: hand the user the tracker doc's auth command and hold, so nothing before this point is lost.

**List** the initiative's existing tickets (`map:<slug>`, matched with `release:rN`). An open slice issue is shown as a diff against the approved slice, with edit-in-place offered. A closed slice issue is reported and skipped: its stories are already written beneath it, and editing it would strand them.

Render the write plan — the labels to create, the three slice issues, the blocked-by chain — and name any cross-initiative dependency the user wants added, which is asked for and never inferred.

**The gate opens only on an explicit `go`.** Then, and only then, the tracker is written.

### Write

Dispatch one subagent with the approved map, the write plan, `docs/agents/issue-tracker.md`, and [`references/SLICE-FORMAT.md`](references/SLICE-FORMAT.md). One agent, working in order, because R2's body cites R1's number:

1. **Labels** — **create a label** for each missing one: `map:<slug>`, `release:r1`, `release:r2`, `release:r3`.
2. **Issues** — **publish** one ticket per slice, R1 first, each body written per SLICE-FORMAT.md, each **applying** `map:<slug>` plus its release label.
3. **Chain** — **link R2 blocked by R1**, then **R3 blocked by R2**, per the tracker doc. Where the tracker cannot express the edge, the body's `## Dependencies` prose becomes its single render — take the doc's stated fallback and say so plainly.

**Done when** three tickets exist, each labelled, and every chain edge is created or its fallback stated.

### Report

The three ticket refs with their labels and blockers, and the board's link.

## Pitfalls

- **Backbone = technical layers** ("UI → API → DB"): remap to the user's workflow; each slice must deliver end-to-end user value.
- **Waterfall slices** ("Release 1 = Activity 1 complete"): the walking skeleton is a thin slice across *all* activities, not one activity finished.
- **Whiteboard drift:** every refresh edits the embedded map data alone, so the board's render code stays exactly as the Q3 subagent wrote it.
- **Feature-speak:** activities and tasks describe what the user does ("compare quotes"), not what the product provides ("comparison dashboard").
- **Backbone sprawl** (10+ activities): the map stops being readable and the walking skeleton stops being thin. It means activities and steps got mixed — roll the fine-grained ones down into steps under a broader activity.
- **Vague tasks** ("handle the payment"): unprioritizable and unbuildable, so the slice cut becomes guesswork. Name the object and the action — "enter the client's email in the Bill To field".
- **Laundered findings:** the adversaries' findings reach the user in their own words, including the ones the map's author disagrees with. Pre-filtering them costs the pass its entire value.
