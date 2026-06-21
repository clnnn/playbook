Before we start reshaping the system around notifications, I want to pressure-test that claim — because "it's what users love" is exactly the kind of statement that, if it's wrong, leads you to pour engineering effort into the wrong place.

Here's what I'm working with from your existing setup:

- **Orders** is tagged as the one thing that makes your product unique. Its stated edge is *real-time inventory-aware order promising* — telling a customer, at the moment they order, whether and when you can actually fulfil it.
- **Customers** is tagged as necessary-but-not-a-differentiator (profiles and contact details).
- There's no notification area in the system yet — so this would be a new part to add.

So you now have two things both claiming to be the heart of the product: order promising, and notifications. They can't both be the thing that makes you irreplaceable. That's the tension I want to resolve first.

**Q: If a competitor offered the exact same notification experience tomorrow — same channels, same speed, same polish — would your customers actually leave you for them, or would they stay because of something else you do?**

**Recommendation:** I'd push back on notifications being the core of your platform and keep it tagged as supporting, not core. Notifications are almost always a delivery mechanism for value created elsewhere — here, that "elsewhere" looks like the order-promising capability already documented as your differentiator. Users likely love the notifications because of *what* they're being told ("your order is confirmed and will arrive Tuesday"), not the notification machinery itself, which is a well-solved problem you could buy off the shelf (Twilio, Courier, Knock, etc.). If you can name a specific notification capability no competitor could replicate, I'll happily reconsider — but "users love it" on its own isn't enough to justify building and structuring your whole system around it.

A couple of things I deliberately did *not* do yet: I haven't added a Notifications area to your context map, and I haven't changed any tags. I want your answer first, because if notifications really are core, that's a significant and hard-to-reverse restructuring decision — and if they're not, we've avoided fragmenting your focus away from order promising.

---

Techniques fired: Push back on weak core-domain claims, Cross-reference with code

Captured: nothing yet — no context or tag has crystallised, so CONTEXT-MAP.yaml and CONTEXT.yaml are unchanged pending your answer.
