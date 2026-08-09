# CONTEXT-MAP.yaml format

## Where the files live

```
/
├── docs/
│   └── CONTEXT-MAP.yaml              ← system-wide context map
├── src/ (or packages/, libs/, …)
│   ├── ordering/
│   │   └── docs/
│   │       └── CONTEXT.yaml
│   └── billing/
│       └── docs/
│           └── CONTEXT.yaml
```

With one context, use this layout without asking. Ask the user to confirm a layout only when a second context arrives.

## The map

```yaml
contexts:
  - name: Ordering
    path: ./src/ordering/docs/CONTEXT.yaml
    tag: core
    description: Receives and tracks customer orders; the competitive differentiator is our real-time rerouting algorithm.

  - name: Billing
    path: ./src/billing/docs/CONTEXT.yaml
    tag: supporting
    description: Generates invoices and processes payments.

  - name: Auth
    path: ./src/auth/docs/CONTEXT.yaml
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

  - upstream: Auth
    downstream: Ordering
    label: Conformist
    implication: Ordering adopts Clerk's user model as-is; no translation layer, accepted because the auth provider rarely changes.

  - upstream: Ordering
    downstream: PartnerPortal
    label: Open Host Service (Published Language)
    implication: Ordering publishes a stable versioned API; external consumers adapt to its documented schema without negotiation.

  - peers:
      - Ordering
      - Billing
    label: Shared Kernel
    implication: Shared types for CustomerId and Money; both teams must sign off on changes to these types.
```

## Relationship schema

Directed relationships (Customer-Supplier, ACL, Conformist, Open Host Service (Published Language)) use `upstream` / `downstream`.
Symmetric relationships (Shared Kernel) use `peers` as a two-item list.

## Rules

- **Every context carries exactly one tag.** `core`, `supporting`, or `generic` — never two, never none.
- **Justify the tag in `description`.** A `core` entry must name the specific capability that would be lost if replaced off-the-shelf. A `generic` entry should name what you're buying or why you'd build a commodity yourself.
- **Every relationship carries exactly one `label`** from the DDD set — never free-form prose:

  | Label | Implication |
  |-------|-------------|
  | `Shared Kernel` | Shared sub-model; both teams sign off on changes. Use between your own modules for common objects only (value objects, ID types). |
  | `Customer-Supplier` | Upstream sets the interface; downstream adapts. Use between your own internal modules. |
  | `ACL` | Downstream owns translation; insulated from upstream model changes. Use as a firewall from a 3rd party you don't want leaking into your model. |
  | `Conformist` | Downstream adopts the upstream model as-is; no translation. Use for a 3rd party that rarely changes, where an ACL isn't worth the cost. |
  | `Open Host Service (Published Language)` | Upstream publishes a stable, versioned, documented API (JSON Schema, Avro, Protobuf); external consumers adapt to it without negotiation. |

- **`implication` is required on every relationship.** One sentence capturing the autonomy consequence.
- **No implementation details.** This is a map of boundaries and their relationships, not an architecture spec.
