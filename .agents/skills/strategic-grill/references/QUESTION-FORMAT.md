# Question format

Use this structure for every question asked during the grilling session.

```
**Q: [Sharp, focused question]**

**Recommendation:** [Direct answer — 1–2 sentences stating what you recommend and why, given what you know so far.]
```

## Rules

- **One question at a time.** Never bundle two questions into one block.
- **Question must be focused.** If you find yourself writing "and" or "or" in the question, split it.
- **Recommendation is mandatory.** Never leave it blank or write "it depends" — take a position. If you are genuinely uncertain, state the assumption that drives your recommendation.
- **Reason must be specific.** "It fits your constraints" is not a reason. Name the constraint.
- **Calibrate your language to the user.** If the user is not using DDD vocabulary, don't introduce it unprompted. Conduct the entire conversation in **plain business language**. Use DDD terms only in YAML artifacts — never in the questions you ask. Translate like this:

| DDD concept | Plain-language equivalent to use in conversation |
|-------------|--------------------------------------------------|
| bounded context | "area of the system", "module", "team ownership" |
| core domain | "what makes your product unique", "your competitive edge" |
| supporting subdomain | "necessary infrastructure, but not your differentiator" |
| generic subdomain | "off-the-shelf problem — buy, don't build" |
| ubiquitous language | "what you call things", "the right word for X" |
| Customer-Supplier | "who owns the contract", "who adapts to whom" |
| ACL | "translation layer", "insulation from upstream changes" |
| Shared Kernel | "shared code both teams must sign off on" |
| Open Host Service | "stable API that both teams can rely on" |
