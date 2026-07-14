# PRD-Development Skill Reference Analysis

**Date:** 2026-07-14
**Question:** For the `prd-development` skill, which referenced skills (direct and indirect) are actually useful, given the goal of producing a **PRD + engineering-ready user stories**, typically run **after `domain-discovery`**?

---

## Framing assumptions

Two facts drive every verdict below:

1. **Goal = PRD + engineering-ready user stories** — not a business case, pricing decision, or growth strategy.
2. **`domain-discovery` runs first** — so the idea is already stress-tested and you have a bounded-context / ubiquitous-language map. This makes the *problem-reframing* and *"is this real"* skills largely redundant. It does **not**, however, produce personas, jobs-to-be-done, or user stories.

**Verdict scale:** ✅ Core · 🟢 Recommended · 🟡 Situational · 🔴 Skip

---

## Before `domain-discovery` — is anything needed first?

**Usually no.** `domain-discovery` is deliberately the *front door* — its own guidance says to trigger it the moment someone has an idea, plan, or feature to describe. If you already have something concrete to build, **start there; nothing needs to precede it.**

The only case where a skill belongs *before* domain-discovery is when you are **upstream of having an idea at all** — you have a goal or a vague problem but not yet a concrete thing to stress-test. domain-discovery assumes you bring it an idea; it does not *generate* one.

| Skill | Use before domain-discovery when… | Why it fits here |
|---|---|---|
| **opportunity-solution-tree** 🟢 | You have a **business outcome/goal but no specific feature yet** ("reduce churn" but unsure how) | Takes a desired outcome → generates opportunities (problems) → solutions. It *produces the idea* you then bring to domain-discovery |
| **jobs-to-be-done** 🟢 | You're **unsure what customers actually need**, only that there's a space | Grounds you in real functional/emotional/social jobs before committing to an idea; sharpens both domain-discovery and later personas |
| **discovery-process** / **discovery-interview-prep** 🟡 | You have **zero customer evidence** and must talk to people first | Real research to find a validated problem. Heavy (weeks) — only worth it if starting from nothing |

**Not worth running before domain-discovery:**

- **problem-framing-canvas** — domain-discovery already reframes the problem in plain language; running MITRE's canvas first is redundant.
- **proto-persona, positioning-statement, tam-sam-som-calculator** — these read better *after* domain-discovery has clarified the domain and customer.
- The **finance/growth cluster** — irrelevant this early.

**Full pipeline:**

```
(no idea yet?)  opportunity-solution-tree  /  jobs-to-be-done   ← only if upstream of an idea
        │
        ▼
domain-discovery   ← the real front door; start here if you have an idea
        │
        ▼
prd-development → PRD + user stories
```

---

## How `prd-development` pulls in skills

References come from **two places**, which is why the list is long:

- **`SKILL.md`** (the 8-phase workflow) — 12 skills
- **`template.md`** (per-section "Contributing Skills" coaching blocks) — adds 14 more

All **26 are direct** references. Tracing what *those* skills reference adds **10 more indirect-only** skills (mostly a self-contained SaaS finance/growth cluster). The graph then closes. **36 skills total** in the transitive closure (excluding `domain-discovery` and `prd-development` itself).

`domain-discovery` references **none** of these — the hand-off from domain-discovery to prd-development is manual. Its output pre-fills the PRD's Problem (§2), part of Strategic Context (§4), and Solution boundaries (§5).

---

## ✅ Core — the spine of PRD + stories (always use)

