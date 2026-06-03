# React Interview Prep — Tap Payments (3 Years Experience)

> **Your goal:** Crack a mid-level React developer interview (3 years experience) at Tap Payments. Covers fundamentals, hooks, advanced patterns, performance, React 19 + Compiler, anti-patterns, security, testing, system design, and scenario-based mock interviews.

> **Interviewer expectation at 3 years:** You should know the **what** cold and be able to explain the **why** and the **trade-offs**. Interviewers will probe for anti-patterns, architectural reasoning, and modern React (18/19) features.

---

## 📚 Contents

- **Part 1:** React Fundamentals (Q1–Q20)
- **Part 2:** React Hooks Deep Dive (Q21–Q40)
- **Part 3:** React Advanced + Performance (Q41–Q55)
- **Part 4:** Modern React — React 18/19, Compiler, Server Components (Q56–Q75)
- **Part 5:** Anti-patterns, Security, Testing, Accessibility (Q76–Q95)
- **Part 6:** Scenarios + Architecture + Mock Interview
- **Cheat Sheet:** Day-before refresher

---

# PART 1 — REACT FUNDAMENTALS (Q1–Q20)

## Q1. What is React?

**Simple answer:** React is a JavaScript library for building user interfaces, made by Facebook (now Meta).

**Analogy:** React is like **LEGO blocks**. Instead of building a webpage as one big lump, you build small reusable pieces (components) and snap them together.

**Benefits of React**

1. **Reusable Components** – Build once, use many times (like LEGO blocks).
2. **Fast Performance** – Uses Virtual DOM to update only what changed, not the whole page.
3. **Easy to Learn** – Simple syntax (JSX) that mixes HTML with JavaScript.
4. **Huge Community** – Tons of tutorials, libraries, and ready-made solutions available.
5. **SEO Friendly** – Supports server-side rendering (with Next.js) for better Google ranking.
6. **Cross-Platform** – Same knowledge works for web (React) and mobile (React Native).

## Library vs Framework

**Simple difference:**

- **Library** = _You_ call the code when you need it.
- **Framework** = The code calls _you_ (it controls the flow).

**Analogy:**

- **Library** is like buying ingredients 🛒 – you cook the way you want.
- **Framework** is like a meal kit 📦 – you follow their recipe and steps.

---

### Key Differences

| Point              | Library                | Framework                    |
| ------------------ | ---------------------- | ---------------------------- |
| **Control**        | You control the flow   | Framework controls the flow  |
| **Flexibility**    | More flexible          | Less flexible (follow rules) |
| **Usage**          | Use only what you need | Use the full structure       |
| **Example**        | React, jQuery, Lodash  | Angular, Next.js, Django     |
| **Learning Curve** | Easier                 | Steeper                      |

---

### Why React is a Library (not a Framework)

- React only handles the **UI part**.
- For routing, state, API calls → you pick your own tools.
- You decide the project structure, not React.

✅ That's why React is **flexible** but needs extra setup (like Redux, React Router, etc.).

**Why Tap uses it:** Fast, reusable, huge community. You ship features faster.

---

## Q2. What is JSX?

**Simple answer:** A syntax that lets you write HTML-like code inside JavaScript.

```jsx
const greeting = <h1>Hello, Tap!</h1>;
```

**Analogy:** Imagine writing Arabic words inside an English sentence with your phone auto-translating. JSX is HTML inside JavaScript, and Babel translates it to `React.createElement(...)`.

---

## Q3. What is a Component?

A reusable piece of UI — a function that returns JSX.

```jsx
function WelcomeCard() {
  return <div>Welcome to Tap Payments</div>;
}
```

**Analogy:** A component is like a **coffee machine button**. Press "Latte" 100 times, you always get a latte. Reusable, predictable.

---

## Q4. Functional vs Class Components?

| Functional                   | Class                                |
| ---------------------------- | ------------------------------------ |
| Simple JS function           | JS class extending React.Component   |
| Uses Hooks for state/effects | Uses `this.state`, lifecycle methods |
| Modern standard ✅           | Older codebases                      |

**Always say:** "I use functional components with Hooks — it's the modern standard."

---

## Q5. What are Props?

**Definition:** Props (short for **"properties"**) are data passed from a **parent component** to a **child component**. They are **read-only** — the child cannot change them.

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

<Greeting name="Ahmed" />;
```

**Analogy:** Props are like a **food delivery order**. Customer (parent) tells restaurant (child) what they want. Restaurant fills the order but can't change it.

---

## Q6. What is State?

**Definition:** State is a built-in value that stores **dynamic data** inside a component. When state changes, React **automatically re-renders** the component to reflect the new data in the UI.

```jsx
const [count, setCount] = useState(0);
```

**Analogy:** State is the **fuel gauge in your car**. As fuel drops, the dashboard updates automatically. You don't manually refresh it.

---

## Q7. Props vs State?

| Props                                    | State                                 |
| ---------------------------------------- | ------------------------------------- |
| Data sent from parent to child component | Dynamic variable inside the component |
| Read-only                                | Changeable                            |
| Function arguments                       | Internal variables                    |

**Analogy:** Props = recipe handed to the chef (fixed). State = chef's mood (changes through the day).

---

## Q8. What is the Virtual DOM?

**Definition:** The Virtual DOM (VDOM) is a **lightweight JavaScript object** that acts as an **in-memory representation** of the real DOM. Instead of updating the real DOM directly (which is slow), React first updates the Virtual DOM, compares it with the previous version using a process called **"diffing"**, and then efficiently updates **only the changed parts** in the real DOM through **"reconciliation"**.

## Diffing vs Reconciliation

Both work **together** in React to update the UI efficiently. Think of them as a **team**:

- **Diffing** = Diffing is the **algorithm** React uses to **compare the old Virtual DOM with the new Virtual DOM** and figure out **what has changed**.
- **Reconciliation** = Reconciliation is the **overall process** of taking the diff results and **updating the real DOM** to match the new Virtual DOM.

**Analogy:** Editing a paragraph in a long book — you don't reprint the whole book, just replace the changed sentence.

---

## Q9. How does React render a list?

Use `.map()` and provide a unique `key`.

```jsx
{
  merchants.map((m) => <li key={m.id}>{m.name}</li>);
}
```

**What is `key`?**

`key` is a **special prop** that React uses to **uniquely identify each item** in a list. It helps React know **which items changed, were added, or were removed** when the list updates.

---

**Why Does React Need `key`?**

React doesn't watch your list with human eyes 👀. When the list changes, React needs a way to **match old items with new items**. The `key` is that matching ID.

**Without `key`:** React gets confused and may **re-render the entire list** (slow + bugs).
**With `key`:** React updates **only the changed item** (fast + accurate).

---

## Q10. Why never use array index as a key?

If the list reorders, indexes shift but data doesn't — React confuses items. State inside list items (like an input value) ends up on the wrong row.

Use a **stable unique ID** (`merchant.id`).

---

## Q11. How do you conditionally render?

```jsx
// Ternary
{
  isLoggedIn ? <Dashboard /> : <Login />;
}

// && (short-circuit)
{
  hasNotification && <Bell />;
}

// Early return
if (loading) return <Spinner />;
```

**Watch out:** `{count && <Badge />}` — if count is `0`, React renders `0` (not nothing!). Use `{count > 0 && <Badge />}`.

---

## Q12. How are events handled?

In React, events (like clicks, typing, hovering) are handled using **camelCase props** (like `onClick`, `onChange`) and you pass a **function reference** that React should call **when the event happens**.

```jsx
<button onClick={() => handlePay()}>Pay Now</button>
```

```jsx
// ❌ Wrong — runs immediately on render
<button onClick={handlePay()}>

// ✅ Right
<button onClick={handlePay}>
```

---

## Q13. How do you pass data from child to parent?

You can't pass props upward. Parent passes a **callback function**, child calls it.

```jsx
function Parent() {
  const handleData = (val) => console.log("Got:", val);
  return <Child onSend={handleData} />;
}

function Child({ onSend }) {
  return <button onClick={() => onSend("Hello!")}>Send</button>;
}
```

**Analogy:** You give your kid a phone with one button programmed to call you.

---

## Q14. What is "lifting state up"?

**"Lifting state up"** means moving a piece of state from a **child component** to its **parent component**, so that **multiple children (siblings) can share and access the same data**.

**Analogy:** Two kids fighting over a toy → mom holds the toy, decides who uses it.

### 💥 The Problem (Without Lifting State Up)

Imagine a shopping app with two sibling components:

- `<PriceInput />` – User enters a price.
- `<PriceDisplay />` – Shows the entered price.

```jsx
function App() {
  return (
    <>
      <PriceInput />   {/* Has its own state */}
      <PriceDisplay /> {/* Can't see PriceInput's state ❌ */}
    </>
  );
}
```

**Problem:** `PriceDisplay` has **no way** to know what's typed in `PriceInput` because siblings can't share state directly. 😩

---

### ✅ The Solution (Lifting State Up)

Move the `price` state to the **common parent** (`App`), and pass it down to both children:

```jsx
function App() {
  const [price, setPrice] = useState(0); // 🆙 State lifted to parent

  return (
    <>
      <PriceInput price={price} setPrice={setPrice} />
      <PriceDisplay price={price} />
    </>
  );
}

// Child 1: Updates the price
function PriceInput({ price, setPrice }) {
  return (
    <input
      type="number"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
    />
  );
}

