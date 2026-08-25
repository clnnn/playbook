# Playbook

**A set of agent skills that carry product work from "we think there's a problem" to implementation-ready issues.**

Every stage has a skill. Every skill leaves an artifact the next stage reads, so nothing is passed by conversation alone. The artifacts — a canvas, a PRD, a glossary, ADRs, issues — are written for a **fresh agent**: one with the code in front of it and none of the conversation.

The pipeline deliberately stops at `[ build ]`. What executes the issues is your choice; see [Build](#build).

---

## Installation

Install with [`gh skill install`](https://cli.github.com/manual/gh_skill_install) — a GitHub CLI preview command:

```sh
gh skill install clnnn/playbook --allow-hidden-dirs --all
```

Then wire the repo up, once, before any other skill runs:

```
/setup-playbook-skills
```

It detects your issue tracker, domain-doc layout, and knowledge base and records them in `AGENTS.md` — the file every tracker- or docs-writing skill downstream reads.

---

## All 10 skills

### Discover — frame the problem

| Skill | What It Does | Use When |
|---|---|---|
| [lean-product-canvas](.agents/skills/lean-product-canvas/SKILL.md) | Facilitates Jeff Gothelf's Lean Product Canvas v3 across 8 boxes — follow the money, then metrics, users, jobs-to-be-done, and the smallest experiment | You have a hunch about a business problem and no idea yet whether it deserves code |
| [napkin-math](.agents/skills/napkin-math/SKILL.md) | Order-of-magnitude estimation from real base-rate tables — latency, cost, throughput, data size | Feasibility, sizing, or "can we even afford this?" comes up, at any stage |

### Define — decide what to build

| Skill | What It Does | Use When |
|---|---|---|
| [to-prd](.agents/skills/to-prd/SKILL.md) | Builds an engineering-ready PRD in 9 gated sections, one turn each: problem → flow-first solution → scope → success criteria → quality requirements | A problem is settled and the solution's shape and requirements need pinning down |
| [prototype](.agents/skills/prototype/SKILL.md) | Throwaway code that answers exactly one question — a hand-driven state model, N radically different UI variants, or a walking-skeleton click-through | A design question is cheaper to answer by building than by arguing |

### Align — pin the language and the decisions

| Skill | What It Does | Use When |
|---|---|---|
| [grill-with-docs](.agents/skills/grill-with-docs/SKILL.md) | Walks a design tree in a relentless interview and writes what it hears into the repo as each answer lands — the ubiquitous language in `CONTEXT.md`, plus an ADR per decision that earns one | Starting a design, inheriting an undocumented codebase, or planning a refactor |

After [Matt Pocock's grill-with-docs](https://www.aihero.dev/grill-with-docs).

### Slice — cut the work

| Skill | What It Does | Use When |
|---|---|---|
| [to-story-map](.agents/skills/to-story-map/SKILL.md) | Patton story mapping on a live whiteboard, attacked by two adversaries, ending in one tracker issue per release slice | The work spans releases and you need a map to slice against |
| [to-user-stories](.agents/skills/to-user-stories/SKILL.md) | INVEST pre-check, 9 splitting patterns, then 6-section stories published as `blocked-by`-linked tracker issues | A release slice, epic, or pile of notes needs implementation-ready stories |

### Meta — keep the harness working

| Skill | What It Does | Use When |
|---|---|---|
| [setup-playbook-skills](.agents/skills/setup-playbook-skills/SKILL.md) | One-time wiring: detects and records your issue tracker, domain-doc layout, and knowledge base in `AGENTS.md` | Once per repo, before first use of any other skill |
| [handoff](.agents/skills/handoff/SKILL.md) | Compacts the current conversation into a document a fresh agent picks up cold, referencing existing artifacts instead of duplicating them | The work outlives the context window |
| [writing-for-agents](.agents/skills/writing-for-agents/SKILL.md) | Context-pointer theory and skill mechanics — how to write a skill, an `AGENTS.md`, or a doc an agent actually reaches for | Authoring or editing a skill, `AGENTS.md`, or `CLAUDE.md` |

Skills whose value comes from facilitation (`lean-product-canvas`, `to-prd`, `grill-with-docs`, `to-story-map`, `setup-playbook-skills`, `handoff`) are explicit-invocation only — a workshop should start when *you* say so, not when a keyword happens to match. The rest the agent can reach for on its own.

---

## Flows

The lifecycle is a **map, not a mandate**. Every skill runs standalone; the artifacts are what make them compose, and a missing upstream artifact is announced rather than fatal. **Enter at the stage where your knowledge starts.**

**New product** — 0→1, nothing exists but a hunch

```
/lean-product-canvas → /to-prd → /grill-with-docs → /to-story-map → /to-user-stories → [ build ]
```

**New feature, long** — it spans releases

```
/to-prd → /grill-with-docs → /to-story-map → /to-user-stories → [ build ]
```

**New feature, short** — one slice you can already describe

```
/grill-with-docs → /to-user-stories → [ build ]
```

**Epic handed to you** — a stakeholder wrote three paragraphs

```
/to-user-stories → [ build ]
```

**Inherited codebase** — undocumented, nobody left who wrote it

```
/grill-with-docs → CONTEXT.md · docs/adr/ (no build; the docs are the deliverable)
```

**Validate, then stop** — the idea might not deserve a repo

```
/lean-product-canvas → box 8, the smallest experiment → run it, or walk away
```

**Feasibility or cost question** — "can we even afford this?"

```
/napkin-math → /lean-product-canvas or /to-prd, or the number ends the conversation right here
```

**Design question in the middle of any flow**

```
/prototype → back into the flow with the question answered
```

**Work that outlives one session**

```
… any flow above, at any point … → /handoff → … the same flow, next session, fresh agent …
```

---

## Build

`[ build ]` is the layer this repo does not own. Nothing here tells an implementer to write the test first, spawn a subagent per file, or open the PR at step 9 — those calls belong to your stack, your test runner, and your review norms. The seam is the issue body: anything that can read an issue and write code can stand downstream, which is the same reason the stories are written for an agent with none of the conversation.

Some work skips `[ build ]` having any upstream at all. A bug fix you can finish in an afternoon needs no ceremony, and ceremony you can skip is ceremony the pipeline should not impose.

---

## Prior art

These skills distill other people's work, and it's worth reading the sources:

- **Jeff Gothelf** — Lean Product Canvas, outcomes over outputs
- **Marty Cagan** — the four risks a product idea has to survive
- **Jeff Patton** — user story mapping and the walking skeleton
- **Bill Wake** — INVEST
- **[Matt Pocock](https://www.aihero.dev)** — [grill-with-docs](https://www.aihero.dev/grill-with-docs), writing for agents, and treating context as the thing you engineer
- **[sirupsen/napkin-math](https://github.com/sirupsen/napkin-math)** — the base-rate tables
