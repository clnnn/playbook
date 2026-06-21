It sounds simple, but it actually cuts against the way these two services are currently designed to relate to each other, so I want to flag that before you build it.

Here's what your existing context map says today:

- **Inventory** is the single source of truth for available quantity. Its core concept is a **Stock Level**, and the only sanctioned way to change one is an **Adjustment** (a recorded change *with a reason code*).
- **Shipping** dispatches parcels and tracks delivery. It sits *downstream* of Inventory through an **Anti-Corruption Layer (ACL)**. The relationship is explicitly documented as: "Shipping translates Inventory's stock model into its own picking model; Shipping is insulated from Inventory changes **and never writes back to Inventory**."

What you're proposing -- Shipping updating stock levels directly when items ship -- inverts that relationship. Shipping would become an upstream writer to Inventory. That's not a small wiring change; it's a redesign of the boundary between the two contexts. A few consequences worth thinking through before you commit:

1. **Two writers, one source of truth.** Inventory is "the single source of truth for available quantity." If Shipping writes stock directly, you now have two systems mutating the same number. Whose value wins when they disagree (returns, miscounts, manual corrections)? You typically end up needing reconciliation logic you don't have today.

2. **You'd bypass the Adjustment concept.** Inventory doesn't expose a raw "set the number" operation -- every change is an Adjustment with a reason code. A shipment *is* a perfectly good reason code (e.g. "shipped / dispatched"). So the clean version of this isn't "Shipping updates stock levels," it's "a shipment produces an Adjustment that Inventory applies to itself." That keeps Inventory's invariants intact.

3. **Coupling direction.** Direct writes couple Shipping tightly to Inventory's internal model and reverse the ACL that was deliberately put there to insulate the two. The more common pattern that preserves the boundary: **Shipping emits an event** ("ParcelDispatched" / "ItemsShipped") and **Inventory consumes it and records its own Adjustment.** Shipping never reaches into Inventory's data; Inventory stays the only thing that mutates a Stock Level.

So before I'd suggest any code, a few questions:

- **What's the real goal?** Keeping available quantity accurate after a dispatch, or specifically having Shipping be the thing that writes? Almost certainly the former -- and the former is better served by an event that Inventory turns into an Adjustment.
- **Timing / consistency:** does stock need to drop the instant a parcel dispatches, or is eventual (event-driven) fine? This decides sync-call vs. event.
- **Reservations:** is stock already decremented when items are *picked/allocated*, and the ship event just confirms it? If so, "decrement on ship" might double-count. Worth checking where the quantity actually moves today.
- **Reversals:** what happens on a failed dispatch or a return? You'll want the corresponding Adjustment, which again argues for going through Inventory's existing model rather than raw writes.

My recommendation: keep Inventory as the sole owner of Stock Levels. Have Shipping publish a dispatch event, and let Inventory translate that into an Adjustment with a "shipped" reason code. You get the outcome you want, you preserve the source-of-truth guarantee and the ACL boundary, and you get an audit trail for free.

Want me to sketch that event + Adjustment flow against the current package structure, or were you specifically set on the direct-write approach (in which case let's talk through the reconciliation you'd need)?