// Child 2: Displays the price
function PriceDisplay({ price }) {
  return <p>Current Price: ${price}</p>;
}
```

**Flow:**

1. User types in `PriceInput` → calls `setPrice` (passed from parent).
2. Parent's `price` state updates.
3. Parent re-renders both children with new `price`.
4. `PriceDisplay` shows the updated value. ✅

---

## Q15. What is the Virtual DOM diffing algorithm?

React's Virtual DOM diffing algorithm finds what changed in the UI by creating a new Virtual DOM and comparing it with the previous one. Then through reconciliation updates only the changed parts in the real DOM — making rendering fast and efficient.

**Diffing vs Reconciliation**

| Point        | Diffing 🔍          | Reconciliation 🔄 |
| ------------ | ------------------- | ----------------- |
| **What**     | Algorithm           | Process           |
| **Job**      | Finds changes       | Applies changes   |
| **Works on** | Virtual DOM         | Real DOM          |
| **Result**   | List of differences | Updates UI        |

> **Diffing finds it, Reconciliation applies it.** ✅

---

## Q16. What are React Fragments?

A **React Fragment** lets you return **multiple elements** from a component **without adding an extra `<div>` wrapper** in the HTML.

**Problem:** This avoids adding of an **unnecessary `<div>`** in the HTML.

```jsx
return (
  <>
    <Header />
    <Content />
  </>
);
```

Cleaner HTML output. Useful when an extra `<div>` would break CSS layout.

---

## Q17. What is the difference between `React.createElement` and JSX?

JSX is just an easier way to write React.createElement. Both do the same thing.

```jsx
// JSX
<h1>Hi</h1>;

// Compiled to
React.createElement("h1", null, "Hi");
```

You write JSX. Babel converts it.

Babel is a JavaScript compiler that converts JSX and modern ES6+ code into backward-compatible JavaScript that all browsers can understand.

---

## Q18. What is one-way data flow?

In React, data flows **down only** (parent → child via props). Children update parents only through callback functions.

**Why?** Predictability. You always know where data came from. Easier to debug a bug.

**Analogy:** A river flows downhill. To send water back up, you need a pump (callback).

---

## Q19. What is a "pure component"?

A **Pure Component** is one that:

1. ✅ **Same props → Same output** (always predictable).
2. ✅ **No side effects** (doesn't change anything outside itself).

---

**✅ Pure Example**

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

Same `name` → same UI. Always. 🎯

**❌ Impure Example**

```jsx
function Greeting({ name }) {
  const time = new Date().toLocaleTimeString();  // ⚠️ Changes every render
  return <h1>Hello, {name}! It's {time}</h1>;
}
```

Same `name` → different UI each time. ❌

---

**Analogy**

- **Pure Component** = Vending Machine 🥤 → Press A1, always get Coke.
- **Impure Component** = Moody Chef 👨‍🍳 → Same order, different food each time.

---

**Benefits**

1. ✅ Predictable
2. ✅ Easy to test
3. ✅ Easy to debug
4. ✅ Optimizable with `React.memo` (skips re-render if props unchanged)

---

**`React.memo` Example**

```jsx
const Greeting = React.memo(function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
});
```

React caches output → only re-renders when `name` changes. ⚡

---

## Q20. Controlled vs Uncontrolled Components

**🎯 In Simple Words**

- **Controlled** = React holds the value 🎮
- **Uncontrolled** = HTML/DOM holds the value 📦

---

**🆚 Difference**

| Point           | Controlled        | Uncontrolled               |
| --------------- | ----------------- | -------------------------- |
| Value stored in | React state       | DOM                        |
| Read using      | `state`           | `ref`                      |
| Best for        | Forms, validation | Simple inputs, file upload |

---

**✅ Controlled (default)**

```jsx
const [email, setEmail] = useState("");
<input value={email} onChange={(e) => setEmail(e.target.value)} />;
```

**📦 Uncontrolled**

```jsx
const inputRef = useRef();
<input ref={inputRef} />;
```

---

**💬 One-Liner**

> _"Controlled = React owns the input value via state. Uncontrolled = DOM owns the value, read using ref. Controlled is the default."_

---

# PART 2 — REACT HOOKS DEEP DIVE (Q21–Q40)

## Q21. What are Hooks?

**Definition:** Hooks are special functions introduced in React 16.8 that let you "hook into" React features — like state, lifecycle, context, and refs — from **function components**. Before Hooks, these features were only available in class components.

All Hooks start with the `use` prefix (e.g., `useState`, `useEffect`). This naming convention is how React and the linter identify them and enforce the Rules of Hooks.

---

**Why Hooks exist**

Before Hooks, function components were "stateless" — you had to convert to a class to add state or lifecycle methods. This caused three big problems:

1. **Reusing stateful logic was hard** — patterns like HOCs and render props led to "wrapper hell."
2. **Complex components became unreadable** — related logic was split across `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`.
3. **Classes confused both people and machines** — `this` binding, verbose syntax, and harder optimization for tooling.

Hooks solve all three by letting you organize logic by concern (not by lifecycle) and extract it into reusable custom Hooks.

---

**Common built-in Hooks**

| Hook          | Purpose                                                            |
| ------------- | ------------------------------------------------------------------ |
| `useState`    | Add local state to a component                                     |
| `useEffect`   | Run side effects (data fetching, subscriptions, DOM updates)       |
| `useContext`  | Consume a React Context without nesting `<Consumer>` components    |
| `useRef`      | Persist a mutable value or access a DOM node across renders        |
| `useMemo`     | Memoize an expensive computed value                                |
| `useCallback` | Memoize a function reference (useful for child component props)    |
| `useReducer`  | Manage complex state with a reducer pattern (alternative to Redux) |
| `useLayoutEffect` | Like `useEffect`, but fires synchronously after DOM mutations  |

---

**Quick example**

```jsx
import { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

In one small component, you've added **state** (`useState`) and a **lifecycle-like side effect** (`useEffect`) — no class, no `this`, no lifecycle methods.

---

**Custom Hooks**

You can build your own Hooks to extract and reuse stateful logic across components. A custom Hook is just a function whose name starts with `use` and which calls other Hooks.

```jsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return width;
}

// Usage
function App() {
  const width = useWindowWidth();
  return <p>Window is {width}px wide</p>;
}
```

This is the **real power of Hooks** — turning stateful logic into a reusable, composable function.

---

### Common interview follow-ups

**Q: Can I use Hooks in class components?**
No. Hooks only work inside function components or other Hooks. For classes, stick with `this.state` and lifecycle methods.

**Q: Are Hooks a replacement for Redux?**
Not exactly. `useState` + `useReducer` + `useContext` can handle most local and medium-scale state needs, but Redux still shines for large apps with complex global state, middleware, and devtools.

**Q: Do Hooks run on every render?**
Yes — every Hook call runs on every render. That's why their **order must stay consistent** (see Rules of Hooks). React uses the call order to match each Hook to its internal state slot.

**Q: Why do Hook names start with `use`?**
It's a convention React's linter relies on to enforce the Rules of Hooks. Anything starting with `use` is treated as a Hook.

---

### One-line summary for the interview

> Hooks are functions that let function components access React features like state and lifecycle, enabling cleaner code, better logic reuse through custom Hooks, and removing the need for classes.

---

## Q22. Rules of Hooks?

1. **Only call at the top level** — never inside loops, conditions, or nested functions.
2. **Only call from React functions** — components or custom hooks.

```jsx
// ❌ Wrong
if (loggedIn) {
  const [name, setName] = useState("");
}

// ✅ Right
const [name, setName] = useState("");
if (loggedIn) {
  /* use name */
}
```

**Why?** React tracks hooks by call order. Conditional hooks break that order.

---

## Q23. Explain `useState`.

Lets a component remember a value between renders.

```jsx
const [count, setCount] = useState(0);
```

- `count` → current value
- `setCount` → updater function
- `0` → initial value

**Never mutate state directly:**

```jsx
// ❌ count = count + 1;
// ✅ setCount(count + 1);
```

---

## Q24. Why use the function form of setState?

When new state depends on previous state:

```jsx
setCount((prev) => prev + 1); // ✅ Safer
```

**Why?** React batches updates. If you click 3 times fast, `setCount(count + 1)` might use a stale value. The function form always gets the latest.

---

## Q25. Explain `useEffect`.

Runs **side effects** — anything outside pure rendering (API calls, timers, subscriptions).

```jsx
useEffect(() => {
  console.log("Ran!");
}, [dependency]);
```

| Dependency Array | When it runs                             |
| ---------------- | ---------------------------------------- |
| `[]`             | Once on mount                            |
| `[count]`        | On mount + every count change            |
| No array         | After every render (almost never wanted) |

**Analogy:** A morning alarm. Set conditions; it fires when met.

---

## Q26. What is the cleanup function in useEffect?

The function you `return` from useEffect — runs when the component unmounts or before the next effect fires.

```jsx
useEffect(() => {
  const timer = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(timer); // cleanup
}, []);
```

**Analogy:** Turning off the stove before leaving the kitchen — prevents leaks.

---

## Q27. Common `useEffect` mistakes?

1. **Missing dependencies** → stale data bugs
2. **Object/array in deps** → infinite loop (new reference every render)
3. **Async function directly in effect** → not allowed; define inside

```jsx
// ❌ useEffect(async () => {...}, [])

// ✅
useEffect(() => {
  const load = async () => { ... };
  load();
}, []);
```

---

## Q28. What is `useRef`?

Two uses:

1. **Reference a DOM element** (e.g., focus an input)
2. **Store a value that survives renders without causing re-renders**

```jsx
const inputRef = useRef(null);
const focus = () => inputRef.current.focus();
return <input ref={inputRef} />;
```

**Analogy:** A sticky note on your monitor. Value sticks around; changing it doesn't redraw the screen.

---

## Q29. `useState` vs `useRef` — when to use which?

- **`useState`** → value change should trigger a re-render (UI updates)
- **`useRef`** → value should persist but NOT trigger re-render

**Example:** Tracking click count for analytics → `useRef`. Showing the count on screen → `useState`.

---

## Q30. What is `useContext`?

Shares data across components without prop drilling.

```jsx
const ThemeContext = createContext("light");

<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>;

// Inside any child
const theme = useContext(ThemeContext);
```

**Analogy:** A building's central AC — every room feels the temperature without separate units.

**Use for:** Auth state, theme, language, user info.

---

## Q31. What is prop drilling?

Passing props through many intermediate components just to reach a deep child.

```
App → Page → Section → Card → Button (needs `user`)
```

Every level passes `user` even if it doesn't use it. **Fix:** `useContext` or a state library.

---

## Q32. What is `useMemo`?

Caches the result of an expensive calculation — only recomputes when dependencies change.

```jsx
const total = useMemo(() => {
  return items.reduce((sum, i) => sum + i.price, 0);
}, [items]);
```

**Analogy:** Sunday meal prep — cook once, eat all week. Only re-cook when ingredients change.

**Don't overuse** — has its own overhead.

---

## Q33. What is `useCallback`?

Caches a **function** so it isn't recreated every render. Useful when passing functions to memoized children.

```jsx
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);
```

**Difference:**

- `useMemo` → caches a value
- `useCallback` → caches a function

---

## Q34. When should you use `useMemo` / `useCallback`?

- When calculations are **genuinely expensive**
- When passing functions/objects to **memoized child components**
- When values are **dependencies of other hooks**

**Don't** wrap everything — premature optimization makes code harder to read.

---

## Q35. What is `useReducer`?

Like `useState` but for **complex state** with multiple sub-values or transitions.

```jsx
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "inc":
      return { count: state.count + 1 };
    case "dec":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: "inc" });
```

**Analogy:** `useState` = single light switch. `useReducer` = control panel with multiple buttons.

**Use when:** Form with many fields, complex multi-step flows.

---

## Q36. What is a custom hook?

A function that uses other hooks. Lets you reuse stateful logic.

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}

