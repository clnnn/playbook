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

**If neither a `CONTEXT-MAP.yaml` nor separate `CONTEXT.yaml` files exist, ask the user how the file structure should look before continuing.** Don't assume a layout. If the user doesn't have a preference, suggest the structure above as a starting point.

**If `CONTEXT-MAP.yaml` already exists**, cross-check every `path:` entry against the actual codebase. If a referenced path doesn't exist, flag the mismatch to the user before proceeding — don't silently carry stale data into the session.

### 3. "Grill" the plan

Interview the user relentlessly about every aspect of their plan until you reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one.

Format every question using the structure in [QUESTION-FORMAT.md](./references/QUESTION-FORMAT.md) — a single sharp question followed by a plain-text recommendation with a reason.

If a question can be answered by exploring the codebase, explore the codebase instead.

#### Language

- **Calibrate your language to the user.** If the user is not using DDD vocabulary, don't introduce it unprompted. Conduct the entire conversation in **plain business language**. Use DDD terms only in YAML artifacts — never in the questions you ask. Translate like this:

| DDD concept | Plain-language equivalent to use in conversation |
|-------------|--------------------------------------------------|
| bounded context | "area of the system", "module", "team ownership" |
| core domain | "what makes your product unique", "your competitive edge" |
| supporting subdomain | "necessary infrastructure, but not your differentiator" |
| generic subdomain | "off-the-shelf problem — buy, don't build" |
| ubiquitous language | "what you call things", "the right word for X" |
| Customer-Supplier | "who owns the contract", "who adapts to whom" |
| ACL | "translation layer", "insulation from upstream changes" |
| Shared Kernel | "shared code both teams must sign off on" |
| Open Host Service | "stable API that both teams can rely on" |

#### Between-Turn Protocol (MANDATORY)

After **every** user answer, before **every** next question, run these three steps in order. Never skip. Never batch.

1. **Apply techniques** — read [TECHNIQUES.md](./references/TECHNIQUES.md) and check whether any technique is triggered by this answer. Use judgment: don't force techniques that don't apply. Common triggers to watch for:
   - User uses a term that conflicts with or is absent from the glossary → **Sharpen fuzzy language** or **Challenge against the glossary**
   - User describes a boundary → **Subdomain alignment check**
   - User claims something is their competitive differentiator → **Push back on weak core-domain claims**
   - User describes how two parts interact → **Relationship labelling**
   - User states a rule about the domain → **Discuss concrete scenarios** to stress-test it
   - User's description contradicts something in the codebase → **Cross-reference with code**

2. **Write to files** — apply every decision that crystallised:
   - A resolved term → update `CONTEXT.yaml` (format: [CONTEXT-FORMAT.md](./references/CONTEXT-FORMAT.md))
   - A context established or tagged → update `CONTEXT-MAP.yaml` (format: [CONTEXT-MAP-FORMAT.md](./references/CONTEXT-MAP-FORMAT.md))
   - A relationship labelled → update `CONTEXT-MAP.yaml`

   **If `CONTEXT-MAP.yaml` was just created in this turn**, start the live graph visualizer:
   ```bash
   curl -s http://localhost:8765/api/hash >/dev/null 2>&1 || \
     nohup node "$(git rev-parse --show-toplevel)/.agents/skills/strategic-grill/scripts/serve_graph.js" \
       --no-browser > /tmp/context-graph.log 2>&1 &
   ```
   If the server starts successfully, tell the user: **"Graph live at http://localhost:8765"**
   If it fails, tell the user: **"Graph server didn't start — check `/tmp/context-graph.log` if you need it. You can work from the YAML directly."**
   The server watches all context files and pushes live reloads — you never need to restart it.

3. **Emit a turn separator** — always, after every answer. If a technique fired or a file changed, list what happened:
   ```
   Techniques fired: [comma-separated list]
   Captured: [bullet list of file changes]
   Reason: [plain-text explanation of why these techniques fired and why these file changes were made, in the context of the user's answer]
   ```
   Listing what fired and what was captured gives the user a running audit trail of how their answers reshaped the model, so they can catch a wrong technique or an unwanted file change immediately rather than discovering it turns later.
   If nothing happened (no technique fired and no file changed), still emit the separator and say so explicitly:
   ```
   Techniques fired: none
   Captured: nothing this turn
   Reason: [plain-text explanation of why no techniques fired and why no file changes were made, in the context of the user's answer]
   ```

`CONTEXT.yaml` and `CONTEXT-MAP.yaml` should be totally devoid of implementation details. Do not treat them as a spec, a scratch pad, or a repository for implementation decisions. They are glossaries and nothing else.

### 4. Offer ADRs sparingly

Only offer to create an ADR when all three are true:

1. **Hard to reverse** — the cost of changing your mind later is meaningful
2. **Surprising without context** — a future reader will wonder "why did they do it this way?"
3. **The result of a real trade-off** — there were genuine alternatives and you picked one for specific reasons

If any of the three is missing, skip the ADR. Use the format in [ADR-FORMAT.md](./references/ADR-FORMAT.md). ADR files use the MADR format with `.md` extension.