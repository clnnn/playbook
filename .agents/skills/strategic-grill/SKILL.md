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

### 3. "Grill" the plan

Interview the user relentlessly about every aspect of their plan until you reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer.

Ask the questions one at a time, waiting for feedback on each question before continuing. This matters because each answer shapes which branch to explore next — asking several at once lets the user give shallow answers and loses the thread.

If a question can be answered by exploring the codebase, explore the codebase instead.

Calibrate your language to the user. If the user is not using DDD vocabulary, don't introduce it unprompted. Conduct the entire conversation in **plain business language**. Use DDD terms only in YAML artifacts — never in the questions you ask. Translate like this:

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

**During the session, as you grill, after each answer**:

#### 3.1 Challenge against the glossary

When the user uses a term that conflicts with the existing language in `CONTEXT.yaml`, call it out immediately.

> "Your glossary defines 'cancellation' as X, but you seem to mean Y — which is it?"

#### 3.2 Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term.

> "You're saying 'account' — do you mean the Customer or the User? Those are different things."

#### 3.3 Discuss concrete scenarios

When domain relationships are being discussed, stress-test them with specific scenarios. Invent scenarios that probe edge cases and force the user to be precise about the boundaries between concepts.

> "You said that a Customer can have multiple Orders, but what happens if an Order is cancelled? Does it still count as part of the Customer's history?"

#### 3.4 Subdomain alignment check

After establishing or changing context boundaries, always ask:

> "Does this boundary reflect a real business subdomain, or was it drawn for technical convenience?"

#### 3.5 Cross-reference with code

When the user states how something works, check whether the code agrees. If you find a contradiction, surface it: 

> "Your code cancels entire Orders, but you just said partial cancellation is possible — which is right?"

#### 3.6 Domain categorisation

When a context is established, ask the user to justify its tag (`core`, `supporting`, or `generic`)

| Tag | When to use |
|-----|-------------|
| `core` | Provides the competitive advantage that makes this product worth building. A `core` description must answer: *what specific capability would be lost if replaced with an off-the-shelf product?* |
| `supporting` | Necessary but not differentiating. Build lean or consider buying a component. |
| `generic` | Commodity solved problem. Default to buying off-the-shelf or using open source. |

#### 3.7 Push back on weak core-domain claims

When a user labels something `core`, push back hard. A weak core-domain justification ("it's important") is not enough. A strong one names the specific capability no competitor can replicate. If the user can't name it, challenge whether it's really `core` or should be `supporting`. This pushback matters because over-claiming `core` is the most common DDD mistake — it leads teams to build instead of buy, fragments focus, and buries the actual differentiator under undifferentiated engineering work.

> "What competitive advantage does this context provide, and to whom? If you replaced it with an off-the-shelf product tomorrow, what would you actually lose?"

#### 3.8 Push back on over-built generic contexts

When a context is tagged `generic`, probe whether it's actually being over-built:

> "Is there an off-the-shelf solution you're not using? If so, why not?"

#### 3.9 Relationship labelling

Every relationship entry must carry exactly one label. Do not use free-form prose in place of a label.

  | Label | Team-autonomy implication |
  |-------|--------------------------|
  | `Shared Kernel` | Shared sub-model; both teams must sign off on changes |
  | `Customer-Supplier` | Upstream sets the interface; downstream adapts |
  | `Open Host Service` | Upstream publishes a stable versioned API; downstream consumes without negotiation |
  | `ACL` | Downstream owns translation; insulated from upstream model changes |
  | `Partnership` | Both teams must coordinate on interface changes; high coupling |
  | `Conformist` | Downstream enslaved to upstream model; use only when ACL cost exceeds benefit |
  | `Published Language` | OHS with a shareable documented format (JSON Schema, Avro, Protobuf) |
  | `Separate Ways` | No integration; teams fully independent |

After the label, add a one-sentence implication note so the reader immediately understands the team-autonomy consequence.

#### 3.10 Update CONTEXT.yaml and CONTEXT-MAP.yaml inline

Write to these files the moment a decision crystallises — never batch them up, never wait until the end of the session. Batching loses decisions if the session is interrupted, and it deprives the user of seeing the model take shape in real time, which is often when they catch things they want to revise.

- **As soon as a term is resolved**, update `CONTEXT.yaml` right there.
- **As soon as a context is established and tagged** (`core`, `supporting`, or `generic`), update `CONTEXT-MAP.yaml` right there.
- **As soon as a relationship is decided and labelled**, update `CONTEXT-MAP.yaml` right there.

Use the format in [CONTEXT-FORMAT.md](./CONTEXT-FORMAT.md) for `CONTEXT.yaml`, and the format in [CONTEXT-MAP-FORMAT.md](./CONTEXT-MAP-FORMAT.MD) for `CONTEXT-MAP.yaml`.

`CONTEXT.yaml` and `CONTEXT-MAP.yaml` should be totally devoid of implementation details. Do not treat them as a spec, a scratch pad, or a repository for implementation decisions. They are glossaries and nothing else.

### 4. Offer ADRs sparingly

Only offer to create an ADR when all three are true:

1. **Hard to reverse** — the cost of changing your mind later is meaningful
2. **Surprising without context** — a future reader will wonder "why did they do it this way?"
3. **The result of a real trade-off** — there were genuine alternatives and you picked one for specific reasons

If any of the three is missing, skip the ADR. Use the format in [ADR-FORMAT.md](./ADR-FORMAT.md). ADR files use the MADR format with `.md` extension.