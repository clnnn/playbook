# Adversaries

Three subagents attack what the session wrote, from three angles, in parallel, once. Three lenses rather than three of the same critic: a design fails on where its boundaries fall, on what it calls its edge, or on what it never wrote down. Redundant critics return correlated findings, which is the failure the pass exists to avoid.

## What each one receives

`docs/CONTEXT-MAP.yaml`, every `CONTEXT.yaml` the map names, and every file in `docs/adr/`.

That is the whole input. The session transcript stays behind: a fresh reader who cannot see how a boundary was arrived at is the point of the pass, and the reasoning that produced a weak boundary reads as justification for it. The code stays behind too. The map describes the boundaries the design intends, often before the code exists, so a report that the code has not caught up is noise. Code cross-referencing belongs in the interview rounds, where a contradiction becomes a question to the user.

All three are told the same thing about volume: report what the artifacts actually get wrong, and return an empty list when they hold up. A quota manufactures findings, and findings the user has to dismiss teach them to skim the next set.

## Lanes

Each lens attacks one layer and stays in it. A split down the wrong seam almost always carries a defensible-looking tag, so a tag lens free to question boundaries returns the boundary lens's findings in different words. State the lane in each prompt.

## Lens 1 — boundary

Attack the split itself and the wiring between the parts:

- Name any two contexts that belong as one, with the evidence from their glossaries: a shared term defined twice, or one context's language leaking into the other's.
- Name any one context that is really two, and say where the seam runs.
- Name any relationship whose `upstream` and `downstream` are reversed, where the side listed upstream is the one that adapts when the other changes.
- Name any `peers` pair whose data or decisions clearly flow one way.
- Name any two contexts that must talk, with no relationship between them in the map.
- Name any relationship `description` that leaves out what crosses the boundary, or who adapts.

## Lens 2 — tag

Take every boundary as given. Attack the tag and the justification behind it:

- Name any `core` context the business would happily buy off the shelf.
- Name any `generic` context carrying a capability a competitor could not replicate.
- Name any `supporting` tag hiding one of the two above.
- Name any `core` description that leaves out the capability a bought replacement would lose.
- Name any `generic` description that leaves out what gets bought, or why a commodity is built in-house.
- Name any description that justifies the tag by restating what the context does rather than what the business would lose.

A tag that looks wrong because its boundary looks wrong is the boundary lens's finding. Leave it to them.

## Lens 3 — decision

Two jobs: break the ADRs that exist, and attack the silence.

Against each file in `docs/adr/`:

- Give a concrete situation in which the decision produces the wrong outcome.
- Name any ADR whose stated reasoning would equally justify the alternative it rejected.
- Name any ADR that records what was decided while leaving out the trade-off that made it hard.

Against the silence:

- Name any boundary, integration pattern, technology choice, or explicit no in the artifacts that clears all three gates — hard to reverse, surprising without context, the result of a real trade-off — with no ADR behind it.

An empty `docs/adr/` is a claim in itself: *this design contained no decision worth recording.* Attack it like any other claim.

## Finding format

| Field | Content |
|---|---|
| `lens` | `boundary`, `tag` or `decision` |
| `target` | boundary: a context name, or `A ↔ B` for a relationship · tag: a context name · decision: an ADR filename, or `missing: <topic>` |
| `claim` | one sentence on what is wrong |
| `scenario` | decision lens only: the concrete situation in which the decision breaks |
| `change` | the concrete edit that would fix it |

`change` carries the finding. A lens that cannot name the edit has not found anything yet, and a decision lens that cannot fill `scenario` is reporting that the ADR holds.

Return findings ranked most severe first. The artifacts' strengths are not part of the return.

## Ruling

Every finding reaches the user in one message: numbered continuously across the three lenses, grouped by lens, in the adversary's own words. Point at the live graph before the boundary findings, since a seam is easier to rule on against the picture than against YAML.

Some accepted findings void others. Merging two contexts dissolves any tag finding aimed at either one. Present every finding anyway and name the cascade while applying the edits. Pre-filtering hands back the judgement the pass exists to take away from you.

**Accepted** — apply the edit. A boundary finding can reopen the frontier; those become questions for the next round, and the adversaries stay done.

**Rejected** — record it in the artifact it landed on:

| Lens | Where it goes |
|---|---|
| `boundary`, `tag` | Sharpen the context's `description` until the objection stops arising. It is one sentence of free text, so the objection stays implicit. |
| `decision` | One line in the ADR body, naming the objection and why it does not hold. The next reader raises the same challenge and finds it already answered. |

Draft both yourself and show them in the same message that reports the applied edits. A rejection creates no new file. Re-run `validate_context.js` once the edits are in.
