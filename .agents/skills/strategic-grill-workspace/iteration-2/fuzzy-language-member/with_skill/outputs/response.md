Before we add anything, I want to make sure "member" is actually a new thing and not a new name for something you already have. I read your existing glossary in the Accounts area, and it already defines three terms that sit right on top of the one you're describing:

- **Account** — "the billing entity that owns a subscription; may represent a single person or a company."
- **User** — "a single human who logs in with their own credentials. An Account can have many Users."
- **Customer** — "the party with a commercial relationship to us — in practice, whoever the Account bills."

Your description of a member — "people who've paid for a subscription" — overlaps all three. Paying for a subscription is already what an **Account** does. The party you bill is already the **Customer**. And "people" who interact with the system are already **Users**. So before I walk you through adding anything, I need to pin down what's genuinely new here, because right now "member" could just be a fourth word for a concept you've already named.

Let me take this one question at a time.

**Q: When you picture a "member," are you picturing the human being who logs in, or the billing entity that holds the subscription?**

**Recommendation:** I suspect you mean the human — a User whose Account has an active paid subscription — because you said "people." If that's right, "member" isn't a new entity at all; it's a *status* of an existing User (paid vs. not). I'd recommend we treat it that way rather than introducing a new top-level concept, because your glossary already says "An Account can have many Users," and bolting a parallel "member" entity alongside User would give you two words for the same human and an ambiguous answer to "is a free trial User also a member?" If instead you mean the billing entity, then you're describing the Account, and "member" is just a synonym we should fold into the Account definition's `avoid` list.

Once you tell me which one you mean, I'll know whether we're sharpening an existing term or genuinely carving out a new boundary — and we'll go from there.
