---
name: React Hooks before early returns
description: All React hooks must be declared before any conditional early returns; timer cleanup pattern
---

# React Hooks Must Precede Conditional Returns

## The rule
All `useState`, `useEffect`, `useRef`, `useCallback` etc. must be declared at the **top of the component body**, before any `if (!data) return ...` guard.

**Why:** React's Rules of Hooks require hooks to be called in the same order every render. An early `return` before a hook means the hook is skipped on some renders, causing a runtime error: "Hooks can only be called at the top level."

**How to apply:**
- In MockTestMCQ: `useEffect` timer cleanup is declared BEFORE the `if (!allQuestions.length) return` guard.
- Pattern to follow: declare all hooks, then do all early returns, then render.

```js
// ✅ Correct
function MyComponent({ data }) {
  const [state, setState] = useState(null);
  const ref = useRef(null);
  useEffect(() => { return () => cleanup(); }, []);

  if (!data) return <Loading />;   // early return AFTER all hooks
  return <Main />;
}
```
