# Adversaries

Three subagents attack the reviewed map from different angles, in parallel, once. Each answers one question, and no two answer the same one: a map fails because Release 1 is not **thin**, because the map is not **complete**, or because nothing **connects**. Redundant critics return correlated findings — the failure the pass exists to avoid — so every claim belongs to exactly one lens.

## What each one receives

- **Adversary 1** — the `MAP` data object.
- **Adversary 2** — the `MAP` data object and the glossary.
- **Adversary 3** — the `MAP` data object.

Each works from the map alone, with the session transcript left behind. A fresh reader who cannot see how the map was arrived at is the point of the pass; the reasoning that produced a weak slice reads as justification for it.

All three are told the same thing about volume: report what the map actually gets wrong, and return an empty list when it holds up. A quota manufactures findings, and findings the user has to dismiss teach them to skim the next set.

## Adversary 1 — the skeleton lens

Is Release 1 thin, and does it span the whole backbone?

- Name any backbone activity with no Release 1 task under it.
- Name any Release 1 task that is the second-simplest form of its step, and give the simpler version that would still work.
- Say whether Release 1 finishes one activity rather than thinly crossing all of them.

## Adversary 2 — the coverage lens

Is the map complete, and written in the domain's words?

- Name a step the persona must perform that no activity lists.
- Name any task describing a user-facing action whose behind-the-scenes counterpart is absent, or the reverse.
- Name any activity, step, or task written as what the product provides ("comparison dashboard") rather than what the user does ("compare quotes").
- Name any step you could not watch the persona perform — a state or a category ("manage documents") standing where an act belongs.
- Name any task too vague to prioritize or build ("handle the payment").
- Name any activity out of narrative order, and say whether the backbone has grown past 8 by mixing in steps.
- Name any recorded pain point with no task addressing it.
- Name any domain concept called by a word the glossary does not use, and any term the glossary lists under `avoid`.

## Adversary 3 — the trace lens

Does anything connect? Every claim about one part of the map depending on another lands here.

- Walk the whole map in narrative order and name the first task needing something — a record, a state, a decision — that no earlier task produces.
- Walk the narrative using Release 1 alone and name the first dead end.
- Name any Release 1 task that needs something from Release 2 or 3 to function at all — a waterfall slice wearing the skeleton's label.

## Finding format

Each finding carries four things and nothing else:

| Field | Content |
|---|---|
| `lens` | `skeleton`, `coverage`, or `trace` |
| `target` | where the failure is observed — activity, activity → step, or activity → step → task |
| `claim` | one sentence on what is wrong |
| `change` | the concrete edit that would fix it |

`target` marks where the failure shows and `change` often lands elsewhere: a missing upstream task is observed at the downstream task that needs it, and fixed under an earlier step.

Return findings ranked most severe first. The map's strengths are not part of the return.

## Ruling

Collapse the duplicates first: two findings sharing a `target` and proposing the same edit become one entry tagged with both lenses, carrying the sharper `change`. Then present them **ranked by severity, with the lens as a tag** — after a collapse a finding belongs to two lenses, so severity is the only honest order.

Findings reach the user numbered and in the adversary's own words. The user rules on each one, in batches where they want to: `accept 1, 3, 5-7` and `reject the rest` both count. A rejection carries a reason, and one reason may cover a batch.

- **Accepted** — edit the map itself: add, rewrite, reorder, or re-slice exactly what the `change` names, then show the edited activity or step as an outline before the next ruling.
- **Rejected** — the map stands unchanged; say so and say why.

The map is the pass's only record. An accepted change is visible in it; a rejection leaves it as it was — so where the reason is a standing constraint rather than a one-off call, record it as a `note` on the finding's `target` step, in the user's words, and it rides the map into the slice issues.

## After the rulings

Accepting a finding edits the map, and the edit can break what an adversary already cleared: moving a task down to Release 2 strips an activity out of the skeleton.

Once every accepted change is folded in, check four things.

1. Every backbone activity has at least one Release 1 task.
2. Every step's tasks run r1, then r2, then r3.
3. Every step still carries at least one task.
4. Every accepted finding's `change` is visible in the map.

A failed check reaches the user as a finding with `lens: assertion`, ruled like any other.

Where a ruling moved a task across slices, re-run **Adversary 1 alone**, once, on the folded map, and rule what it returns.

That is the last round. Rulings made here fold into the map and stand; a ruling that moves a task across slices at this point is reported to the user as unverified.