// Use anywhere
const { data, loading } = useFetch("/api/merchants");
```

**Rule:** Name must start with `use`.

---

## Q37. What is `useLayoutEffect`?

Like `useEffect`, but fires **synchronously after DOM mutations, before the browser paints**.

**Use when:** You need to measure DOM elements or apply changes before the user sees them. Rarely needed.

**99% of the time:** Use `useEffect`.

---

## Q38. What is the stale closure problem?

When a function "captures" an old value of a variable because the closure was created in an earlier render.

```jsx
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1); // count is always 0!
  }, 1000);
  return () => clearInterval(id);
}, []); // count not in deps
```

**Fix:** Use functional update `setCount(c => c + 1)` or add `count` to dependencies.

---

## Q39. How do you fetch data with hooks?

```jsx
function Merchants() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/merchants");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <ul>
      {data.map((m) => (
        <li key={m.id}>{m.name}</li>
      ))}
    </ul>
  );
}
```

**Always handle loading + error + success states.**

---

## Q40. How do you debounce input in React?

Debouncing = wait until user stops typing before firing a search.

```jsx
const [query, setQuery] = useState("");

useEffect(() => {
  const timer = setTimeout(() => {
    fetch(`/api/search?q=${query}`);
  }, 500);
  return () => clearTimeout(timer); // cleanup cancels previous timer
}, [query]);
```

**Analogy:** Like an elevator door — waits for everyone to stop entering before closing.

---

# PART 3 — REACT ADVANCED + PERFORMANCE (Q41–Q55)

## Q41. What is React.memo?

A HOC that skips re-rendering a component if its props haven't changed.

```jsx
const Card = React.memo(function Card({ name }) {
  return <div>{name}</div>;
});
```

**Use when:** Component renders often with same props. Don't slap it on every component.

---

## Q42. What is the Component Lifecycle?

Three phases:

1. **Mounting** — appears on screen
2. **Updating** — state/props change
3. **Unmounting** — removed from screen

With Hooks:

```jsx
useEffect(() => {
  // mount + update
  return () => {
    // unmount cleanup
  };
}, []);
```

**Analogy:** Hotel guest — check-in, stay, check-out.

---

## Q43. What is an Error Boundary?

A class component that catches JavaScript errors anywhere in its child tree and shows a fallback UI.

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    logErrorToService(error);
  }
  render() {
    if (this.state.hasError) return <h1>Something went wrong.</h1>;
    return this.props.children;
  }
}
```

**Note:** Error boundaries don't catch errors in event handlers, async code, or themselves. Use try/catch for those.

---

## Q44. How do you handle forms in React?

Controlled components are the standard:

```jsx
function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(form),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={form.email} onChange={handleChange} />
      <input name="password" value={form.password} onChange={handleChange} />
      <button>Submit</button>
    </form>
  );
}
```

**For complex forms:** Use libraries like React Hook Form or Formik.

---

## Q45. How does immutable state work?

Always create a new object/array instead of mutating:

```jsx
// ❌ Mutating
user.name = "New";
setUser(user); // React won't re-render — same reference

// ✅ Immutable
setUser({ ...user, name: "New" });
```

**Why?** React uses reference equality (`===`) to detect changes. Mutating keeps the same reference.

---

## Q46. How do you optimize a slow React app?

1. **Identify the bottleneck** with React DevTools Profiler
2. **Use `React.memo`** on components re-rendering with same props
3. **Use `useMemo`/`useCallback`** for expensive computations
4. **Virtualize long lists** (`react-window`)
5. **Lazy-load components** (`React.lazy` + `Suspense`)
6. **Code-split** with dynamic imports
7. **Avoid unnecessary state** — derive instead

---

## Q47. What is React.lazy and Suspense?

Lazy-load components only when needed. Reduces initial bundle size.

```jsx
const Dashboard = React.lazy(() => import("./Dashboard"));

<Suspense fallback={<Spinner />}>
  <Dashboard />
</Suspense>;
```

---

## Q48. What is server-side rendering (SSR)?

The server renders the React app to HTML before sending it to the browser. Faster first paint, better SEO.

**Frameworks:** Next.js, Remix.

For Tap's **internal tools**, SSR is usually overkill — CSR (client-side) is fine.

---

## Q49. What is hydration?

After SSR sends HTML, React "hydrates" it — attaches event listeners and makes it interactive on the client.

**Analogy:** SSR sends a poster (HTML). Hydration plugs the poster into electricity (JS) so the buttons work.

---

## Q50. What's the difference between CSR and SSR?

| CSR                     | SSR                     |
| ----------------------- | ----------------------- |
| Browser renders the app | Server pre-renders HTML |
| Slower first paint      | Faster first paint      |
| Worse for SEO           | Better for SEO          |
| Simpler setup           | More complex            |

---

## Q51. What is state management — when do you need Redux/Zustand?

`useState` + `useContext` handles most cases. Use a state library when:

- Many components need shared, complex state
- You need time-travel debugging
- The team prefers a structured pattern

**For junior at Tap:** Hooks + Context is enough. Mention Zustand is your preferred library if asked.

---

## Q52. Why Zustand over Redux for small apps?

- Less boilerplate (no actions, reducers, providers)
- Smaller bundle size
- Easier learning curve

```jsx
import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
}));

const count = useStore((s) => s.count);
```

---

## Q53. What is React Router?

Library for routing in React web apps.

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/merchants/:id" element={<MerchantDetail />} />
  </Routes>
</BrowserRouter>;

// Access params
const { id } = useParams();
```

---

## Q54. How do you handle authentication in React?

1. User submits login → API returns JWT token
2. Store token (localStorage or memory)
3. Attach token to API requests (`Authorization: Bearer <token>`)
4. Wrap protected routes with a `<PrivateRoute>` component that checks auth state
5. Store auth state in Context

```jsx
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}
```

---

## Q55. What's the difference between React and Next.js?

- **React** → library, you build everything (routing, SSR, etc.)
- **Next.js** → full framework on top of React (file-based routing, SSR/SSG, API routes)

For Tap's internal tools, plain React (with Vite) is often enough. Next.js shines for public/SEO-heavy apps.

---

# PART 4 — MODERN REACT (18/19, Compiler, Server Components) (Q56–Q75)

## Q56. What's new in React 18 that matters for daily work?

**Three things to know cold:**

1. **Automatic batching everywhere** — In React 17, state updates inside Promises, setTimeouts, or native event handlers weren't batched. In React 18, they are. Multiple `setState` calls in any context now produce **one** re-render.
2. **Concurrent rendering** — React can pause, abort, or resume rendering work. This unlocks `useTransition` and `useDeferredValue`.
3. **`createRoot`** — `ReactDOM.render` is gone. Use `createRoot(container).render(<App/>)`.

**One-liner for the interview:** "React 18 made all rendering concurrent-capable, batched all state updates by default, and gave us hooks to mark updates as low-priority."

---

## Q57. What is `useTransition` and when do you use it?

Lets you mark a state update as **non-urgent**, so React can interrupt it if something more important (typing, clicking) happens.

```jsx
const [isPending, startTransition] = useTransition();

function handleSearch(e) {
  setQuery(e.target.value);          // urgent — input must update immediately
  startTransition(() => {
    setResults(filter(big, e.target.value));  // non-urgent — can be interrupted
  });
}
```

**Real use case:** Search input filtering a huge list. Without `useTransition`, typing feels laggy because every keystroke blocks on re-rendering 10,000 rows. With it, the input stays responsive and the list catches up.

**vs debouncing:** Debouncing delays the work; transitions let the work start but make it interruptible. Often you use both.

---

## Q58. What is `useDeferredValue`?

Returns a copy of a value that **lags behind** during urgent updates. Same concept as `useTransition` but for values you don't own (e.g., a prop).

```jsx
function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  const results = useMemo(() => filter(big, deferredQuery), [deferredQuery]);
  return <List items={results} />;
}
```

**When to use which:**
- `useTransition` → you control the state setter
- `useDeferredValue` → you receive a value as a prop or from a hook

---

## Q59. What is the React Compiler (React 19)?

A build-time compiler that **automatically memoizes** components, values, and callbacks. The idea: most of the manual `useMemo` / `useCallback` / `React.memo` work goes away.

```jsx
// Before compiler — manual memoization
const total = useMemo(() => items.reduce((s, i) => s + i.price, 0), [items]);
const onClick = useCallback(() => doThing(id), [id]);

