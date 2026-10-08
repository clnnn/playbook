# Slice criteria

The eleven criteria every slice is cut against. Each carries its **Check**: the question whose answer decides whether the slice passes. Use the names and wording as written.

1. **Tracer bullet.** The slice runs through every layer, from where the work comes in to where a person signs it off. Check: one real case can travel the whole path without anyone patching it by hand.
2. **Happy path.** Pick the case that is both most common and least branchy. Check: the slice follows exactly one path through the domain's decision tree.
3. **Isomorphic.** The slice has the same shape as something already shipped, so what's new is data, wording and configuration rather than new code paths. Check: each change either fills in an existing extension point or renames something that was specific to the first case.
4. **Riskiest assumption.** The slice tests the one belief that would sink the full version if it were wrong. Usually that's "does the abstraction hold for a second case?" Check: you can name the assumption, and the slice shipping proves or disproves it.
5. **Fence.** Cases outside the slice are turned away before they come in, never half-handled inside. Check: whoever sends the work applies one written rule that decides what enters.
6. **Invariant.** The slice keeps every recorded architecture decision and domain rule as it is. Check: each decision record still reads as true once the slice has shipped.
7. **Minimum input.** Add only the new facts without which the system would have to make a call it isn't allowed to make. Check: each new field is tied to a specific decision it keeps the system from making.
8. **Guardrail.** Compliance, safety and legal rules ship in the first slice, at full strength. Check: every hard rule in the source material is either enforced by the slice or excluded by the fence.
9. **Walking skeleton.** Later slices add to this one and never tear it down. Check: each piece of the slice is still there in the full version.
10. **Deferral ledger.** Everything cut from the slice is written down as the next slices, in order. Check: every case the source material covers lands either in the slice or in the ledger.
11. **Unknowns.** Open questions are sorted into two groups: those that block building (answer them first) and those that block sign-off (take them to the domain owner). Each carries a candidate answer, the most likely one. Check: each open question has an owner, a candidate answer, and sits in one of the two groups.

In criterion 3, "already shipped" means what exists before any slice ships for the first slice, and the slice before it for every later one.
