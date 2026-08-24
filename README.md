# Playbook

**A workspace where the whole product lifecycle, from "we think there's a problem" to a merged pull request, runs through agent skills instead of tribal knowledge.**

Three layers, and each one only holds up because of the one beneath it:

```
                  ╱╲
                 ╱  ╲
                ╱    ╲
               ╱      ╲
              ╱        ╲              ③  what ships
             ╱ PRODUCT  ╲                 code, features, merged PRs
            ╱────────────╲
           ╱              ╲
          ╱ AGENT HARNESS  ╲          ②  the process
         ╱                  ╲             Claude CLI, agent skills, context
        ╱────────────────────╲
       ╱                      ╲
      ╱     DEV CONTAINER      ╲      ①  the machine
     ╱                          ╲         reproducible, disposable, trusted
    ╱────────────────────────────╲
```

---

## The lifecycle

Every stage has a skill. Every skill leaves an artifact the next stage reads. Nothing is passed by conversation alone. That's the point.

The last stage is the exception: **BUILD is yours.** This repo takes the work up to implementation-ready issues and stops. What executes them is your choice; see [The build layer is yours](#the-build-layer-is-yours).

```
┌─ DISCOVER ─────────────────────────────────────────────────────────────────┐
│                                                                            │
│  /lean-product-canvas     Frame a business PROBLEM, not a solution.        │
│                           8 boxes: follow the money → metrics → users →    │
│                           jobs-to-be-done → the smallest experiment.       │
│                                                                            │
│                  leaves ▸ docs/knowledge/product/<slug>/canvas.md          │
└────────────────────────────────────┬───────────────────────────────────────┘
                                     ▼
┌─ DEFINE ───────────────────────────────────────────────────────────────────┐
│                                                                            │
│  /to-prd                  8 sections, one turn each. Problem →             │
│                           flow-first solution → scope → success criteria   │
│                           → quality requirements. Gated throughout.        │
│                                                                            │
│                  leaves ▸ docs/knowledge/product/<slug>/prd.md             │
└────────────────────────────────────┬───────────────────────────────────────┘
                                     ▼
┌─ ALIGN ────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  /grill-with-docs         A relentless interview that walks a design tree  │
│                           and writes what it hears into the repo as each   │
│                           answer lands: the ubiquitous language, and an    │
│                           ADR for every decision that earns one.           │
│                           Routes to `grilling` + `domain-modeling`.        │
│                                                                            │
│                  leaves ▸ CONTEXT.md · docs/adr/                           │
└────────────────────────────────────┬───────────────────────────────────────┘
                                     ▼
┌─ SLICE ────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  /to-story-map            Patton story mapping on a LIVE whiteboard, then  │
│                           TWO adversaries attack it before you cut one     │
│                           GitHub issue per release slice.                  │
│                                     │                                      │
│  /to-user-stories                   ▼                                      │
│                           INVEST pre-check, 9 splitting patterns, then     │
│                           6-section stories written for a FRESH agent:     │
│                           one with the code but none of the conversation.  │
│                                                                            │
│                  leaves ▸ GitHub issues, wired with blocked-by edges       │
└────────────────────────────────────┬───────────────────────────────────────┘
                                     ▼
┌─ BUILD · the one stage this repo does not own ─────────────────────────────┐
│                                                                            │
│  YOUR EXECUTOR            Nothing here dictates the implementation flow.   │
│  (bring your own)         Plain Claude Code on an issue · superpowers ·    │
│                           an AI-DLC-style loop · your own /implement.      │
│                           The issue body is the seam.                      │
│                                                                            │
│                  leaves ▸ code a maintainer and an agent can both navigate │
└────────────────────────────────────────────────────────────────────────────┘
```

Cross-cutting, available at any stage:

```
   /handoff                 Compact this conversation into a doc the next agent picks up
   /napkin-math             Fermi estimation with real base rates before you build the thing. Useful for feasibility, cost, and sizing questions.
   /prototype               Throwaway code that answers ONE question. Three shapes: a state model driven by hand, N radically different UI variants, a walking-skeleton click-through of a whole flow.
   /writing-for-agents      Write the next skill · edit AGENTS.md · context-pointer theory
   /setup-playbook-skills   One-time wiring: your issue tracker, domain docs, knowledge base
```

---

## Flows

That lifecycle is a **map, not a mandate**. Nothing in the repo enforces the
full run. The stages exist so you can pick the ones your situation needs. Every
skill runs standalone; the artifacts are what make them compose, and a missing
upstream artifact is handled explicitly rather than fatally.

```
   ┌────────┐          ╭──────╮          ┌╌╌╌╌╌╌╌┐
   │ /skill │          │ auto │          ╎ build ╎
   └────────┘          ╰──────╯          └╌╌╌╌╌╌╌┘
   you invoke it       the agent         yours; the repo
                       reaches for it    stops here

   ──►  next stage      ╌╌►  only if it applies      ▸  what it leaves
```

**1. NEW PRODUCT** · 0→1, nothing exists but a hunch

```
   ┌──────────────────────┐   ┌─────────┐   ┌──────────────────┐
   │ /lean-product-canvas │──►│ /to-prd │──►│ /grill-with-docs │──┐
   └──────────────────────┘   └─────────┘   └──────────────────┘  │
   ┌───────────────┐                                              │
   │ /to-story-map │◄─────────────────────────────────────────────┘
   └───────┬───────┘
           ▼
   ┌───────────────────────┐   ┌╌╌╌╌╌╌╌┐
   │ /to-user-stories · R1 │──►╎ build ╎
   └───────────────────────┘   └╌╌╌╌╌╌╌┘
        ▸ then /to-user-stories on the R2 and R3 issues, one per run
```

The only flow that runs the whole chain. The canvas earns its cost here:
killing a bad idea in 8 boxes beats killing it in 8 sprints. `/to-story-map`
cuts one issue per release slice up front, so the whole roadmap is visible on
day one; each slice is broken into stories when you reach it.

**2. NEW FEATURE IN AN EXISTING APP** · the common case, two ways

```
   LONG · it spans releases, so you need a map to slice against
   ┌─────────┐   ┌──────────────────┐   ┌───────────────┐   ┌──────────────────┐
   │ /to-prd │──►│ /grill-with-docs │──►│ /to-story-map │──►│ /to-user-stories │──┐
   └─────────┘   └──────────────────┘   └───────────────┘   └──────────────────┘  │
   ┌╌╌╌╌╌╌╌┐                                                                      │
   ╎ build ╎◄─────────────────────────────────────────────────────────────────────┘
   └╌╌╌╌╌╌╌┘
        ▸ then /to-user-stories on the R2 and R3 issues as the releases land

   SHORT · one slice you can already describe
   ┌──────────────────┐   ┌──────────────────┐   ┌╌╌╌╌╌╌╌┐
   │ /grill-with-docs │──►│ /to-user-stories │──►╎ build ╎
   └──────────────────┘   └──────────────────┘   └╌╌╌╌╌╌╌┘
        ▸ stories written straight from the interview
```

Skip discovery either way; the business problem is already settled. Take the
SHORT path when the feature is one slice: align on the language and the
contexts it touches, then write the stories from the interview. Take the LONG
path when it spans releases and you need a map to slice against.

**3. INHERITED CODEBASE** · undocumented, nobody left who wrote it

```
   ┌──────────────────┐
   │ /grill-with-docs │
   └──────────────────┘
        ▸ CONTEXT.md · docs/adr/
```

No product work at all. The deliverable is a glossary and the ADRs behind it
for the decisions already baked into the code. Run it before you promise
anyone a date.

**4. EPIC HANDED TO YOU** · a stakeholder wrote three paragraphs

```
   a stakeholder's        ┌──────────────────┐   ┌╌╌╌╌╌╌╌┐
   three paragraphs   ───►│ /to-user-stories │──►╎ build ╎
                          └──────────────────┘   └╌╌╌╌╌╌╌┘
        ▸ INVEST pre-check · 9 splitting patterns · 6-section issues
```

Standalone. No PRD needed; it names an acting persona and says so.

**5. VALIDATE, THEN STOP** · the idea might not deserve a repo

```
   ┌──────────────────────┐   ┌───────────────────────────────────┐
   │ /lean-product-canvas │──►│  box 8 · the smallest experiment  │
   └──────────────────────┘   └────────────────┬──────────────────┘
                             ┌─────────────────┴──────────────────┐
                             ▼                                    ▼
                     run the experiment                      walk away
```

A complete flow that produces no code on purpose. The smallest experiment is
box 8; run that, not the build.

**6. FEASIBILITY OR COST QUESTION** · "can we even afford this?"

```
   ╭─────────────╮      ┌──────────────────────┐
   │ napkin-math │──┬──►│ /lean-product-canvas │
   ╰─────────────╯  │   └──────────────────────┘
                    │   ┌─────────┐
                    ├──►│ /to-prd │
                    │   └─────────┘
                    ╰──▸ or the number ends the conversation right here
```

Order-of-magnitude first. A number that ends the conversation early is the
cheapest artifact in the repo.

**7. REFACTOR OR ARCHITECTURE CLEANUP** · no new behaviour

```
   ┌──────────────────────────────┐   ┌╌╌╌╌╌╌╌┐
   │ /grill-with-docs · ADRs only │──►╎ build ╎
   └──────────────────────────────┘   └╌╌╌╌╌╌╌┘
        ▸ docs/adr/ · the reasoning, not just the shape
```

Weigh more than one shape, then record why you picked one. The ADR is the
point: the next agent inherits the reasoning.

**8. BUG FIX OR SMALL CHANGE** · one afternoon

```
   one afternoon's    ┌╌╌╌╌╌╌╌┐
   fix or bug     ───►╎ build ╎   nothing else fires
                      └╌╌╌╌╌╌╌┘
```

Ceremony you can skip is ceremony the pipeline should not impose.

**9. WORK THAT OUTLIVES ONE SESSION** · context window ends, work does not

```
   … any flow above, at any point …
        │
        ▼
   ┌──────────┐
   │ /handoff │   ▸ a doc the next agent picks up cold
   └────┬─────┘
        ▼
   … the same flow, next session, fresh agent …
```

Drops into any flow above, at any point. The next agent reads the doc.

Three rules hold across all of them:

- **Enter where your knowledge starts.** Arriving with a PRD? Start at
  `/to-story-map`. Arriving with a rough epic? `/to-user-stories` takes it
  directly. Nothing checks whether you ran the earlier stage.
- **The whole roadmap up front, one slice at a time after.** `/to-story-map`
  cuts every release slice as its own GitHub issue the moment you approve the
  map, so the plan is visible on day one. Breaking a slice into stories is a
  separate run against that issue — `/to-user-stories` on R1, then on R2 and
  R3 as you reach them, each with its own foundation call.
- **Degradation is announced, not silent.** `/to-user-stories` with no PRD says
  which inputs it lost, marks every inference 🔶, and carries on. You always
  know what the artifact was built from.

---

## The build layer is yours

Everything upstream of BUILD produces artifacts. BUILD itself is deliberately
the thinnest thing in this repo, and that is a design decision, not an
omission.

Nothing here tells an implementer to write the test first, spawn a subagent per
file, or open the PR at step 9. Those calls belong to your stack, your test
runner, and your review norms. Implementation loops are also the fastest-moving,
most opinionated part of the whole ecosystem. Pinning one here is the decision
most likely to be wrong for your repo.

So the harness hands over a package and gets out of the way:

```
   what the upstream stages leave behind       what can consume it
   ─────────────────────────────────────       ──────────────────────────────
   Tracker issues · user stories,      ──┐
   fresh-agent-ready, blocked-by wired   │     plain Claude Code on an issue
   docs/adr/ · decisions + reasons       ├──►  obra/superpowers
   CONTEXT.md · ubiquitous language      │     an AI-DLC-style work-unit loop
   CONTEXT-MAP.md · context edges        │     your own `/implement` skill
   Knowledge base · the agreed shape   ──┘     any spec-driven or TDD harness
```

The seam is the issue body. Anything that can read a GitHub issue and write
code can stand downstream of this pipeline, which is the same reason the
stories are written for an agent with none of the conversation.

---

## Quick start

**Prerequisites:** Docker, and either VS Code with the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension or a GitHub Codespace. That's it; everything else installs itself.

```
  1  ── Get the workspace ─────────────────────────────────────────────────

        git clone https://github.com/clnnn/playbook my-app
        code my-app

  2  ── Reopen in Container ───────────────────────────────────────────────

        ⇧⌘P → "Dev Containers: Reopen in Container"

        The container builds, then postCreate runs:
          · claude-code, node, gh          ← devcontainer features
          · ~/.claude/settings.json        ← setup-claude.sh
          · the okn CLI (pinned 0.11.0)    ← setup-okn.sh

  3  ── Authenticate ───────────────────────────────────────────────────────

        claude          then /login
        gh auth login   (or glab; needed by /to-story-map and /to-user-stories)

  4  ── Wire the repo, once ─────────────────────────────────────────────────

        /setup-playbook-skills

        Explores what's already here, shows you what it found, asks, then
        writes the pointers that route every other skill to your layout.

  5  ── Run the lifecycle ────────────────────────────────────────────────────

        /lean-product-canvas   we think checkout is losing us money
        /to-prd                checkout redesign
        /grill-with-docs
        /to-story-map          checkout, cart to confirmation
        /to-user-stories  #1                          ← Release 1
        …build the slice…
        /to-user-stories  #2                          ← the next slice
```

That is one flow of several. See [Flows](#flows) for the shape that matches your situation, and **enter at the stage where your knowledge starts**.

---

## The skills

| Skill | Stage | How it fires | Deliverable |
|---|---|---|---|
| `setup-playbook-skills` | once | `/setup-playbook-skills` | Issue-tracker, domain-doc and knowledge-base pointers in `AGENTS.md` |
| `lean-product-canvas` | discover | `/lean-product-canvas` | Gothelf Lean Product Canvas v3, 8 boxes |
| `to-prd` | define | `/to-prd` | 8-section engineering-ready PRD |
| `grill-with-docs` | align | `/grill-with-docs` | `CONTEXT.md` glossary + ADRs (routes to `grilling` + `domain-modeling`) |
| `to-story-map` | slice | `/to-story-map` | Live whiteboard + one tracker issue per release slice |
| `to-user-stories` | slice | auto **+** `/to-user-stories` | 6-section stories as `blocked-by`-linked tracker issues |
| `prototype` | any | auto **+** `/prototype` | Throwaway code answering one question: state model, UI variants, or walking skeleton |
| `napkin-math` | any | **auto** | Order-of-magnitude estimate from real base rates |
| `handoff` | any | `/handoff` | Handoff doc for the next session |
| `writing-for-agents` | meta | **auto** | Skills, `AGENTS.md`, and pointers that fire reliably |

**auto** means the agent reaches for it on its own when the work matches; you never type the name. Everything else is explicit-invocation only (`disable-model-invocation: true`), because a facilitated workshop should start when *you* say so, not when a keyword happens to match.

---

## How a real session goes

The skills are facilitators, not generators. Expect to be asked things.

```
  ▸ ONE TURN, ONE TOPIC.          Stacked questions are bewildering. Most
                                  facilitated skills ask one thing, wait, then
                                  move; `/to-prd` asks one short section's
                                  fields together, because its sections are
                                  small enough to hold in one answer. Either
                                  way a progress label every turn:
                                  `Box 3 of 8 — Users`, `Section 4/8 — Out of
                                  scope`.

  ▸ THREE WAYS IN.                1. Guided       · one question at a time
                                  2. Context dump · paste it all, the skill routes it
                                  3. Best guess   · it infers, and labels every
                                                    inference 🔶 Assumption

  ▸ NUMBERED OPTIONS, WITH A      You can answer `1`, `#1`, `1,3`, or free text.
    RECOMMENDATION FIRST.         The recommendation is marked (Recommended);
                                  disagreeing with it is the useful part.

  ▸ GATES, NOT SURPRISES.         `/to-story-map` touches GitHub only after the
                                  write gate opens. `/to-prd` won't advance a
                                  section until every field passes. Slow is
                                  the feature.

  ▸ ARTIFACTS, NOT CHAT LOGS.     Every stage writes a file or an issue. The next
                                  stage reads the file, not the transcript. That's
                                  what makes a fresh agent as good as a warm one.
```

---

## Why it's shaped this way

Four decisions worth stealing even if you never clone this repo.

```
╭────────────────────────────────────────────────────────────────────────────╮
│  1 · VISUAL-ASSISTED: YOU LOOK AT IT, NOT JUST READ IT                     │
│      Some skills draw the thing while they build it, so you correct a      │
│      picture instead of proof-reading prose. A wrong backbone is obvious   │
│      on a board and invisible in a paragraph.                              │
│                                                                            │
│        /to-story-map         live whiteboard, refreshed as the map grows   │
│        /prototype            a walking-skeleton page, or N UI variants     │
│        /grill-with-docs      the glossary, written as the interview goes   │
│                              so the words are pinned before you build      │
├────────────────────────────────────────────────────────────────────────────┤
│  2 · WRITE FOR THE FRESH AGENT                                             │
│      Assume the next agent has the code and none of the conversation.      │
│      Every artifact (story, ADR, glossary entry) is written to be          │
│      picked up cold. Context windows end; the repo doesn't.                │
├────────────────────────────────────────────────────────────────────────────┤
│  3 · TASK-FIRST: AN ISSUE BEFORE ANY IMPLEMENTATION                        │
│      Every work request becomes a GitHub Issue before any code is written. │
│      An issue is durable, reviewable and linkable; a chat request is none  │
│      of the three. The six-section body is the entire brief, blocked-by    │
│      edges carry the order, and the tracker is where the work lives.       │
├────────────────────────────────────────────────────────────────────────────┤
│  4 · ONE WORD, ONE MEANING                                                 │
│      `grill-with-docs` writes the domain's terms into `CONTEXT.md` and     │
│      holds every later artifact to them. Ambiguous vocabulary is where     │
│      agents and humans quietly diverge.                                    │
╰────────────────────────────────────────────────────────────────────────────╯
```

---

## Prior art

These skills distill other people's work, and it's worth reading the sources:

- **Jeff Gothelf**: Lean Product Canvas, and outcomes over outputs
- **Marty Cagan**: the four risks a product idea has to survive
- **Jeff Patton**: user story mapping and the walking skeleton
- **Bill Wake**: INVEST
- **[Matt Pocock](https://www.aihero.dev)**: writing for agents, and treating context as the thing you engineer
- **[sirupsen/napkin-math](https://github.com/sirupsen/napkin-math)**: the base-rate tables
- **[OpenKnowledge](https://openknowledge.sh)**: the OKF bundle format

---

<div align="center">

**Clone it. Open it in a container. Type `/setup-playbook-skills`.**

The next agent to touch your codebase will already know how you work.

</div>
