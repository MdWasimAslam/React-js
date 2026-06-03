# React Mastery — 30-Day Interview Prep Plan

> **Target:** Mid-level React roles ( Zomato, Flipkart, Uber, Gulf mid companies)
> **Prereq:** Solid JS fundamentals (do the JS 30-day plan first, or at least Days 1–10 of it)
> **Time:** ~6 hours/day × 30 days = ~180 hours
> **Path:** Linear — foundations → hooks → advanced → ecosystem → machine coding → mock
> **Rule:** Build small apps every day. Reading docs ≠ knowing React.

---

## How to use this plan

- Each day: **Goal**, **Concepts**, **Build from scratch**, **Practice problems**, **Interview Q&A out loud**.
- Open a real Vite + React + TypeScript project on Day 1. Every day adds to it. By Day 30 you have a portfolio piece.
- Keep `notes.md` with one-line explanations of every concept in your own words.
- Every 5 days = 1-hour recall session (no notes, write what you remember).

### The starter project you'll grow over 30 days

A **fake Payment Dashboard** . It will end up with:

- TypeScript + Vite
- React Router v7
- TanStack Query + React Hook Form + Zod
- Tailwind + shadcn/ui
- Auth, RBAC, light/dark, RTL toggle (Arabic + English)
- Real-time payment status (SSE simulation)
- Tests with Vitest + RTL + MSW
- Deployed to Vercel

You don't need to finish it. You need to _touch_ every layer.

---

# PHASE 1 — REACT FOUNDATIONS (Days 1–6)

## Day 1 — Mental Model, Setup, JSX

**Goal:** Spin up a clean Vite + React + TS project. Explain what React actually does when you call `setState`.

### Concepts

- What React is — a library for building UIs out of components, with a reconciler that diffs virtual DOM trees
- Library vs framework — React is the UI; you bring routing, state, fetching
- Declarative vs imperative
- JSX — what it compiles to (`React.createElement` → `ReactElement` objects → reconciler)
- JSX rules: one root, `className` not `class`, `htmlFor` not `for`, camelCase events, expressions in `{}`
- Fragments `<>...</>` and when to use `<Fragment key={...}>`
- React Fiber (awareness only) — incremental, interruptible reconciler

### Setup (do this today)

```bash
npm create vite@latest payments-dashboard -- --template react-ts
cd payments-dashboard && npm install
npm run dev
```

- Install Tailwind, set up shadcn/ui later this week (Day 24)
- ESLint + Prettier with the React + React Hooks plugins enabled
- Folder structure: `src/{components, features, hooks, lib, routes, types}`

### Build

- A `<HelloPanel />` that displays a name from props
- A `<Stat />` component that takes `label` and `value` — render 3 of them in a row
- Inspect the output in React DevTools — see the component tree

### Interview Q&A

- "What is React?" — 30 seconds, with vocabulary: components, JSX, virtual DOM, reconciliation
- Library vs framework — name 3 things React doesn't do
- What does Babel do to JSX?
- Why can't a component return two sibling elements without a fragment?

---

## Day 2 — Components, Props, Composition

**Goal:** Type your component props with TypeScript. Use children + composition instead of configuration props.

### Concepts

