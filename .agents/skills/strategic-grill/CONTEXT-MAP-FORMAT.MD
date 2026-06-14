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