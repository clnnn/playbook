# Boundary Signals: hearing DDD structure in plain business talk

This is the decoder ring. The user speaks business; you hear domain structure.
Use it when the domain is big or tangled and you want to be systematic about not
missing a seam. Each signal below is something a person naturally says or a
question you naturally ask — followed by the boundary it usually reveals.

## Signals that a bounded context boundary runs here

- **One word, two meanings.** "Customer" to the sales team is a lead with a
  pipeline stage; to the support team it's an account with a ticket history; to
  finance it's a billing entity. Same word, three models → three contexts. Ask:
  *"When your people say 'X,' does everyone picture the same thing?"*
- **A different team / person owns it.** If the warehouse handles it and sales
  never touches it, that's a seam. Org charts leak domain boundaries. Ask:
  *"Whose job is that? Who do you go to when it breaks?"*
- **A handoff verb.** "Then it *gets sent to*…", "we *pass it over to*…", "it
  *goes into* the other system." Handoffs are context boundaries with a
  relationship across them. Ask: *"Who's holding the ball right before and right
  after that moment?"*
- **A lifecycle that starts or ends.** Something is "done" in one part and
  "just beginning" in another — an order is *complete* at checkout but the
  shipment's life is *just starting*. Different lifecycles → different contexts.
- **Different rate of change.** The pricing rules change weekly; the tax rules
  change when a government says so. Parts that change at wildly different speeds
  want to be separated so one doesn't drag on the other.

## Signals about which context matters most (subdomain classification)

- **Core domain** — the answer to "what must you be uniquely great at, that you'd
  never let anyone else run?" This is where custom design effort pays off. Grill
  this one hardest; get the language exactly right.
- **Supporting subdomain** — "it has to work, but it's not your edge." Needs to
  exist, doesn't need to be brilliant. Build it simply.
- **Generic subdomain** — "you'd happily pay a vendor for this" (auth, payments,
  email, tax calculation). A candidate to buy, not build. Signal: the rules come
  from outside and everyone in the industry does it roughly the same way.

## Signals about consistency and truth (aggregate / invariant boundaries)

- **"That can never happen."** Any rule the business states as an absolute — "you
  can't ship what isn't paid for," "a seat can't be double-booked" — is an
  invariant. What must hold together defines a consistency boundary (an
  aggregate). Ask: *"What's the rule that must never, ever be violated, even for a
  second?"*
- **"Instant" vs "eventually."** "The moment they pay, the seat is theirs" (must
  be immediate) versus "the loyalty points show up by end of day" (can lag).
  Immediate → one transaction/aggregate; can-lag → separate contexts talking
  asynchronously.
- **"Who wins in a tie?"** When two systems hold the same fact and disagree, the
  answer names the source of truth — and tells you which context *owns* that fact
  and which merely holds a copy.

## Signals about relationships between contexts (context mapping)

Once you have two contexts, listen for *how* they relate — it shapes the design:

- **One bends to the other.** "We just take whatever format billing gives us."
  One side conforms to the other's model. If that's painful, they may need a
  translator (an anti-corruption layer) — in plain terms, *"a little adapter so
  their mess doesn't leak into yours."*
- **A shared thing in the middle.** "Both teams rely on the product catalogue."
  A shared kernel — powerful but fragile, because a change hurts both. Ask if the
  shared thing is really the same, or two things wearing one name.
- **Upstream / downstream.** Whoever's data or decisions flow first is upstream;
  they can make life easy or hard for downstream. Ask: *"If they change how they
  do things, does it break you? Or the other way round?"*