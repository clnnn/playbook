# Deriving stories from the map

How the story map becomes a story set: candidates, the judging rules, the split patterns, and the coverage criterion that closes the step.

## Candidates

Each **(step × release slice)** cell of the map is one candidate story: the tasks of one step that fall in one slice. The tasks' vertical order inside the step is priority; the slice names the milestone.

## Judge every candidate

A candidate is judged, not accepted:

- **The vertical-slice test.** The story names an observable user outcome — something you could watch a user achieve end-to-end. A candidate that fails (its tasks are plumbing, set-up, or a fragment of a behaviour) **merges up** into its activity-level siblings until the merged story passes.
- **The ceiling.** One story = one PR an agent completes in one session. A candidate carrying more — several business rules, several data variations, more than one happy path — **splits** with the patterns below. The ceiling replaces estimation: no points, no day counts (an LLM estimate is confident noise; "one PR, one session" is checkable at review time). The foundational issue is the one deliberate exception, and its body says so.

## Split patterns

Richard Lawrence's Humanizing Work patterns, condensed. Work the meta-pattern every time: name the core complexity → list the variations → keep **one complete slice** → each remaining variation becomes its own story.

| Pattern | Signal in the candidate | Split |
|---|---|---|
| Workflow steps | a multi-step flow | simplest case running the **full workflow** first; each added step (review, approval) is its own story — one story per workflow step delivers nothing |
| Operations | "manage / handle / maintain" | one story per operation (create, view, edit, delete) |
| Business rules | same behaviour, different rules per tier / region / case | one story per rule |
| Data variations | several types, formats, structures | simplest data first; each variation follows |
| Data entry | fancy UI inessential to the outcome | plain input first; the picker / autocomplete / drag-drop is a follow-up |
| Major effort | the first variant carries all the infrastructure | one variant end-to-end; remaining variants as small additions |
| Simple / complex | strippable options and filters | the simplest version that still delivers; each option follows |
| Defer performance | "works" is separable from "fast" | functional story first, optimisation after — unless a pinned §6 scenario holds from launch, in which case the number rides the functional story as an acceptance criterion |
| Spike | no pattern applies — uncertainty is the blocker | a time-boxed investigation issue answering one named question; re-derive after |

Prefer the split that exposes low-value variations (candidates to `drop` at the gate) or yields evenly-sized stories. Every split product is judged again — patterns apply recursively until everything fits the ceiling.

## Coverage

The completion criterion for derivation, re-checked at the gate:

- Every in-scope map task appears in **exactly one** story — its Provenance section records which.
- Every PRD §8 exclusion appears in **no** story.
- A task merged away or left behind is named out loud, never silently absorbed.
