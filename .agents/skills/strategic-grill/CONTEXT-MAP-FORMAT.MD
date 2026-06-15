# CONTEXT-MAP.md format

```md
# Context Map

## Contexts

- [Ordering](./src/ordering/CONTEXT.md) `core` — receives and tracks customer orders; the competitive differentiator is our real-time rerouting algorithm
- [Billing](./src/billing/CONTEXT.md) `supporting` — generates invoices and processes payments
- [Auth](./src/auth/CONTEXT.md) `generic` — identity and session management; using Clerk

## Relationships

- **Ordering → Fulfillment** `Customer-Supplier` — Ordering sets the OrderPlaced event contract; Fulfillment adapts. Fulfillment has no veto on contract changes.
- **Fulfillment → Billing** `ACL` — Billing translates ShipmentDispatched into its own InvoiceTrigger; insulated from Fulfillment model changes.
- **Ordering ↔ Billing** `Shared Kernel` — Shared types for CustomerId and Money; both teams must sign off on changes to these types.
```

## Rules

- **Every context carries exactly one tag.** `core`, `supporting`, or `generic` — never two, never none. The tag drives a build-vs-buy decision, so it has to be definite.
- **Justify the tag in the description.** A `core` entry must name the specific capability that would be lost if replaced off-the-shelf. A `generic` entry should name what you're buying or why you'd build a commodity yourself.
- **Every relationship carries exactly one label** from the DDD set, never free-form prose. The label encodes a precise team-autonomy consequence:

  | Label | Implication |
  |-------|-------------|
  | `Shared Kernel` | Shared sub-model; both teams sign off on changes |
  | `Customer-Supplier` | Upstream sets the interface; downstream adapts |
  | `Open Host Service` | Upstream publishes a stable versioned API; downstream consumes without negotiation |
  | `ACL` | Downstream owns translation; insulated from upstream model changes |
  | `Partnership` | Both teams coordinate on interface changes; high coupling |
  | `Conformist` | Downstream enslaved to upstream model; use only when ACL cost exceeds benefit |
  | `Published Language` | OHS with a shareable documented format (JSON Schema, Avro, Protobuf) |
  | `Separate Ways` | No integration; teams fully independent |

- **Add a one-sentence implication note after each label** so a reader understands the autonomy consequence without consulting the table.
- **No implementation details.** This is a map of boundaries and their relationships, not an architecture spec.
- **Use arrows for direction.** `→` for directed (upstream/downstream) relationships, `↔` for symmetric ones (Shared Kernel, Partnership, Separate Ways).
