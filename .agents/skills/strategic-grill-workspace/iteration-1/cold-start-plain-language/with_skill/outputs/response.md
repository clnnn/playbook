Happy to dig into this with you. Before I start asking questions, two quick things — one housekeeping, one substantive.

**Housekeeping: where should the thinking live?**

I want to capture decisions as we go in two living documents:

- A **glossary** for each area of the system — the precise word for each thing (an "ingredient" vs. a "stock item" vs. a "product", etc.), so the whole team uses the same vocabulary.
- A **map** of the areas of the system and how they depend on each other.

I looked through the project and there's nothing set up yet — no existing structure to follow. So I need you to tell me where these files should live. If you don't have a preference, here's a sensible default I'd suggest:

```
/
├── docs/
│   └── CONTEXT-MAP.yaml          ← the system-wide map of areas
├── packages/ (or src/, libs/, …)
│   ├── inventory/
│   │   └── docs/CONTEXT.yaml      ← glossary for the inventory area
│   ├── suppliers/
│   │   └── docs/CONTEXT.yaml
│   └── orders/
│       └── docs/CONTEXT.yaml
```

Does that layout work, or would you prefer something different?

**Substantive: the first thing I want to pin down.**

You named three things to track — ingredients, suppliers, and orders — but the most important question for a SaaS product isn't *what* you track, it's *what makes this worth buying over the dozen inventory tools that already exist*.

**Q: Of everything this product will do, what is the one capability a restaurant could not get from an off-the-shelf inventory tool — the reason they'd pay you specifically?**

**Recommendation:** Don't answer "tracking ingredients, suppliers, and orders" — every inventory tool does that, so that's table stakes, not a differentiator. I'd bet your real edge is something restaurant-specific: predicting tomorrow's ingredient needs from sales and reservations, automatically flagging waste or spoilage, or auto-generating supplier orders to hit target margins. Name that, and we'll build the system *around* it and buy/borrow the commodity parts (basic stock counts, supplier records). Pinning this down first stops us over-engineering the boring 80% and under-investing in the 20% that actually sells.
