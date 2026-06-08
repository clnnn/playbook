# Architecture — One Nx Package per Bounded Context

## Approach

Each bounded context is a single Nx package containing everything for that domain: schema, queries, server actions, components, and pages. The Next.js app is a pure shell with only routing.

## Workspace Structure

```
apps/
  web/                    # Next.js shell — routing only

packages/
  ui/                     # Shared design system (scope:shared, type:ui)
  db/                     # Drizzle client + schema barrel (scope:shared, type:util)
  auth/                   # Auth bounded context (scope:auth, type:feature)
  orders/                 # Orders bounded context (scope:orders, type:feature)
  products/               # Products bounded context (scope:products, type:feature)
```

## Package Tags

| Package | Tags |
|---|---|
| `@workspace/ui` | `scope:shared`, `type:ui` |
| `@workspace/db` | `scope:shared`, `type:util` |
| `@workspace/auth` | `scope:auth`, `type:feature` |
| `@workspace/orders` | `scope:orders`, `type:feature` |
| `@workspace/products` | `scope:products`, `type:feature` |

## What lives inside each bounded context package

```
packages/<context>/src/
  schema.ts           # drizzle table definitions + inferred types
  queries.ts          # server-side drizzle queries
  actions.ts          # next-safe-action server actions (zod validated)
  components/
    *-page.tsx        # RSC pages (fetch data, pass to UI)
    *-form.tsx        # client islands (useAction hooks)
    *-<widget>.tsx    # dumb presentational components
  index.ts            # public API barrel
```

## Tech Stack per Layer

| Layer | Tool |
|---|---|
| Routing | Next.js App Router |
| Database ORM | Drizzle |
| Authentication | Better Auth |
| Server actions | next-safe-action |
| Validation | Zod |
| Shared UI | shadcn/ui (via `@workspace/ui`) |

## Dependency Rules

```
auth      → db, ui
orders    → db, ui, auth  (authActionClient + user FK reference)
products  → db, ui
web       → auth, orders, products, ui
```

**Cross-domain rule:** bounded contexts at the same level (`orders`, `products`) must not import from each other. Cross-domain communication goes through the app layer or a shared `db` query.

## Key Patterns

### `packages/db` — Drizzle client

```ts
// packages/db/src/index.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });
export * from './schema';
```

### `packages/auth` — shared action clients

```ts
// packages/auth/src/middleware.ts
export const actionClient = createSafeActionClient({ ... });

export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error('Unauthorized');
  return next({ ctx: { session } });
});
```

All other packages import `authActionClient` from `@workspace/auth` — no duplicated middleware.

### Server actions (per context)

```ts
// packages/orders/src/actions.ts
'use server';
export const createOrderAction = authActionClient
  .schema(createOrderSchema)   // zod
  .action(async ({ parsedInput, ctx }) => {
    // drizzle insert
    revalidatePath('/orders');
  });
```

### RSC pages (fetch on server, no loading state needed)

```tsx
// packages/orders/src/components/orders-list-page.tsx
export async function OrdersListPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');
  const orders = await getOrdersByUser(session.user.id);
  return ( /* render */ );
}
```

### Client islands (mutations only)

```tsx
// packages/orders/src/components/cancel-order-button.tsx
'use client';
export function CancelOrderButton({ orderId }: { orderId: string }) {
  const { execute, isPending } = useAction(cancelOrderAction);
  return <Button loading={isPending} onClick={() => execute({ orderId })}>Cancel</Button>;
}
```

### App shell — pure routing

```tsx
// apps/web/app/orders/page.tsx
import { OrdersListPage } from '@workspace/orders';
export default OrdersListPage;
```

## When to split a package

Split a bounded context package into sub-libs (`data-access`, `feature-*`, `ui`) only when:
- The package grows beyond ~10 files
- Multiple teams own different slices of the domain
- You need to lazy-load or tree-shake parts independently

Until then, one package per context is simpler and easier to navigate.
