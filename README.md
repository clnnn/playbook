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
│  /prd                     10 sections, strict gate on every field.         │
│                           Problem → solution → quality attributes →        │
│                           Cagan's four risks. No hand-waving allowed.      │
│                                                                            │
│                  leaves ▸ docs/knowledge/product/<slug>/prd.md             │
│                                     │                                      │
│  /story-map                         ▼                                      │
│                           Patton story mapping on a LIVE whiteboard, then  │
│                           an interactive HTML prototype of the walking     │
│                           skeleton. Release slices, not a feature list.    │
│                                                                            │
│                  leaves ▸ story-map.md + prototype.html                    │
└────────────────────────────────────┬───────────────────────────────────────┘
                                     ▼
┌─ ALIGN ────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  /grill-and-align         A relentless interview that walks a design tree  │
│                           and writes what it hears into the repo:          │
│                           ubiquitous language, context boundaries, ADRs.   │
│                           Simplified technical English, 20 words a line.   │
│                                                                            │
│                  leaves ▸ docs/CONTEXT-MAP.yaml · CONTEXT.yaml · docs/adr/ │
└────────────────────────────────────┬───────────────────────────────────────┘
                                     ▼
┌─ SLICE ────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  /backlog                 Compile ONE release slice into GitHub issues.    │
│  /backlog promote R2      One thin foundation issue plus the slice's       │
│                           stories, one release per run. GitHub stays       │
│                           untouched until you open the plan gate.          │
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
│  codebase-design          Shared vocabulary for DEEP modules: a lot of     │
│  (auto-invoked)           behaviour behind a small interface, at a clean   │
│                           seam, testable through that interface.           │
│                           Design it twice before you write it once.        │
│                                                                            │
│  YOUR EXECUTOR            Vocabulary, not a loop. Nothing here dictates    │
│  (bring your own)         the implementation flow. Plain Claude Code on    │
│                           an issue · superpowers · an AI-DLC-style loop ·  │
│                           your own /implement. The issue body is the seam. │
│                                                                            │
│                  leaves ▸ code a maintainer and an agent can both navigate │
└────────────────────────────────────────────────────────────────────────────┘
```

Cross-cutting, available at any stage:

```
   /handoff              Compact this conversation into a doc the next agent picks up
   /napkin-math          Fermi estimation with real base rates before you build the thing. Useful for feasibility, cost, and sizing questions.
   /writing-for-agents   Write the next skill · edit AGENTS.md · context-pointer theory
   /setup                One-time wiring: where domain docs live, where knowledge lives
```

---

## Flows

That lifecycle is a **map, not a mandate**. Nothing in the repo enforces the
full run. The stages exist so you can pick the ones your situation needs. Every
skill runs standalone; the artifacts are what make them compose, and a missing
upstream artifact is handled explicitly rather than fatally.

```
   ┌────────┐          ╭──────╮          ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
   │ /skill │          │ auto │          ╎ build             ╎
   └────────┘          ╰──────╯          ╎ + codebase-design ╎
   you invoke it       the agent         └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
                       reaches for it    yours; the repo stops
                                         here, the vocabulary doesn't

   ──►  next stage      ╌╌►  only if it applies      ▸  what it leaves
```

Every build box carries `codebase-design`: it auto-loads whenever the work
touches a module or a seam, so the deep-module vocabulary is present in each
build no matter which executor runs it.

**1. NEW PRODUCT** · 0→1, nothing exists but a hunch

```
   ┌──────────────────────┐   ┌──────┐   ┌────────────┐
   │ /lean-product-canvas │──►│ /prd │──►│ /story-map │──┐
   └──────────────────────┘   └──────┘   └────────────┘  │
   ┌──────────────────┐                                  │
   │ /grill-and-align │◄─────────────────────────────────┘
   └───────┬──────────┘
           ▼
   ┌───────────────┐   ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐   ┌─────────────────────┐
   │ /backlog · R1 │──►╎ build             ╎──►│ /backlog promote Rn │
   └───────────────┘   ╎ + codebase-design ╎   └──────────┬──────────┘
                       └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘              │
                                ▲                         │
                                ╰─────────────────────────╯  one slice per run
