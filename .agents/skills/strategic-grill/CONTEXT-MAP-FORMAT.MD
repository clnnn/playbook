# CONTEXT-MAP.yaml format

```yaml
contexts:
  - name: Ordering
    path: ./src/ordering/CONTEXT.yaml
    tag: core
    description: Receives and tracks customer orders; the competitive differentiator is our real-time rerouting algorithm.

  - name: Billing
    path: ./src/billing/CONTEXT.yaml
    tag: supporting
    description: Generates invoices and processes payments.

  - name: Auth
    path: ./src/auth/CONTEXT.yaml
    tag: generic
    description: Identity and session management; using Clerk.

relationships:
  - upstream: Ordering
    downstream: Fulfillment
    label: Customer-Supplier
    implication: Ordering sets the OrderPlaced event contract; Fulfillment adapts with no veto on contract changes.

  - upstream: Fulfillment
    downstream: Billing
    label: ACL
    implication: Billing translates ShipmentDispatched into its own InvoiceTrigger; insulated from Fulfillment model changes.

  - peers:
      - Ordering
      - Billing
    label: Shared Kernel
    implication: Shared types for CustomerId and Money; both teams must sign off on changes to these types.
```

## Relationship schema

Directed relationships (Customer-Supplier, Open Host Service, ACL, Published Language, Conformist) use `upstream` / `downstream`.
Symmetric relationships (Shared Kernel, Partnership, Separate Ways) use `peers` as a two-item list.

## Rules

- **Every context carries exactly one tag.** `core`, `supporting`, or `generic` — never two, never none.
- **Justify the tag in `description`.** A `core` entry must name the specific capability that would be lost if replaced off-the-shelf. A `generic` entry should name what you're buying or why you'd build a commodity yourself.
- **Every relationship carries exactly one `label`** from the DDD set — never free-form prose:

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

- **`implication` is required on every relationship.** One sentence capturing the autonomy consequence.
- **No implementation details.** This is a map of boundaries and their relationships, not an architecture spec.
