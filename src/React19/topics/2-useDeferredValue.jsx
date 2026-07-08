import React, { useState, useDeferredValue } from "react";

function UseDeferredValue() {
  const [inputText, setInputText] = useState("");
  const deferredValue = useDeferredValue(inputText);

  return (
    <div>
      <h1>UseDeferredValue</h1>
      <div>
        <pre>
          <code>
            useDeferredValue is a React Hook that delays updating a value so
            urgent UI updates (like typing) stay fast while slower parts of the
            UI update later.
          </code>
        </pre>
      </div>
      <input
        placeholder="Enter Text..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <h3>Current Value : {inputText}</h3>

      <h3>Deferred Value : {deferredValue}</h3>
      <SlowList inputText={deferredValue} />
    </div>
  );
}

function SlowList({ inputText }) {
  return (
    <>
      {new Array(20000).fill("").map((item, index) => {
        return (
          <div key={index}>
            Text : {inputText} {item}
          </div>
        );
      })}
    </>
  );
}

export default UseDeferredValue;
