# Adversaries

Two subagents attack the reviewed map from different angles, in parallel, once. Two lenses rather than two of the same critic: a map fails structurally *or* it fails on coverage, and redundant critics return correlated findings — the failure the pass exists to avoid.

## What each one receives

- **Adversary 1** — the `MAP` data object.
- **Adversary 2** — the `MAP` data object and the glossary.

Each works from the map alone, with the session transcript left behind. A fresh reader who cannot see how the map was arrived at is the point of the pass; the reasoning that produced a weak slice reads as justification for it.

Both are told the same thing about volume: report what the map actually gets wrong, and return an empty list when it holds up. A quota manufactures findings, and findings the user has to dismiss teach them to skim the next set.

## Adversary 1 — the skeleton lens

Attack the claim that Release 1 is a walking skeleton:

- Name any backbone activity with no Release 1 task under it.
- Name any Release 1 task that is the second-simplest form of its step, and give the simpler version that would still work.
- Name any Release 1 task that needs something from Release 2 or 3 to function at all — a waterfall slice wearing the skeleton's label.
- Walk the narrative using Release 1 alone and name the first dead end.
- Say whether Release 1 finishes one activity rather than thinly crossing all of them.

## Adversary 2 — the coverage lens

Attack coverage and vocabulary:

- Name a step the persona must perform that no activity lists.
- Name any task describing a user-facing action whose behind-the-scenes counterpart is absent, or the reverse.
- Name any activity, step, or task written as what the product provides ("comparison dashboard") rather than what the user does ("compare quotes").
- Name any task too vague to prioritize or build ("handle the payment").
- Name any activity out of narrative order, and say whether the backbone has grown past 8 by mixing in steps.
- Name any domain concept called by a word the glossary does not use, and any term the glossary lists under `avoid`.

## Finding format

Each finding carries four things and nothing else:

| Field | Content |
|---|---|
| `lens` | `skeleton` or `coverage` |
| `target` | where it lands — activity, activity → step, or activity → step → task |
| `claim` | one sentence on what is wrong |
| `change` | the concrete edit that would fix it |

Return findings ranked most severe first. The map's strengths are not part of the return.

## Ruling

Findings reach the user numbered and in the adversary's own words, grouped by lens. The user rules on each one.

- **Accepted** — fold the change into the map, refresh the board.
- **Rejected** — keep the finding and the reason.

Both outcomes reach `## Review notes` in the slice issues. A recorded rejection is the more useful half: it stops the next reader raising the same thing and re-deciding it from scratch.
