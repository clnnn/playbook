# Story map document format

The final deliverable, rendered from the approved map. Publish it as the product document (`[Story Map] <Subject>`, per the repo's docs-storage convention) with the prototype linked as its visual companion.

```markdown
# User Story Map: [Subject]

**Author:** [Author]
**Date:** [Today's date]
**Prototype:** [published URL, else relative link to prototype.html] — interactive walking-skeleton companion

## Who

**Segment:** [target segment]
**Persona:** [persona and key characteristics]
**Narrative:** [one-sentence outcome the persona is pursuing]

## Backbone

[Activity 1] → [Activity 2] → [Activity 3] → [Activity 4] → [Activity 5]

## Full Story Map

### Activity 1: [Name]

**Step 1.1: [Name]**
- [Task] — Release 1
- [Task] — Release 2
- [Task] — Release 3

**Step 1.2: [Name]**
- [Task] — Release 1
- ...

[...every activity, every step, every task, in whiteboard order — tasks listed top-priority first, each tagged with its release...]

## Release Slices

### Release 1: Walking Skeleton (MVP)
**Goal:** thinnest end-to-end path through every activity

- [Task] — [Activity]
- ...

**Why this is the walking skeleton:** [one sentence — complete workflow, simplest form of each step]

### Release 2: Enhanced
**Goal:** deepen the core workflow

- [Task] — [Activity]
- ...

### Release 3: Polish
**Goal:** nice-to-haves, edge cases, optimizations

- [Task] — [Activity]
- ...

## Review Notes

[Outcomes of the review gate worth keeping: pain points now addressed, delight opportunities added, gaps closed.]

## Next Steps

1. Write detailed user stories for Release 1 tasks ("As a [persona], I want [task], so that [outcome]" with testable acceptance criteria)
2. Estimate and sequence Release 1
3. Walk stakeholders through the map left-to-right; use the prototype for the demo
```

Completeness check before publishing: every activity, step, and task on the whiteboard appears in the document with the same wording and order, and every task carries its release tag.
