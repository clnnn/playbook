# CONTEXT.yaml format

```yaml
name: Ordering
description: Receives and tracks customer orders from placement to dispatch.

language:
  - term: Order
    definition: A customer's request to purchase one or more items at a point in time.
    avoid:
      - Purchase
      - Transaction

  - term: Invoice
    definition: A request for payment sent to a customer after delivery.
    avoid:
      - Bill
      - Payment request

  - term: Customer
    definition: A person or organization that places orders.
    avoid:
      - Client
      - Buyer
      - Account
```

## Rules

- **Be opinionated.** When multiple words exist for the same concept, pick the best one and list the others under `avoid`.
- **Keep definitions tight.** One or two sentences max. Define what it IS, not what it does.
- **Only include terms specific to this context.** Before adding a term, ask whether it is unique to this context or a general programming concept. Timeouts, error types and utility patterns are general — leave them out.
- **Group terms under a `group` key** when natural clusters emerge — add a `group: string` field to each term entry. If all terms belong to a single cohesive area, a flat list is fine.
