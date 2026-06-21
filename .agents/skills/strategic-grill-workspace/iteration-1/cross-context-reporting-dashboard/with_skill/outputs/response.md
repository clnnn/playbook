Before I answer "where should it live," I want to grill the plan a bit, because where this dashboard lives is downstream of a few decisions you haven't made yet. Let me lay out what I already know from your existing setup, then ask the questions that actually determine the answer.

Here's the current picture from your docs:

- **Orders** — your standout area; the thing that makes it special is real-time, inventory-aware order promising.
- **Inventory** — tracks stock per warehouse. Necessary, but not your differentiator.
- **Customers** — stores customer profiles and contact details. Also necessary, not a differentiator.
- Orders reads from both Inventory and Customers (it adapts to the contracts they own).

A dashboard that reads from all three of those is a new consumer of data those three areas own. That shape — one thing pulling read-only data from several others to present it — is almost always its own separate area, not a feature bolted onto one of the three. So my strong default is: this is a new fourth area, owned by whoever owns "the business needs to see numbers," and it reads from the other three rather than living inside any of them. But before I commit to that, the first thing to pin down is what it actually is.

**Q: Is this dashboard purely read-only reporting (it shows numbers and never changes anything in Orders, Inventory, or Customers), or will anyone act on it — e.g. reorder stock, flag a customer, cancel an order — from inside the dashboard?**

**Recommendation:** Treat it as strictly read-only reporting and give it its own area. The moment a dashboard can take actions, it stops being reporting and starts duplicating logic that already lives in Orders/Inventory/Customers, which would fragment the rules those areas own. Reporting that reads many areas is the textbook case for a separate area precisely so it can read freely without ever being allowed to write — keep that line bright from day one.

I'll hold the follow-ups (what counts as a "KPI," whether it reads live data or a copy, and whether this is something you'd ever just buy off the shelf) until I hear how you answer this one — each of those depends on it.
