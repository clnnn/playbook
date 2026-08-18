# Release slice issue format

One GitHub issue per release slice, and together the three of them are the map's record: `/to-user-stories` writes stories from one, `/prototype` builds the skeleton from one, and a resumed session rebuilds the whole map from all three. Each issue is written to be read alone.

**Title:** `Release N: <Slice name> — <Subject>`
**Labels:** `map:<slug>` and `release:rN`

## The body

```markdown
## Who

**Segment:** [target segment]
**Persona:** [persona and key characteristics]
**Narrative:** [one-sentence outcome the persona is pursuing]

## Goal

[the slice's goal — thinnest end-to-end path for R1, deepen the core workflow
for R2, nice-to-haves and edge cases for R3]

## Backbone

[Activity 1] → [Activity 2] → [Activity 3] → [Activity 4] → [Activity 5]

## Map

[every activity as a heading and every step under it, in whiteboard order —
the whole map's outline, so this issue is readable alone. Under each step,
this slice's tasks in priority order. A step whose tasks all live in other
slices carries no task lines, and that absence is the whole signal.]

### [Activity 1]

- **[Step 1.1]**
  - [Task]
- **[Step 1.2]**

### [Activity 2]

- **[Step 2.1]**
  - [Task]
  - [Task]

## Deferred to later slices

- [neighbouring work the next slices own] — Release N
- ...

## Why this is the walking skeleton

[Release 1 only — one sentence: the complete workflow, each step in its
simplest form.]

## Review notes

[What the review gate and the adversarial pass changed, and what they raised
that the user rejected, with the reason. Findings about the map as a whole
appear in all three issues; findings about this slice appear here alone.]

- [finding] — **accepted:** [what changed]
- [finding] — **rejected:** [why]

## Assumptions to validate

[Best-guess sessions only. Omit the section when the list would be empty.]

- 🔶 [assumption]

## Dependencies

Blocked by **#NN** (Release N-1). / Blocks **#NN** (Release N+1).
[Release 1 blocks R2 and is itself blocked by nothing, unless the user named
a cross-initiative dependency at the write gate.]

## Whiteboard

[published URL, else the scratchpad path it was served from]

## Next steps

- Run `/to-user-stories` on this issue to break the slice into stories.
- Run `/prototype` on this issue to build the walking-skeleton click-through.
  [Release 1 only]

## Stories

[Appended by `/to-user-stories` when the slice is broken down, never written at
creation. It makes the slice issue the index of its own breakdown, which is what
lets the write gate skip a closed slice knowing where its stories went.]

- [ ] #NN [story title]
```

Completeness check before creating: every activity and every step of the map appears in `## Map`, every task the slice owns appears under its step, and the release label matches the title.

## Reconstruction

A resumed session rebuilds the map from the issues carrying `map:<slug>`:

- **Subject** — the issue title. **Slug** — the `map:` label.
- **Segment, persona, narrative** — `## Who`, from any of the three.
- **Activities and their order, steps and their order** — `## Map` heading and list order, from any of the three. This is why the outline is complete in every issue rather than only in Release 1's.
- **Tasks** — the union across all three, each tagged with the slice whose issue carried it.
- **Priority order within a step** — concatenate by slice rank (r1, then r2, then r3), preserving each issue's own order. Slices are cuts by priority, so an R1 task sits above an R2 task in the same step.

Report what reconstruction found: which slices were present, and any step that carries no task in any issue. A silent gap becomes a board that looks complete and isn't.

## Caches that can go stale

Three pieces of every issue are copies of something owned elsewhere, kept so the issue reads alone:

- `## Deferred to later slices` copies what the next slices own.
- `## Map`'s outline is the same outline in all three issues.
- Findings about the whole map are copied into all three `## Review notes`.

Editing one slice issue later leaves the other two stale. The write gate's edit-in-place path refreshes open issues; a closed slice issue keeps the copy it shipped with, which is correct — it describes work that already landed.
