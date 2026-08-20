# PRD layout

The deliverable's structure for the [`prd`](SKILL.md) skill. Item limits and gate conditions live in `SKILL.md`; this file is layout only.

Bracketed text is a placeholder with one example each. Reproduce the headings and shapes literally.

***

# PRD: [Subject]

> 🔶 marks anything not established — inferred, assumed, or unknown. Every 🔶 has a row in Risks & open questions.

## What & why

**Building:** [We're building [solution] for [persona] to solve [problem], which will result in [impact]. *(e.g. "We're building a guided onboarding checklist for non-technical small business owners to solve 60% first-day drop-off, taking activation from 40% to 60%.")*]

**Persona:** [Type label — one line of build-relevant traits. *(e.g. "Solopreneur — 1-person business, no IT support, works from email and spreadsheets. The pain this removes: an empty dashboard with no indication of what to do first.")*]

**Problem:** [One sentence, concrete and observable. *(e.g. "New users abandon within 24 hours because nothing tells them which action comes first.")*]

## Solution & user flow

```
[ASCII flow — trigger through every step to the terminal state]

signup
   ▼
first login → checklist modal (3 steps)
   │  create project → invite teammate (optional) → complete sample task
   ▼
progress bar updates per step
   ▼
all steps done → completion state
```

[At most three sentences on what the product does and how.]

**Also built:** [What the flow leaves implicit *(e.g. dismissal handling, re-entry after a partial run, event instrumentation)*]

## Out of scope

- [Exclusion — rationale *(e.g. "Per-persona checklists — adds branching before the simple version has been tested.")*]
- [Exclusion — rationale]

**Future considerations:** [Bare list, no rationales *(e.g. mobile-optimised onboarding; embedded video; gamification)*]

## Success criteria

- ⭑ [[Observable thing] reaches [number], measured [window] *(e.g. "Activation — users completing a first action within 24h — reaches 60%, measured over the 30 days after launch.")* 🔶 if the number has no evidence behind it]
- [Second criterion]
- **Must not regress:** [What stays at or below today's level *(e.g. "signup conversion holds at 10% — the checklist adds no friction upstream")*]

## Quality requirements & constraints

```
PERF-01  [Number under named conditions, target with the floor in brackets]
   Why:  [Solution step — and what the persona does when the number is missed]
   From: [When it holds, and how it tightens]
```

```
PERF-01  Dashboard renders a complete balance in ≤400ms p99 (700ms floor) at 5k concurrent
   Why:  Solution step "account dashboard" — the advisor reloads twice, then reads from
         the spreadsheet, and activation misses
   From: Launch; tightens to 250ms p99 at 20k concurrent
```

**Constraints** — no thresholds:

- [Rule + who mandates it *(e.g. "all customer data stays in EU regions — group data-residency policy")*]

*Raised, not pinned:* [Attributes the signal table raised that the cut to five dropped *(e.g. uptime, caching, i18n)*]

## Dependencies

- [Dependency] — [state *(e.g. "SMS/email delivery — built, needs publishing"; "PDF generation — absent today"; "model provider choice — unresolved")*]

## Risks & open questions

| Risk or unknown | Why it matters | Owner | Next move |
|---|---|---|---|
| [From a 🔶, a cross, or the Cagan pass] | [What breaks if it's wrong] | [Name] | [An action, with the trigger that fires it] |
| [*(e.g. the ~4h baseline is one anecdote)*] | [*(e.g. both the target and the must-not-regress line lean on it)*] | [*(e.g. Amber)*] | [*(e.g. time-track 10 manual cases before the measurement window opens)*] |
