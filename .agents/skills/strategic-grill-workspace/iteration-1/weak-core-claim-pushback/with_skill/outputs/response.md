Good — let's pressure-test this before you pour the foundation, because "structure the rest of the system around it" is a load-bearing decision and the cost of getting the center wrong is high.

I went looking for any existing decisions to work from. There's no `CONTEXT-MAP.yaml` at the root and no per-area `CONTEXT.yaml` files anywhere in the project — `docs/` only has an `ideas/` folder, and `packages/` has just `ui`. So we're starting from a blank slate, which is the right time to do this.

Before I grill you on the notification service itself, I need one thing settled, because everything we capture from here lands in files and I don't want to guess your layout.

**Q: Where should the domain documentation live — a single root `docs/CONTEXT-MAP.yaml` plus a `docs/CONTEXT.yaml` per area, or co-located `CONTEXT.yaml` files inside each package (e.g. `packages/notifications/docs/CONTEXT.yaml`)?**

**Recommendation:** Use a root `docs/CONTEXT-MAP.yaml` for the system-wide map and a co-located `CONTEXT.yaml` inside each package's `docs/` folder. Reason: you're a pnpm/Nx monorepo where each area of the system will be its own package, so keeping each area's glossary next to its code keeps it from drifting, while the root map stays the single place to see how the pieces relate. If you'd rather keep all docs centralized under `docs/`, say so and I'll follow that instead.

---

One thing I want to flag now so you can be thinking about it: you've called the notification service "the core" and "what users love about us." I'm going to push hard on that next, because deciding what's truly at the center is the most consequential call we'll make — and "notifications" is, for most platforms, a commodity that you buy rather than build (think SendGrid, Twilio, Knock, Courier). So have an answer ready for this: **if you swapped your notification service for an off-the-shelf product tomorrow, what specifically would your users lose that no competitor could replicate?** If the honest answer is "delivery, but reliable," that's supporting infrastructure, not your competitive edge — and the real core is probably something upstream of it (what you decide to notify people about, and when). We'll dig into that once the file layout is settled.