```

The only flow that runs the whole chain. The canvas earns its cost here:
killing a bad idea in 8 boxes beats killing it in 8 sprints. Bare `/backlog`
compiles Release 1, the walking skeleton, and every later slice arrives
with `promote`, one at a time.

**2. NEW FEATURE IN AN EXISTING APP** · the common case, two ways

```
   LONG · it spans releases, so you need a map to slice against
   ┌──────┐   ┌────────────┐   ┌──────────────────┐   ┌──────────┐
   │ /prd │──►│ /story-map │──►│ /grill-and-align │──►│ /backlog │──┐
   └──────┘   └────────────┘   └──────────────────┘   └──────────┘  │
   ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐                                           │
   ╎ build             ╎◄──────────────────────────────────────────┘
   ╎ + codebase-design ╎
   └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
        ▸ then /backlog promote R2, R3 … as the releases land

   SHORT · one slice you can already describe
   ┌──────────────────┐   ┌──────────────────┐   ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
   │ /grill-and-align │──►│ /to-user-stories │──►╎ build             ╎
   └──────────────────┘   └──────────────────┘   ╎ + codebase-design ╎
                                                 └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
        ▸ stories written straight from the interview
```

Skip discovery either way; the business problem is already settled. Take the
SHORT path when the feature is one slice: align on the language and the
contexts it touches, then write the stories from the interview. Take the LONG
path when it spans releases and you need a map to slice against.

**3. INHERITED CODEBASE** · undocumented, nobody left who wrote it

```
   ┌──────────────────┐
   │ /grill-and-align │
   └──────────────────┘
        ▸ docs/CONTEXT-MAP.yaml · CONTEXT.yaml · docs/adr/
```

No product work at all. The deliverable is a context map, a glossary, and ADRs
for the decisions already baked into the code. Run it before you promise
anyone a date.

**4. EPIC HANDED TO YOU** · a stakeholder wrote three paragraphs

```
   a stakeholder's        ┌──────────────────┐   ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
   three paragraphs   ───►│ /to-user-stories │──►╎ build             ╎
                          └──────────────────┘   ╎ + codebase-design ╎
                                                 └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
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
                    │   ┌──────┐
                    ├──►│ /prd │
                    │   └──────┘
                    ╰──▸ or the number ends the conversation right here
```

Order-of-magnitude first. A number that ends the conversation early is the
cheapest artifact in the repo.

**7. REFACTOR OR ARCHITECTURE CLEANUP** · no new behaviour

```
   ┌──────────────────────────────┐   ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
   │ /grill-and-align · ADRs only │──►╎ build             ╎
   └──────────────────────────────┘   ╎ + codebase-design ╎
                                      └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
        ▸ docs/adr/ · the reasoning, not just the shape
```

Design it twice, then record why. There is no separate design step to invoke,
since the vocabulary comes with the build. The ADR is the point: the next agent
inherits the reasoning.

**8. BUG FIX OR SMALL CHANGE** · one afternoon

```
   one afternoon's    ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
   fix or bug     ───►╎ build             ╎   nothing else fires, and
                      ╎ + codebase-design ╎   the vocabulary loads only
                      └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘   if the fix touches a seam
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
  `/story-map`. Arriving with a rough epic? `/to-user-stories` takes it
  directly. Nothing checks whether you ran the earlier stage.
- **One slice at a time, then promote.** Any flow with a story map compiles
  exactly one release per run: `/backlog` for Release 1, then
  `/backlog promote R2` (or `2`, or the slice's own name; it resolves
  against the map and restates the resolution before scoping) for each
  slice after it. Promotion doesn't wait for the previous slice to close;
  the issues still open are named at the gate.
- **Degradation is announced, not silent.** `/backlog` with no PRD says which
  inputs it lost, marks every inference 🔶, and carries on. You always know
  what the artifact was built from.

---

## The build layer is yours

Everything upstream of BUILD produces artifacts. BUILD itself is deliberately
the thinnest thing in this repo, and that is a design decision, not an
omission.

`codebase-design` ships **vocabulary, not a loop**: module, interface, seam,
adapter, depth. It tells an implementer how to talk and what "good" means. It
does not tell them to write the test first, spawn a subagent per file, or open
the PR at step 9. Those calls belong to your stack, your test runner, and your
review norms. Implementation loops are also the fastest-moving, most opinionated
part of the whole ecosystem. Pinning one here is the decision most likely to be
wrong for your repo.

So the harness hands over a package and gets out of the way:

```
   what the upstream stages leave behind       what can consume it
   ─────────────────────────────────────       ──────────────────────────────
   GitHub issues · user stories,       ──┐
   fresh-agent-ready, blocked-by wired   │
   docs/adr/ · decisions + reasons       ├──►  plain Claude Code on an issue
   CONTEXT.yaml · ubiquitous language    │     obra/superpowers
   CONTEXT-MAP.yaml · context edges      │     an AI-DLC-style work-unit loop
   Knowledge base · the agreed shape     │     your own `/implement` skill
   codebase-design · deep-module terms ──┘     any spec-driven or TDD harness
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
        gh auth login   (needed by /backlog and /to-user-stories)

  4  ── Wire the repo, once ─────────────────────────────────────────────────

        /setup

        Explores what's already here, shows you what it found, asks, then
        writes the pointers that route every other skill to your layout.

  5  ── Run the lifecycle ────────────────────────────────────────────────────

        /lean-product-canvas   we think checkout is losing us money
        /prd                   checkout redesign
        /story-map             checkout, cart to confirmation
        /grill-and-align
        /backlog               checkout-redesign      ← Release 1
        …build the slice…
        /backlog promote R2                           ← the next slice
```

