# PRD layout

The deliverable's structure for the [`to-prd`](SKILL.md) skill. Item limits and gate conditions live in `SKILL.md`; this file is layout only.

Bracketed text is a placeholder with one example each. Reproduce the headings and shapes literally.

***

# PRD: [Subject]

> 🔶 marks anything not established — inferred, assumed, or unknown. Every 🔶 has a row in Open questions.

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

## In scope

- [**Workstream** — what it covers *(e.g. "**Checklist engine** — step definitions, per-user progress, and the completion state.")*]
- [**Workstream** — what it covers *(e.g. "**Event instrumentation** — an event per checklist step, wired to the activation criterion.")*]

## Out of scope

**Won't build:**

- [Exclusion — rationale *(e.g. "SSO login — this persona has no IT department to administer it.")*]
- [Exclusion — rationale]

**Future considerations:**

- [Future consideration, no rationale *(e.g. "Per-persona checklists")*]
- [Second future consideration *(e.g. "Mobile-optimised onboarding")*]

## Success criteria

- ⭑ [[Observable thing] reaches [number], measured [window] *(e.g. "Activation — users completing a first action within 24h — reaches 60%, measured over the 30 days after launch.")* 🔶 if the number has no evidence behind it]
- [Second criterion — optional, up to four, only where a distinct outcome needs its own number]

## Quality requirements

**[PREFIX-01] — [Label: 2–4 words naming what this requirement is about]**
[The number under its named conditions, target with the floor in brackets.]

- **Why** — [Solution step, and what the persona does when the number is missed]
- **From** — [When it holds, and how it tightens]

*Example:*

**PERF-01 — Dashboard load**
Dashboard renders a complete balance in ≤400ms p99 (700ms floor) at 5k concurrent.

- **Why** — Solution step "account dashboard": the advisor reloads twice, then reads from the spreadsheet, and activation misses.
- **From** — Launch; tightens to 250ms p99 at 20k concurrent.

*Raised, not pinned:*

- [Attribute the cut to five dropped, and why it can wait *(e.g. "Uptime — an hour dark during the pilot costs nothing irrecoverable.")*]
- [Second attribute]

## Dependencies

- [Dependency] — [state *(e.g. "SMS/email delivery — built, needs publishing"; "PDF generation — absent today"; "model provider choice — unresolved")*]

## Open questions

| Open question | Why it matters |
|---|---|
| [From a 🔶 or a cross] | [What breaks if it's wrong] |
| [*(e.g. the ~4h baseline is one anecdote)*] | [*(e.g. the ⭑ criterion's target leans on it)*] |

## Risks

| Risk | Why it matters |
|---|---|
| [From the Cagan pass — value, usability, feasibility, or viability] | [What breaks if it's wrong] |
| [*(e.g. no evidence advisors will trust an AI-generated summary — value)*] | [*(e.g. the ⭑ activation criterion assumes adoption)*] |
