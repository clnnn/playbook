# Ideal Skill Sequence — Idea to Build

The full ideal sequence from idea to build, synthesizing:
the moat/language ordering, feasibility as a Box-7 risk type, PRD §6 for
metrics-before-release, and mapping before story-writing. Grouped into five
phases with the feedback loops that make it *not* a waterfall.

## The pipeline

```
 ┌─ PHASE 1: VALIDATE ──────────────────────────────────────────┐
 │  /lean-product-canvas                                         │
 │    ├─ embeds JTBD (Box 4) + persona + problem framing         │
 │    └─ Box 7 picks riskiest assumption →                       │
 │       /pol-probe-advisor → /pol-probe                         │
 │         (value · usability · feasibility · viability)         │
 │  ⟲ loop: run probe → update canvas → re-pick riskiest         │
 └──────────────────────────────────────────────────────────────┘
                          │ (all killer risks cleared)
                          ▼
 ┌─ PHASE 2: DEFINE ────────────────────────────────────────────┐
 │  /positioning-statement   (optional — go-to-market clarity)   │
 │  /prd                                                         │
 │    └─ §6 Success Metrics: primary + guardrail + baseline→now  │
 │  /nfr-elicitation                                             │
 │    └─ interrogates until NFRs are pinned: performance,        │
 │       scale, availability, security, compliance, offline      │
 │    └─ a killer NFR (can't meet it) ⟲ back to Phase 1 as a     │
 │       feasibility risk                                        │
 │  /story-map (Claude artifacts)                                │
 │    └─ backbone + walking skeleton + release slices            │
 └──────────────────────────────────────────────────────────────┘
                          │ (scope, NFRs, and the map)
                          ▼
 ┌─ PHASE 3: STRUCTURE ─────────────────────────────────────────┐
 │  /domain-discovery                                            │
 │    └─ bounded contexts + ubiquitous language + THE MOAT       │
 └──────────────────────────────────────────────────────────────┘
                          │ (glossary + moat feed naming & priority)
                          ▼
 ┌─ PHASE 4: PLAN THE BUILD ────────────────────────────────────┐
 │  /epic-breakdown-advisor      → map areas into epics          │
 │  /user-story                  → stories + Gherkin criteria    │
 │  /user-story-splitting        → split anything still too big  │
 │  ⟲ loop back to /domain-discovery if a step won't name cleanly│
 └──────────────────────────────────────────────────────────────┘
                          │
                          ▼
 ┌─ PHASE 5: BUILD & MEASURE ───────────────────────────────────┐
 │  /nx-generate → scaffold                                      │
 │  /shadcn · /impeccable · /tweakcn-theme → UI                  │
 │  implement the walking skeleton → release                     │
 │  measure against PRD §6 →  ⟲ feed learnings back to Phase 1   │
 └──────────────────────────────────────────────────────────────┘
```

## Phase-by-phase, with the *why here*

| # | Phase | Skills | Why it sits here |
|---|---|---|---|
| 1 | **Validate** | `lean-product-canvas` → `pol-probe-advisor` → `pol-probe` | Reduce *market* risk before spending build effort. The canvas embeds JTBD + persona + problem framing, so it's a strong single entry point. Loop on Box 7's riskiest assumption until problem, solution-fit, willingness-to-pay, **and feasibility** are cleared. |
| 2 | **Define** | `positioning-statement` (optional), `prd`, `nfr-elicitation`, `user-story-mapping-workshop` | Now that you know you *should* build, align on *what/why*. Critically, **PRD §6 forces success metrics + guardrail + baseline-to-analytics before launch** — this is the "measure the release" discipline that fills the canvas-only gap. Then `nfr-elicitation` keeps asking questions until the **non-functional requirements** are pinned — performance, scale, availability, security, compliance, offline tolerance — the "how well" the functional PRD leaves implicit. It sits after `/prd` (you need the functional scope to ask sharp NFR questions). Finally, **mapping is a definition activity, not a planning one**: laying the journey out end-to-end is what exposes the steps a prose PRD silently drops, and it's how the scope becomes a *shape* — backbone, walking skeleton, release slices — that everyone can argue with. A requirement you *can't* meet is a killer feasibility risk → loop back to Phase 1. |
| 3 | **Structure** | `domain-discovery` | Takes the PRD, the NFRs, and the map as input. Names the **bounded contexts** sitting behind the map's activities, locks the **ubiquitous language** so epics and stories inherit consistent labels instead of "context-free mulch", and finds **the moat** so the walking skeleton's slices get prioritised where value concentrates. A map step that won't name cleanly is the tell that a boundary is wrong. |
| 4 | **Plan the build** | `epic-breakdown-advisor` → `user-story` → `user-story-splitting` | Decompose. The backbone and slices are already fixed in Phase 2 and the vocabulary in Phase 3, so this phase is pure breakdown: map areas → epics → stories with Gherkin criteria → splits for anything still too big. PRD explicitly hands off here ("user stories are out of scope, produced separately"). |
| 5 | **Build & measure** | `nx-generate`, `shadcn` / `impeccable` / `tweakcn-theme`, then ship | Scaffold, build the walking skeleton, release, and watch the PRD §6 metrics. The result feeds straight back into Phase 1 as your next validated learning. |

## The three honest caveats

1. **It's a loop, not a line.** Every phase can send you back: a failed probe → re-frame the canvas; a map step domain-discovery can't name cleanly → re-open the map; a released metric that misses → back to validate. The arrows down are the *happy path*; the ⟲ marks are where reality lives.

2. **You can skip based on scale.** Solo dev with a small, validated scope? You can collapse Phase 2 to just PRD §6's metric discipline, and even skip mapping if the journey is one short activity — go canvas → domain-discovery → epic-breakdown → build. The full chain earns its keep when there's a *team* to align or a *multi-activity journey* to sequence.

3. **Feasibility isn't a phase — it's a risk type.** Don't wait for Phase 5 to discover you can't build it. If feasibility is your riskiest assumption, Box 8's 1–2 day spike-and-delete belongs back in **Phase 1**. Weight value first (as the canvas says), but pull feasibility forward the moment it becomes the thing most likely to kill you.

## One-line summary

**Validate what's riskiest → define what success means and map the thinnest slice → learn the language and the moat → decompose into stories → build it → measure → repeat.**