That is one flow of several. See [Flows](#flows) for the shape that matches your situation, and **enter at the stage where your knowledge starts**.

---

## The skills

| Skill | Stage | How it fires | Deliverable |
|---|---|---|---|
| `setup` | once | `/setup` | Domain-doc + knowledge-base pointers in `AGENTS.md` |
| `lean-product-canvas` | discover | `/lean-product-canvas` | Gothelf Lean Product Canvas v3, 8 boxes |
| `prd` | define | `/prd` | 10-section engineering-ready PRD + self-assessment |
| `story-map` | define | `/story-map` | Story map doc + walking-skeleton HTML prototype |
| `grill-and-align` | align | `/grill-and-align` | `CONTEXT-MAP.yaml`, `CONTEXT.yaml`, ADRs |
| `backlog` | slice | `/backlog` · `/backlog promote <release>` | GitHub issues for one release slice, behind a gate |
| `to-user-stories` | slice | auto **+** `/to-user-stories` | 6-section stories as `blocked-by`-linked issues |
| `codebase-design` | build | **auto** | Deep-module vocabulary carried into plan and code |
| `napkin-math` | any | **auto** | Order-of-magnitude estimate from real base rates |
| `handoff` | any | `/handoff` | Handoff doc for the next session |
| `writing-for-agents` | meta | **auto** | Skills, `AGENTS.md`, and pointers that fire reliably |

**auto** means the agent reaches for it on its own when the work matches; you never type the name. Everything else is explicit-invocation only (`disable-model-invocation: true`), because a facilitated workshop should start when *you* say so, not when a keyword happens to match.

---

## How a real session goes

The skills are facilitators, not generators. Expect to be asked things.

```
  ▸ ONE QUESTION PER TURN.        Stacked questions are bewildering. Every
                                  facilitated skill asks one thing, waits,
                                  then moves. Progress label every turn:
                                  `Box 3 of 8 — Users`, `Step 2/5 — Derive`.

  ▸ THREE WAYS IN.                1. Guided       · one question at a time
                                  2. Context dump · paste it all, the skill routes it
                                  3. Best guess   · it infers, and labels every
                                                    inference 🔶 Assumption

  ▸ NUMBERED OPTIONS, WITH A      You can answer `1`, `#1`, `1,3`, or free text.
    RECOMMENDATION FIRST.         The recommendation is marked (Recommended);
                                  disagreeing with it is the useful part.

  ▸ GATES, NOT SURPRISES.         `/backlog` touches GitHub only after the plan
                                  gate opens. `/prd` won't advance a section until
                                  every field passes. Slow is the feature.

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
│        /story-map            live whiteboard, refreshed as the map grows,  │
│                              then an interactive walking-skeleton page     │
│        /grill-and-align      the context map, drawn as the interview goes  │
│                              so you see the boundaries before naming them  │
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
│      `codebase-design` bans "component," "service," and "boundary" in      │
│      favour of module, interface, seam, adapter. `grill-and-align` writes  │
│      the domain's terms into `CONTEXT.yaml` and holds everything to them.  │
│      Ambiguous vocabulary is where agents and humans quietly diverge.      │
╰────────────────────────────────────────────────────────────────────────────╯
```

---

## Prior art

These skills distill other people's work, and it's worth reading the sources:

- **Jeff Gothelf**: Lean Product Canvas, and outcomes over outputs
- **Marty Cagan**: the four risks a product idea has to survive
- **Jeff Patton**: user story mapping and the walking skeleton
- **John Ousterhout**: deep modules, *A Philosophy of Software Design*
- **Michael Feathers**: seams, *Working Effectively with Legacy Code*
- **Bill Wake**: INVEST
- **[Matt Pocock](https://www.aihero.dev)**: writing for agents, and treating context as the thing you engineer
- **[sirupsen/napkin-math](https://github.com/sirupsen/napkin-math)**: the base-rate tables
- **[OpenKnowledge](https://openknowledge.sh)**: the OKF bundle format

---

<div align="center">

**Clone it. Open it in a container. Type `/setup`.**

The next agent to touch your codebase will already know how you work.

</div>
