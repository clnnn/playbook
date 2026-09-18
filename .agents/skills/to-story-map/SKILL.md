---
name: to-story-map
description: Story mapping facilitated on a live board, adversarially reviewed, ending in one issue per release slice in the project issue tracker.
argument-hint: "[system or workflow, or an initiative already mapped]"
disable-model-invocation: true
---

# To Story Map

Facilitate a story mapping session that builds the map question by question on a **board** the user watches fill, put the finished map in front of three adversaries, then cut one issue per release slice.

The three slice issues are the map's record — the map as the review and the pass left it, and what stayed an assumption. A later reader, and a resumed session, get only what rides in them.

## Repo wiring

One pointer, and its absence stops the session: name the file, say it is the repo's playbook wiring, and hold.

- **`docs/agents/issue-tracker.md`** — reached from the `### Issue tracker` sub-block of `## Agent skills` in `AGENTS.md` or `CLAUDE.md`. Its operation table defines every tracker verb this skill names in **bold** — **publish**, **list**, **link A blocked by B** and the rest — and is the authority on both the command to run and the fallback when a tracker cannot express an edge. Read it at the write gate.

## Input

**Works best with:** the system or workflow to map.
**Also useful:** primary users/personas, workflow steps already known, what the map must decide (MVP scope, release plan).

## The board is the map

`docs/story-map/<slug>/map.json` holds the map. A board renders that file in the browser and re-reads it about once a second, so every edit is on screen before the next question is asked — how to run it, the file's shape, and how the `view` key steers what the user is looking at are in [`references/BOARD.md`](references/BOARD.md).

Every answer, ruling, and accepted finding lands in `map.json` first, and the board carries it from there. The reply that follows is the question and nothing else: the pending question, the numbered options a decision point needs, and where to look (`activity 3 is open on the board`). Activities, steps, tasks, notes, and slices belong to the board — typing them into the chat as well puts a second copy in front of the user, and it goes stale the moment the map changes.

## Facilitation protocol

- **Open with a heads-up** — rough time estimate, about six questions, and an invitation to paste whatever is already known so those questions can be skipped. Then ask **one question per turn**, carrying the progress label (`Map Qx/6`).
- **Credit what's already given.** Anything arriving with the invocation — text after the skill name, a pasted dump, an appended `ARGUMENTS:` line — and every earlier answer counts as answered. Open at the first unanswered question, with honest progress labels (`Map Q2/6` when Q1 was covered).
- **Recommendations only at decision points** (backbone approval, slice cuts, the review gate, adversary findings), numbered, one marked `(Recommended)`.
- **Interruptions:** answer a meta question directly, restate progress and the pending question, resume. On stop/pause, halt and wait for an explicit resume.
- **Inferred detail** — anything filled in rather than answered — is labelled as an assumption and carried into every slice issue's `Assumptions to validate` list.
- **Fast path:** on a request for single-shot output, skip the questions but still run the review gate and the adversarial pass, then cut the issues.

## Session flow

### Preflight

This map is where the initiative's words are coined: name activities, steps, and tasks as the user would say them out loud.

Slugify the subject once — `Freelancer invoicing` → `freelancer-invoicing`. That slug is the initiative's identity for the rest of the session, the folder under `docs/story-map/`, and the `map:` label on every issue it cuts. Where the invocation named no subject, take the slug from Q1's answer instead and open the board there.

Write `docs/story-map/<slug>/map.json` with what the invocation already gives — subject, slug, the three slices — start the board, and hand over its URL in one line.

Then check whether this initiative is already mapped: an existing `map.json` at that path, and the tracker's tickets carrying `map:<slug>`, any state. Either one takes the resume branch. Nothing found opens at Q1.

**Done when** the board is up with the session's `map.json` behind it, and the initiative is known to be new or already mapped.

### Resume — an initiative already mapped

An existing `map.json` is the map: serve it and the board shows what the last session left.