- Function components only (class is legacy — recognize, don't write)
- Props — read-only, top-down
- Default props (via destructuring defaults, not `defaultProps`)
- `children` prop — the most underused tool
- Composition vs configuration:
  - Bad: `<Card title="..." body="..." footer="..." />`
  - Good: `<Card><Card.Header>...</Card.Header>...</Card>`
- Spreading props `<input {...rest} />` (and when it's risky)
- Naming: `PascalCase` for components, `camelCase` for props
- One component = one responsibility

### TypeScript for components

```tsx
type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

function Button({ variant = "primary", children, ...rest }: ButtonProps) {
  return (
    <button className={variant} {...rest}>
      {children}
    </button>
  );
}
```

- `React.ReactNode` for children
- `React.HTMLAttributes<HTMLButtonElement>` to inherit native props
- `React.PropsWithChildren<T>` helper

### Build

- `<Card>` with `<Card.Header>`, `<Card.Body>`, `<Card.Footer>` (basic compound pattern preview)
- `<Button>` with 3 variants + `<IconButton>` extending it
- Spread-and-merge classNames properly (you'll appreciate `clsx`/`cn` later)

### Interview Q&A

- Composition vs configuration — give an example
- Why use TypeScript with React?
- What's `React.ReactNode` vs `JSX.Element` vs `React.ReactElement`?

---

## Day 3 — State, Events, Conditionals, Lists

**Goal:** Build interactive UI. Get keys right. Stop using index as key.

### Concepts

- `useState` — initial value, updater, functional updates
- **Never mutate state** — always new reference (spread, `map`, `filter`)
- Event handlers — `onClick`, `onChange`, `onSubmit`
- `e.preventDefault()`, `e.stopPropagation()`
- Synthetic events (React's wrapper around native events)
- Conditional rendering — ternary, `&&`, early return
- **The `0` bug:** `{count && <Badge />}` renders `0` if count is 0 — use `count > 0 && ...`
- Lists with `.map()` and `key`
- Why **index as key** breaks reorderable lists / lists with internal state
- Stable, unique IDs (DB id, `crypto.randomUUID()`, `nanoid`)

### Build (add to dashboard)

- `<Counter />` with +, -, reset
- `<TodoList />` — add, toggle, delete, filter (all / active / done)
- `<TabBar items={...} />` — clickable tabs that switch active

### TypeScript

```tsx
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  setName(e.target.value);
const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); /* ... */
};
```

### Interview Q&A

- Why does React need a unique `key` on list items?
- Why can index-as-key be a bug? Give a concrete scenario.
- Functional updates — when do you need them?
- Why is mutating state a bug if React "uses Object.is"?

---

## Day 4 — Forms (Controlled vs Uncontrolled)

**Goal:** Build a controlled form with validation. Know when uncontrolled is right.

### Concepts

- **Controlled** — React state owns the value, `value` + `onChange`
- **Uncontrolled** — DOM owns the value, read via `ref` on submit
- File inputs — must be uncontrolled (React can't set their value)
- Form submission — `<form onSubmit>` and `e.preventDefault()`
- `<label htmlFor>` paired with `<input id>` — accessibility
- Pattern: single `formState` object vs many `useState` calls — when each is right
- Client validation vs server validation (always do both)
- Disabling submit during request

### Build

- Login form (email + password) — controlled, client validation, disable submit while pending
- Profile form (5 fields) — use one `useState({...})` object with spread updates
- File upload — uncontrolled with `ref`

### Interview Q&A

- Controlled vs uncontrolled — when to pick which?
- Why does file input have to be uncontrolled?
- How do you avoid re-rendering on every keystroke in a large form? (Hint: you'll fix this with React Hook Form on Day 23)

---

## Day 5 — Lifting State Up, Prop Drilling, Composition

**Goal:** Share state between siblings cleanly. Recognize prop drilling and know your options.

### Concepts

- "Lifting state up" — move shared state to the nearest common parent
- Prop drilling — passing props through layers that don't use them
- Three solutions to prop drilling:
  1. **Composition** (often the best — move the rendering up)
  2. **Context** (for cross-cutting concerns like theme, auth)
  3. **State library** (Zustand, Redux) for app-wide state
- The "color the parent" rule: when child A and child B both need data, the parent owns it

### Build

- Two sibling components: input on the left, live preview on the right — share value via lifted state
- A `<Layout>` that takes `header`, `sidebar`, `main` as **props** (slot pattern), not just `children`

### Interview Q&A

- What's lifting state up? Give a code example.
- When is prop drilling actually fine? When is it a problem?
- What is the slot pattern?

---

## Day 6 — TypeScript with React (Dedicated Day)

**Goal:** Type any component, hook, or event without searching.

### Concepts

- Typing props: `type` vs `interface` (use `type` by default; `interface` for things meant to be extended)
- Typing children: `React.ReactNode`
- Typing events: `React.MouseEvent<HTMLButtonElement>`, `React.ChangeEvent<HTMLInputElement>`, `React.FormEvent<HTMLFormElement>`
- Typing refs: `useRef<HTMLInputElement>(null)`, `useRef<number | null>(null)`
- Typing `useState`: usually inferred; explicit for `T | null` or unions
- Typing `useReducer`: action types as discriminated unions
- Generic components:
  ```tsx
  type ListProps<T> = { items: T[]; render: (item: T) => React.ReactNode };
  function List<T>({ items, render }: ListProps<T>) {
    return (
      <ul>
        {items.map((it, i) => (
          <li key={i}>{render(it)}</li>
        ))}
      </ul>
    );
  }
  ```
- Utility types you'll actually use: `Partial`, `Pick`, `Omit`, `Record`, `ReturnType`, `Parameters`
- Typing context (with non-null assertion or default object)
- `as const` for literal types
- `satisfies` operator (new — when to use)

### Build

- Convert everything from Days 1–5 to strict TypeScript (`strict: true` in `tsconfig.json`)
- Write one generic `<DataTable<T>>` component

### Interview Q&A

- Why TypeScript with React? (catch bugs at compile time, autocomplete, refactor safety)
- `type` vs `interface` — your default?
- How do you type a generic component?

---

# PHASE 2 — HOOKS MASTERY (Days 7–12)

## Day 7 — useState + useEffect Deep Dive

**Goal:** Use `useEffect` only when correct. Identify when it's wrong.

### useState

- Lazy initializer: `useState(() => expensiveCalc())` — runs once
- Batching: all `setX` calls in the same tick → one re-render (React 18+)
- Functional updates avoid stale state bugs
- State updates are async — don't read state immediately after setting it

### useEffect

- Mental model: **"synchronize with an external system"** — not "run after render"
- Dependency array variants: omitted, `[]`, `[deps]`
- Cleanup function — when it runs (before next effect, on unmount)
- Strict Mode runs effects mount→unmount→mount in dev — your effect must handle being run twice

### The 5 cases where `useEffect` is WRONG

1. Deriving state from other state/props → compute in render
2. Resetting state when a prop changes → use the `key` prop
3. Handling user events → handle in the event handler
4. Initializing state from props → lazy initializer or `key`
5. Caching expensive calculations → `useMemo`

### Build

- A clock component using `setInterval` + cleanup
- A subscription example (fake WebSocket) — connect on mount, disconnect on unmount
- Refactor an "effect that derives state" into a render-time computation

### Interview Q&A

- What is `useEffect` for, _really_?
- Why does my effect run twice in dev and how do I "fix" it? (Answer: you don't — write proper cleanup)
- What's the difference between `useEffect(fn)` and `useEffect(fn, [])`?

---

## Day 8 — useRef + useContext

### useRef

- Two uses:
  1. DOM reference (focus, scroll, measure)
  2. Mutable value that survives renders without triggering re-render
- Refs don't trigger updates — that's the point
- `forwardRef` (pre-React 19) — passing ref to a child DOM element
- React 19: `ref` is a regular prop on function components

### useContext

- Create context: `createContext<T>(default)`
- Provider: `<Ctx.Provider value={...}>`
- Consumer: `useContext(Ctx)`
- **Pitfall:** every consumer re-renders when context value changes — keep context narrow, or split (theme separate from user)
- Default value should be a type-safe sentinel (or throw in a hook wrapper if used outside provider)

### Build

- Focus-on-mount input (`useRef`)
- Track previous value with `useRef` (`usePrevious` custom hook)
- `<ThemeProvider>` + `useTheme()` hook with light/dark
- `<AuthProvider>` + `useAuth()` hook

### Interview Q&A

- `useState` vs `useRef` — when each?
- Why does Context cause re-renders, and how do you avoid it?
- Why throw an error in `useTheme()` if used outside the provider?

---

## Day 9 — useMemo, useCallback, React.memo

**Goal:** Know when memoization actually helps and when it's overhead.

### Concepts

- `useMemo(() => value, deps)` — caches a value
- `useCallback(fn, deps)` — caches a function reference
- `React.memo(Component)` — skips re-render if props are shallow-equal
- **All three rely on shallow equality** — a new object/array every render defeats them
- When memoization WINS:
  - Expensive computations (measurable in Profiler)
  - Stable references passed to memoized children
  - Values used as effect dependencies
- When memoization is OVERHEAD:
  - Cheap computations
  - Components that always receive new props anyway
  - Slapping it on everything "just in case"

### React Compiler (React 19) note

- Auto-memoizes — most manual `useMemo`/`useCallback` become unnecessary on enabled projects
- Don't claim production experience with it unless you have it
- Profile before adding any memoization

### Build

- A list of 1000 items with a slow filter — measure, then optimize with `useMemo`
- A parent + memoized child — show that inline `style={{}}` defeats `React.memo`, fix with `useMemo`

### Interview Q&A

- `useMemo` vs `useCallback`?
- Why doesn't `React.memo` help in this code? (show inline object prop) — how do you fix it?
- When is memoization premature optimization?

---

## Day 10 — useReducer, useLayoutEffect, useId

### useReducer

- When state has multiple sub-values that change together
- Action shape: `{ type: 'ADD'; payload: ... }` — discriminated unions for type safety
- Reducer must be pure
- `dispatch` reference is stable across renders (unlike `setX` from `useState`)
- When `useReducer` beats `useState`: forms with 8+ fields, multi-step flows, "impossible state" prevention

### useLayoutEffect

- Like `useEffect` but synchronous, before paint
- Use for: measuring DOM and updating in same frame to avoid flicker
- Don't use for: anything that can wait — it blocks paint
- Doesn't run on the server (SSR warning)

### useId

- Stable IDs for label/input pairing and ARIA — same on server and client
- Not for list keys

### Build

- A multi-step form using `useReducer`
- A "shopping cart reducer" — add, remove, change quantity, clear
- A tooltip that measures its target to position itself (`useLayoutEffect`)

### Interview Q&A

- `useState` vs `useReducer` — at what complexity do you switch?
- `useEffect` vs `useLayoutEffect` — when do you reach for layout effect?
- Why use `useId` instead of `Math.random()` or a global counter?

---

## Day 11 — Custom Hooks (Build 10)

**Goal:** Extract stateful logic. Build a small personal hook library.

### Rules

- Name MUST start with `use` (linter relies on it)
- Can call other hooks inside
- Compose freely — hooks all the way down

### Build all 10 from scratch

1. `useDebounce(value, delay)` — returns debounced value
2. `useThrottle(value, delay)`
3. `usePrevious(value)`
4. `useLocalStorage(key, initial)` — sync state with localStorage, cross-tab via `storage` event
5. `useOnClickOutside(ref, handler)`
6. `useWindowSize()`
7. `useMediaQuery(query)`
8. `useIntersectionObserver(ref)` — returns `isVisible`
9. `useCopyToClipboard()` — returns `{ copy, copied }`
10. `useFetch(url)` — basic; you'll replace this with TanStack Query on Day 19

### Interview Q&A

- What makes a function a "hook"? (Rules of Hooks, `use` prefix)
- Walk through how you'd build `useDebounce`
- When to extract logic into a custom hook vs leave it inline

---

## Day 12 — Rules of Hooks, Anti-patterns, Stale Closures

### Rules of Hooks

1. Only call at the top level (no loops, conditions, or nested functions)
2. Only call from React functions (components or other hooks)

- Why: React tracks hooks by call order. Conditional hooks break that order.

### Common anti-patterns (interviewers LOVE these)

- `useEffect` deriving state (Day 7) — fix: compute in render
- Syncing props to state — fix: `key` prop to remount
- Reading `localStorage` on every render — fix: lazy initializer
- Multiple booleans for status — fix: single `status: 'idle'|'loading'|'success'|'error'`
- Inline objects/arrays as props to memoized children — fix: `useMemo`
- `useEffect` for events (analytics, navigation) — fix: do it in the handler

### Stale closures

```tsx
useEffect(() => {
  const id = setInterval(() => setCount(count + 1), 1000); // count is always 0!
  return () => clearInterval(id);
}, []); // missing count in deps
```

Two fixes: functional update `setCount(c => c + 1)`, or add `count` to deps (and accept the interval reset).

### Build

- Take any 3 anti-patterns above and write them broken → fix them → explain in `notes.md`

### Interview Q&A

- Rules of Hooks — and _why_ they exist
- Walk through the stale closure bug above
- Name 3 anti-patterns and how to fix each

---

# PHASE 3 — ADVANCED REACT (Days 13–17)

## Day 13 — Component Patterns

**Goal:** Recognize and build the patterns used by every modern UI library.

### Patterns

- **Controlled vs Uncontrolled components** — your own components, not just inputs
- **Compound components** — `<Tabs>`, `<Tabs.List>`, `<Tabs.Trigger>`, `<Tabs.Panel>` (Radix-style)
- **Slot pattern / `asChild`** — pass elements as props, render polymorphically
- **Render props** — function-as-children (largely replaced by hooks, still see in libraries)
- **HOCs** — `withAuth(Component)` (legacy; recognize for code reviews)
- **Container/Presentational** — old but still useful for separating data from view
- **State Reducer pattern** — let consumers override state transitions

### Build (this is meaty — pick 3)

1. A `<Tabs>` compound component (state in context, value-based switching)
2. A `<Accordion>` with single-open and multi-open modes (controlled + uncontrolled)
3. A `<Disclosure>` with `asChild` slot pattern
4. A `<Toggle>` that supports both controlled and uncontrolled use

### Interview Q&A

- Why are compound components more flexible than configuration props?
- Render props vs custom hooks — when do you still see render props?
- What problem does `asChild` solve?

---

## Day 14 — Error Boundaries, Suspense, Portals, Lazy Loading

### Error Boundaries

- Class-only (no hook equivalent yet)
- `static getDerivedStateFromError`, `componentDidCatch`
- DOES NOT catch: event handlers, async code, errors in the boundary itself, SSR errors
- For uncaught: `window.onerror`, `window.onunhandledrejection`
- Granularity: one global boundary is too coarse — wrap each route, each major widget

### Suspense

- Boundary that catches _promises_ thrown during render → shows fallback
- Modern data libraries (TanStack Query, Relay) opt into Suspense
- Nest with Error Boundary:
  ```tsx
  <ErrorBoundary fallback={<ErrorScreen />}>
    <Suspense fallback={<Spinner />}>
      <Dashboard />
    </Suspense>
  </ErrorBoundary>
  ```

### React.lazy + code splitting

- `const Dashboard = React.lazy(() => import('./Dashboard'))`
- Wrap usage in `<Suspense>`
- Route-level splitting first; component-level for very heavy widgets (charts, editors)

### Portals

- `createPortal(children, domNode)` — render outside parent's DOM hierarchy
- Use for: modals, tooltips, toasts, anything that needs to break `overflow: hidden` or z-index stacking
- Events still bubble through the **React tree**, not the DOM tree

### Build

- A global `<ErrorBoundary>` + a per-route boundary; show different fallbacks
- A `<Modal>` using `createPortal` with focus trap and Escape-to-close
- Code-split a fake "reports" route with `React.lazy`

### Interview Q&A

- What does an Error Boundary NOT catch?
- Suspense vs Error Boundary — what does each catch?
- What's the order: parent unmount → portal cleanup? (portals follow parent)

---

## Day 15 — React 18 Features

### Concurrent rendering

- React can pause, abort, resume renders
- All rendering is now "concurrent-capable" but features are opt-in

### Automatic batching

- All `setX` calls in the same tick → 1 re-render
- Now works in Promises, setTimeouts, native events — not just React events
- Opt out: `flushSync(() => setX(...))` (rare, for measuring after update)

### useTransition

- Mark an update as non-urgent — React can interrupt it for urgent updates (typing, clicks)
- Returns `[isPending, startTransition]`
- Real use: search input filtering a 10k-row list — typing stays smooth

### useDeferredValue

- Like `useTransition` but for a value you don't control (a prop)
- Returns a lagging copy of the value during urgent updates

### Suspense for data

- Works with libraries that throw promises during render

### Build

- A search input filtering a 10,000-row list — first without transition (laggy), then with `useTransition` (smooth)
- Show the same with `useDeferredValue` on a child component

### Interview Q&A

- Concurrent rendering — what does it mean for me as a developer?
- `useTransition` vs debouncing — what's the difference?
- When would you opt out of automatic batching with `flushSync`?

---

## Day 16 — React 19 Features

### Actions API

- Pass async function to `<form action={...}>`
- React tracks pending state automatically

### useActionState

```tsx
const [state, formAction, isPending] = useActionState(
  async (prev, formData) => {
    const res = await api.update(Object.fromEntries(formData));
    return res.ok ? "Saved" : "Failed";
  },
  null,
);
```

### useOptimistic

- Show success state immediately while real request flies
- Roll back on failure
- Critical for "feels fast" — likes, sends, optimistic deletes

### The `use` hook

- Read a Promise or Context **conditionally**
- Can be called inside `if`/loops (unlike other hooks)
- Suspends until promise resolves

### React Compiler

- Build-time auto-memoization
- Reduces need for manual `useMemo`/`useCallback`/`React.memo`
- Stable in React 19; opt-in on most projects

### `ref` as a prop

- Function components can accept `ref` directly — `forwardRef` no longer required for new code

### Build

- A comment form using `useActionState` — disabled button, error/success states, no manual `useState` for loading
- A "like" button using `useOptimistic`

### Interview Q&A

- What does `useOptimistic` solve that `useState` doesn't?
- The React Compiler — what changes in your day-to-day?
- When can you call `use` that you can't call other hooks?

---

## Day 17 — Performance Deep Dive

**Goal:** Diagnose and fix a slow React app with evidence, not guesses.

### The workflow

1. **Measure first.** React DevTools Profiler → record interaction → identify slow renders
2. **Categorize the cause:**
   - Too many components re-rendering → `React.memo` + stable props
   - One component rendering too slowly → `useMemo` for heavy computation
   - Heavy DOM updates → virtualization
   - Large initial bundle → code splitting
3. **Fix one thing at a time.**
4. **Re-measure.**

### Tools

- React DevTools Profiler (the "highlight updates" toggle is gold)
- Chrome DevTools Performance tab — for non-React perf
- `why-did-you-render` (dev-only) — flags unnecessary re-renders
- Lighthouse — overall web vitals

### Common wins

- Memoize expensive computations
- Stabilize references (`useMemo` for objects, `useCallback` for functions passed to memoized children)
- Virtualize lists > 100 items (`react-window`, `react-virtuoso`)
- Code-split routes with `React.lazy`
- Avoid putting derived values in state — compute in render
- Move expensive state lower in the tree (limit re-render scope)
- For 18+: `useTransition` for non-urgent updates

### Bundle size

- Measure with `vite-plugin-visualizer` or `rollup-plugin-visualizer`
- Tree-shakeable imports: `import debounce from 'lodash/debounce'` not `import _ from 'lodash'`
- Swap heavy deps: Moment → `date-fns` or `dayjs`
- Drop polyfills if you can drop old browser support

### Build

- Take the Day 15 10k-row search and add `react-window` virtualization
- Profile your dashboard's current state; write down the top 3 perf issues + fixes

### Interview Q&A

- "App is slow. Walk me through how you'd diagnose."
- Why does `React.memo` sometimes do nothing?
- Virtualization — what is it and when do you need it?

---

# PHASE 4 — DATA & STATE (Days 18–21)

## Day 18 — Data Fetching, Race Conditions, AbortController

### Concepts

- The 3 states: loading, error, success — always handle all three
- Initial fetch on mount → `useEffect` with empty deps
- Re-fetch on param change → param in deps
- **Race conditions** — fast-typed search, slow first request returns AFTER fast one
- Fixes:
  - `AbortController.signal` passed to `fetch`, abort in cleanup
  - "cancelled" flag in closure (don't set state if cancelled)
- Error handling: distinguish network error from HTTP error (fetch doesn't reject on 4xx/5xx)
- Loading states without flicker — minimum delay before showing spinner

### Build

- A hand-rolled `useFetch(url)` with: loading, error, success, abort on unmount, refetch on URL change
- A search component where the race condition is real — reproduce the bug, then fix it
- Retry with exponential backoff

### Interview Q&A

- What's a race condition in data fetching? Reproduce one verbally.
- Two ways to cancel an in-flight request
- Why does `fetch` not reject on a 404?

---

## Day 19 — TanStack Query Deep Dive

**Goal:** Replace every hand-rolled fetch with a query. This is the #1 React data library; you'll use it everywhere.

### Concepts

- **Queries** — read data:
  ```tsx
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["merchants", { status: "active" }],
    queryFn: () => fetchMerchants({ status: "active" }),
  });
  ```
- **Query keys** — array, must include every input that changes the result. Stable serialization handled for you.
- **Mutations** — write data:
  ```tsx
  const mutation = useMutation({
    mutationFn: (data) => api.createMerchant(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["merchants"] }),
  });
  ```
- `staleTime` vs `cacheTime` (now `gcTime`)
- Refetch on window focus, on reconnect, on mount
- Dedup — multiple components asking for the same key → one request
- `enabled` — gate queries on prerequisites (e.g., `enabled: !!userId`)
- Optimistic updates with `onMutate` / `onError` / rollback
- `useInfiniteQuery` for pagination / infinite scroll
- `prefetchQuery` for warming the cache before navigation

### Build (replace your hand-rolled fetches)

- Migrate your `useFetch` calls to `useQuery`
- A merchants table with filters in the URL (query keys depend on URL params)
- A mutation that creates a merchant + invalidates the list
- Optimistic delete with rollback on error
- Infinite scroll list with `useInfiniteQuery`

### Interview Q&A

- TanStack Query vs hand-rolled `useEffect` — what do you get?
- `staleTime` vs `gcTime` — when do you tune each?
- How do you do optimistic updates with rollback?
- Why are query keys arrays?

---

## Day 20 — State Management (Context, Zustand, RTK)

**Goal:** Pick the right state tool. Stop using Redux for things that aren't Redux problems.

### The mental model — 4 kinds of state

1. **Server state** — TanStack Query
2. **URL state** — `useSearchParams` or `nuqs`
3. **Global client state** — Zustand (or Context for small/rarely-changing)
4. **Local state** — `useState`/`useReducer`

### Context (review)

- Best for: theme, auth, locale, modal-stack
- Avoid: high-frequency updates (every consumer re-renders)
- Pattern: split into multiple narrow contexts instead of one big object
- "Context Selector" pattern (manual or `use-context-selector` library) to subscribe to slices

### Zustand

```tsx
import { create } from "zustand";

type CartState = { items: Item[]; add: (i: Item) => void };

const useCart = create<CartState>((set) => ({
  items: [],
  add: (i) => set((s) => ({ items: [...s.items, i] })),
}));

// In component
const items = useCart((s) => s.items); // only re-renders when items change
```

- Subscribe to slices — no provider needed
- Small bundle, no boilerplate
- Middleware: `persist` (localStorage), `devtools`, `immer`

### Redux Toolkit (RTK) — recognize and use, don't fear

- Still dominant at Flipkart/Uber-scale teams
- `createSlice` removes 80% of the boilerplate vs old Redux
- RTK Query — Redux's answer to TanStack Query
- When you'd pick RTK: existing team is on Redux, complex middleware (sagas), strict pattern enforcement

### Build

- Migrate your auth + theme to Context
- Add a Zustand store for a shopping cart in the dashboard
- Write the same cart in RTK to feel the difference (just to be able to talk about it)

### Interview Q&A

- "When would you reach for Redux?"
- Why is Context not great for global state?
- Zustand vs Redux Toolkit — when each?
- What's the difference between server state and client state?

---

## Day 21 — URL State, React Router v6/v7

**Goal:** Make filters, search, pagination live in the URL.

### React Router v6/v7 essentials

- `<BrowserRouter>` / `<RouterProvider>` (data router)
- `<Routes>` + `<Route path element>`
- Nested routes + `<Outlet />`
- Dynamic params: `<Route path="/merchants/:id" />` + `useParams()`
- Navigate: `<Link>`, `useNavigate()`, `<Navigate to>`
- Search params: `useSearchParams()`
- Protected routes:
  ```tsx
  function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    return user ? <>{children}</> : <Navigate to="/login" replace />;
  }
  ```
- Loaders + actions (v6.4+ data router) — route-level data fetching
- `useLoaderData`, `useActionData`, `useNavigation`

### URL state — why it matters

- Filters in URL → shareable links, back button works, refresh keeps state
- Don't duplicate URL state in component state
- `nuqs` (or `use-query-states`) — typed, debounced search params

### Build

- Add routing to your dashboard: `/login`, `/merchants`, `/merchants/:id`, `/settings`
- Protect `/merchants/*` behind auth
- Move all filter state to URL params
- A nested route: `/merchants/:id` with tabs `/merchants/:id/overview`, `/merchants/:id/payments`

### Interview Q&A

- Why put filter state in the URL?
- Loaders vs `useQuery` — when to pick which?
- How do you handle protected routes?

---

# PHASE 5 — FORMS, STYLING, BUILD (Days 22–24)

## Day 22 — Forms at Scale (React Hook Form + Zod)

**Goal:** Replace controlled-state forms with RHF + Zod. Build a multi-step form that actually works.

### Why RHF over controlled state

- Doesn't re-render on every keystroke (uncontrolled under the hood)
- Built-in validation + async validation
- Easy integration with schema validators
- Smaller code, faster forms

### Zod basics

```tsx
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  amount: z.number().positive().max(10000),
  currency: z.enum(["USD", "AED", "SAR"]),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;
```

### Putting it together

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm<FormData>({ resolver: zodResolver(schema) });

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register("email")} />
  {errors.email && <span>{errors.email.message}</span>}
</form>;
```

### Build

- Payment form with RHF + Zod — amount, currency, recipient, notes
- A **multi-step KYC form** — identity → banking → docs → review → submit. Step state in URL (`/onboard/identity`). Per-step Zod schema. Server state via TanStack Query (save partial progress).
- Dynamic fields (`useFieldArray`) — invoice with N line items, add/remove rows
- File upload with progress

### Interview Q&A

- Why RHF over `useState`-controlled forms?
- Why Zod and not Yup or Joi? (TS-first, schema infers types)
- How do you handle multi-step forms — state, validation, persistence?

---

## Day 23 — Styling (Tailwind + shadcn/ui)

**Goal:** Style fast, consistently, and accessibly. Cover the styling questions you'll be asked.

### Approaches (know the trade-offs)

- **Plain CSS / CSS Modules** — scoped, simple, no runtime
- **CSS-in-JS (styled-components, Emotion)** — co-located, dynamic; runtime cost; mostly out of favor for new projects
- **Tailwind CSS** — utility-first, zero runtime, fastest to ship; ugly markup is the trade-off
- **shadcn/ui** — copy-paste components built on Radix + Tailwind, fully owned
- **CSS-in-JS zero-runtime** (Vanilla Extract, Panda CSS) — new contenders, awareness only

### Tailwind essentials

- Utility classes for everything: layout, spacing, typography, color
- Responsive: `md:flex lg:grid-cols-3`
- States: `hover:`, `focus-visible:`, `disabled:`
- Dark mode: `dark:bg-slate-900` with `darkMode: 'class'` in config
- RTL: `rtl:text-right`
- `tailwind-merge` + `clsx` (or the `cn()` helper) for conditional classes

### shadcn/ui setup

```bash
npx shadcn@latest init
npx shadcn@latest add button input dialog form
```

- Components live in your repo — fully editable
- Built on Radix Primitives → accessibility done right

### Build

- Set up Tailwind on the dashboard
- Add shadcn/ui — Button, Input, Dialog, Form, Toast
- Theme provider with light/dark + system
- RTL toggle (`dir="rtl"` on `<html>`) — switch language EN ↔ AR

### Interview Q&A

- Tailwind vs CSS-in-JS — when each?
- What is shadcn/ui — is it a library or what?
- How do you handle RTL?

---

## Day 24 — Build Tools, Env, Deployment

**Goal:** Configure Vite, env variables, bundle splits, deploy.

### Vite essentials

- `vite.config.ts` — plugins, aliases, server config
- Path aliases: `'@/components'` instead of `'../../components'`
- Env vars: `VITE_API_URL` (must start with `VITE_` to be exposed)
- Dev vs prod builds
- HMR (you've been using it all month)

### Code splitting

- Route-based with `React.lazy`
- Manual chunks for heavy libs in `vite.config.ts`
- Dynamic import for rarely-used features

### Bundle analysis

- `rollup-plugin-visualizer` plugin
- Find the top 5 biggest deps, swap or lazy-load them

### Env management

- `.env`, `.env.local`, `.env.production`
- Type-safe env with Zod: parse `import.meta.env` against a schema, throw at startup if missing

### Deployment

- Vercel: link repo, set env vars, deploy. Preview deploys per PR.
- Netlify or Cloudflare Pages: same idea
- For SPAs, configure SPA fallback (rewrite all to `index.html`)

### Build

- Add aliases, env types, deploy your dashboard to Vercel
- Add a `rollup-plugin-visualizer` step, look at your bundle, identify 1 win

### Interview Q&A

- Vite vs Webpack — why has Vite taken over?
- How do you handle env variables?
- How do you ship a smaller bundle?

---

# PHASE 6 — TESTING, A11Y, I18N (Days 25–26)

## Day 25 — Testing (Vitest + RTL + MSW)

**Goal:** Write tests that test behavior, not implementation.

### Tools

- **Vitest** — fast, Vite-native (or Jest if the project uses CRA/Webpack)
- **React Testing Library** — render + interact + assert
- **MSW** — Mock Service Worker, mocks fetch/XHR at the network layer (not at the function level)
- **Playwright** — E2E

### RTL philosophy

- Query by **role**, **label**, **text** — not class names or test IDs
- "Test what the user sees"
- No state introspection (`expect(component.state)` is forbidden)
- Use `userEvent` (real-ish events), not `fireEvent` (synthetic)

### Patterns

```tsx
// Component test
test("submits the form with email", async () => {
  const user = userEvent.setup();
  render(<LoginForm />);

  await user.type(screen.getByLabelText(/email/i), "a@b.com");
  await user.type(screen.getByLabelText(/password/i), "secret");
  await user.click(screen.getByRole("button", { name: /sign in/i }));

  expect(await screen.findByText(/welcome/i)).toBeInTheDocument();
});
```

### Custom hook tests

```tsx
import { renderHook, act } from "@testing-library/react";

test("useCounter increments", () => {
  const { result } = renderHook(() => useCounter());
  act(() => {
    result.current.increment();
  });
  expect(result.current.count).toBe(1);
});
```

### MSW for API mocking

```tsx
// handlers.ts
import { http, HttpResponse } from "msw";
export const handlers = [
  http.get("/api/merchants", () =>
    HttpResponse.json([{ id: 1, name: "Acme" }]),
  ),
];
```

- Tests use the same handlers your dev server can — closer to real

### Build

- Tests for 5 components from your dashboard
- Tests for 3 custom hooks
- Set up MSW + test a TanStack Query hook
- 1 Playwright E2E: login → dashboard

### Interview Q&A

- Why RTL over Enzyme?
- "Query by role" — why?
- MSW vs jest.mock — when each?
- The testing pyramid

---

## Day 26 — Accessibility, i18n, RTL

**Goal:** Make UIs that work for keyboard users, screen readers, and Arabic.

### Accessibility essentials

- **Semantic HTML first**: `<button>`, real `<form>`, headings in order (`h1 → h2`)
- **Label every input**: `<label htmlFor="email">` ↔ `<input id="email">`
- **Focus management**: when a modal opens, focus moves into it; on close, return to trigger
- **Focus styles**: never `outline: none` without an alternative
- **ARIA, sparingly**: `aria-label` for icon-only buttons, `aria-live` for dynamic regions, `role` for custom widgets
- **Keyboard testing**: every interactive element reachable via Tab, operable via Enter/Space
- **Color contrast**: at least 4.5:1 for normal text (Lighthouse / axe checks this)
- **`alt` on images**: descriptive for content, `alt=""` for decorative

### Tools

- axe DevTools (browser extension)
- Lighthouse Accessibility audit
- Keyboard-only testing (unplug your mouse)
- VoiceOver (Mac) / NVDA (Windows) — listen to your app once

### i18n with react-i18next

```tsx
import { useTranslation } from "react-i18next";
const { t, i18n } = useTranslation();
<button>{t("checkout.payNow")}</button>;
i18n.changeLanguage("ar");
```

- Namespaces (`common`, `payment`, `auth`)
- Interpolation: `t('hello', { name })`
- Pluralization
- Lazy load language bundles

### RTL

- `<html dir="rtl" lang="ar">` toggles direction
- Tailwind: `rtl:` variants (`text-left` → `rtl:text-right`)
- Mirror icons that have direction (arrows, breadcrumb chevrons)
- Avoid hardcoded `left`/`right` — use logical properties: `margin-inline-start` (or Tailwind `ms-4` / `me-4`)
- Test entire app in Arabic — find every broken layout

### Date / number formatting

- `Intl.NumberFormat('ar-AE', { style: 'currency', currency: 'AED' })`
- `Intl.DateTimeFormat('ar-AE', { dateStyle: 'medium' })`
- Don't roll your own formatting

### Build

- Add `react-i18next` to your dashboard. Translate all UI to Arabic.
- Add an EN/AR toggle + persist in localStorage
- Run axe DevTools — fix every violation it finds
- Keyboard-test your modal — fix focus trap if broken

### Interview Q&A

- Five things you do for accessibility
- What's a focus trap and why does a modal need one?
- How would you support Arabic + English in the same app?

---

# PHASE 7 — MACHINE CODING (Days 27–28)

These are the **highest-leverage days** for Zomato / Flipkart / Uber . Real machine coding rounds give you 60–90 minutes to build a working component. Practice end-to-end.

## Day 27 — Machine Coding Round 1

Pick **React + TypeScript** for each. Time yourself.

### Build (45–60 min each)

1. **Todo App** — add, delete, edit (inline), toggle done, filter (all/active/done), persist to localStorage
2. **Star Rating** — 5 stars, hover preview, click to set, keyboard accessible (arrow keys + Enter)
3. **Accordion** — single-open + multi-open modes, controlled + uncontrolled API, keyboard navigation
4. **Tabs** — compound component pattern (Day 13), URL-synced active tab
5. **OTP Input** — 6 boxes, auto-advance on type, Backspace to previous, paste fills all
6. **Modal** — `createPortal`, focus trap, Escape to close, click overlay to close, controlled open state
7. **Toast / Snackbar** — context provider + `useToast()` hook, queue, auto-dismiss, types (success/error/info)

### What interviewers grade on

- Does it work? (correctness)
- Component structure / separation of concerns
- State management decisions
- Accessibility (keyboard + ARIA — even basic gets bonus)
- TypeScript usage (props typed, no `any`)
- Code readability
- Edge cases (empty list, max length, rapid clicks)
- Are you talking through your decisions?

---

## Day 28 — Machine Coding Round 2

### Build (45–60 min each)

1. **Autocomplete / Typeahead** — debounced (`useDebounce`), keyboard nav (Up/Down/Enter), highlight matches, abort stale requests
2. **Image Carousel** — prev/next, dots, auto-play with pause-on-hover, swipe (pointer events), wrap-around
3. **Infinite Scroll** — `IntersectionObserver`, loading state, end-of-list, error + retry
4. **Pagination** — first/prev/numbered pages/next/last, ellipsis for many pages
5. **Nested Comments** — recursive component, reply, collapse/expand, indent depth limit
6. **Drag-and-Drop Reorderable List** — use `dnd-kit` (modern; `react-beautiful-dnd` is unmaintained)
7. **Multi-step Form Wizard** — URL-driven steps, per-step validation, "back" preserves data

### Common bonuses interviewers throw mid-round

- "Now make it work for 10,000 items" → virtualization
- "Now add keyboard navigation"
- "Now add a loading skeleton"
- "Now what if the API fails?"
- "Now make it accessible"

Have a one-line answer ready for each before they ask.

---

# PHASE 8 — SYSTEM DESIGN + MOCK (Days 29–30)

## Day 29 — Frontend System Design

**Goal:** Talk for 10 minutes about how you'd build any of these.

### Framework for system design answers

1. **Clarify requirements** (always start here — don't dive into code)
   - Who's the user? Scale? Mobile or desktop? Auth?
2. **High-level architecture**
   - Components and their responsibilities
   - Data flow
3. **State management**
   - Server state, client state, URL state — what goes where
4. **API design** (briefly — frontend, but show you think about it)
   - REST endpoints, payload shape, pagination
5. **Edge cases**
   - Loading, error, empty, offline, slow network, concurrent edits
6. **Performance**
   - Virtualization, code splitting, image optimization, caching
7. **Accessibility + i18n**
8. **Testing strategy**

### Practice (talk through each — out loud, 10 min)

1. **Design an Autocomplete component**
   - Debounce vs transition, abort stale requests, cache results, keyboard nav, ARIA combobox
2. **Design Instagram feed**
   - Infinite scroll, virtualization, image lazy loading (`loading="lazy"` + `IntersectionObserver`), optimistic likes, video pause when off-screen
3. **Design a Chat UI**
   - Message list with virtualization, scroll-to-bottom behavior, WebSocket integration, typing indicators, optimistic send, retry on failure, message status (sent/delivered/read)
4. **Design a Payment Dashboard**
   - Real-time status (SSE), filterable table with URL state, pagination vs infinite scroll trade-off, role-based access, exports, audit log
5. **Design a multi-step KYC flow**
   - State machine, URL-driven steps, persisted draft, file upload with progress, server validation, error recovery
6. **Design a Notification Center**
   - Bell + unread badge, dropdown list, mark as read, real-time (WebSocket/SSE), pagination of older items
7. **Design a Data Table with filters/sort/export**
   - Server-side vs client-side filtering, column virtualization, sticky headers, CSV export, saved views

---

## Day 30 — Mock Interview + Behavioral + Final Revision

### HTTP / Networking (quick recap — you have this from JS plan)

- HTTP methods + status codes (200, 201, 204, 301, 304, 400, 401, 403, 404, 422, 429, 500)
- CORS — what, why, preflight
- REST vs GraphQL (one-liner each)
- WebSockets vs SSE vs polling — when each
- JWT structure, HTTP-only cookies vs localStorage trade-off

### Security checklist

- React auto-escapes children → XSS-safe by default
- Danger: `dangerouslySetInnerHTML` (sanitize with DOMPurify), `href={userInput}` (validate protocol)
- CSRF — `SameSite` cookies + CSRF tokens
- CORS — different from XSS/CSRF, browser-enforced
- Content Security Policy headers
- Never put secrets in `VITE_*` env vars — they ship to the browser

### Behavioral (don't skip — easy points)

Prepare 60-second answers, **out loud**:

- "Tell me about yourself"
- "Walk me through your most complex React project"
- "A bug you debugged that took you a long time"
- "A disagreement with a teammate — how did you handle it?"
- "Tell me about a time you improved performance / accessibility / code quality"
- "Why this company?"
- "Where do you see yourself in 2–3 years?"

Use STAR: Situation, Task, Action, Result. Metrics > vibes.

### Have 3 questions ready for them

- "What does the team's React stack look like?"
- "What's the on-call expectation?"
- "What's a project that didn't go as planned, and what did the team learn?"

### Final Mock (2 hours total)

| Block | Duration | Activity                                                   |
| ----- | -------- | ---------------------------------------------------------- |
| 1     | 20 min   | One coding question (custom hook or polyfill from JS plan) |
| 2     | 60 min   | One machine coding (random from Day 27/28)                 |
| 3     | 15 min   | Frontend system design verbally (pick from Day 29)         |
| 4     | 15 min   | Theory rapid-fire (10 questions, 30s each)                 |
| 5     | 10 min   | Behavioral (record yourself, listen back)                  |

---

# Daily Time Allocation (suggested)

| Block | Duration | Activity                                             |
| ----- | -------- | ---------------------------------------------------- |
| 1     | 90 min   | Read concepts + take notes                           |
| 2     | 90 min   | Build from scratch (no copy-paste — code from notes) |
| 3     | 60 min   | Practice problems / coding exercises                 |
| 4     | 30 min   | Interview Q&A out loud — talk to camera/mirror       |
| 5     | 30 min   | Revisit yesterday's notes                            |
| 6     | 30 min   | Buffer / re-do anything that didn't click            |

---

# Revision Schedule

- **End of every 5 days:** 60 min recall — close notes, write what you remember, then check
- **Day 15:** revisit Days 1–14, redo 3 of the trickier custom hooks
- **Day 25:** revisit anti-patterns, redo a machine coding from scratch
- **Day 30:** the full mock

---

# Common Mid-Level Interview Format (what to expect)

For Zomato / Flipkart / Uber / Gulf mid:

1. **Recruiter screen** — 30 min, behavioral + role fit
2. **Online assessment** (some companies) — JS/React MCQs or 1–2 coding problems
3. **JS / DSA round** — 45–60 min, easy-medium problems
4. **React theory + concepts** — 45–60 min, drilling on hooks, patterns, anti-patterns
5. **Machine coding** — 60–90 min, build a working component
6. **Frontend system design** — 45–60 min (often combined with #5 at mid-level)
7. **Hiring manager / culture** — 30–45 min, project deep-dive + behavioral

You're prepping for all of these.

---

# What to Have Ready Before Applying

- [ ] One real React project on GitHub with: TypeScript, tests, a clean README, deployed link
- [ ] Resume with metrics ("reduced bundle 40%", "cut TTI by 1.2s") — not vague claims
- [ ] LinkedIn polished, open to opportunities, headline mentions React
- [ ] 60-second "tell me about yourself" rehearsed (in English; if applying to Gulf, also in Arabic if you speak it)
- [ ] STAR stories for: a bug, a perf win, a teammate conflict, a project you led
- [ ] Tracker of 10–15 target companies + applied/recruiter status + interview dates

---

# Final Notes

- **Build, don't just read.** The 30-day plan works if you spend ~90 min/day actually coding. Skipping the build sections defeats the plan.
- **Speak your code out loud.** Interviewers expect narration during machine coding. Practice it.
- **Anti-patterns are interview gold.** Mid-level interviewers love asking "what's wrong with this code?" Memorize the patterns from Day 12.
- **Honest > impressive.** "I haven't used Server Components in production, but here's my mental model" beats faking it. They can tell.
- **At 3 years, trade-offs matter more than tools.** Don't just name React Query — say _why_ over hand-rolled fetch.
- **The plan is the floor, not the ceiling.** If something clicks fast, push deeper. If it doesn't click, slow down — don't move on broken.

Good luck. Build the dashboard. Ship it to Vercel. Show it in interviews. That alone puts you ahead of half the candidates.
