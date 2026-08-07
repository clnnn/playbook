# Issue body contract

Every full-fidelity story uses these sections, in this order, machine-checkable. Write for the reader: an agent implementing the story in a fresh session, knowing nothing this run knows.

**The hybrid rule** decides inline vs link throughout: inline **verbatim** only the decisive facts — the exact NFR number this story must hold, the glossary definition of every domain term used, the one persona line, the applicable constraint — each stamped with its source (`PRD §6 PERF-01`, `CONTEXT.yaml: Ordering`). Everything else is a link with a section anchor.

## 1. Story

Mike Cohn format: **As a** [persona] / **I want to** [action] / **so that** [outcome]. The persona is the PRD's named persona.

## 2. Scope

Two lists: **In** and **Out**. The out-list is what kills ambiguity — it names the neighbouring work an implementer would otherwise wander into: the next slice's tasks, the adjacent step, variations split off during derivation. Non-empty, always.

## 3. Context you can't infer

What a fresh agent cannot read from the code: decisions already made upstream, existing code touchpoints (project, file, symbol), and domain terms with their glossary meaning — **every domain term the body uses is defined here or inline at its use, no exceptions.**

## 4. Acceptance criteria

Gherkin scenarios:

- **One When/Then per scenario** — `user-story`'s "only one When/Then" rule reads *per scenario*, not per story.
- One scenario for the happy path, one per edge case, one per failure mode, plus any fitness-function checks inherited from the foundational issue.
- **Two happy paths = two stories** — a split trigger (DERIVATION.md), never a longer criteria list.
- Every *Then* observable: a state, message, or number someone can check — a "better / faster / improved" *Then* fails.

## 5. Inherited from upstream

For each blocker: the domain concepts, module, or interface it is expected to leave behind, generated from that story's Scope section. Phrase it as **expected — verify against code before trusting it**; the upstream story may have landed differently.

## 6. Dependencies

Mirrors the native blocked-by edges, each line carrying its *reason* ("needs the Order aggregate from #12"). Native edges serve tooling; this prose serves the reader — the same fact, two renders, kept in sync by the relations pass.

## 7. Constraints

The PRD constraints and context-map implications binding this story, per the hybrid rule.

## 8. Provenance

Map coordinates (activity → step → tasks, slice) and the resolved source references this body derives from.

## 9. Marker

The last line of every body, invisible when rendered and never mentioned in the visible text:

```
<!-- backlog: <slug>/<story-id> · body-hash: <sha> -->
```

- `<slug>` — the initiative's kebab-case slug.
- `<story-id>` — kebab-case map coordinates (`<activity>--<step>[--<variant>]`), so re-runs regenerate the same id whatever the title becomes.
- `<sha>` — first 12 hex chars of the SHA-256 of the body text above the marker line, computed at write time. This is what detects a later human edit (GITHUB.md).

## Placeholder bodies — Release 2/3

Title, milestone, the Story section reduced to a one-line intent, Dependencies (known edges only), Provenance, and the marker — labelled `needs-refinement`. Full fidelity arrives via `/backlog promote <release>`.
