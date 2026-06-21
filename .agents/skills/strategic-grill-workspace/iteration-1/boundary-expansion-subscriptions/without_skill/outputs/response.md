Before we move anything, I want to push back gently — because "users are the ones with subscriptions" is true but it's not the same thing as "subscriptions belong in the User module." Almost every entity in a system can be traced back to a user somehow; that alone isn't a reason to co-locate. Let me lay out what I'm seeing in your current design and then ask the questions that actually decide this.

## What your context map says today

Your `User` context is described — deliberately and emphatically — as *narrow*:

> "Identity, authentication and session management. Deliberately narrow — owns who a person is and how they log in, **nothing about what they pay for.**"

It even goes out of its way to forbid the words `Account`, `Member`, and `Customer` in the User language, precisely so that nobody confuses "an identity that can log in" with "an entity that has a commercial relationship with us." Subscription management is squarely on the "what they pay for" side of that line.

Meanwhile `Billing` ("generates invoices and processes payments") is a `supporting` context that's already a `Customer-Supplier` downstream of `User`, adapting to the `UserId` contract.

So the proposal isn't just "add a folder." It's reversing an explicit boundary decision someone made on purpose. That might be the right call — boundaries should change when the domain teaches you something — but it deserves scrutiny.

## The questions that actually decide this

**1. Where does subscription logic naturally cluster — with login, or with money?**
A subscription has plans, billing cycles, proration, upgrades/downgrades, dunning, trial expiry, cancellation. How much of that touches authentication or sessions? My strong suspicion is: almost none. It touches *invoices and payments* constantly. If that's true, subscriptions want to live next to Billing, not User.

**2. What changes together?**
When you ship a pricing change, a new plan tier, or a payment-provider migration, which modules get edited? If the answer is "Billing and the new subscription code," then folding subscriptions into User creates a module that two unrelated reasons force you to change — auth changes *and* pricing changes both touch it. That's the thing bounded contexts exist to prevent.

**3. Is "User" about to silently become "Customer"?**
The map explicitly bans `Customer` from the User language. A user who can't pay (SSO-only employee, a deactivated login, a service account) still has a perfectly valid identity. A subscription belongs to a *paying relationship*, which may not map one-to-one to a login. If you put subscriptions in User, you're quietly redefining User as Customer — and then either the `avoid` list is wrong, or the placement is.

**4. What's the real motivation — and is there a cheaper way to get it?**
"It makes sense to keep them together" usually masks a concrete pain. Is it that a query needs both? (That's a read-model / join concern, not an ownership one.) Is it that a subscription needs a `UserId`? (It can hold one as a reference without living inside User — Billing already does this.) Is it team ownership? (Then the question is org-shaped, not domain-shaped.) Knowing the actual driver changes the answer a lot.

## My tentative recommendation

On the evidence in front of me, I'd lean toward **a Subscriptions capability that lives with Billing (or as its own context adjacent to Billing), referencing `UserId` rather than absorbed into User.** That preserves the narrow, valuable identity boundary you deliberately drew, and keeps "what they pay for" on one side of the line.

But I'm reasoning from two short YAML files. Tell me:
- What concrete problem made you want to move it?
- What does subscription code actually call into today — auth/session, or invoices/payments?
- Does every subscription correspond to exactly one login, always?

Answer those and we can decide this on the domain's terms rather than on "they're related."
