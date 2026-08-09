# The foundational issue

One issue in its own **Release 0 — Foundation** milestone, blocking every Release 1 story. It exists to make the **walking skeleton** runnable: it closes when the thinnest end-to-end path — request → logic → datastore → response — runs in CI with the harness green. Demonstrated, not chosen.

## Gap detection

The workspace stack is already decided — read it from the repo (package manifests, the Nx project graph) and take it as given; the issue re-decides nothing that already runs. A **gap** is a capability a §6 scenario or §7 metric demands that the repo cannot yet provide. Candidates to check: **datastore, auth, third parties, observability**.

For each gap, draft a proposal: the tool or service to fill it, the specific §6 scenario or §7 metric that forces it, and the alternatives considered. A proposal that traces to no scenario and no metric is scope creep — drop it. With §6/§7 missing (a declared degradation), gaps reduce to what the story set plainly cannot run without, and each says so.

## Fitness functions

A **fitness function** is an automated check that a §6 scenario keeps holding, and each one carries a **named tool and a runnable command** — `pnpm nx run web:lighthouse-budget`, not "add monitoring". A check without a command is a wish; leave it out and say so.

Only the fitness functions that can run against the walking skeleton ride this issue. Every other pinned scenario rides as an acceptance criterion on the first functional story that makes its quality observable — the payment-latency assertion on the first payments story, the activation instrumentation on the story shipping the activation step. Deferred checks are neither tickets nor a documented list; the inheriting story's Acceptance criteria section is their only home.

## Module structure

One Nx project boundary per bounded context on the context map — the moat context gets its own project. Tag each project (`scope:<context>`) and wire `@nx/enforce-module-boundaries` so the ESLint dependency constraints mirror the context map's allowed dependency directions. Acceptance criterion: **a forbidden import fails lint in CI.**

With no context map (a declared degradation), this section is omitted, and the body says the boundaries await `/grill-and-map`.

## Body

The foundational issue uses the ISSUE-BODY.md contract with the Story section replaced by the walking-skeleton goal, plus: each confirmed stack decision **and** the alternatives it beat (the next reader needs the why-not as much as the what), the fitness functions it carries (command each), the module structure, and the ceiling exemption. Labelled `foundational`.