| Skill | Type | What it does | Why it's core |
|---|---|---|---|
| **workshop-facilitation** | interactive | Interaction protocol: one question at a time, entry modes, progress labels, pause/resume | It's the engine every interactive skill in the flow runs on — not optional |
| **problem-statement** | component | User-centered "I am / trying to / but / because / feel" statement | Formats §2 so every story traces to a real blocker; domain-discovery gives the raw material |
| **proto-persona** | component | Working customer profile (goals, pains, behaviors) with assumption tags | domain-discovery produces *contexts*, not *people* — this is the "As a [persona]" anchor |
| **epic-hypothesis** | component | Testable "we believe X → Y" bet with success measures | Frames the initiative; feeds §7 and keeps stories from being a wishlist |
| **epic-breakdown-advisor** | interactive | Applies Richard Lawrence's 9 split patterns + INVEST checks | The actual engine that generates the story list |
| **user-story** | component | Mike Cohn format + Gherkin acceptance criteria | The literal deliverable engineering consumes (~5–10 min/story) |

---

## 🟢 Recommended — high value, low regret

| Skill | Type | Verdict rationale |
|---|---|---|
| **user-story-splitting** | component | 🟢 Use only when a story is *still* too big after breakdown (5–6+ acceptance criteria). Overlaps heavily with `epic-breakdown-advisor` — you rarely need both |
| **jobs-to-be-done** | component | 🟢 Cheap; makes personas and acceptance criteria reflect real motivation instead of guessed features. Enriches §3 + §7 |
| **user-story-mapping-workshop** (interactive) / **user-story-mapping** (component) | both | 🟢 Lays workflow out as backbone activities → tasks → **release slices**. Component = fast solo pass; workshop = team input. Recommended for any multi-step feature; skip for a single-screen change |
| **opportunity-solution-tree** | interactive | 🟢 (lite) Confirms the solution ladders back to a validated outcome. Partly redundant post-domain-discovery — use as a quick cross-check for §1/§5, not a full discovery pass |

---

## 🟡 Situational — pull in only when the case fits

| Skill | Type | When to use |
|---|---|---|
| **customer-journey-mapping-workshop** | interactive | When the problem spans multiple touchpoints/stages — sharpens personas and surfaces stories you'd otherwise miss. (Keep this one; the `customer-journey-map` component is a duplicate — see Skip) |
| **prioritization-advisor** | interactive | When you have more candidate stories than room and scope is contested (informs §7 selection + §8 Out of Scope) |
| **pol-probe-advisor** → **pol-probe** | interactive / component | If a key assumption is high-risk and unvalidated — design a cheap experiment before committing PRD scope |
| **positioning-statement** | component | Borderline — cheap (~10 min), sharpens §4. Keep for narrative clarity; trim for the leanest flow |

> **Trimmed from situational (2026-07-14):** `tam-sam-som-calculator`, `feature-investment-advisor`, `recommendation-canvas`, `pestel-analysis`, the duplicate `customer-journey-map`, and the stakeholder pair (`stakeholder-identification`, `stakeholder-mapping`) were moved to 🔴 Skip below — each serves a business/investment/org-alignment decision rather than the requirements-and-stories job.

---

## 🔴 Skip — redundant with domain-discovery, or off-goal

