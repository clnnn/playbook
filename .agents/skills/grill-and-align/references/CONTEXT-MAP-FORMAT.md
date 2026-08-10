# CONTEXT-MAP.yaml format

## Where the files live

```
/
├── docs/
│   ├── CONTEXT-MAP.yaml              ← system-wide context map
│   └── adr/                          ← every ADR, whatever it affects
├── packages/
│   ├── ordering/
│   │   └── docs/
│   │       └── CONTEXT.yaml
│   └── billing/
│       └── docs/
│           └── CONTEXT.yaml
└── apps/
    └── web/
        └── docs/
            └── CONTEXT.yaml
```

One context is one directory under `packages/`. That directory holds the `CONTEXT.yaml` and may hold several Nx projects below it. A context whose code lives in an app takes the same layout under `apps/`.

Use this layout from the first context onward, without asking. The map's `path` entry is the truth about where a `CONTEXT.yaml` sits, so a later move costs one line.

## The map

```yaml
contexts:
  - name: Ordering
    path: ../packages/ordering/docs/CONTEXT.yaml
    tag: core
    description: Receives and tracks customer orders; the real-time rerouting algorithm is the differentiator.

  - name: Billing
    path: ../packages/billing/docs/CONTEXT.yaml
    tag: supporting
    description: Generates invoices and processes payments.

  - name: Auth
    path: ../packages/auth/docs/CONTEXT.yaml
    tag: generic
    description: Identity and session management; using Clerk.

relationships:
  - upstream: Ordering
    downstream: Fulfillment
    description: Ordering emits OrderPlaced events; Fulfillment consumes them to start picking.

  - upstream: Fulfillment
    downstream: Billing
    description: Fulfillment emits ShipmentDispatched events; Billing consumes them to raise an invoice.

  - peers:
      - Ordering
      - Billing
    description: Both share the CustomerId and Money types.
```

`path` is relative to the map file, which sits in `docs/`. A package one level below the repo root is therefore `../packages/<slug>/docs/CONTEXT.yaml`.

## Relationship shape

A relationship with a direction uses `upstream` and `downstream`. Upstream is the side whose data or decisions flow first. A relationship with no direction uses `peers` as a two-item list.

`description` is required, and it is free text. Write one sentence that names what crosses the boundary, and who adapts when the other side changes.

## Rules

- **Every context carries exactly one tag.** `core`, `supporting` or `generic` — never two, never none.
- **Ask for the tag; never guess it.** Ask the user which capability the business loses if it buys this part off the shelf. `core` is the part they would never let anyone else run. `generic` is the part they would happily pay a vendor for. `supporting` has to work, but it is not their edge.
- **Justify the tag in `description`.** A `core` entry names the capability that a bought replacement would lose. A `generic` entry names what you buy, or why you build a commodity yourself.
- **Keep implementation out.** This is a map of boundaries and how they relate. It is not an architecture spec.
