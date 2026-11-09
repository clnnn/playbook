# Generators and runs

## Generators

- **Build valid inputs directly.** A filter or precondition that rejects most inputs leaves the run testing the trivial cases that survive (QuickCheck's ordered-insert property mostly tested lists of length 0 or 1). Filter only to drop a small fraction; otherwise write a generator that constructs valid values.
- **Generate through the public interface.** Build values with the seam's own constructors and operations rather than assembling internal representations by hand.
- **Make equal values collide.** When keys, IDs or elements matter by equality, draw them from a small range so "already present" and "duplicate" cases come up often, not 1 run in 5.
- **Name domain generators** as reusable functions, start narrow, widen step by step, and add known edge values (empty, zero, boundaries, non-ASCII text) explicitly. A failure while widening tells you what "valid" means; record that in the generator or the spec.
- **Test non-trivial generators.** A property that every generated value is valid, including any expected result a by-construction generator carries. Generators are test helpers, not seams, so these checks sit beside the seam's tests rather than needing a seam of their own. A broken generator produces failures elsewhere that are very hard to read.
- **Cover what the API can produce.** If operations can create values the generator never builds (a tree after deletes), the property never sees them.

## Shrinking

- Prefer a library whose shrinking runs through the generator (integrated shrinking), so shrunk values keep the generator's constraints. Type-based shrinking can shrink to values the generator never produces and needs a custom shrinker that keeps validity, with a property that every shrunk value is valid.
- Dependent generation (a value drawn from a generator chosen by an earlier value: chain, flatMap, bind) shrinks poorly in many libraries. Prefer independent draws combined with map; when a counterexample stays large, that is the usual cause.
- In a choice between alternatives, list the simplest first; shrinking moves toward the front.
- State machine runs shrink by dropping steps, then shrinking each step; preconditions on commands keep the shrunk sequence valid.

## Seeds, replay and regressions

- Every failure reports its seed (or the library's replay token) so the exact run can be repeated.
- Failure databases and stored seeds are a cache: they stop reproducing once the generator changes. The durable record is the shrunk counterexample pinned as an example test.
- In CI, run with a fixed or derived seed so the same cases run until the code changes.

## Labeling

Whenever a property has a precondition or branches on the shape of its input, label each branch (the library's classify, event, statistics or coverage feature) and confirm none sits near 0%. A property that passes 100 runs of the trivial case gives false confidence. A coverage check that fails the property when a category falls below a threshold stays in the suite; a one-off look at the distribution, used to tune the generator, does not.

## Run budget

- Use the library's default count in the normal suite: typically 100, 256 in proptest, 1000 in jqwik.
- Model and state machine properties may need far more runs to reach deep bugs. A separate heavier run (a nightly job, a higher count set through the environment) is an option; set it up once there is a CI to host it.
- Keep each run fast enough that the default count fits in the inner loop.

## Determinism

A property is deterministic given its input. Inject clocks, random sources and ID generators; draw all randomness from the generator; give each run fresh state. Libraries that replay a failure and see it pass report the property as flaky, which points at hidden state or timing.

## Libraries

Pointers only; the skill's rules hold for any of them.

| Language | Library |
|---|---|
| TypeScript / JavaScript | fast-check |
| Python | Hypothesis |
| Java | jqwik |
| Kotlin | Kotest property testing |
| Rust | proptest (+ proptest-state-machine) |
| Go | rapid (`testing/quick` is frozen and does not shrink) |
| C# / F# | FsCheck, CsCheck |
| Haskell | QuickCheck, Hedgehog |
| Elixir | StreamData |
| Erlang | PropEr |
