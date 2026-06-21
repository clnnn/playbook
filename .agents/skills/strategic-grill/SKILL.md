---
name: strategic-grill
description: Grilling session that stress-tests a plan, idea, or requirements by asking sharp questions about ownership, language, and competitive advantage — then captures what crystallises as structured documentation (CONTEXT-MAP.yaml, CONTEXT.yaml, MADR ADRs). Use whenever the user shares an idea, plan, feature concept, or system design — even if they never mention DDD, bounded contexts, or domain modelling. Trigger on: "I'm building X", "I want to add a feature that...", "here's my plan", "how should we structure this?", "I'm designing a new service", "what do you think of this approach?", "help me think through this", or any time someone is making a structural decision about how their system works. This skill should trigger proactively — if someone describes what they're building, don't just answer; grill them.
---

# Strategic Grill

## Overview

- **Challenge the plan** against the existing domain model and documented decisions.
- **Sharpen terminology** — resolve fuzzy or conflicting terms into precise ubiquitous language, captured in `CONTEXT.yaml`.
- **Categorise every context** as exactly one of `core`, `supporting`, or `generic`, and push back hard on weak `core` claims.
- **Label every context-map relationship** with exactly one DDD pattern (e.g. `ACL`, `Customer-Supplier`, `Shared Kernel`) — never free-form prose.
- **Capture decisions inline** in `CONTEXT.yaml`, `CONTEXT-MAP.yaml`, and ADRs as they crystallise, following the formats below.

## The Process

### 1. Analyze the plan

Before asking anything: check whether the user has shared a plan or topic in this conversation. If not, ask for it.

### 2. Explore the codebase

Read the codebase's existing documentation structure — `CONTEXT-MAP.yaml` at the root and any `CONTEXT.yaml` files you can find — so you know what's already been decided before your first question.

Example:
```
/
├── docs/
│   ├── CONTEXT-MAP.yaml              ← system-wide context map
│   └── adr/                          ← system-wide decisions (.md files, MADR format)
├── src/ (or packages/, libs/, …)
│   ├── ordering/
│   │   └── docs/
│   │       └── CONTEXT.yaml
│   └── billing/
│       └── docs/
│           └── CONTEXT.yaml
```

**If neither a `CONTEXT-MAP.yaml` nor separate `CONTEXT.yaml` files exist, ask the user how the file structure should look before creating anything.** Don't assume a layout. For example, a monorepo will typically have one root `docs/CONTEXT-MAP.yaml` plus a separate `docs/CONTEXT.yaml` per package/lib. 

### 3. Start the live graph visualizer

Launch the visualizer server before the first question so the user can watch the context map build in real time:

```bash
curl -s http://localhost:8765/api/hash >/dev/null 2>&1 || \
  nohup node "$(git rev-parse --show-toplevel)/.agents/skills/strategic-grill/scripts/serve_graph.js" \
    --no-browser > /tmp/context-graph.log 2>&1 &
```

The server watches all context files and pushes live reloads — you never need to restart it. Tell the user: **"Graph live at http://localhost:8765"**

### 4. "Grill" the plan

Interview the user relentlessly about every aspect of their plan until you reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one.

Format every question using the structure in [QUESTION-FORMAT.md](./references/QUESTION-FORMAT.md) — a single sharp question followed by a plain-text recommendation with a reason.

If a question can be answered by exploring the codebase, explore the codebase instead.

#### Between-Turn Protocol (MANDATORY)

After **every** user answer, before **every** next question, run these four steps in order. Never skip. Never batch.

1. **Scan against techniques** — check each [TECHNIQUES.md](./references/TECHNIQUES.md) one-by-one against the answer. Address every technique that fires now, not later.

2. **Write to files** — apply every decision that crystallised:
   - A resolved term → update `CONTEXT.yaml` (format: [CONTEXT-FORMAT.md](./references/CONTEXT-FORMAT.md))
   - A context established or tagged → update `CONTEXT-MAP.yaml` (format: [CONTEXT-MAP-FORMAT.md](./references/CONTEXT-MAP-FORMAT.md))
   - A relationship labelled → update `CONTEXT-MAP.yaml`
3. **Output the turn separator** — emit this block verbatim before the next question:
   ```
   Techniques fired: [comma-separated list, or "none"]
   Captured: [bullet list of file changes, or "nothing"]
   ```
4. **Live graph updates automatically** — the server watches all context files. No action needed.

`CONTEXT.yaml` and `CONTEXT-MAP.yaml` should be totally devoid of implementation details. Do not treat them as a spec, a scratch pad, or a repository for implementation decisions. They are glossaries and nothing else.

### 5. Offer ADRs sparingly

Only offer to create an ADR when all three are true:

1. **Hard to reverse** — the cost of changing your mind later is meaningful
2. **Surprising without context** — a future reader will wonder "why did they do it this way?"
3. **The result of a real trade-off** — there were genuine alternatives and you picked one for specific reasons

If any of the three is missing, skip the ADR. Use the format in [ADR-FORMAT.md](./references/ADR-FORMAT.md). ADR files use the MADR format with `.md` extension.