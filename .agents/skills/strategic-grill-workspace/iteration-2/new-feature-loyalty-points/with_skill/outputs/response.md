Before I answer "how should we fit this in," I want to grill the idea a bit — a loyalty system touches money-like balances and ties into both orders and customers, so where it lives and what it owns matters more than how it's wired.

Here's what your system currently looks like, so we're working from the same picture:

- **Orders** — receives and tracks orders from placement to dispatch. Tagged as the thing that makes your product unique (your real-time, inventory-aware order promising).
- **Customers** — stores customer profiles and contact details. A necessary-but-not-differentiating area.
- Today, **Customers owns the customer identity** and Orders adapts to it.

A loyalty points system plausibly wants to sit next to all three: it watches orders to award points, it hangs a balance off each customer, and it gets spent at checkout. That's exactly the kind of thing that quietly sprawls across boundaries if we don't pin it down first. So let me start at the most consequential fork.

---

**Q: Is "loyalty points" a distinct area of the system with its own owner, or a feature folded into either Orders or Customers?**

**Recommendation:** Make it its own area. Points have their own lifecycle (earned, expired, redeemed, reversed) and their own rules that change for marketing reasons, on a different cadence than how you take orders or store profiles. Folding it into Orders would pollute the one area you've called your competitive edge with unrelated promotional logic; folding it into Customers would turn a simple profile store into a balance ledger. A separate "Loyalty" area keeps both of those clean and lets the rules evolve independently.

---

Once you've taken a position on that, the next things I'll want to pin down (one at a time, after this) are:

1. **What you actually call the unit** — "points," "rewards," "credit," "miles"? Pick one and we kill the synonyms, because a balance that's described three ways becomes three half-built features.
2. **Whether this is genuinely differentiating or just table stakes** — most loyalty programs are a commodity (earn 1 point per dollar, redeem at checkout). If that's you, we should lean toward buying rather than building, and reserve your engineering for the order-promising edge you already named as core. If there's something competitors genuinely can't copy here, I want you to name it.
3. **Who owns the contract when Orders feeds points** — Orders is your crown jewel; I'd be reluctant to let a promotions feature dictate changes to it. More likely Loyalty listens to "an order happened" and translates that on its own side, so Orders never has to know loyalty exists.

But those depend on your answer above. So: own area, or folded in — and if folded, into which?
