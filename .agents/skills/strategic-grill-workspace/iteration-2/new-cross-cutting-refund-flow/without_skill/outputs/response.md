A refund flow is a good thing to think through carefully, because it cuts across three contexts that today only know about the "forward" path. Looking at your existing CONTEXT-MAP, here's what's already true:

- **Orders** is your core context (real-time inventory-aware order promising). It's upstream of Payments and downstream of Inventory.
- **Payments** is supporting — it captures/settles a **Charge** via a third-party gateway.
- **Inventory** is supporting — it tracks **Stock Level** per warehouse.

Your three steps map cleanly onto those three contexts: reverse the charge (Payments), mark the order (Orders), restock items (Inventory). So the feature is real, but the interesting question is *who orchestrates it* and *what the language is*, because nothing in your current map describes a reverse flow.

Here's how I'd approach it.

## 1. Decide where the refund flow lives

The three steps have to happen in a coordinated way (and partially fail gracefully — e.g. the charge reversal succeeds but a restock can't complete). That orchestration logic needs an owner. Two main options:

- **Orders owns it.** Orders is already the core context and is upstream of Payments, so a "Refund requested for this order" command originating in Orders fits the existing Customer-Supplier relationship. Orders would emit something Payments and Inventory react to.
- **A new context owns it** (e.g. "Returns" or "Refunds"). Worth it only if refunds have their own lifecycle — approval steps, partial refunds, restocking fees, fraud checks, RMA tracking — that doesn't belong inside Orders.

My default recommendation is to start with **Orders owning the flow** and only extract a dedicated context if the refund lifecycle grows its own rules. Don't create a new bounded context prematurely.

## 2. Get the language right per context

Each context already has a deliberately narrow vocabulary with explicit "avoid" lists, so the refund concepts should extend that rather than introduce a vague cross-cutting "Refund" term everywhere:

- **Payments** speaks of **Charge**. The reversal isn't a generic "refund" here — it's likely a **Charge Reversal** (or "Refund" as a first-class concept *against* a Charge). Note Payments already avoids "Payment"/"Transaction", so pick a term consistent with that discipline.
- **Orders** speaks of **Order**. Marking the order is a state on the Order's lifecycle (e.g. an order moves to a "Refunded"/"Returned" state). This is an addition to the Order lifecycle, which today is described as "placement to dispatch" — a refund extends that lifecycle, so the CONTEXT.yaml description should probably be updated too.
- **Inventory** speaks of **Stock Level**. Restocking is an increase to a Stock Level at a specific warehouse. Which warehouse? Inventory is per-warehouse, so "restock items" needs to resolve to a concrete warehouse — that's not obvious from the request.

## 3. Open questions before we build

A few things I'd want pinned down, because they change the design materially:

1. **Trigger and authority.** Who initiates a refund — customer self-service, support agent, automated (e.g. failed delivery)? Does it need approval?
2. **Full vs. partial.** Can you refund part of an order / a subset of items? That affects both the Charge reversal amount and which items restock.
3. **Ordering and failure handling.** What's the correct sequence, and what happens if a step fails? E.g. if the Charge Reversal succeeds but restock fails, are you out of sync? This is the classic distributed-transaction problem — likely a saga / compensating actions rather than a single transaction.
4. **Restock conditions.** Do all items always go back to stock? Damaged/opened items often shouldn't restock. And to which warehouse?
5. **Inventory-aware promising impact.** Orders' differentiator is real-time inventory-aware promising. Restocked items presumably become available to promise again — is that immediate, or is there a quarantine/inspection step? This directly touches your core value proposition.
6. **Timing/eventing.** Charge reversals via a third-party gateway are often asynchronous (the gateway confirms later). Does the Order get marked "Refunded" optimistically, or only after the gateway confirms?

## Suggested next step

If you can answer the trigger, full-vs-partial, and failure-handling questions above, I can sketch the concrete flow: which context emits which command/event, the new language terms to add to each CONTEXT.yaml, and the relationship(s) to add to the CONTEXT-MAP (most likely a new reverse-direction interaction from Orders → Payments and Orders → Inventory). Want me to draft that with Orders as the orchestrator as a starting point?
