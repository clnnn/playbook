# Decisions

## Skill selection: JTBD vs. Customer Journey Mapping

**Goal:** create agent-friendly PRD / user stories.

**Keep `jobs-to-be-done`** — structured, machine-parseable output (jobs/pains/gains) that maps directly onto problem statements, PRDs, and user stories. It's a `component` and is already wired into `problem-statement` and `epic-hypothesis`, which feed the PRD/story chain.

**Drop `customer-journey-mapping-workshop`** — an `interactive` workshop whose value is timeline visualization and team alignment, not a clean PRD input. It also depends on JTBD, so it adds nothing JTBD doesn't already provide.

## PRD strategic context (Section 4 of `prd-development`)

Four sub-parts: (1) Business Goals, (2) Market Opportunity / TAM-SAM-SOM, (3) Competitive Landscape, (4) Why Now.

**Keep 1 and 4** — implementation-relevant: (1) the quantified business goal becomes the success metric/acceptance threshold, and (4) the root-cause behind "why now" scopes where and what to build.

**Move 2 and 3 to a separate skill** — (2) Market Opportunity and (3) Competitive Landscape are investment justification, not build inputs. They answer "why invest?" not "what to build?", so they belong in their own skill rather than the implementation-facing PRD flow.

## PRD Section 5 (Solution Overview) — keep it lean

Phase 5 should contain only:

> This section describes the **proposed solution at a high level** — enough for stakeholders to understand what the product will do and how it works, without prescribing UI details or implementation specifics. Keep it high-level. Let design own the UI.

**Section Steps:**

> 1. **Write a solution description**: 2–3 paragraphs explaining what the product does and how.
> 2. **List key features**: The capabilities the solution provides.
> 3. **Add user flows or wireframes** (optional): Visual explanation for complex features.

(i.e. drop the "Reference Story Map" step — the `user-story-mapping-workshop` is optional alignment scaffolding, not needed in the implementation-facing PRD.)

## User stories — own separate skill

The user-story work (Phase 7) lives in its own skill, drawing inspiration from `user-story-mapping-workshop`, `user-story-splitting`, and `epic-hypothesis`.

Include these quality-gate checks:

> User stories break the solution into deliverable work. Check:
> - Does the **epic hypothesis** reference the primary metric from Section 6? If the hypothesis can't be validated against a metric you've already defined, either the metric or the hypothesis needs to change.
> - Do the **acceptance criteria** cover the edge cases, or are edge cases only listed at the bottom? Each story's AC should be testable on its own — QA shouldn't need to read the edge cases section to know what "done" means.
> - Are any stories **too large** for a single sprint? If a story has more than 5–6 acceptance criteria, consider splitting it with `user-story-splitting`.

## Remaining phases

The rest of the PRD phases (e.g. Executive Summary, Problem Statement, Target Users & Personas, Success Metrics, Out of Scope & Dependencies) might remain the same in the new skill.
