# Grilling Techniques

Beside the grill questions, you may also ask the user to clarify or justify their decisions. Use the following techniques:

## Challenge against the glossary

When the user uses a term that conflicts with the existing language in `CONTEXT.yaml`, call it out immediately.

> "Your glossary defines 'cancellation' as X, but you seem to mean Y — which is it?"

## Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term.

> "You're saying 'account' — do you mean the Customer or the User? Those are different things."

## Discuss concrete scenarios

When domain relationships are being discussed, stress-test them with specific scenarios. Invent scenarios that probe edge cases and force the user to be precise about the boundaries between concepts.

> "You said that a Customer can have multiple Orders, but what happens if an Order is cancelled? Does it still count as part of the Customer's history?"

## Subdomain alignment check

After establishing or changing context boundaries, always ask:

> "Does this boundary reflect a real business subdomain, or was it drawn for technical convenience?"

## Cross-reference with code

When the user states how something works, check whether the code agrees. If you find a contradiction, surface it:

> "Your code cancels entire Orders, but you just said partial cancellation is possible — which is right?"

## Domain categorisation

When a context is established, ask the user to justify its tag (`core`, `supporting`, or `generic`)

| Tag | When to use |
|-----|-------------|
| `core` | Provides the competitive advantage that makes this product worth building. A `core` description must answer: *what specific capability would be lost if replaced with an off-the-shelf product?* |
| `supporting` | Necessary but not differentiating. Build lean or consider buying a component. |
| `generic` | Commodity solved problem. Default to buying off-the-shelf or using open source. |

## Push back on weak core-domain claims

When a user labels something `core`, push back hard. A weak core-domain justification ("it's important") is not enough. A strong one names the specific capability no competitor can replicate. If the user can't name it, challenge whether it's really `core` or should be `supporting`. This pushback matters because over-claiming `core` is the most common DDD mistake — it leads teams to build instead of buy, fragments focus, and buries the actual differentiator under undifferentiated engineering work.

> "What competitive advantage does this context provide, and to whom? If you replaced it with an off-the-shelf product tomorrow, what would you actually lose?"

## Push back on over-built generic contexts

When a context is tagged `generic`, probe whether it's actually being over-built:

> "Is there an off-the-shelf solution you're not using? If so, why not?"

## Relationship labelling

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
