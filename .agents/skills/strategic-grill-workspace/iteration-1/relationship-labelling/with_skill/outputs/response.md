I read your existing docs before answering. Here's what's already written down:

- **Orders** — tracks customer orders from placement to dispatch. It publishes an **Order Shipped** event when items leave the warehouse. Tagged as the thing that makes your product unique (real-time inventory-aware order promising).
- **Notifications** — sends transactional emails/SMS, described as a thin wrapper over a third-party provider. Tagged as an off-the-shelf-style commodity.
- The connection between them isn't recorded yet — the relationships list is empty.

So the short answer to "how should I record that the two are connected" is: as a one-directional dependency from Orders to Notifications, where Orders is the source of the event and Notifications consumes it. But *how* you record it changes the team-autonomy consequences, and there's one decision that determines everything else, so let me ask the sharp version first.

When Orders changes the shape or meaning of its "Order Shipped" event — say it renames a field, splits the event in two, or starts emitting it at a different moment — whose job is it to absorb that change?

**Q: Does the Notifications side own a translation step that converts the Orders event into its own internal shape, or does it read the Orders event fields directly and react to them as-is?**

**Recommendation:** Have Notifications own a small translation step (consume the Order Shipped event, map it to a Notifications-internal "send shipment email" trigger). The reason is specific: Orders is your competitive core and will keep changing fast as you tune the promising algorithm, while Notifications is explicitly a thin commodity wrapper. A translation layer means Orders can evolve its event freely without ever breaking your email sending, and the cheap/disposable side absorbs the churn — not the valuable side. If instead Notifications reads the raw event fields directly, every Orders event change risks silently breaking shipment emails. The one case where I'd skip the translation layer is if the Order Shipped event is already a stable, deliberately-published contract that Orders commits not to break — tell me if that's the situation and I'll record it differently.

Once you answer, I'll write the labelled relationship into `docs/CONTEXT-MAP.yaml` with a one-line note on what it means for each team's autonomy.
