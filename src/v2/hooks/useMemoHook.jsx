import React, { memo, useMemo, useState } from "react";

function UseMemoHook() {
  // The React useMemo Hook returns a memoised value. (its like caching a value so that it doesn't need to be recalculated);
  // The useMemo hook only runs when one of its dependencies gets updated.

  // the useMemo and useCallback hooks are similar. The main difference is
  // - useMemo retuns a memoized value
  // - useCallback returns a memoized function

  const [counter, setCounter] = useState(0);

  function expensiveFunction() {
    for (let i = 0; i <= 1000000000; i++) {
      if (i === 1000000000) {
        console.log("Expensive Function Called!");
        return 1000000000;
      }
    }
  }
  const result = useMemo(() => expensiveFunction(), []);

  return (
    <div>
      <h1>UseMemoHook</h1>
      <div>
        <h2>Expensive Value : {result}</h2>
      </div>

      <div>
        <button
          onClick={() => {
            setCounter((prev) => prev + 1);
          }}
        >
          Counter : {counter}
        </button>
      </div>
    </div>
  );
}

export default UseMemoHook;
