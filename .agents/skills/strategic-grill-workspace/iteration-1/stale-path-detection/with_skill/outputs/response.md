Before we get into fraud detection, I need to flag a mismatch I found while reading your setup.

## Stale path in your context map

`docs/CONTEXT-MAP.yaml` says your payments area lives here:

```
- name: Billing
  path: ./packages/billing/docs/CONTEXT.yaml
```

But that path doesn't exist. The actual package on disk is **`packages/payments`**, and its `CONTEXT.yaml` notes: *"Directory was renamed from 'billing' to 'payments'."* So the map is pointing at a folder that's been renamed out from under it.

There are actually three things out of sync between the map and the code:

1. **Path** — `./packages/billing/docs/CONTEXT.yaml` should be `./packages/payments/docs/CONTEXT.yaml`.
2. **Name** — the map calls the context `Billing`; the package calls itself `Payments`.
3. **Language** — the map's description still says "generates invoices," but the package glossary only defines `Charge` (an authorized + captured payment) and lists `Payment` and `Transaction` under `avoid`. There's no "invoice" or "billing" term defined anywhere in the actual package.

I don't want to drop fraud detection on top of a map that's already drifted, because where it "should go" depends on what that area actually is. So one cleanup question first, then we'll grill the real decision.

**Q: Should I correct the map to match the code — rename `Billing` to `Payments` and fix the path to `./packages/payments/docs/CONTEXT.yaml` — before we add anything?**

**Recommendation:** Yes, fix it now. The code is the source of truth here: the package renamed itself to `payments` and chose `Charge` over `Payment`/`Transaction` as its word. Carrying a stale `Billing` entry forward means every decision we make about "where fraud detection goes" will reference a context that no longer exists by that name, and the drift will only compound.

Once you confirm, the first real question I want to grill you on is whether "fraud detection" belongs *inside* the Payments area at all, or whether it's a distinct area of the system that Payments merely consults — because that boundary choice determines who owns the rules and who adapts to whom. But let's lock down the map first.
