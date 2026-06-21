Before I answer, one thing in your setup needs flagging, because it changes the answer.

## Your docs are out of sync

Your `docs/CONTEXT-MAP.yaml` describes the payments area as a context called **Billing** living at `./packages/billing/docs/CONTEXT.yaml`. But on disk there is no `packages/billing/` — the actual package is `packages/payments/`, and its `CONTEXT.yaml` even notes: *"Directory was renamed from 'billing' to 'payments'."*

So the map is stale. It still points at the old path and the old name. Worth fixing the map (rename `Billing` -> `Payments`, repoint the path) so the rest of this discussion — and your tooling — references something real.

## Where fraud detection should go

Based on what's actually in the codebase, here is how I'd think about it:

**The Payments context owns charges, not fraud.** Its language is deliberately narrow — the one published term is `Charge` ("an authorized and captured payment against a customer's payment method"), and it explicitly tells you to *avoid* the words `Payment` and `Transaction`. That's a context that has been kept tight on purpose: authorize and capture money, generate invoices. Fraud detection is a different responsibility — it's about *deciding whether a charge should be allowed*, which is risk assessment, not settlement.

That suggests fraud detection does **not** belong inside Payments as just more code in the same package. A few options, roughly in order of how much I'd lean toward them:

1. **A new bounded context (e.g. `Risk` or `FraudDetection`).** If fraud is going to grow — rules, scoring, manual review queues, ML signals, chargeback feedback loops — give it its own package and its own language (terms like `RiskScore`, `Decision`, `Review`). Payments would then call into it (or consume its decisions) before capturing a Charge. This keeps Payments' tight vocabulary intact.

2. **A capability inside Payments, behind a clear seam.** If fraud detection is genuinely small and only ever gates a Charge — a thin "is this charge allowed?" check — you could keep it in `packages/payments` as a separate module with its own internal model, accepting that you'll extract it later if it grows.

My honest lean is option 1, because the way Payments has been scoped (rename, narrowed language, "avoid Transaction") tells me your team already values keeping these responsibilities separate.

## Questions that decide it

To give you a firm recommendation rather than options, I'd want to know:

- **When does fraud detection run?** Before authorization, between authorize and capture, or asynchronously after? That dictates whether it's an inline dependency or an event consumer.
- **Who owns it?** Same team as Payments, or a separate risk/trust team? Ownership boundaries usually want to match context boundaries.
- **Does Orders care about fraud too?** Your map already has Orders as upstream Customer-Supplier to Billing/Payments. If a fraud decision can block an order (not just a charge), the new context likely sits alongside both, not buried inside Payments.
- **How much will it grow?** A static rules check is a module; an evolving risk platform is its own context.

If you answer those — especially the timing and ownership — I can give you a concrete placement and the contracts between it and Payments. And either way, I'd fix that stale CONTEXT-MAP entry first.
