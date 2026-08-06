# Product Requirements Document (PRD)

> This PRD is a communications and alignment device — a bridge between strategy and execution. It clarifies **what** the product must achieve, **why** it matters, and **how** success is measured.
>
> **Tag every gap inline, right where it appears** — then collect it where it belongs:
> - **🔶 Assumption** — filled in from inference or incomplete data; plausible but unvalidated. Every assumption is a risk until confirmed. Collects into the Self-Assessment table; the ones carrying stakes also appear in Section 9 as risks.
> - **🔵 Open Question** — not yet known; needs discovery, a stakeholder conversation, or data you don't have. Collects into Section 10.
>
> Do not invent facts, data, approvals, or commitments.

***

## Document Information

### Authors

[Author 1]

[Author 2]

### Reviewers

- [Reviewer 1]
- [Reviewer 2]

**Date:** [Insert Date]

### Change Log

| Version | Date       | Author          | Change Description     |
|---------|------------|-----------------|------------------------|
| 0.1     | YYYY-MM-DD | [Your Name]     | Initial draft          |
| 0.2     | YYYY-MM-DD | [Reviewer Name] | Feedback incorporated  |
| 1.0     | YYYY-MM-DD | [Approver Name] | Final version approved |

***

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Target Users & Personas](#3-target-users--personas)
4. [Strategic Context](#4-strategic-context)
5. [Solution Overview](#5-solution-overview)
6. [Non-Functional Requirements](#6-non-functional-requirements)
7. [Success Metrics](#7-success-metrics)
8. [Out of Scope](#8-out-of-scope)
9. [Dependencies & Risks](#9-dependencies--risks)
10. [Open Questions](#10-open-questions)

***

## 1. Executive Summary

**Format:** "We're building [solution] for [persona] to solve [problem], which will result in [impact]."

- [One-paragraph summary *(e.g., "We're building a guided onboarding checklist for non-technical small business owners to solve the problem of 60% drop-off in the first 24 hours due to lack of guidance, which will increase activation rate from 40% to 60% and reduce churn by 10%.")*]

***

## 2. Problem Statement

### Who Has This Problem?

- [The specific user or customer segment affected *(e.g., non-technical small business owners — solopreneurs and teams of 1–10 — who sign up for a SaaS product for the first time)*]

### What Is the Problem?

- [The problem in concrete, observable terms *(e.g., 60% of users abandon onboarding within the first 24 hours because they don't know what to do first — they see an empty dashboard with no guidance, get overwhelmed by options, and leave)*]

### Why Is It Painful?

- **User impact**: [Consequence for the user *(e.g., wastes 30–60 minutes trying to figure out the product, never reaches the "aha moment," churns before experiencing value)*]
- **Business impact**: [Consequence for the business *(e.g., 60% activation failure drives high churn, low LTV, and poor word-of-mouth)*]

### Evidence

- **Interviews**: [*(e.g., 8 of 10 churned users said "I didn't know what to do first" — discovery interviews, Feb 2026)*]
- **Analytics**: [*(e.g., 60% of signups complete zero actions within 24 hours — Mixpanel, Jan 2026)*]
- **Support signals**: [*(e.g., "How do I get started?" is the #1 support question — 350 tickets/month)*]
- **Customer quote**: [A verbatim quote *(e.g., "I logged in, saw an empty dashboard, and thought 'now what?' I gave up and went back to my spreadsheet.")*]

***

## 3. Target Users & Personas

### Primary Persona

- **Name**: [A realistic individual name — not a job-title placeholder like "Startup Steve"]
- **Role**: [Job title and responsibilities *(e.g., freelance consultant, solopreneur)*]
- **Context**: [Company size, tech savviness, relevant constraints *(e.g., 1-person business, no IT support, uses email and spreadsheets)*]
- **Goals**: [What they are trying to achieve *(e.g., get value from software fast without technical expertise)*]
- **Pain points**: [What makes their situation difficult *(e.g., overwhelmed by complex UIs, no time for tutorials, needs immediate value)*]
- **Current behaviour**: [How they handle the problem today *(e.g., signs up, tries for 1 day, churns if not immediately useful)*]

### Secondary Personas (if applicable)

- **Name**: [Realistic individual name]
- **Role**: [Job title and responsibilities *(e.g., owner-operator managing a small team of 5–10)*]
- **Differs from primary**: [Key differences in needs, tolerance, or behaviour *(e.g., more tolerant of complexity, willing to invest setup time, also needs to onboard team members)*]

### Jobs-to-Be-Done

- **Functional job**: [What the user is trying to accomplish *(e.g., set up the product and complete a first meaningful task within 30 minutes)*]
- **Emotional job**: [How the user wants to feel *(e.g., confident the product is worth it, not stupid for not figuring it out)*]
- **Social job**: [How the user wants to be perceived *(e.g., seen by their team as someone who picks good tools)*]

***

## 4. Strategic Context

### Business Goals

- **Strategic alignment**: [How this supports company OKRs or priorities *(e.g., "Supports our Q1 OKR: Reduce churn from 15% to 8%. Improving onboarding activation directly impacts retention.")*]
- **Revenue impact**: [Expected impact on revenue, retention, or cost *(e.g., reducing first-week churn by 10% represents $2.4M in recovered annual revenue)*]

### Why Now?

- [The urgency *(e.g., "Churn spiked 15% in Q4. Onboarding is the #1 driver — 60% churn in first 30 days. Fixing this is critical to hitting our retention OKR.")*]

***

## 5. Solution Overview

### Solution Description

- [High-level description of what you're building and how it works *(e.g., "A guided onboarding checklist that walks new users through core workflows step-by-step on first login. A modal shows 3 steps: Create your first project, Invite a teammate (optional), Complete a sample task. Each completed step updates the checklist with checkmarks and a progress bar.")*]

### Key Features

- [Feature 1 *(e.g., "Minimal: Only 3 core steps — not overwhelming")*]
- [Feature 2 *(e.g., "Dismissible: Users can skip if they prefer to explore")*]
- [Feature 3 *(e.g., "Progress tracking: Visual progress bar showing 1/3, 2/3, 3/3")*]
- [Feature 4 *(e.g., "Celebration: Positive reinforcement modal on completion")*]

### User Flows / Wireframes (optional)

- [Link to or embed user flow diagrams, wireframes, or sketches]

***

## 6. Non-Functional Requirements

> How well the §5 features must behave. Each requirement is a **quality attribute scenario**. Pinned means Must — anything you wouldn't delay launch for belongs under *Ruled Out* with its reason.

**The nine fields**

| Field | Holds |
|---|---|
| `ID` | Attribute prefix + number — `PERF-01`, `RESIL-02` |
| `Trace` | The §5 key feature, and the §2 pain or §7 primary metric it serves. Both, or this isn't a requirement |
| `Source` | Who or what generates the stimulus |
| `Stimulus` | What arrives at the system |
| `Environment` | The conditions it arrives under — peak load, degraded network, a failed dependency |
| `Response` | What the system does about it |
| `Response Measure` | The number, or a landing zone (minimal / target / outstanding) |
| `Breaks if missed` | What the persona actually does when the number is missed, and which metric that costs |
| `Holds from` | When it must hold, and how it tightens as the system grows |

### Pinned Requirements

```
ID:               PERF-01
Trace:            §5 Key Feature 2 — Account dashboard → §2 pain "can't answer a balance question while the client is on the phone"
Source:           Authenticated advisor
Stimulus:         Opens the account dashboard mid-call
Environment:      Weekday peak, 5k concurrent sessions
Response:         Complete balance payload rendered
Response Measure: p99 ≤ 400ms, error rate < 0.1%
Breaks if missed: Advisor reloads twice, then reads from the spreadsheet — activation metric misses
Holds from:       Launch; tightens to p99 ≤ 250ms at 20k concurrent
```

```
ID:               RESIL-01
Trace:            §5 Key Feature 3 — Multi-step onboarding → §2 pain "abandons and never returns"
Source:           New user, mid-onboarding
Stimulus:         Identity-verification provider stops responding
Environment:      Provider outage of any length
Response:         Progress is preserved, the user is told what happened and when to return
Response Measure: Zero steps lost; resumable for 🔶 30 days *(assumed — no data on return windows)*
Breaks if missed: User restarts from step 1, abandons — the 60% drop-off this initiative exists to fix returns
Holds from:       Launch
```

```
ID:               SCALE-01
Trace:            §5 Key Feature 1 — Bulk import → §7 primary metric (time-to-first-value)
Source:           Onboarding customer
Stimulus:         Uploads a full member roster
Environment:      January renewal season, 20× the median month
Response:         Import completes and the user is notified
Response Measure: Landing zone — minimal 30 min / target 10 min / outstanding 2 min for 50k rows
Breaks if missed: Customer chases support, first value slips past the trial window
Holds from:       First renewal season, 🔵 exact peak volume pending finance forecast
```

### Tradeoffs

> Pairs of pinned scenarios that pull against each other. Each row names a winner and the scenario that was amended to make the set achievable. Unsettled tradeoffs belong in §10 with an owner, not here.

| Tradeoff | The decision that forces it | Winner, and why | Amended |
|----------|-----------------------------|-----------------|---------|
| [A vs B *(e.g., SEC-01 vs PERF-01)*] | [*(e.g., per-request entitlement checks on the aggregated balance payload)*] | [*(e.g., SEC-01 — a leaked balance costs us the client; a slow balance costs us a reload)*] | [*(e.g., PERF-01 relaxed p99 400ms → 700ms at launch)*] |
| [A vs B *(e.g., AVAIL-01 vs COMP-02)*] | [*(e.g., failover region for the 99.99% target)*] | [*(e.g., COMP-02 — EU data residency is contractual, not negotiable)*] | [*(e.g., AVAIL-01 lowered to 99.9%, EU-only multi-AZ)*] |

### Ruled Out

> Every attribute the signal table raised that isn't pinned. A deliberate exclusion and a forgotten one look identical later; only one of them is defensible.

| Attribute | Why it isn't live |
|-----------|-------------------|
| [Attribute *(e.g., Reach)*] | [Reason *(e.g., every persona is desk-bound on corporate wifi; no field or offline use in any §3 persona)*] |
| [Attribute *(e.g., Compliance)*] | [Reason *(e.g., no regulated data — the product stores no personal data beyond an email address)*] |

### Constraints

> Rules nobody gets to tune. These carry no threshold — forcing a number onto a constraint produces nonsense.

- [Constraint + who mandates it *(e.g., all customer data stays in EU regions — group data-residency policy, non-negotiable)*]
- [Constraint + who mandates it *(e.g., must run on the existing Postgres cluster — platform team decision, ratified Q4)*]

***

## 7. Success Metrics

> Business outcomes. System qualities — latency, uptime, durability — live in §6 as scenarios.

### Primary Metric

- **Metric**: [The ONE metric you're optimising for *(e.g., activation rate — % of users completing first action within 24 hours)*]
- **Current**: [Baseline value *(e.g., 40%)*]
- **Target**: [Goal value *(e.g., 60%)*]
- **Timeline**: [When you'll measure *(e.g., 30 days after launch)*]

### Secondary Metrics

- [Metric 2 *(e.g., time-to-first-action: reduce from 3 days to 1 day)*]
- [Metric 3 *(e.g., onboarding checklist completion rate: target 80%)*]
- [Metric 4 *(e.g., support tickets for "How do I get started?": reduce from 350/month to 175/month)*]

### Guardrail Metrics

- [Metric that must NOT regress *(e.g., sign-up conversion rate: maintain at 10% — don't add friction to signup)*]

***

## 8. Out of Scope

### Not Included in This Release

- [Excluded feature + rationale *(e.g., "Advanced onboarding personalisation — different checklists per persona. Adds complexity; test the simple version first.")*]
- [Excluded feature + rationale *(e.g., "Video tutorials embedded in checklist. Resource-intensive; validate the checklist concept first.")*]
- [Excluded feature + rationale *(e.g., "Gamification — badges, points. Nice-to-have; focus on core workflow guidance.")*]

### Future Considerations

- [Items that may be revisited *(e.g., "Mobile-optimised onboarding — desktop-first for now, mobile in a future release.")*]

***

## 9. Dependencies & Risks

### Dependencies

- **Technical**: [Platform or infrastructure requirements *(e.g., no technical dependencies — uses existing modals framework)*]
- **External**: [Third-party integrations or partnerships *(e.g., analytics provider must support custom event tracking for checklist interactions)*]
- **Team**: [Cross-team handoffs *(e.g., design: wireframes for checklist UI, ETA Week 1)*]

### Feasibility Risks (§6 numbers we may not hit)

- **Requirement**: [ID + measure *(e.g., PERF-01 — p99 ≤ 400ms across four aggregated sources)*]
  - **Why it's at risk**: [*(e.g., roughly 3× what a single-region setup delivers; needs a caching design not yet chosen)*]
  - **Mitigation**: [Owner + trigger *(e.g., platform team spikes a read-through cache in Week 2; if p99 stays above 600ms, renegotiate to 700ms at launch)*]

### Risks & Mitigations

- **Risk**: [What could go wrong *(e.g., users dismiss the checklist immediately and never see it)*]
  - **Mitigation**: [How you'll address it *(e.g., track dismissal rate; if >50%, iterate on messaging or timing)*]
- **Risk**: [What could go wrong *(e.g., checklist steps are too generic and don't resonate with all personas)*]
  - **Mitigation**: [How you'll address it *(e.g., start with primary persona, personalise later based on usage data)*]

***

## 10. Open Questions

| Question | Owner | Deadline | Status |
|----------|-------|----------|--------|
| [Unresolved question *(e.g., should the checklist be mandatory or optional?)*] | [Name] | [Date] | [Open / Resolved] |
| [Unresolved question *(e.g., should we A/B test checklist vs. no checklist?)*] | [Name] | [Date] | [Open / Resolved] |
| [Unresolved question *(e.g., what happens if the user completes steps out of order?)*] | [Name] | [Date] | [Open / Resolved] |

***

## PRD Self-Assessment

*Complete after all 10 sections. Share alongside the PRD.*

### Strongest Section

- [The section you're most confident in and why *(e.g., "Section 2 — grounded in 10 discovery interviews and corroborated by support ticket data.")*]

### Weakest Section

- [The section that needs the most work and why *(e.g., "Section 4 — the 'why now' rationale is compelling internally but unvalidated with customers.")*]

### Top Assumptions to Validate

> Collect all 🔶 Assumption tags from the document; list the highest-risk ones.

| # | Assumption | Section | Risk if Wrong | Proposed Validation |
|---|------------|---------|---------------|---------------------|
| 1 | [Statement tagged 🔶 above] | [Section #] | [What breaks if this is false] | [How to test — interview, data pull, experiment] |
| 2 | [Statement tagged 🔶 above] | [Section #] | [What breaks if this is false] | [How to test] |
| 3 | [Statement tagged 🔶 above] | [Section #] | [What breaks if this is false] | [How to test] |

### Recommended Next Step

- [The single most important thing to do before this PRD is ready for stakeholder review *(e.g., "Run 3 discovery interviews with churned users to validate the onboarding friction assumption." or "Get baseline metrics from analytics for Section 6 — without baselines, we can't set credible targets.")*]

***

*End of PRD Template*
