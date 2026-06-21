Happy to help wire this up. Before I touch any code, I dug into your existing context docs, and there's an important naming/modeling issue worth flagging first because it'll shape how we build this.

## The term "Order" already means something specific in your system

Your `packages/orders` context defines **Order** very deliberately:

> "A customer's request to purchase one or more items at a point in time."

It even lists `Purchase`, `Transaction`, and `Basket` as terms to *avoid* — so the Orders team has clearly already done the work of pinning down what an Order is, and it's strictly customer-facing.

What you're describing — "send orders to suppliers to restock inventory" — is a different concept that points the opposite direction (you → supplier, not customer → you). If we also call that an "Order," we'll end up with two incompatible meanings of the same word living in the same codebase. That tends to cause real bugs (code/queries/events that conflate customer demand with restock supply) and endless "which kind of order do you mean?" conversations.

The industry-standard term for this is a **Purchase Order** (PO) — a request *you* issue to a supplier to buy stock. I'd suggest we model it as its own concept, most naturally living in (or alongside) the **Suppliers** context rather than reusing the customer-`Orders` context.

## A few things I need to understand before designing this

1. **Where should this live?** Your CONTEXT-MAP currently says Orders and Suppliers are "Separate Ways" — fully independent, no integration. Adding purchase orders changes that. My instinct is a Purchase Order belongs in the Suppliers context (it's about *procuring from a supplier*). Does that match how your team thinks about it, or do you see it as a new area entirely?

2. **What triggers a restock order?** Is someone manually creating these, or is it driven by inventory thresholds? (I notice there's no Inventory context in the map yet — is inventory tracked somewhere, or is that a gap?)

3. **What's the lifecycle?** For a supplier-facing order, do you need states like draft → sent → confirmed → received? And do you need to record what actually arrived vs. what was ordered (partial deliveries, etc.)?

4. **"Send" how?** Email, an API to the supplier, a generated PDF, or just an internal record for now? This heavily affects scope.

5. **Relationship to customer Orders / inventory promising.** Your Orders context's differentiator is "real-time inventory-aware order promising." Restocking obviously feeds the inventory that promising depends on — should creating/receiving a purchase order update available inventory that customer order promising reads from? That's the integration that would replace today's "Separate Ways."

## My proposed direction (pending your answers)

- Introduce a **Purchase Order** concept (avoid overloading "Order").
- Model it in the **Suppliers** context as the thing that restocks inventory.
- Update `docs/CONTEXT-MAP.yaml` to reflect a real relationship between Suppliers and whatever owns inventory, instead of "Separate Ways."
- Add the new term to `packages/suppliers/docs/CONTEXT.yaml` with a clear definition and an `avoid: [Order]` note so the boundary stays crisp.

If you'd rather just call it "Order" inside Suppliers and accept the overlap, we can — but I'd recommend against it. Let me know your answers to the questions above (especially #1, #2, and #5) and I'll lay out the concrete structure and start building.
