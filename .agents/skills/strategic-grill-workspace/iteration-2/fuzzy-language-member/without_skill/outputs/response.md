Happy to walk through it. Before we add the new concept, it's worth grounding ourselves in the language you already have, because "member" risks overlapping with terms that are already defined in your `packages/accounts/docs/CONTEXT.yaml`:

- **Account** — the billing entity that owns a subscription; may be a person or a company.
- **User** — a single human who logs in with their own credentials. An Account can have many Users.
- **Customer** — the party with the commercial relationship; whoever the Account bills.

The key thing to notice: **a subscription already lives at the Account level** (the Account "owns a subscription"). So the question "who has paid for a subscription?" is, in your current model, already answered by the Account/Customer pair. That's the tension we need to resolve before writing any code.

## The clarifying question first

When you say a "member" is "someone who's paid for a subscription," which of these do you actually mean?

1. **A status flag on something that already exists.** If "member" just means "an Account (or User) whose subscription is active and paid," then it's probably not a new entity at all — it's a *state*. You'd model it as `subscriptionStatus: active | trialing | past_due | canceled` (or an `isMember` derived property) on the Account. Adding a whole new noun here would create a synonym for "Account with an active subscription," which is exactly the kind of ambiguity your glossary's `avoid` lists are trying to prevent.

2. **A genuinely new role or relationship.** If "member" describes a *person who belongs to something* (a community, a tier, a group) in a way that User/Customer don't capture — e.g., individuals who join independently of the billing Account, or a B2C "membership" product distinct from your B2B accounts — then it's a real new concept and deserves its own term.

3. **A rename of an existing concept.** Sometimes "member" is just the word the business prefers for what the model already calls "User" or "Customer." If so, the right move is to align the glossary, not add a fourth term.

My instinct, given the wording, is that you're closest to **option 1** — "member" = the *paid* subset of an existing concept. But I don't want to assume.

## A few questions to pin it down

- **Who is the member — the Account or the human?** Can a single Account contain both members and non-members (e.g., 3 paid Users + 2 free Users), or does "paid" apply to the whole Account at once? This decides whether "member" attaches to Account or User.
- **What can a member do that a non-member can't?** If the answer is "access paid features," that's an *entitlement/authorization* concern, which may belong in a different context than Accounts.
- **What happens when they stop paying?** Do they cease to be a member but remain a User? That strongly suggests member is a *status*, not an identity.
- **Is this a B2B subscription (Account pays, Users get access) or a B2C membership (individual pays for themselves)?** Your current model is clearly B2B-shaped. A B2C membership might not fit cleanly into Account/User at all.

## Where this likely lands

Depending on your answers, the structural recommendation is probably one of:

- **Most likely:** No new entity. Add subscription state (`active`/`past_due`/etc.) and, if needed, a per-User or per-Account entitlement. "Member" becomes ubiquitous-language shorthand for "Account/User with an active paid subscription" — and we'd record that explicitly in the Accounts glossary so it doesn't drift into a synonym.

- **If it's truly a new concept:** Define `Member` as a first-class term in `packages/accounts/docs/CONTEXT.yaml` (or a new bounded context if it has its own lifecycle and rules), with a crisp definition and an `avoid` list distinguishing it from User and Customer — e.g., "a Member is a User with an active paid subscription; avoid using it interchangeably with User or Customer."

If you can answer the four questions above — especially *Account-level vs. User-level* and *what changes when they stop paying* — I can give you the concrete model, the glossary entry, and where it should live in the codebase. Which interpretation matches what you have in mind?