With no such file, reconstruct the map from the slice issues found at preflight, per the reconstruction rules in [`references/SLICE-FORMAT.md`](references/SLICE-FORMAT.md), and write it to `map.json`. Say what reconstruction recovered — three slices or fewer, how many activities, steps, and tasks — so a gap in the record is visible before it is built on.

Then offer:

1. **Review again** — re-enter at the review gate
2. **Write only** — go straight to the write gate with the map as it stands
3. **New initiative instead** — the subject is different work; take a new slug and open at Q1

**Done when** the user picks a branch.

### Q1: Scope — `Map Q1/6`

"What are you mapping?" Offer:

1. **Entire product** — full end-to-end system
2. **Major feature area** — one workflow within a larger product (onboarding, checkout, reporting)
3. **User journey** — one user goal or job-to-be-done
4. **Redesign/refactor** — existing product or feature being rebuilt

### Q2: Users & narrative — `Map Q2/6`

Who is the primary persona (offer options: single persona / multiple sharing a workflow / multiple with distinct workflows / roles within an organization), and what are they trying to get done? Condense to a one-sentence, outcome-focused narrative ("deliver a client project on time and get paid", not "use the product").

Capture the **segment** the persona belongs to as well — specific enough to exclude someone ("freelance graphic designers billing 5–10 clients", not "users"). Infer it from the persona and confirm it in one line rather than spending a separate question on it; every slice issue carries it.

Persona, segment, and narrative land in the board's header, where they stay in view for every question that follows.

### Q3: Backbone — `Map Q3/6`

Generate 5–8 **backbone** activities in narrative order, left to right — the sequence you'd use explaining the system to someone. Each activity is something the user *does*, never a product feature or a technical layer. Stay inside 5–8: fewer flattens the journey, and past 8 you're almost certainly listing steps as activities — consolidate them one level up.

Ask whether to add, remove, or reorder them; the board is showing the row.

With the backbone settled the map's size is known, so offer how Q5 fills it in: all activities in one turn, or one activity per turn. Recommend one-per-turn from 6 activities up, where a single turn's worth of tasks stops being reviewable. Steps stay one-shot either way.

**Done when** the user approves the backbone and picks the Q5 mode.

### Q4: Steps — `Map Q4/6`

Under each activity, generate 3–5 steps in natural order, every one **watchable** — something you could stand behind the persona and see them do, named as object and action: "attach the signed contract", not "manage documents". A step you cannot picture someone performing is a state, a category, or a whole activity wearing a step's name; rewrite it as the act itself. Ask for corrections.

**Done when** every activity has approved steps and every step is watchable.

### Q5: Tasks — `Map Q5/6`

Under each step, generate 3–7 tasks — small, specific, prioritizable actions, in priority order with the most essential first. Cover both halves of the step: the user-facing action *and* the behind-the-scenes work it depends on ("send the invoice" **and** "receive payment confirmation"), so the slices carry real work rather than reading as UI-only. Ask whether the tasks and their order are right.

Tasks arrive before the slice cut, so tag them all `r1` and set that slice's `short` to `not cut yet` — the top band then reads as the priority order it currently is.

Per-activity mode works one activity per turn: carry the label `Map Q5/6 · Activity N/M — <name>`, point the board's `view` at that activity so its tasks are readable in full, and switch mode mid-loop whenever the user asks, in either direction.

**Done when** every step has approved, ordered tasks.

### Q6: Release slices — `Map Q6/6`

Cut the map into three horizontal slices:

- **Release 1 — Walking Skeleton:** the top task of every step — the thinnest end-to-end path through *all* activities
- **Release 2 — Enhanced:** next-priority tasks that deepen the core workflow
- **Release 3 — Polish:** nice-to-haves, edge cases, optimizations

Three slices is the cut. A fourth ambition is a new initiative with its own slug, mapped on its own and chained to this one at that session's write gate.

Retag every task and give R1 back its `walking skeleton` label, then point the board at `r1` — the release view marks every step the skeleton misses — and ask whether the slices make sense.

**Done when** the user approves all three slices.

