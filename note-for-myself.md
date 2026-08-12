 
1) When creating a new project (goal: Walking Skeleton): 
/prd -> /grill-and-align -> /story-map -> /backlog (only walking skeleton user stories, R1 R2 deferred - maybe a two placeholder github issues with reference to story map) 

2) When you move from MVP to Release 1
/backlog promote R1


3) /backlog invoke /tickets
    /backlog deals with story map, milestone, release cycles
    /tickets define the shape, expect a conversation, note and converts to user stories/tickets

    /backlog includes the foundation
    foundation = the minimum tech decisions that proves the E2E production ready walking skeleton + (infra + testing tooling + module structure, module architecture test, E2E testing, observability, design system componenets if UI/fullstack) based on prd, story map, context files
           = the first story in MVP, not present in future release cycles

*any other technical decision can be implemented in a user story in the future

4) major change that is not affecting the release slices
/grill-and-align -> (optional: /handoff) -> /tickets

5) clear/obvious small change, bug, spike, 
/tickets or implement directly


- Foundation becomes a **checklist** of setup categories, each checked for applicability against the PRD/scenarios/context map rather than included wholesale. Full agreed list (baseline vs conditional), from the grilling session:

  **Baseline (almost always applies):**
  1. Module structure & boundaries
  2. Testing tooling
  3. Module architecture test
  4. E2E testing
  5. Observability (logging, metrics, basic tracing)
  6. Infra / CI-CD (build, test, deploy the skeleton)
  7. Datastore setup (connection, migrations tooling)
  8. Configuration & secrets management
  9. Error handling strategy (one consistent way failures surface/log across the E2E path)
  17. API contract & input validation (schema-first request/response shape, consistent error format)
  18. Success-metric instrumentation (wiring to measure the PRD §7 primary metric from day one — distinct from observability)
  19. Health checks (readiness/liveness)

  **Conditional (only if a §6 scenario/persona demands it):**
  10. Authentication
  11. Authorization
  12. Third-party integrations
  13. Design system components (if UI/fullstack)
  14. Security baseline (CORS, rate limiting, dependency scanning — if public-facing)
  15. Compliance / audit logging (if regulated data)
  16. Internationalization (if multi-locale is a launch requirement)
  20. Background job / async processing infra (if the E2E path includes anything async)
  21. Multi-tenancy (if the product serves multiple orgs/tenants)
  22. Notification infra (email/SMS/push, if the path includes notifying someone)
  23. Payment processing setup (special case of #12, called out since it's foundational the moment money moves)
  24. Accessibility (a11y) baseline (if UI/fullstack)

  Explicitly **excluded** from foundation (agreed to be future-story material, not blockers to a working skeleton): backup/disaster-recovery, caching strategy, feature flagging, i18n depth beyond the baseline, blue-green deploy.