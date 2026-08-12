# Story template

Every story uses exactly these sections, in this order. The bracketed notes are instructions to the writer — delete them from the finished story.

```markdown
# [Story title — user-value-focused, verb first]

## 1. Story

**As a** [the PRD's named persona — never a generic "user"]
**I want to** [action]
**so that** [outcome]

## 2. Scope

**In**
- [what this story delivers — the one complete slice]

**Out**
- [never empty. Name the neighbouring work an implementer would
  otherwise wander into: the next slice's tasks, the adjacent
  workflow step, variations split off during derivation]

## 3. Context you can't infer

[What a fresh agent cannot read from the code:]

**Upstream decisions**
- [choices already made — architecture, product, sequencing — with a one-line why]

**Code touchpoints**
- [project → file → symbol the work starts from; "greenfield" if none]

**Glossary**
- **[Term]** — [meaning]. [Every domain term the story body uses is
  defined here or inline at its first use — no exceptions.]

## 4. Acceptance criteria

[Gherkin. One When/Then per scenario. One scenario for the happy
path, one per edge case, one per failure mode. Every Then
observable: a state, message, or number someone can check.]

```gherkin
Scenario: [happy path]
  Given [precondition]
  When [single action]
  Then [observable outcome]

Scenario: [edge case]
  Given [precondition]
  When [single action]
  Then [observable outcome]

Scenario: [failure mode]
  Given [precondition]
  When [single action]
  Then [observable error state or message]
```

## 5. Inherited from upstream

[One entry per blocker, generated from that story's Scope section:
the domain concepts, module, or interface it is expected to leave
behind. Omit the section only when the story has no blockers.]

- From **#NN [blocker title]** — expected to exist: [concepts /
  module / interface]. **Expected — verify against code before
  trusting it**; the upstream story may have landed differently.

## 6. Dependencies & Constraints

**Dependencies** — the stories this one depends on, and why. Prose
mirror of the native blocked-by edges: same fact, two renders, kept
in sync by the relations pass. "None" if independent.

- Blocked by **#NN** — [reason, e.g. "needs the Order aggregate from #12"]

**Constraints**
- [only those that actually bind *this* story — never forced; drop
  the block entirely when none apply. Draw from: explicit scope
  boundaries, an explicit do-not list, non-functional requirements,
  environment constraints, data constraints.]
```