// With compiler — write it normally; the compiler memoizes for you
const total = items.reduce((s, i) => s + i.price, 0);
const onClick = () => doThing(id);
```

**Interview-grade answer:** "React 19's compiler auto-memoizes, so I write components more straightforwardly. I still reach for `useMemo` when I see a measurable perf issue in the profiler, or when the compiler isn't enabled on a project — but I no longer wrap everything reflexively."

**Don't claim** you've shipped major production code with it unless you have — it's still being adopted across teams.

---

## Q60. What are React Server Components (RSC)?

Components that **run on the server**, never ship JS to the browser, and can directly access the database, filesystem, or backend APIs.

```jsx
// Server Component (runs on server only)
export default async function ProductList() {
  const products = await db.products.findMany();  // ✅ direct DB access
  return (
    <ul>{products.map((p) => <li key={p.id}>{p.name}</li>)}</ul>
  );
}
```

**Key differences from regular components:**
- Can be `async`
- No `useState`, `useEffect`, or browser APIs (no JS ships to the client)
- Can render Client Components, which DO have interactivity

**Where you'll meet them:** Next.js App Router. Plain Vite React doesn't use RSC.

---

## Q61. What is the Actions API in React 19?

A built-in way to handle form submissions and async state. You pass an async function to a `<form>`'s `action` prop, and React tracks pending/error state for you.

```jsx
import { useActionState } from "react";

function ProfileForm() {
  const [state, formAction, isPending] = useActionState(
    async (prev, formData) => {
      const name = formData.get("name");
      const res = await updateProfile(name);
      return res.ok ? "Saved" : "Failed";
    },
    null
  );

  return (
    <form action={formAction}>
      <input name="name" />
      <button disabled={isPending}>Save</button>
      {state && <p>{state}</p>}
    </form>
  );
}
```

**Replaces:** manual `useState` for `loading`, `error`, and `submitting` flags.

---

## Q62. What is `useOptimistic`?

Lets you **show the success state immediately** while the real request is still in flight. If it fails, React rolls back.

```jsx
const [optimisticMessages, addOptimistic] = useOptimistic(
  messages,
  (state, newMsg) => [...state, { ...newMsg, sending: true }]
);

async function send(text) {
  addOptimistic({ text });           // UI updates instantly
  await sendToServer(text);          // real call in background
}
```

**Real-world use:** Likes, sends, deletes — anywhere the user expects instant feedback. Critical for payment apps where "Pay" must feel fast.

---

## Q63. What is the `use` hook in React 19?

Reads a Promise or Context **conditionally**, suspending the component until the promise resolves.

```jsx
function Profile({ userPromise }) {
  const user = use(userPromise);   // suspends until resolved
  return <h1>{user.name}</h1>;
}
```

**Unique trait:** Unlike other hooks, `use` can be called inside conditionals and loops. Pair it with `<Suspense>` for clean loading states.

---

## Q64. What is Suspense and how does it work for data fetching?

`<Suspense>` declares a **loading boundary**. While anything inside it is "suspended" (waiting for data), React shows the fallback.

```jsx
<Suspense fallback={<Spinner />}>
  <UserProfile userId={id} />
</Suspense>
```

In modern React, data libraries (TanStack Query, Relay) and Server Components plug into Suspense — components throw a promise, React catches it, shows the fallback, retries when the promise resolves.

**Why it matters at 3yoe:** Suspense is the modern alternative to `if (loading) return <Spinner />` everywhere. Cleaner, composable, works across the tree.

---

## Q65. What is automatic batching?

In React 18, **all state updates in the same tick get batched into one re-render**, regardless of where they happen — event handlers, Promises, timeouts, native events.

```jsx
// React 17: 2 re-renders (one for each setState in the Promise)
fetch("/api").then(() => {
  setData(d);
  setLoading(false);
});

// React 18: 1 re-render — both updates batched
```

**Opt out** with `flushSync(() => setX(...))` if you really need a synchronous flush (rare, usually for measuring DOM after an update).

---

## Q66. What is React Strict Mode?

A development-only wrapper that runs extra checks:

- Components render **twice** to catch impure logic
- Effects run, clean up, and run again to catch missing cleanups
- Warns about deprecated APIs and unsafe lifecycles

```jsx
<StrictMode>
  <App />
</StrictMode>
```

**Interview tip:** If asked "why does my `useEffect` run twice on mount in dev?", the answer is Strict Mode — and that's a **feature**, not a bug. It surfaces effects that don't clean up properly.

---

## Q67. What is React Fiber?

The internal **reconciler** rewritten in React 16. It splits rendering work into small units that can be paused, resumed, and prioritized. Fiber is what makes concurrent rendering possible.

**You don't write Fiber code** — but at 3yoe you should know it exists and underlies everything modern React does.

**One-liner:** "Fiber is React's incremental rendering engine — it lets React break work into chunks, prioritize urgent updates over background ones, and avoid blocking the main thread."

---

## Q68. TanStack Query (React Query) — why use it instead of `useEffect`?

Hand-rolled `useEffect` + `fetch` is fine for one component. For a real app, you reinvent these problems:

- Caching (same data fetched twice in different components)
- Background refetching when the user returns to the tab
- Stale-while-revalidate
- Request deduplication
- Mutations with rollback
- Pagination, infinite scroll

TanStack Query solves all of this:

```jsx
const { data, isLoading, error } = useQuery({
  queryKey: ["merchants"],
  queryFn: () => fetch("/api/merchants").then(r => r.json()),
});
```

**3yoe answer:** "For anything beyond a one-off fetch, I reach for TanStack Query. It removes a whole category of bugs around stale data, race conditions, and cache invalidation, and the code is significantly shorter than the hand-rolled equivalent."

---

## Q69. How do you handle race conditions in data fetching?

The classic bug: user types fast, slow request returns AFTER fast request, UI shows stale data.

**Hand-rolled fix — abort old requests:**

```jsx
useEffect(() => {
  const controller = new AbortController();
  fetch(`/api/search?q=${query}`, { signal: controller.signal })
    .then(r => r.json())
    .then(setResults)
    .catch(err => { if (err.name !== "AbortError") setError(err); });
  return () => controller.abort();
}, [query]);
```

**Or use a query library** — TanStack Query handles this for free via stable query keys.

---

## Q70. What's the difference between `useEffect` and `useLayoutEffect`?

- **`useEffect`** — runs **after** the browser paints. Non-blocking. Use for 99% of side effects (API calls, subscriptions, logging).
- **`useLayoutEffect`** — runs **synchronously after DOM mutations, before paint**. Blocks the paint. Use when you must measure the DOM and update it before the user sees anything (avoid flicker).

```jsx
useLayoutEffect(() => {
  const { height } = ref.current.getBoundingClientRect();
  setHeight(height);   // measure + set in same frame, no flicker
}, []);
```

**SSR caveat:** `useLayoutEffect` doesn't run on the server and React will warn you. Use `useEffect` if your component renders during SSR.

---

## Q71. What are Higher-Order Components (HOCs)?

A function that takes a component and returns a new component with added behavior. The pre-hooks pattern for sharing logic.

```jsx
function withAuth(Component) {
  return function Wrapped(props) {
    const user = useAuth();
    if (!user) return <Redirect to="/login" />;
    return <Component {...props} user={user} />;
  };
}

const ProtectedDashboard = withAuth(Dashboard);
```

**Modern preference:** Custom hooks (`useAuth()`) over HOCs. HOCs still appear in older codebases — recognize them, don't reach for them first.

---

## Q72. What are Render Props?

Pass a function as a child that returns JSX, letting the parent control behavior and the consumer control rendering.

```jsx
<DataFetcher url="/api/x">
  {({ data, loading }) => loading ? <Spinner /> : <List items={data} />}
</DataFetcher>
```

Same fate as HOCs — largely replaced by custom hooks. Still useful when you genuinely need to inject behavior into different rendered outputs.

---

## Q73. What is the Compound Component pattern?

Multiple components that work together as one cohesive API, sharing state implicitly via Context.

```jsx
<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="details">Details</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Panel value="overview">...</Tabs.Panel>
  <Tabs.Panel value="details">...</Tabs.Panel>
</Tabs>
```

**Why:** Flexible composition. The consumer arranges pieces however they want. shadcn/ui, Radix, and Headless UI all use this pattern.

---

## Q74. What is `React.forwardRef` and when do you need it?

Lets a parent pass a `ref` through your component to a DOM element underneath.

```jsx
const Input = React.forwardRef(function Input(props, ref) {
  return <input ref={ref} {...props} />;
});

// Parent can now focus the input
const ref = useRef();
<Input ref={ref} />;
```

**In React 19:** `forwardRef` is no longer required for function components — `ref` becomes a regular prop. Worth knowing the old API still exists in older codebases.

---

## Q75. What are Portals?

Render children into a DOM node **outside** the parent's hierarchy. The component tree stays the same; only the DOM output moves.

```jsx
import { createPortal } from "react-dom";

function Modal({ children }) {
  return createPortal(children, document.getElementById("modal-root"));
}
```

**Use for:** Modals, tooltips, toasts — anything that needs to break out of `overflow: hidden` or z-index stacking contexts.

---

# PART 5 — ANTI-PATTERNS, SECURITY, TESTING, ACCESSIBILITY (Q76–Q95)

## Q76. ANTI-PATTERN: Using `useEffect` to derive state.

The single most common mid-level mistake interviewers probe for.

```jsx
// ❌ Anti-pattern: storing derived state
const [items, setItems] = useState([]);
const [total, setTotal] = useState(0);

useEffect(() => {
  setTotal(items.reduce((s, i) => s + i.price, 0));
}, [items]);
```

**Problems:**
1. Two re-renders for every items change (one for items, one for total).
2. Two sources of truth that can drift out of sync.
3. Brief flicker where `total` shows the old value.

```jsx
// ✅ Compute during render
const total = items.reduce((s, i) => s + i.price, 0);