| Skill | Type | Why skip |
|---|---|---|
| **tam-sam-som-calculator** | interactive | Market sizing for a *business case*, not requirements — touches no user story. Run as a one-off only if an exec deck demands it |
| **feature-investment-advisor** | interactive | Answers "should we build this?" — already decided by the time you write a PRD |
| **recommendation-canvas** | component | Heavy 10-box go/no-go that **duplicates the PRD itself** (problem, outcomes, positioning, metrics, risks) |
| **pestel-analysis** | component | Macro political/economic/legal scan — rarely material to a feature PRD; real external risks surface naturally in §9 |
| **customer-journey-map** | component | Duplicate of `customer-journey-mapping-workshop` (same artifact) — keep the workshop, drop this |
| **stakeholder-identification** | component | Org-alignment mapping — not requirements or stories; off-goal for an eng-ready PRD |
| **stakeholder-mapping** | component | Prioritizes stakeholders on power/interest grids — org-alignment work, not requirements |
| **stakeholder-engagement-advisor** | interactive | Plans per-stakeholder outreach (messages, cadence, resistance) — org-alignment work, not requirements or stories |
| **problem-framing-canvas** | interactive | MITRE reframe-the-problem workshop — exactly what domain-discovery already did |
| **discovery-process** | workflow | A ~4-week discovery orchestration; you've already done your discovery pass |
| **discovery-interview-prep** | interactive | Interview design — skip unless you still have unvalidated gaps to go interview |
| **lean-ux-canvas** | interactive | An *alternative* to a PRD for continuous-discovery experiments — not a PRD component |
| **press-release** | component | Amazon working-backwards narrative; an alternative alignment artifact, not needed alongside a PRD |
| **business-health-diagnostic** | interactive | Company-level SaaS health scorecard — not feature-PRD material |
| **organic-growth-advisor** | interactive | McKinsey growth-path triage — GTM strategy, not requirements |
| **acquisition-channel-advisor** | interactive | Scale/test/kill a marketing channel — off-goal |
| **finance-based-pricing-advisor** | interactive | Pricing-change decision modeling — off-goal (unless the feature *is* a pricing change) |
| **saas-revenue-growth-metrics** | component | Metrics reference/lookup — useful background for naming a §6 metric, but produces nothing |
| **saas-economics-efficiency-metrics** | component | Unit-economics reference/lookup — background only |
| **finance-metrics-quickref** | component | Metrics cheat sheet — reference only, not a step |

---

## Recommended path for your workflow

After `domain-discovery`, the run you actually want:

```
domain-discovery  (already done — problem stress-tested, contexts mapped)
        │
        ▼
workshop-facilitation   ← interaction protocol for everything below
        │
        ├─ problem-statement        →  PRD §2
        ├─ proto-persona            →  PRD §3
        ├─ jobs-to-be-done          →  PRD §3 (enrich)   [recommended]
        ├─ epic-hypothesis          →  PRD §7
        ├─ user-story-mapping       →  PRD §5/§7         [if multi-step feature]
        ├─ epic-breakdown-advisor   →  PRD §7 (story engine)
        ├─ user-story               →  PRD §7 (deliverable)
        └─ user-story-splitting     →  PRD §7            [only if a story is still too big]
```

**Core set: 6 skills.** Add `jobs-to-be-done`, `user-story-mapping`, and `user-story-splitting` when the feature is non-trivial.

---

## Key overlaps to be aware of

- **`problem-framing-canvas` + `discovery-process`** duplicate `domain-discovery` — running them again is redundant.
- **`user-story-splitting`** duplicates much of **`epic-breakdown-advisor`** (both use similar Humanizing Work split patterns) — you rarely need both.
- **`recommendation-canvas`** substantially overlaps the PRD itself — pick one.
- The entire **finance/growth cluster** (11 skills: business-health, feature-investment, both saas-*, finance-*, acquisition-channel, organic-growth, tam-sam-som, pricing) only matters when a PRD must defend an investment/pricing/GTM decision — orthogonal to writing requirements + stories.

---

## Appendix: full reference graph (direct → indirect)

**Direct (26):** workshop-facilitation, problem-statement, problem-framing-canvas, discovery-process, discovery-interview-prep, customer-journey-mapping-workshop, customer-journey-map, proto-persona, jobs-to-be-done, tam-sam-som-calculator, positioning-statement, organic-growth-advisor, opportunity-solution-tree, user-story-mapping-workshop, pestel-analysis, epic-hypothesis, epic-breakdown-advisor, user-story, user-story-splitting, recommendation-canvas, stakeholder-mapping, business-health-diagnostic, feature-investment-advisor, saas-revenue-growth-metrics, pol-probe-advisor, prioritization-advisor

**Indirect-only (10):** lean-ux-canvas, user-story-mapping, press-release, acquisition-channel-advisor, pol-probe, stakeholder-identification, stakeholder-engagement-advisor, finance-based-pricing-advisor, finance-metrics-quickref, saas-economics-efficiency-metrics