### Review gate

Walk the map with the user, one activity at a time with the board opened on it, and ask exactly:

- Are there missing steps or tasks?
- Are there pain points we're not addressing?
- Are there opportunities to delight users?
- Do all activities flow logically?

A pain point or an opportunity the user names is recorded as a `note` on the step it lands on, in their words, and rides the map into the slice issues. One the model spots rather than hears is an assumption.

Fold every accepted answer into the map. Loop until the user confirms the map is right.

**Done when** the user confirms the map.

### Adversarial pass

Put the reviewed map in front of three adversaries, per [`references/ADVERSARIES.md`](references/ADVERSARIES.md) — one attacking the skeleton claim, one attacking coverage, one attacking continuity. They run once, in parallel, on the post-review map.

That file also holds how findings are collapsed, presented, and ruled, and the four checks that run once the rulings are folded in — an accepted change can break what an adversary already cleared.

Findings are the one thing the chat carries in full: they are the adversaries' words about the map, not the map. Number them there, and open the board on whatever a finding names as it is ruled.

Re-run the pass only when the user asks for it.

**Done when** every finding carries a ruling, every accepted `change` is visible on the board, and the four checks pass or their findings are ruled too.

### Approval gate

Open the board on each release in turn — R1, R2, R3 — say what the pass changed, and ask for approval to cut issues.

**Done when** the user approves the map.

### Write gate

**Check auth** on the tracker here, at the first step that needs it. A failed check stops at this gate with the map approved and on screen: hand over the tracker doc's auth command and hold — `map.json` holds everything the session built, so nothing is lost.

**List** the initiative's existing tickets (`map:<slug>`, matched with `release:rN`). An open slice issue is shown as a diff against the approved slice, with edit-in-place offered. A closed slice issue is reported and skipped: its stories are already written beneath it, and editing it would strand them.

Render the write plan — the labels to create, the three slice issues, the blocked-by chain — and name any cross-initiative dependency the user wants added, which is asked for and never inferred.

**The gate opens only on an explicit `go`.** Then, and only then, the tracker is written.

### Write

Stamp `map.json` with the approval date, then dispatch one subagent with the approved map, the write plan, `docs/agents/issue-tracker.md`, and [`references/SLICE-FORMAT.md`](references/SLICE-FORMAT.md), working in order, because R2's body cites R1's number:

1. **Labels** — **create a label** for each missing one: `map:<slug>`, `release:r1`, `release:r2`, `release:r3`.
2. **Issues** — **publish** one ticket per slice, R1 first, each body written per SLICE-FORMAT.md, each **applying** `map:<slug>` plus its release label.
3. **Chain** — **link R2 blocked by R1**, then **R3 blocked by R2**, per the tracker doc. Where the tracker cannot express the edge, the body's `## Dependencies` prose becomes its single render — take the doc's stated fallback and say so plainly.

**Done when** three tickets exist, each labelled, and every chain edge is created or its fallback stated.

### Report

The three ticket refs with their labels and blockers, the path to `map.json`, and the command that brings the board back up.

## Pitfalls

- **Backbone = technical layers** ("UI → API → DB"): remap to the user's workflow; each slice must deliver end-to-end user value.
- **Waterfall slices** ("Release 1 = Activity 1 complete"): the walking skeleton is a thin slice across *all* activities, not one activity finished.
- **Feature-speak:** activities and tasks describe what the user does ("compare quotes"), not what the product provides ("comparison dashboard").
- **Backbone sprawl** (10+ activities): the map stops being readable and the walking skeleton stops being thin. It means activities and steps got mixed — roll the fine-grained ones down into steps under a broader activity.
- **Vague tasks** ("handle the payment"): unprioritizable and unbuildable, so the slice cut becomes guesswork. Name the object and the action — "enter the client's email in the Bill To field".
- **Laundered findings:** the adversaries' findings reach the user in their own words, including the ones the map's author disagrees with. Pre-filtering them costs the pass its entire value.
