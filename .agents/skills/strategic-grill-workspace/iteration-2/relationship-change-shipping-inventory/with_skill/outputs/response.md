Before I agree it's simple, I have to flag something — because what you're describing runs straight into a decision that's already written down in this codebase.

Your current docs say the exact opposite of what you just proposed. In `docs/CONTEXT-MAP.yaml`, the relationship between these two services is documented as:

> **Shipping translates Inventory's stock model into its own picking model; Shipping is insulated from Inventory changes and never writes back to Inventory.**

In plain terms: today, Inventory is the single source of truth for stock, and Shipping is a read-only consumer that adapts Inventory's data into its own world (parcels, pick lists). It deliberately *never* reaches back in to change stock. Your request — "Shipping updates Inventory stock levels directly" — would invert that. Shipping would start writing into the one place that's supposed to own that number.

That's not necessarily wrong, but it's a meaningful reversal of a deliberate boundary, so it's worth a few sharp questions before anyone touches code.

**Q: When a parcel ships, who do you believe should *own* the decision that stock just went down — Shipping, or Inventory?**

**Recommendation:** Keep Inventory owning it. Inventory is documented as "the single source of truth for available quantity," and stock that can be decremented from two different services is stock no one can trust. Instead of Shipping writing directly, have Shipping announce a fact it genuinely owns — "this parcel shipped" — and let Inventory decide how that changes stock. That preserves the existing boundary while still getting you the outcome you want.

A couple of things I want to understand next, but I'll take them one at a time:

- What you actually mean by "update stock levels" — is shipping out the *only* reason stock drops, or just one of several? (Your glossary already has an `Adjustment` concept with a reason code, which hints stock changes are supposed to be tracked, not silently overwritten.)
- Why "directly" — is this about speed, simplicity, avoiding an event bus, or something else? The word "directly" is doing a lot of work and it's the part that breaks the current design.

Let's start with the ownership question above.
