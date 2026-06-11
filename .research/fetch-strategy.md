# Fetch & Mutation Strategy

## Core Principle

> **Server state never lives on the client.**
> If it's in the DB, fetch it in a Server Component via the data layer. Mutations call `revalidateTag`. Done.

---

## The Cycle

```
DB → Data Layer (cached) → Server Component
          ↑
     revalidateTag()
          ↑
     Server Action (next-safe-action)
```

---

## The Three Layers

### 1. Data Layer — owns caching and tags

```ts
// lib/data/todos.ts
export const getTodos = unstable_cache(
  () => db.query.todos.findMany(),
  ['todos'],
  { tags: ['todos'] }
)
```

- All reads go through here
- Cache tags are defined once, co-located with the query
- Developers never touch cache tags directly elsewhere

### 2. Actions Layer — owns mutations and invalidation

```ts
// lib/actions/todos.ts
export const updateTodoAction = actionClient
  .inputSchema(schema)
  .action(async ({ parsedInput }) => {
    await db.update(...)
    revalidateTag('todos') // matches the tag in the data layer
    return { success: true }
  })
```

### 3. UI Layer — Server Components fetch, Client Components act

```tsx
// Server Component — just reads
export default async function TodoList() {
  const todos = await getTodos()
  return <TodoItem todos={todos} />
}

// Client Component — just fires actions
'use client'
export function TodoItem({ todo }) {
  const { execute, isPending } = useAction(updateTodoAction)
  return <button onClick={() => execute({ id: todo.id, done: true })} />
}
```

---

## Decision Table: update field → text changes in page

| Situation | Approach |
|---|---|
| Text is in a Server Component | `revalidateTag` in the action (default) |
| Text is client-only, single consumer | `useState` updated from action `onSuccess` |
| Text is shared across multiple client components | TanStack Query + `invalidateQueries` |

---

## When to add TanStack Query

TanStack Query is complementary, not a replacement. Add it only when the default physically can't do the job:

| Scenario | What to add |
|---|---|
| Need instant feedback before server responds | `useOptimisticAction` from next-safe-action |
| Data fetched after user interaction (search, filter, pagination) | TanStack Query for that query only |
| Multiple unrelated client components share the same server data | TanStack Query + `invalidateQueries` after action |
| Polling / background sync | TanStack Query `refetchInterval` |
| Truly ephemeral UI (modal open, selected tab) | `useState` — not server state, different concern |

### TanStack Query pairing example

```ts
// read
const { data } = useQuery({ queryKey: ['item', id], queryFn: () => fetchItem(id) })

// write + invalidate
const { execute } = useAction(updateFieldAction, {
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['item', id] }),
})
```

Note: this causes an extra round-trip (action → invalidate → refetch). Only worth it when multiple consumers need to react.

---

## What NOT to do

- Don't fetch server data in Client Components with `useEffect` + `fetch`
- Don't use TanStack Query as the default — reach for it only when the Server Component cycle breaks down
- Don't call `revalidatePath` with specific paths when tags work — tags are more resilient to route changes
