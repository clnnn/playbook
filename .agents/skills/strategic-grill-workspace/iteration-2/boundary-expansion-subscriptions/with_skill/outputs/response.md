Before we move anything, let me push back — because where this lands has real consequences, and what you've written down already argues against it.

Here's what your own docs say today:

- The **User** module is scoped deliberately narrowly: "owns who a person is and how they log in, **nothing about what they pay for**." It's marked as something you buy off-the-shelf (an identity provider), and it even lists "Customer" as a word to *avoid* — User is just an authenticated identity.
- The **Billing** module already "generates invoices and processes payments" — i.e. it's the module that deals with money and what people pay for.

"Users are the ones with subscriptions" is true the same way users are the ones with invoices — but you didn't put invoices in the User module, and for good reason. Having a thing and owning the rules about that thing are different. So before we redraw any boundaries, I want to nail down what you actually mean and where the weight really sits.

**Q: When you say "subscription management," what's the heaviest piece of work living inside it — deciding what a person is entitled to (plans, tiers, upgrades, trials, cancellation rules), or charging them for it (recurring payments, dunning, invoices)?**

**Recommendation:** Name the single hardest part out loud before we place it. My strong prior is that the centre of gravity is money and entitlements, which is Billing's territory, not identity's — your User module is explicitly an off-the-shelf identity provider that you've said owns "nothing about what they pay for," so dropping subscription rules into it directly contradicts its stated charter and mixes commodity auth with logic that probably differentiates your product. If anything, this likely wants to be its own module rather than folded into either existing one — but let's confirm where the hard part lives before we decide that.