// ✅ Or memoize if genuinely expensive
const total = useMemo(
  () => items.reduce((s, i) => s + i.price, 0),
  [items]
);
```

**Interview-grade rule of thumb:** "If you ever write `useEffect(() => setX(derivedFromY), [y])`, stop. Compute X during render or with `useMemo`."

---

## Q77. ANTI-PATTERN: Syncing props to state.

```jsx
// ❌ This is almost always a bug
function Form({ initialName }) {
  const [name, setName] = useState(initialName);
  useEffect(() => setName(initialName), [initialName]);  // overwrites user edits!
}
```

**The bug:** If a parent re-fetches and `initialName` changes, the user's edits get wiped out.

**Fix — reset only on identity change:**

```jsx
useEffect(() => setName(user.name), [user.id]);   // only when user changes
```

**Or use the `key` prop** — re-mount the form when the user changes:

```jsx
<Form key={user.id} initialName={user.name} />
```

---

## Q78. ANTI-PATTERN: Reading localStorage on every render.

```jsx
// ❌ Reads localStorage every render
const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

// ✅ Lazy initializer — runs once
const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
```

`useState` accepts a function — it's called only on mount. Same for `useReducer`. Critical for expensive initial values.

---

## Q79. ANTI-PATTERN: Multiple boolean flags for status.

```jsx
// ❌ Possible to have isLoading + isError both true
const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);

// ✅ Single state machine
const [status, setStatus] = useState("idle");
// "idle" | "loading" | "success" | "error"
```

**Why interviewers love this:** Impossible states (`isLoading && isSuccess`) are a sign of poor state modeling. A union type or `useReducer` eliminates them.

---

## Q80. ANTI-PATTERN: Inline object/array props on memoized children.

```jsx
// ❌ `style` is a new object every render — React.memo is useless
<Memoized style={{ color: "red" }} items={[1, 2, 3]} />

// ✅
const style = useMemo(() => ({ color: "red" }), []);
const items = useMemo(() => [1, 2, 3], []);
```

**With React Compiler enabled:** this is mostly handled for you. Without it, this is a common cause of "I added `React.memo` and nothing changed."

---

## Q81. ANTI-PATTERN: `useEffect` as a lifecycle replacement.

`useEffect` is for **synchronization with external systems**, not "run code after render."

```jsx
// ❌ Wrong mental model
useEffect(() => {
  trackPageView();   // not synchronization — this is an event
}, []);

// ✅ Better: do it in the event handler that caused it
function navigateToPage(p) {
  trackPageView(p);
  navigate(p);
}
```

If it's not synchronizing with something external (DOM, server, browser API, subscription), it probably doesn't belong in `useEffect`.

---

## Q82. How do you prevent XSS in React?

React **auto-escapes** everything rendered as a child — `<div>{userInput}</div>` is safe by default.

**Where you can still introduce XSS:**

1. **`dangerouslySetInnerHTML`** — name is a warning. Only use with sanitized HTML (DOMPurify).
2. **`href={userInput}`** — `javascript:alert(1)` URLs. Validate that URLs start with `http://`, `https://`, or `/`.
3. **`<script>` injected via third-party libraries.**

```jsx
// ✅ Sanitize before injecting HTML
import DOMPurify from "dompurify";
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />;
```

---

## Q83. How do you securely store auth tokens?

Three options, in order of safety:

1. **HTTP-only cookies** — best. JS can't read them, so XSS can't steal them. Server sets `Set-Cookie: token=...; HttpOnly; Secure; SameSite=Strict`.
2. **In-memory** (React state) — safe from XSS reading via `document`, lost on refresh.
3. **localStorage** — easiest, but readable by any JS that runs on your domain (including injected scripts).

**For a payment app:** prefer HTTP-only cookies with CSRF protection. If you must use localStorage, lock down your CSP headers.

---

## Q84. How do you test a React component?

Standard stack: **Jest** (test runner) + **React Testing Library** (RTL).

```jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("submits the form with the entered email", async () => {
  const onSubmit = jest.fn();
  render(<LoginForm onSubmit={onSubmit} />);

  await userEvent.type(screen.getByLabelText(/email/i), "a@b.com");
  await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

  expect(onSubmit).toHaveBeenCalledWith({ email: "a@b.com" });
});
```

**RTL philosophy:** test what the user sees, not implementation. Query by role/label/text — not by class names or test IDs (use those only as last resort).

---

## Q85. What's the testing pyramid for a React app?

- **Unit tests** (lots) — pure utility functions, hooks (with `@testing-library/react`'s `renderHook`)
- **Component tests** (many) — render component, simulate user actions, assert on output
- **Integration tests** (some) — multiple components working together (e.g., a form with validation)
- **End-to-end** (few) — Playwright or Cypress hits the real app in a browser

**Don't test:** internal state, exact CSS classes, snapshot tests for everything (they're noisy).

---

## Q86. How do you make React apps accessible?

Five things to mention:

1. **Semantic HTML** — `<button>` not `<div onClick>`. Real `<form>`, real `<h1>`–`<h6>`.
2. **Labels for inputs** — `<label htmlFor="email">` paired with `<input id="email">`, or wrap.
3. **`alt` text on images** — `alt=""` for decorative, descriptive for content.
4. **Focus management** — when a modal opens, focus moves into it; on close, focus returns.
5. **ARIA only when needed** — first try semantic HTML, then add `aria-label`, `aria-live`, `role` if necessary.

**Tools:** axe DevTools, Lighthouse, keyboard-only testing.

---

## Q87. How do you handle forms in a real app?

For anything beyond two fields, use **React Hook Form** with **Zod** for schema validation.

```jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  amount: z.number().positive(),
});

function PayForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => api.pay(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      <input type="number" {...register("amount", { valueAsNumber: true })} />
      <button>Pay</button>
    </form>
  );
}
```

**Why RHF over controlled state:** doesn't re-render on every keystroke, less code, better validation story.

---

## Q88. What is the difference between deep and shallow comparison?

- **Shallow** — checks reference equality (`===`). `{a: 1} === {a: 1}` → `false` (different references).
- **Deep** — checks every key/value recursively. `_.isEqual({a:1}, {a:1})` → `true`.

**Why it matters in React:**
- `React.memo`, `useMemo`, `useEffect` dependencies all use shallow comparison.
- That's why a new object/array prop on every render breaks memoization — references differ even if contents are identical.

---

## Q89. Why are React components expected to be pure?

Pure = same inputs (props, state, context) → same output, no side effects during render.

**Why React requires this:**
- Strict Mode renders components twice to catch impurity bugs.
- Concurrent rendering may **start**, **abort**, and **restart** renders. Impure renders would leak side effects.
- Memoization relies on it — if a component is pure, React can safely reuse its output.

**Side effects belong in:** event handlers, `useEffect`, or external functions you call from them.

---

## Q90. What is `useId`?

Generates a stable, unique ID that's the same on server and client — useful for accessibility attributes that need to match.

```jsx
function FormField({ label }) {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </>
  );
}
```

**Don't use it** for list keys — it's for HTML attribute IDs (label-input pairs, ARIA attributes).

---

## Q91. How do you handle internationalization (i18n) in React?

Standard library: **`react-i18next`** or **`react-intl`**.

```jsx
const { t } = useTranslation();

<button>{t("checkout.payNow")}</button>
```

**For Tap specifically** (MENA = Arabic, English, often French):
- Plan for **RTL** from day one. Tailwind has `rtl:` variants.
- Test layouts with longer translations (German often expands 30%).
- Date/number formatting via `Intl.NumberFormat` and `Intl.DateTimeFormat` — built into the browser.

---

## Q92. What is hydration mismatch and how do you debug it?

When SSR HTML and the client's first render don't match. React logs a warning and falls back to client-side rendering for that subtree — slow and breaks SEO.

**Common causes:**
- Rendering `new Date().toLocaleString()` (server and client time zones differ)
- Reading `localStorage` or `window` during initial render
- `Math.random()` in render

**Fix:** Render the dynamic part only on the client, gated by a mount check, or use `useEffect` to set it after hydration.

```jsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
return <span>{mounted ? new Date().toLocaleString() : ""}</span>;
```

---

## Q93. What is the React DevTools Profiler?

Browser extension that records renders and shows:
- Which components rendered
- Why they rendered (props change, state change, parent render)
- How long each render took

**Workflow:** Record → reproduce the slow interaction → stop → look for components rendering more often than they should, or single renders that take >16ms.

**Never optimize without profiling.** Interviewers will ask "how did you know it was slow?" — the answer should be "I measured it with the Profiler."

---

## Q94. How do you handle global error tracking?

Two layers:

1. **Error Boundaries** for React render errors — catch them, show a fallback, log to a service.
2. **`window.addEventListener("error")` and `unhandledrejection`** for JS errors outside React.

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) {
    Sentry.captureException(error, { extra: info });
  }
  render() {
    return this.state.hasError ? <Fallback /> : this.props.children;
  }
}
```

**Note:** Error Boundaries don't catch errors in event handlers, async code, or SSR. Wrap those in `try/catch` and log manually.

---

## Q95. Suspense vs Error Boundary — what's the difference?

- **Suspense** catches **promises** thrown during render → shows a loading fallback.
- **Error Boundary** catches **errors** thrown during render → shows an error fallback.

You typically nest them:

```jsx
<ErrorBoundary fallback={<ErrorScreen />}>
  <Suspense fallback={<Spinner />}>
    <Dashboard />
  </Suspense>
