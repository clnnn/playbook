---
name: property-testing
description: Property-based testing as an extension of tdd. Use when a seam's behavior follows a rule over many inputs (roundtrip, invariant, model, metamorphic relation), when adding properties to existing example tests, or when diagnosing-bugs runs its property / fuzz loop.
---

# Property-Based Testing

A **property** is a rule stated for every input, checked against generated inputs, with a failure shrunk to a minimal counterexample. This skill extends `tdd`: a property is one more slice in the same red → green loop, at the same pre-agreed seams, under the same tautology ban. Load `tdd` first; this file covers only what properties change.

## When a property earns its place

Walk the ladder for each agreed seam and note every rung that holds; the strongest few become the seam's properties (see Independent oracles for strength):

1. An inverse exists (encode/decode, write/read) → **roundtrip**.
2. A simpler reference or a cheap abstract model exists, or the generator can build the input from parts whose expected result it already knows → **model / oracle / by construction**.
3. The output type has a validity rule (sorted, balanced, totals non-negative) → **validity**, checked on every operation's output.
4. Checking a result is far cheaper than computing it → **easy to verify**.
5. A known change to the input moves the output predictably → **metamorphic**.
6. A law holds (idempotent, commutative, associative, identity, valid input passes through unchanged) → **algebraic**.
7. Stateful, with many possible operation orders → **state machine** against a model.
8. Rich input and none of the above → **survives**: returns a value or fails only in documented ways.
9. Otherwise → **examples only**. This is the right answer for wiring, orchestration, thin wrappers, known specific boundaries, and business rules that are lists of cases rather than laws.

Then the cost check: valid inputs can be built directly, without filtering most of them away, and one run is fast enough to repeat 100+ times. When either fails, narrow the property or stay with examples.

Patterns, with examples: [patterns.md](patterns.md).

## Where properties go in the loop

1. **Seam proposal.** Beside each seam's one-line note (what it catches, what it misses), name the rule expected there and its **source**: the spec, `GLOSSARY.md`, an ADR, or the user's words. A rule read off the implementation restates the code; it becomes a property only once one of those sources states it. Where the spec leaves a case open (is the empty string a valid result?), the answer is a question for the user at this step, so the rule's source is confirmed before its property is written.
2. **Examples first.** The first slice at a seam is an example test. Its green fixes the interface the property will generate against.
3. **Property slice.** One property per slice, red before green, citing its source in the test name or a one-line comment. Aim for the few most valuable properties per seam, about three at most. Green means the property passes over the full run, so the fix addresses the rule the counterexample breaks, not that one input.
4. **A property green on its first run** has not yet shown it can fail. Break the code deliberately (do nothing, drop part of the input, off by one; see [patterns.md](patterns.md)) and keep the property only if some break turns it red. Revert every break.
5. **A failing property is the new red.** Take the shrunk counterexample and triage it, then pin it as an example test so it runs every time, independent of seeds and generator changes:
   - **Real bug:** pin the counterexample first (red), then fix.
   - **Input the spec excludes:** narrow the generator, record the exclusion in the property, and pin the counterexample with the behavior the user confirmed for it. This example records a decision, so it may pass as soon as it is written.

Example tests stay. They are the readable spec, and they catch what a weak property lets through.

## Independent oracles

`tdd`'s tautology rule holds unchanged: the input is generated, the expected outcome comes from an independent source. For a property that source is one of:

- the **inverse** operation;
- a **validity** rule on the output;
- a **simpler reference**: brute force, the previous version, an abstract model the result is mapped onto;
- a **relation between runs**: the same call with a known change to its input;
- a cheap **verification** of the answer.

Strength: prefer a model property plus a validity property; reach for metamorphic properties when a model would be costly or would mirror the implementation. A roundtrip or a law alone also passes for a do-nothing implementation (`reverse(reverse(xs)) == xs` holds for identity), so pair it with a property or an example that a do-nothing implementation fails.

## From a fuzz loop

When `diagnosing-bugs` reaches the bug through random inputs, the shrunk failing input becomes the regression: pin it as an example test at the seam. Keep the property too when its rule has a source, so the next variant of the bug fails the same way.

## Generators and runs

Generators, shrinking, seeds and replay, labeling, run budget, flakiness, and libraries per language: [generators.md](generators.md).
