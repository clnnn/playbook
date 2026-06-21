Short answer: it should live in its own dedicated context/package, **not** inside Orders, Inventory, or Customers. Looking at your existing structure, I'd create a new `packages/reporting` (or `packages/analytics`) bounded context.

Here's the reasoning.

## Why a separate context

Your current contexts are nicely focused — each owns one thing:

- **Orders** owns the order lifecycle (and the differentiating real-time, inventory-aware promising).
- **Inventory** owns stock levels per warehouse.
- **Customers** owns customer profiles.

A reporting dashboard is fundamentally different in shape from all three. The operational contexts are *transactional* — they handle commands, enforce invariants, and own a single source of truth. Reporting is *analytical* — it's read-only, it aggregates across domains, and it cares about denormalized, query-optimized shapes rather than the carefully-guarded models each context maintains.

If you stuff reporting into one of the existing contexts, you create problems:

- **Putting it in Orders** would make Orders depend on Inventory and Customers as data sources just to render KPIs. That couples your most important context (the one with your differentiator) to concerns that have nothing to do with order promising. Orders should stay lean.
- **Spreading it across all three** means no one owns the dashboard, and KPI logic leaks into three places.

So: a dedicated Reporting context that all three feed into. In your CONTEXT-MAP terms, it's a new downstream context.

## The relationship pattern matters

Looking at your existing map, Orders is **Customer-Supplier** with both Inventory and Customers — meaning those upstreams own contracts and Orders adapts. Reporting's relationship to the three sources should be different. I'd model it as **Conformist** or, better, with an **Anti-Corruption Layer (ACL)**:

- Reporting consumes data from Orders, Inventory, and Customers, but it must **not** force changes on them. Those contexts shouldn't bend their models to make reporting easier.
- An ACL inside Reporting translates each upstream's language into reporting's own terms. This protects the ubiquitous language you've defined — e.g., Reporting might have a concept like "Revenue" or "Fulfillment Rate" that doesn't exist in any single upstream, and it shouldn't pollute Orders' vocabulary (which deliberately avoids "Transaction"/"Purchase") to get there.

## How it should pull data — the open question

This is the decision that actually matters, and it's worth being deliberate about rather than defaulting:

1. **Read-time queries** — Reporting calls each context's API/read model on demand. Simplest to start, but couples availability and can hammer the operational stores.
2. **Event-driven projection** — each context publishes domain events (OrderPlaced, StockLevelChanged, etc.) and Reporting builds its own read-optimized store. More moving parts, but it decouples reporting load from operational systems and is the usual long-term answer for KPI dashboards.
3. **Shared data warehouse / ETL** — pull into a separate analytical store on a schedule.

For "business KPIs" that don't need to be real-time, options 2 or 3 are typically the right call. The key principle either way: **Reporting reads from the contexts' published contracts, never reaches into their databases directly.**

## A few questions before I'd commit to a structure

- Do these KPIs need to be real-time, or is near-real-time / batched (hourly, daily) acceptable? That decides query-vs-events-vs-ETL.
- Who's the audience — internal ops, or customer-facing? Customer-facing reporting raises different scaling and access-control concerns.
- Is "business KPIs" a stable, well-understood set, or will analysts want to slice data ad hoc? Ad hoc exploration pushes toward a warehouse rather than a hand-built service.

## Suggested next step

Create `packages/reporting` with its own `docs/CONTEXT.yaml` defining its ubiquitous language (the KPI terms — Revenue, Fulfillment Rate, etc.), and add it to `docs/CONTEXT-MAP.yaml` as a new `supporting` (or possibly `generic`) context with three Customer-Supplier/ACL relationships pointing upstream to Orders, Inventory, and Customers.

Want me to scaffold that package and draft its CONTEXT.yaml and the map entries?