</ErrorBoundary>
```

---

# PART 6 — REACT SCENARIOS + MOCK INTERVIEW

## S1. SCENARIO: Build an internal dashboard showing live payment status.

**Walk-through answer:**

1. **Set up:** React with Vite, Tailwind for styling, shadcn/ui for components.
2. **Data layer:** A `useFetch` custom hook hitting Tap's internal API. Polling every 5 seconds or, if available, WebSocket/SSE for true real-time.
3. **UI:**
   - Top: filter bar (date range, merchant, status)
   - Main: paginated table with virtualization for big datasets
   - Color-coded statuses (green = success, red = failed, yellow = pending)
4. **State:** `useState` for filters, `useContext` for shared user/auth data.
5. **Error handling:** Loading skeleton, retry button, toast on failure.
6. **Deploy:** Vercel for staging, share with Ops team.
7. **AI accelerator:** Cursor to scaffold the table component, Copilot for API hook boilerplate.
8. **Alternative:** If pure CRUD admin UI, I'd consider **Retool** to ship in hours instead of days.

---

## S2. SCENARIO: A React app is slow. How do you diagnose and fix it?

**Answer:**

1. **Measure first** with React DevTools Profiler — find which components re-render most.
2. **Check for common issues:**
   - Components re-rendering with same props → wrap in `React.memo`
   - Inline functions/objects causing re-renders → `useCallback`, `useMemo`
   - Large lists rendered all at once → use virtualization (`react-window`)
   - Heavy computations in render → move to `useMemo`
3. **Network:** Look at the Network tab — too many requests? Batch them, or cache with React Query.
4. **Bundle size:** Use `vite-plugin-bundle-visualizer`. Code-split with `React.lazy`.
5. **Validate the fix** with the Profiler again — don't optimize blindly.

---

## S3. SCENARIO: An API call fails sometimes. How do you handle it gracefully?

**Answer:**

```jsx
const fetchWithRetry = async (url, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1))); // exponential backoff
    }
  }
};
```

Plus in UI:

- Show loading state
- Show error with a "Retry" button
- Toast notification for transient failures
- Log to a service (Sentry) for tracking

---

## S4. SCENARIO: Build a feature flag system for internal tools.

**Answer:**

1. **Simplest version:** A JSON file in the repo with flags + values.
2. **Better:** A database table read at app start; flags stored in Context.
3. **Even better:** Use a service like LaunchDarkly or PostHog.

```jsx
const { isEnabled } = useFeatureFlag("new_dashboard");

return isEnabled ? <NewDashboard /> : <OldDashboard />;
```

Useful for gradual rollouts, A/B tests, killing buggy features without redeploying.

---

## S5. SCENARIO: Design a multi-step KYC onboarding wizard.

**Answer (talk through structure first):**

1. **State shape** — single `useReducer`, not five separate `useState`s. Steps are a state machine: `{ step: 'identity' | 'banking' | 'docs' | 'review' | 'submitted', data: {...}, errors: {} }`.
2. **URL sync** — each step is a route (`/onboard/identity`, `/onboard/banking`) so browser back works and users can deep-link.
3. **Persistence** — save partial progress to backend (or `localStorage` for an MVP) so users can resume on another device.
4. **Validation** — per-step Zod schema; can't advance until current step is valid.
5. **Server state** — TanStack Query for the merchant data; reducer only holds the in-progress form.
6. **Edge cases**: refresh mid-step, back button, expired session, file upload retries.

**The senior-ish insight:** "I separate **form state** (what the user is typing) from **server state** (what's saved). They have different lifecycles."

---

## S6. SCENARIO: A user reports that clicking 'Pay' sometimes charges them twice.

**Walk-through the debugging:**

1. **First hypothesis — double click.** Check if the button is disabled during submission. If not → that's likely the bug.
2. **Fix immediately**: disable button on submit, show loading state.

   ```jsx
   const [submitting, setSubmitting] = useState(false);
   const onPay = async () => {
     if (submitting) return;
     setSubmitting(true);
     try { await api.charge(); } finally { setSubmitting(false); }
   };
   ```
3. **But that's not enough** — network retries or React 18 strict-mode double-invocation could also re-fire. The real fix is **idempotency on the backend**: client generates a UUID (`idempotencyKey`), server rejects duplicate keys.
4. **Add monitoring** — alert when the same `idempotencyKey` is seen twice; alert if charge attempt count per user spikes.
5. **Apologize to the affected user, refund, write a postmortem.**

**Senior signal:** mentioning idempotency at the API level, not just disabling a button.

---

## S7. SCENARIO: Your bundle is 2MB. How do you shrink it?

**Answer:**

1. **Measure first** — `vite-plugin-bundle-visualizer` or `rollup-plugin-visualizer`. Find the heaviest dependencies.
2. **Common offenders:**
   - Importing entire libraries: `import _ from 'lodash'` → 70KB. Use `import debounce from 'lodash/debounce'` → 2KB. Or switch to `lodash-es` with tree-shaking.
   - Moment.js → swap for `date-fns` or `dayjs`.
   - Chart libraries — Recharts is heavy, consider Chart.js or visx if the use is minimal.
3. **Code-split routes** with `React.lazy` + `Suspense`.
4. **Dynamic imports** for rarely-used features (PDF viewer, complex modal).
5. **Drop unused polyfills** if browser support allows.
6. **Compression** — gzip/brotli on the server (usually a deploy config, not bundle).
7. **Re-measure.** Don't ship optimizations you didn't verify.

---

## S8. SCENARIO: How would you implement undo/redo in a form?

**Answer:**

A history stack of past states, a pointer, and a redo stack.

```jsx
function useHistory(initial) {
  const [state, setState] = useState({
    past: [],
    present: initial,
    future: [],
  });

  const set = (next) =>
    setState((s) => ({
      past: [...s.past, s.present],
      present: next,
      future: [],
    }));

  const undo = () =>
    setState((s) =>
      s.past.length === 0
        ? s
        : {
            past: s.past.slice(0, -1),
            present: s.past[s.past.length - 1],
            future: [s.present, ...s.future],
          }
    );

  const redo = () =>
    setState((s) =>
      s.future.length === 0
        ? s
        : {
            past: [...s.past, s.present],
            present: s.future[0],
            future: s.future.slice(1),
          }
    );

  return { state: state.present, set, undo, redo,
           canUndo: state.past.length > 0, canRedo: state.future.length > 0 };
}
```

**For very large forms:** store diffs instead of full snapshots to keep memory in check.

---

## S9. SCENARIO: How would you architect a design system for Tap's internal tools?

**Answer:**

1. **Foundation: design tokens** — colors, spacing, typography, radii defined as CSS variables or a TS file. Single source of truth.
2. **Component layer**: built on Radix Primitives (accessibility done right) or Headless UI, styled with Tailwind. Or shadcn/ui — components copy-pasted into your repo, fully owned.
3. **Distribution**: a private npm package, or a monorepo (`pnpm workspaces` + Turborepo) with apps consuming a `@tap/ui` package.
4. **Docs**: Storybook for a visual catalog with usage examples.
5. **Versioning**: semantic versions; major bumps require migration notes.
6. **Theming**: light/dark + RTL support out of the box (critical for MENA).

**Honest answer for 3yoe:** "I'd lean on shadcn/ui to start — it gets you 80% there in a week. As patterns emerge, extract them into a private package."

---

## S10. SCENARIO: You need to refactor a 2000-line component. Where do you start?

**Answer:**

1. **Don't rewrite — refactor in place** behind tests. Add tests for the current behavior first (especially the parts you're scared to break).
2. **Extract pure functions** out of the component (formatting, validation, derivation).
3. **Extract custom hooks** for stateful logic (`useMerchantData`, `useFormState`).
4. **Split into sub-components** by responsibility. The "rule of one screen" — if it doesn't fit on one screen, it does too much.
5. **One PR per extraction.** Reviewers can actually review a small change.
6. **Don't change behavior** while refactoring. If you spot a bug, fix it in a separate PR.

**Senior signal:** "Tests first, small PRs, no behavior changes during refactor."

---

# 🎤 MOCK INTERVIEW — Questions + Model Answers

## Technical Round

### M1. "Walk me through what happens when state changes in React."

> "When I call a setter like `setCount`, React schedules an update. It re-runs the component function, producing a new virtual DOM tree. React then compares this new tree with the previous one — that's reconciliation. It finds the minimum changes needed and applies them to the real DOM in a single batch. Components only re-render if their state or props actually changed, which is why I use immutable updates — React uses reference equality to detect changes."

---

### M2. "Build me a counter component out loud."

> "I'd import `useState` from React. I create a functional component `Counter`. Inside, I call `useState(0)` and destructure into `count` and `setCount`. I return a `div` containing a `span` showing `{count}`, and a `button` with `onClick={() => setCount(prev => prev + 1)}`. I use the function form of the setter to avoid stale closure issues if clicks happen quickly."

---

### M3. "Difference between `useEffect` with `[]` and without?"

> "With `[]`, the effect runs only once after the initial render — like a mount lifecycle. Without the array at all, it runs after every render, which is almost never what you want and can cause infinite loops if the effect sets state. With dependencies like `[count]`, it runs after mount and after every render where count changed."

---

### M4. "How would you fetch and display a list of merchants from an API?"

> "I'd create a functional component with three state pieces: `data`, `loading`, `error`. In `useEffect` with empty deps, I'd define an async function that fetches the API, wrap it in try/catch, and call it. While loading, I show a spinner. If error, an error message with a retry button. Otherwise, I map over the data using `.map()` with `key={item.id}`. For cleaner code I'd extract this into a `useFetch` custom hook so I can reuse it across the dashboard."

---

### M5. "What's the difference between `useMemo` and `useCallback`?"

> "Both cache values to skip work between renders. `useMemo` caches the **result** of a computation — like a calculated total. `useCallback` caches a **function reference** — useful when passing callbacks to memoized children, so they don't see a new function on every render. Technically, `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`."

---

### M6. "Why do you avoid mutating state directly?"

> "React detects state changes by reference equality. If I mutate an object — say `user.name = 'New'` — the reference is unchanged, so React thinks nothing happened and skips the re-render. I always create a new object with the spread operator: `setUser({...user, name: 'New'})`. Same for arrays — `[...arr, newItem]` instead of `arr.push(newItem)`."

---

### M7. "Performance optimization techniques in React?"

> "First, measure with the Profiler — never optimize blindly. Common wins: wrap heavy components in `React.memo`, cache calculations with `useMemo`, cache callbacks with `useCallback` when passed to memoized children. For long lists, use virtualization libraries like `react-window`. For initial load, code-split with `React.lazy` and `Suspense`. Avoid putting derived values in state — compute them on render. And keep state as close to where it's used as possible to limit re-render scope. With React 19's Compiler, a lot of the manual memoization goes away — but I still profile to verify."

---

### M8. "Walk me through what you know about React 18 and 19."

> "React 18 introduced concurrent rendering — React can now pause, abort, and resume renders. That unlocked `useTransition` and `useDeferredValue` for marking updates as non-urgent, automatic batching everywhere (not just inside event handlers), and Suspense for data. React 19 added the Actions API for forms, `useActionState` and `useOptimistic` for async UI, the `use` hook for reading promises in render, and most importantly the React Compiler — which auto-memoizes so I don't have to scatter `useMemo`/`useCallback` everywhere. Server Components are also stable in frameworks like Next.js App Router, letting components render on the server with direct backend access."

---

### M9. "When is `useEffect` the wrong tool?"

> "Three big cases. First, **derived state** — if I can compute a value from existing state or props, I do it in render or with `useMemo`, not in an effect. Storing derived state in an effect causes two renders, two sources of truth, and drift bugs. Second, **events** — analytics, navigation tracking, form submissions all belong in event handlers, not effects, since they're triggered by user action, not by render. Third, **resetting state when props change** — using `useEffect` to overwrite state from a prop wipes out user edits. The clean fix is the `key` prop to remount, or comparing identity inside the effect. My rule: `useEffect` is for syncing with external systems — DOM APIs, servers, subscriptions. Everything else probably belongs elsewhere."

---

### M10. "How do you handle a race condition in data fetching?"

> "The classic bug: user types in a search, slow request returns after fast one, UI shows stale results. Two approaches. Hand-rolled: I use an `AbortController` in the effect — the cleanup function aborts the previous request before the next runs. Or I gate updates with a `cancelled` flag scoped to the effect. The cleaner answer in production is to use TanStack Query — it cancels stale queries automatically based on query keys, and gives me caching and dedup for free. For three-years-of-experience code, I'd reach for the library unless there's a reason not to."

---

### M11. "Difference between `useMemo` and `React.memo`?"

> "`useMemo` caches a **value** inside a component — recomputes only when its deps change. `React.memo` wraps a **whole component** so it skips re-rendering when its props haven't changed by shallow comparison. They solve different problems: `useMemo` for expensive computations or stable references, `React.memo` for preventing unnecessary re-renders of children. They often work together — `React.memo` on a child is useless if the parent passes a new object every render, so I use `useMemo` to stabilize that object."

---

### M12. "What's the difference between Context and a state library like Zustand or Redux?"

> "Context is for **passing values down a tree**, not really for state management. Any component reading the context re-renders when the context value changes — even if it only cares about one field. For a few rarely-changing values like theme or current user, Context is perfect. For frequently-changing app state, Zustand or Redux scales better: they let components subscribe to specific slices, so unrelated state changes don't trigger re-renders. The decision tree I use: theme/auth/locale → Context; server data → TanStack Query; complex client state shared across the app → Zustand. I avoid Redux unless I need its devtools or the team's already on it."

---

### M13. "How would you handle authentication in a React app?"

> "User submits credentials, API returns a JWT, ideally as an HTTP-only cookie. JS can't read it, so XSS can't steal it. The server sends `Set-Cookie: token=...; HttpOnly; Secure; SameSite=Strict` and reads it on every request. On the client, I have an `AuthContext` that tracks user identity — populated by a `/me` endpoint on app load. Protected routes wrap children with a check: if no user, redirect to login. For refresh, I rely on the server reissuing the cookie or use a refresh-token endpoint that the client calls when an interceptor sees a 401. If the project uses localStorage instead, I'd flag it as a known XSS risk and tighten CSP headers."

---

### M14. "What's the React Compiler and what changes for you?"

> "It's a build-time compiler from the React team that auto-memoizes components, values, and callbacks. Stable in React 19. The effect on my code: I stop reaching for `useMemo` and `useCallback` reflexively — the compiler handles it. I still measure with the Profiler before assuming things are fast, and I still add explicit memoization where it's clearly beneficial or where the compiler can't help. For old code, I leave the manual memoization in place; for new code on a compiler-enabled project, I write more straightforwardly."

---

### M15. "Explain reconciliation, the Virtual DOM, and Fiber."

> "When state changes, React builds a new virtual DOM tree. Reconciliation is the process of figuring out what's different between the new tree and the previous one, and applying only those changes to the real DOM. Fiber is the modern implementation of the reconciler — it breaks rendering into small units of work that can be paused, resumed, or thrown away. That's what makes concurrent features like `useTransition` possible: React can start rendering an expensive update, notice the user typed something, and abandon the in-progress render to handle the typing first. Without Fiber, React renders are all-or-nothing and block the main thread."

---

### M16. "What is Strict Mode and why does it run effects twice in development?"

> "Strict Mode is a development-only wrapper that helps catch bugs early. It intentionally runs each component render twice, and runs effects through a mount → unmount → remount cycle, to surface bugs in code that assumes effects only run once or that components are impure. In production, none of this happens. The double-invocation is a feature: if your effect breaks when run twice, it has a missing cleanup or a side-effect that doesn't belong in render. The fix is almost always a proper cleanup function, not disabling Strict Mode."

---

### M17. "How do you make a component accessible?"

> "Five things. First, semantic HTML — `<button>` instead of `<div onClick>`, real `<form>`, real heading hierarchy. Second, label every input with `<label htmlFor>` or wrap it. Third, ARIA only where semantic HTML can't express the intent — `aria-label`, `aria-live` for dynamic regions, `role` for custom widgets. Fourth, focus management: when a modal opens, focus moves in; when it closes, focus returns to the trigger. Fifth, test with the keyboard alone and run axe DevTools. For a payment app, accessibility isn't optional — it's a legal requirement in many markets."

---

### M18. "How do you test a React component?"

> "Jest plus React Testing Library. RTL's philosophy is to test what the user sees — query by role, label, or text, not by class names or test IDs. I avoid testing implementation details like state values or which hook fired. For each component I write: a render test, tests for the main user flows, an error-case test, and edge cases like empty data or loading. For hooks, I use `renderHook` from RTL. For end-to-end flows like login → dashboard → payment, I use Playwright. The pyramid: lots of unit tests, many component tests, some integration tests, a few E2E tests."

---

### M19. "What's the difference between controlled and uncontrolled inputs, and when do you use each?"

> "Controlled: React state holds the value, `value` and `onChange` keep it in sync. Uncontrolled: the DOM holds the value, you read it via a `ref` (usually on submit). Controlled is the default — it's required for live validation, formatting, or any UI that reacts to typing. Uncontrolled is fine for simple forms where you only care about the value on submit, and for file inputs where the value can't be controlled by React anyway. React Hook Form uses uncontrolled inputs under the hood with refs, which is why it's so fast — no re-render per keystroke."

---

### M20. "What's the difference between server state and client state?"

> "Server state is data that lives on the server — merchants, transactions, user profiles. It can go stale, needs caching, can be re-fetched. Client state is in-memory app state — the current modal, form draft, theme. Different lifecycles, different tools. For server state I use TanStack Query: it handles caching, background refetch, dedup, mutations with rollback. For client state I use `useState`, `useReducer`, or Zustand for cross-component state. Confusing the two is a common architecture bug — like trying to manage API responses in Redux. The mental model: client state is yours to control, server state you're synchronizing with a source of truth."

---

## Coding Round (Live coding — 30 min)

### C1. "Build a search input that filters a list of merchants."

```jsx
import { useState, useMemo } from "react";

