# property-testing setup

What `setup-playbook` writes for this extension.

## Block line

Under `### Testing` in the `## Playbook extensions` block:

```markdown
### Testing

Property-based testing extends `tdd` and `diagnosing-bugs`. See `docs/agents/testing.md`.
```

## `docs/agents/testing.md`

```markdown
# Testing

- When using the `tdd` skill, also call the Skill tool with "property-testing": properties are extra slices in the same loop, at the same agreed seams.
- When `diagnosing-bugs` builds its property / fuzz loop, call the Skill tool with "property-testing": pin the shrunk failing input as an example test, and keep the property when its rule has a source.
```
