Before we go further, I want to flag something, because the word "order" is about to mean two different things in your system and that will bite you later.

I read your existing docs. Your `Orders` context defines an **Order** very specifically:

> "A customer's request to purchase one or more items at a point in time." — and it explicitly tells you to *avoid* "Purchase" and "Transaction".

So in your system today, an Order is something a **customer** sends **to you**, inbound. What you're describing now is the opposite direction: something **you** send **to a supplier**, outbound, to restock your own inventory. Same English word, opposite flow, different lifecycle, different owner. If we both call it "Order," every future conversation, every event name, and every line of code will be ambiguous about which direction it's going.

So my first question is about naming, not architecture.

**Q: What do you want to call the thing you send to a supplier to restock inventory — given that "Order" is already taken by the customer-facing concept?**

**Recommendation:** Call it a **Purchase Order** (or just **Restock Order** if you prefer plainer language). Reserve "Order" exclusively for the customer-facing concept it already names in the Orders glossary. This keeps the two flows unambiguous in conversation and in code, and it matches the common industry split where "sales order" (inbound) and "purchase order" (outbound) are deliberately never both called just "order."

Once we agree on the word, the next thing I'll want to pin down is *where this new concept lives* — whether it belongs inside your existing Suppliers context (which today only manages supplier records and contacts) or in a new context of its own — and then how it relates to inventory and to the Suppliers area. But naming first: if we get the word wrong, everything downstream inherits the ambiguity.

---

Techniques fired: Challenge against the glossary, Sharpen fuzzy language

Captured: nothing yet — holding all file changes until you confirm the term. The conflict is real (Orders glossary defines "Order" as customer-inbound; your new concept is supplier-outbound), so I don't want to write a second clashing definition into the docs until we settle on the name.