const merchants = [
  { id: 1, name: "Carrefour" },
  { id: 2, name: "Talabat" },
  { id: 3, name: "Noon" },
];

function MerchantSearch() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return merchants.filter((m) =>
      m.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search merchants..."
      />
      <ul>
        {filtered.map((m) => (
          <li key={m.id}>{m.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

> "If the list was 10,000+ items, I'd add debouncing or move filtering to the server."

---

### C2. "Build a counter with increment, decrement, and reset."

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => setCount((c) => c - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </div>
  );
}
```

> "I'm using the function form of `setCount` so it stays correct even with rapid clicks."

---

### C3. "Build a todo list with add, mark complete, and delete."

```jsx
import { useState } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const add = () => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setText("");
  };

  const toggle = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = (id) => setTodos(todos.filter((t) => t.id !== id));

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={add}>Add</button>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <span
              style={{ textDecoration: t.done ? "line-through" : "none" }}
              onClick={() => toggle(t.id)}
            >
              {t.text}
            </span>
            <button onClick={() => remove(t.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

> "I'm using `Date.now()` for IDs since this is simple — in a real app I'd use a UUID. Notice all the updates are immutable — `.map`, `.filter`, spread — so React detects the changes."

---

### C4. "Build a custom `useFetch` hook."

```jsx
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    }; // avoid setting state after unmount
  }, [url]);

  return { data, loading, error };
}
```

> "The `cancelled` flag prevents the dreaded 'setState on unmounted component' warning if the user navigates away before the fetch finishes."

---

### C5. "Build a debounced search hook."

```jsx
import { useState, useEffect } from "react";

function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // cancel pending timer on next change
  }, [value, delay]);

  return debounced;
}

// Usage
function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery) return;
    fetch(`/api/search?q=${debouncedQuery}`).then(/* ... */);
  }, [debouncedQuery]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

> "The cleanup function cancels the previous timer, so the API only fires 300ms after the user stops typing. Notice the input stays responsive — only the API call is debounced."

---

### C6. "Build a Theme Context with light/dark toggle."

```jsx
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
```

> "Lazy initializer reads localStorage only once. I throw if the hook is used outside the provider — that's a much friendlier error than 'cannot read property of null' later."

---

### C7. "Build a paginated list with 'load more'."

```jsx
import { useState } from "react";

function PaginatedMerchants() {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/merchants?page=${page}&limit=20`);
      const data = await res.json();
      setItems((prev) => [...prev, ...data.items]);
      setHasMore(data.items.length === 20);
      setPage((p) => p + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ul>{items.map((m) => <li key={m.id}>{m.name}</li>)}</ul>
      {hasMore && (
        <button onClick={loadMore} disabled={loading}>
          {loading ? "Loading…" : "Load more"}
        </button>
      )}
    </div>
  );
}
```

> "I guard against double-clicks with the early return, use functional updates so concurrent clicks are safe, and stop loading when the page returns fewer items than requested."

---

### C8. "Convert this useEffect anti-pattern to render-time computation."

**Given (bad):**

```jsx
function Cart({ items }) {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(items.reduce((s, i) => s + i.price * i.quantity, 0));
  }, [items]);
  return <div>Total: ${total}</div>;
}
```

**Fixed:**

```jsx
function Cart({ items }) {
  // Just compute — no state, no effect
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  return <div>Total: ${total}</div>;
}

// If items is huge and the reduce is genuinely expensive:
function Cart({ items }) {
  const total = useMemo(
    () => items.reduce((s, i) => s + i.price * i.quantity, 0),
    [items]
  );
  return <div>Total: ${total}</div>;
}
```

> "Storing derived state in `useEffect` causes two renders and risks the total drifting out of sync with items. Computing it during render is simpler, faster, and impossible to get wrong."

---

## Pair Programming / Whiteboard Round

### W1. "Walk me through how you'd architect a merchant onboarding tool."

> "First, I'd clarify the scope: web only, or mobile too? Who uses it — only Ops, or merchants themselves? Let me assume Ops-facing web tool for now.
>
> I'd split it into three layers:
>
> 1. **UI layer** — React + Tailwind, with shadcn/ui components. Forms with React Hook Form for validation.
> 2. **Data layer** — A custom `useApi` hook wrapping fetch with auth, retry, and error handling. React Query if we need caching across screens.
> 3. **State layer** — Multi-step form state in a single `useReducer`, so step transitions and form data live together. User auth in Context.
>
> Pages:
>
> - Dashboard listing onboardings in progress
> - Onboarding detail with tabs: KYC, Banking, Branding, Approval
> - Each tab is its own component, lazy-loaded with `React.lazy`
>
> Backend integration: I'd assume there's a REST API. If KYC documents fire webhooks, I'd subscribe to those server-side and surface updates via polling for now, WebSockets later.
>
> Deployment: Vercel, with environment variables for dev/staging/prod APIs. Sentry for error tracking. Documentation: README + a Notion page for the Ops team.
>
> If timeline is very tight, I'd consider building the basic CRUD parts in Retool and only the custom logic in React — saving days of work."

---

### W2. "How would you handle real-time payment status updates?"

> "Three options depending on infrastructure:
>
> 1. **Polling** — simplest. `useEffect` with `setInterval` hitting the API every few seconds. Good enough for low-traffic dashboards.
> 2. **Server-Sent Events (SSE)** — one-way streaming from server to client. Lighter than WebSockets, perfect for status updates.
> 3. **WebSockets** — bidirectional, real-time, ideal if we also need to send commands.
>
> For Tap's payment status — one-way notifications — I'd pick SSE if the backend supports it. Polling as a fallback. I'd build a custom `useLiveStatus` hook that wraps the connection logic so screens just consume `{status, lastUpdated}`."

---

### W3. "Design a permissions / RBAC system on the frontend."

> "Frontend permissions are about **UX, not security** — the real check is on the server. With that caveat, here's the structure.
>
> The auth response includes a list of permissions like `['merchants:read', 'merchants:write', 'payments:refund']`. I store them in `AuthContext`. I expose a hook `useCan(permission)` that returns a boolean, and a `<Can>` component that conditionally renders children.
>
> ```jsx
> const canRefund = useCan('payments:refund');
>
> <Can permission="payments:refund">
>   <button>Refund</button>
> </Can>
> ```
>
> For routes, I have a `<ProtectedRoute permission='...'>` wrapper that redirects to a 403 page if the user lacks access. I never use permissions to decide whether to fetch data — the server returns 403 and the UI handles that. And critical actions like 'refund' always show a confirmation dialog with the amount and merchant name."

---

### W4. "Design a state management strategy for a complex dashboard."

> "I split state into four categories:
>
> 1. **Server state** — TanStack Query. Merchants, transactions, KYC docs, anything that lives on a server. It handles caching, refetching, dedup, and mutation rollback.
> 2. **URL state** — for filters, search queries, current tab, pagination. Lives in the URL so links and refresh work. I use React Router's `useSearchParams` or `nuqs`.
> 3. **Global client state** — Zustand for things shared across the app but not server-owned: theme, sidebar collapsed, current org, draft data.
> 4. **Local component state** — `useState` and `useReducer` for everything tied to a specific component.
>
> The biggest mistake I see is people putting server data in Redux/Zustand. That reinvents caching badly. Server state is fundamentally different — let a library built for it handle it."

---

### W5. "How would you structure a large React monorepo?"

> "I'd use pnpm workspaces with Turborepo. Structure:
>
> ```
> apps/
>   admin-web/      # Ops dashboard
>   merchant-web/   # Merchant portal
>   docs/           # Storybook for the design system
> packages/
>   ui/             # Shared design system components
>   api-client/     # Typed API client (or generated from OpenAPI)
>   utils/          # Pure helpers — formatting, validation, dates
>   eslint-config/  # Shared ESLint
>   tsconfig/       # Shared TypeScript
> ```
>
> Apps depend on packages, packages don't depend on apps. Turborepo caches builds across packages, so a CI run on a one-line change in `admin-web` doesn't rebuild everything. Shared types live in `api-client` — generated from the backend's OpenAPI spec so frontend and backend can't drift. CI runs typecheck → lint → unit tests → build → E2E, with Turbo's affected-only mode so we only test what changed."

---

### W6. "A teammate's PR has performance issues. Walk me through the review."

> "First, I don't comment 'this is slow' without evidence. I pull the branch, open the Profiler, and confirm. If it's actually slow, my feedback is specific: 'this component re-renders 30 times when I click Pay because `style={{...}}` creates a new object each render — moving it to a constant or `useMemo` drops it to 1 render.'
>
> Common things I look for:
> - Inline objects/functions passed to memoized children
> - `useEffect` deriving state that could be a render-time expression
> - Lists without `key`, or `key={index}` on reorderable lists
> - Fetching in components when TanStack Query would dedup
> - Heavy components imported eagerly when they could be lazy
>
> I phrase suggestions as questions when I'm not sure — 'have you considered X?' — and as direct asks when there's a clear best practice. I approve with comments rather than blocking unless it's correctness or security."

---

# 🎯 REACT CHEAT SHEET — Day-Before Refresher

### Core fundamentals

- Components return JSX. Props flow down. State stays inside. Events bubble up via callbacks.
- `useState` for changing data → re-renders. `useEffect` for syncing with external systems. `useRef` for non-rendering values.
- Always use a unique stable `key` in lists. Never use index as key for reorderable lists.
- Never mutate state — always return a new object/array.
- Lifting state up = move shared state to common parent.

### Hooks

- `useState` — local state. `useReducer` — complex state with multiple transitions.
- `useEffect` — synchronization with external systems. **Not** for derived state or events.
- `useContext` — share values without prop drilling. Not for high-frequency state.
- `useMemo` — cache a value. `useCallback` — cache a function reference.
- `useRef` — mutable container that doesn't trigger re-render.
- `useTransition` — mark updates as non-urgent. `useDeferredValue` — defer a value.
- `useId` — stable IDs for label/input pairing.

### Modern React (18/19)

- React 18: automatic batching, concurrent rendering, `useTransition`, Suspense for data.
- React 19: Actions API, `useActionState`, `useOptimistic`, the `use` hook, React Compiler.
- Server Components run on the server, ship zero JS, can `await` directly.
- The Compiler auto-memoizes — manual `useMemo`/`useCallback` largely unnecessary on enabled projects.

### Anti-patterns to flag

- `useEffect` to derive state → compute during render or `useMemo`.
- Syncing props to state → use `key` to remount, or compare identity.
- Multiple booleans for status → single `status: 'idle'|'loading'|'success'|'error'`.
- Reading localStorage on every render → lazy initializer `useState(() => ...)`.
- Inline objects/arrays as props to memoized children → `useMemo`.

### Performance

- Always measure with the Profiler before optimizing.
- Virtualize long lists (`react-window`, `react-virtuoso`).
- Code-split routes with `React.lazy` + `Suspense`.
- Reduce bundle size: tree-shakeable imports, drop heavy deps (Moment → date-fns).
- Keep state as local as possible to limit re-render scope.

### Data fetching

- For anything beyond a one-off: TanStack Query handles caching, dedup, race conditions, retries.
- Always handle loading + error + success states.
- Cancel stale requests with `AbortController` or stable query keys.

### Security

- React auto-escapes children → XSS-safe by default.
- Danger zones: `dangerouslySetInnerHTML`, `href={userInput}`, third-party scripts.
- Sanitize with DOMPurify before injecting HTML.
- Prefer HTTP-only cookies for tokens over localStorage.

### Testing

- Jest + React Testing Library. Query by role/label/text, not class names.
- Test user flows, not implementation. No state introspection.
- Playwright for E2E. Pyramid: many unit, fewer integration, fewest E2E.

### Accessibility

- Semantic HTML first. `<button>`, not `<div onClick>`.
- `<label htmlFor>` on every input.
- Focus management on modal open/close.
- Keyboard test + axe DevTools.

### Mindset for the interview

- Think out loud. "Let me think about this" beats nervous rambling.
- When stuck, narrate: "I'd start by checking X, then look at Y."
- Honest > impressive. "I haven't used that, but here's how I'd approach learning it" lands well.
- At 3 years, interviewers expect trade-off discussion. Don't just name a tool — say *why* you'd pick it over alternatives.
- Ask clarifying questions on scenarios. "Who's the user? What's the scale? Is there an existing system?"

You've got this. Go ace it. 🚀