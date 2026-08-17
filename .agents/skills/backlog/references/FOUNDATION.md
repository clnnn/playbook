# The foundation issue

One issue that makes the **skeleton** runnable: the thinnest end-to-end path — request → logic → datastore → response — runs in CI with the harness green. It blocks every story in the slice. It is a task rather than a story, so it skips the six-section story template and uses the body below.

Keep it **thin**. It holds what several stories stand on. Everything else folds into the story that needs it.

## Disposition

Every category below takes one of three:

- **foundation** — the end-to-end path cannot run without it, or several seeds need it. It rides the issue.
- **fold** — one capability needs it, so it rides that seed's scope and acceptance criteria and reaches `/to-user-stories` in the brief.
- **exclude** — nothing in this slice reaches it. Name the reason, and the **trigger** when it arrives later: *"applies at Release 2 — payment tasks land there."*

A folded category that two or more seeds need moves to foundation. Run that test after the seeds exist.

## Evidence

Every applicable category names what made it apply: a §6 scenario id, the §7 metric, a map task, or the persona. A category that names only itself is scope creep — exclude it.

With no PRD, infer applicability from the map's tasks and the repo, and mark each call 🔶. The gate is where the user strikes the wrong ones.

## Done-signals

Every foundation line ends on a runnable command or an observable state — "a forbidden import fails the build", "the migration command runs in CI against an empty database". A check with no command is a wish.

## The categories

Read the repo for the stack that already runs, and write each item against it. This list names no tool.

### Repo shape

Every other line in **Module structure & boundaries** inherits one call, so make it first: **monorepo** — each module a separately buildable package declaring its dependencies — or **single project** — modules as directories inside one build.

The repo usually answers it: a workspace manifest or a package-per-module layout *is* the shape, recorded rather than re-opened. Where no shape exists yet the call is the user's at the gate — name the one the slice's module count justifies, and mark it 🔶.

The shape decides the done-signal the category's enforcement line ends on:

- **monorepo** — the graph builds every package, and an import across a boundary absent from the importing module's manifest fails that package's build
- **single project** — the boundary check names the module directories, and an import across them fails the build

**Always considered, default disposition `foundation`:**

| Category | What it covers |
|---|---|
| Module structure & boundaries | the repo shape, one module per bounded context, dependency direction enforced |
| Testing tooling | the runner, the fixtures, one green test |
| Architecture test | an automated check that the boundaries hold |
| E2E testing | one test driving the skeleton path end to end |
| Observability | structured logs, metrics, one trace across the path |
| Infra / CI-CD | build, test and deploy the skeleton on every push |
| Datastore | connection, schema, migration tooling |
| Configuration & secrets | one way to read config; secrets stay outside the repo |
| Error handling | one way failures surface and log across the path |
| API contract & input validation | schema-first request and response shape, one error format |
| Health checks | readiness and liveness |

**Always considered, default disposition `fold`:**

| Category | What it covers |
|---|---|
| Success-metric instrumentation | the §7 primary metric, wired where the step producing it ships |

It folds to the seed shipping that step, and moves to foundation when several seeds feed the metric. With no PRD it becomes an open line: *no primary metric declared — nothing to instrument yet*.

**Conditional, default disposition `fold`. Each applies when:**

| Category | Applies when |
|---|---|
| Authentication | a scenario names a signed-in persona |
| Authorization | two personas see different data |
| Third-party integrations | the path calls a service the team does not own |
| Payment processing | money moves |
| Notification infra | the path tells someone something — email, SMS, push |
| Background jobs / async | the path includes work outliving the request |
| Multi-tenancy | the product serves several organisations |
| Design system components | the slice ships UI |
| Accessibility baseline | the slice ships UI |
| Security baseline | the surface is public — CORS, rate limiting, dependency scanning |
| Compliance / audit logging | the data is regulated |
| Internationalization | several locales ship at launch |

**Excluded by default:** backup and disaster recovery, caching, feature flags, i18n past the launch locales, blue-green deploy. Each is future-story material — the skeleton runs without them, and a story carries each when its slice arrives.

## The body

```markdown
# Foundation: walking skeleton runs end-to-end

Closes when the thinnest path — [request → logic → datastore → response,
in this product's words] — runs in CI with the harness green.

## In this issue

- [ ] **Datastore setup** — *applies because:* §6 DUR-1 requires an invoice to
      survive a restart — *done when:* the migration command runs in CI against
      an empty database
- [ ] **Module structure & boundaries** — *applies because:* the domain docs
      split billing from ordering — *shape:* monorepo, one package per context
      — *done when:* the graph builds both packages and an import from ordering
      into billing fails billing's build

## Folded into stories

- **Authentication** → seed 3 (sign in to the workspace) — §6 SEC-2

## Considered and excluded

- **Payment processing** — no money moves in this slice.
  *Trigger:* Release 2, where the pay-invoice tasks land.
- **Caching** — future-story material; the skeleton runs without it.
```

Labels: `foundation` plus the release label. Every story in the slice is blocked by it.

## Later slices

`promote` re-reads the excluded group's triggers first — they are the record of what this run deferred, so the next run reads a pointer instead of rediscovering the decision.

A category that now applies folds into the story needing it. Where several stories in the promoted slice need it, it becomes one delta issue, `Foundation: <release name>`, blocking those stories. An already-closed foundation issue stays closed.
