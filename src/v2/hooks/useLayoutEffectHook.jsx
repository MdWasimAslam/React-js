import React, { useEffect, useLayoutEffect } from "react";

// useLayoutEffect hook is similar to useEffect hook just that it gets called before the component is mounted.
// useLayoutEffect hook is called before painting the DOM elements.

// When should you use useLayoutEffect?

// Use it when you need to:

// ✅ Measure an element's size (offsetWidth, clientHeight, etc.)
// ✅ Measure an element's position (getBoundingClientRect())
// ✅ Scroll to a specific position before the screen is shown
// ✅ Prevent UI flickering while changing the layout

// Should you always use useLayoutEffect?

// ❌ No. Because it runs before painting, it can delay rendering if it does heavy work.

function UseLayoutEffectHook() {
  useEffect(() => {
    console.log("useEffect Called!");
  }, []);

  useLayoutEffect(() => {
    console.log("useLayoutEffect Called!");
  }, []);
  return (
    <div>
      <h1>UseLayoutEffectHook</h1>
      {Array(4000)
        .fill("")
        .map((item, index) => {
          return <div key={index}>{Math.random()}</div>;
        })}
    </div>
  );
}

export default UseLayoutEffectHook;
