Before I grill the "member" idea, two quick things.

**First — where the decisions get written down.** I went looking for existing documentation in this repo (a system-wide map and any per-area glossaries) and there's nothing yet — the project is effectively empty on that front. Before we go any further I want to agree on where this lands, because everything we crystallise in this session needs a home. My suggested starting layout:

```
/
├── docs/
│   ├── CONTEXT-MAP.yaml      ← one map of all the areas of your system + how they connect
│   └── adr/                  ← record of the hard-to-reverse decisions we make
└── packages/ (or src/, libs/)
    ├── accounts/docs/CONTEXT.yaml   ← the glossary for each area
    ├── users/docs/CONTEXT.yaml
    └── ...
```

If you'd rather structure it differently, tell me and I'll follow your layout. If you have no preference, I'll use the above.

**Second — the thing I have to push on before anything else.** You've now got *four* words for people in your system: account, user, customer, and now member. That's a red flag. In my experience this is where systems rot: each word quietly means something slightly different to different parts of the team, and six months later nobody can tell you whether a "member" is a kind of "customer," a flag on a "user," or its own thing entirely. I'm not going to let us add the fourth word until I understand the first three. So let's start there.

**Q: Today, what is the precise difference between an "account," a "user," and a "customer" in your system — specifically, which one represents a single human being who logs in, and which (if any) represents a paying entity that could be a company?**

**Recommendation:** Define them as three distinct concepts and pick one canonical word for each before we touch "member." My working assumption, which I'll correct once you answer: a **User** is one human with login credentials; a **Customer** is the paying entity (which may be a company spanning many Users); and an **Account** is the overloaded one that's secretly doing the job of one of the other two. We need that nailed down first, because "someone who's paid for a subscription" almost certainly attaches to whichever of these is your *paying entity* — and if that's "Customer," then "member" may not need to be a new concept at all, just a state a Customer is in. Naming it prematurely is how you end up maintaining four tables for one idea.
