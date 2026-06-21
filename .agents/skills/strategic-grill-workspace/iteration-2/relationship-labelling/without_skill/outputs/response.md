You record it as a **relationship entry** in `docs/CONTEXT-MAP.yaml` — that file already has a `relationships: []` array sitting empty, which is exactly where this connection belongs.

## What the relationship actually is

Let's be precise about the direction and mechanism before writing anything down, because that determines how you label it:

- **Orders** *publishes* a domain event (`Order Shipped`, per its CONTEXT.yaml — "published when an Order's items leave the warehouse").
- **Notifications** *consumes* that event and reacts by sending an email.

So the dependency flows **Notifications → Orders**: Notifications depends on Orders' event, not the other way around. Orders doesn't know or care that Notifications exists — it just emits `Order Shipped`. That's a one-directional, event-driven integration.

In Domain-Driven Design terms this is a classic **Customer/Supplier** pairing combined with the **Published Language** pattern:
- Orders is the **upstream/supplier** — it owns the event and its shape.
- Notifications is the **downstream/customer** — it has to take whatever Orders publishes.
- The `Order Shipped` event *is* the published language: a stable, documented contract between the two.

## Suggested entry

Here's how I'd fill in the `relationships` array in `docs/CONTEXT-MAP.yaml`:

```yaml
relationships:
  - upstream: Orders
    downstream: Notifications
    type: customer-supplier
    integration: event
    via: Order Shipped
    description: >
      Notifications subscribes to the Order Shipped domain event published
      by Orders and sends a shipment confirmation email to the customer.
      Orders has no knowledge of Notifications (one-directional).
```

The exact field names should match whatever convention the rest of your map uses — since `relationships` is currently empty, you get to set that convention now. The fields that matter to capture are:

1. **Direction** (`upstream`/`downstream`) — so it's unambiguous who depends on whom.
2. **Integration style** (`event`) — distinguishes this from a synchronous API call.
3. **The contract** (`Order Shipped`) — links the relationship to the term already defined in Orders' CONTEXT.yaml.

## One thing worth confirming

Your map tags Orders as `core` (real-time inventory-aware promising) and Notifications as `generic` (thin wrapper over a third-party provider). That asymmetry reinforces the customer/supplier framing: you don't want your `core` Orders context bending to accommodate a `generic` notifications concern. Modeling it as a one-way event subscription keeps Orders insulated.

Before you commit the entry, it's worth being sure of two things:
- Does Orders publish `Order Shipped` to a broker/bus that Notifications subscribes to, or does something actively call into Notifications? If it's the latter, the integration is more coupled than "event" implies and the label should reflect that.
- Is `Order Shipped` already a stable, versioned contract, or could its shape change under Notifications without warning? If there's no guarantee, you may want an **Anti-Corruption Layer** on the Notifications side — and that's worth noting in the relationship too.

Answer those and the entry above is essentially ready to drop in.
