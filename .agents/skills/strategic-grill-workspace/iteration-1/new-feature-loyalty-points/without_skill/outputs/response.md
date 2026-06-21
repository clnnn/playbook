Great feature to add. Before jumping into schemas and code, the most important decision is *where* loyalty points live in your architecture — because it's easy to bolt them onto Orders or Customers and create a mess later. Let me lay out how I'd fit this in given your existing context map.

## The key insight: Loyalty is its own bounded context

You currently have two contexts:

- **Orders** (core) — placement to dispatch, real-time inventory-aware promising.
- **Customers** (supporting) — profiles and contact details.

Loyalty points are tempting to stuff into one of these, but both are a poor fit:

- **Don't put it in Orders.** Orders is your core differentiator (inventory-aware promising). Loyalty earn/redeem logic has a totally different rhythm — point accrual rules, expiry, redemption, balance reconciliation. Mixing it in pollutes your crown-jewel context with unrelated rules.
- **Don't put it in Customers.** Customers is deliberately a thin supporting context ("profiles and contact details"). A points ledger with a transaction history is not a "profile detail" — it has real behavior and invariants.

So I'd introduce a **new `Loyalty` context** (a supporting context, like Customers). This keeps each context cohesive and lets the loyalty rules evolve independently.

## How it relates to the existing contexts

Two relationships matter:

1. **Orders → Loyalty (earning).** When an order reaches a settled state (dispatched? paid? — see questions below), Loyalty needs to know to award points. I'd model this as Orders being **upstream** and publishing an event (e.g. `OrderDispatched`) that Loyalty consumes. Orders should *not* know about points — it just announces what happened. Loyalty owns the "how many points" rule. This keeps your core context clean and unaware of loyalty.

2. **Customers → Loyalty (identity).** A points balance belongs to a Customer. Customers already owns the `CustomerId` contract (it's Customer-Supplier upstream of Orders today), so Loyalty would adopt that same `CustomerId` rather than inventing its own customer notion.

Proposed addition to your context map:

```yaml
- name: Loyalty
  tag: supporting
  description: Tracks customer point balances; awards points on settled orders and processes redemptions.

relationships:
  - upstream: Orders
    downstream: Loyalty
    label: Publisher-Subscriber
    implication: Orders emits order-settled events; Loyalty subscribes. Orders has no knowledge of points.
  - upstream: Customers
    downstream: Loyalty
    label: Customer-Supplier
    implication: Loyalty adopts the CustomerId contract from Customers.
```

## Modeling inside the Loyalty context

The core building block is a **points ledger** — an append-only record of point movements (earned, redeemed, expired, adjusted) rather than a single mutable "balance" number. Balance becomes the sum of the ledger. This gives you auditability, easy dispute resolution, and a natural place to handle expiry. New language for the Loyalty CONTEXT.yaml:

- **Points Account** — a customer's running balance, derived from their ledger entries.
- **Points Transaction** — a single earn/redeem/expire/adjust entry (avoid "Order", avoid "Payment" — these belong to other contexts).
- **Redemption** — applying points against something of value.

## Questions that will shape the design

I want to push on a few things before we commit, because the answers change the model significantly:

1. **What event triggers earning?** Order placed, order paid, or order dispatched? If you award on placement and the order is cancelled/returned, you've leaked points — you'll need a clawback (negative ledger entry). Dispatch is usually the safest "settled" point. What's your cancellation/return rate?

2. **What can points actually be redeemed *for*?** Discount on a future order? Free items? Account credit? This decides whether Loyalty needs to talk back to Orders at checkout (and how tightly coupled they become). "Redeem for a discount at checkout" is a much deeper integration than "redeem for a voucher out-of-band."

3. **Do points expire?** Expiry is a surprisingly large piece — it needs a scheduled process and well-defined rules. Worth knowing now since it affects the ledger design.

4. **Is this a real differentiator, or table stakes?** If loyalty is meant to be a competitive edge (tiers, bonus multipliers, partnerships), it may deserve more investment and a richer model. If it's "everyone has points, we need them too," keep it deliberately simple. Which is it for you?

5. **Earn/redeem consistency.** Redemption must not allow spending points you don't have. Is eventual consistency acceptable (points appear a moment after dispatch), or do you need strong guarantees at redemption time? The ledger model handles redemption atomicity well, but earning via events is naturally eventual.

## Suggested next step

If this framing sounds right, I'd:
1. Add the `Loyalty` package/context with its CONTEXT.yaml.
2. Define the order-settled event contract that Orders publishes.
3. Record an ADR capturing *why* loyalty is its own context and the earn-on-dispatch decision.

Tell me your answers to the questions above (especially #1, #2, and #4) and I'll turn this into a concrete structure.
