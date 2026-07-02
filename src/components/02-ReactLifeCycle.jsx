import React, { useEffect, useState } from "react";

//--- Life Cycles ---
// Mount
// Update
// Unmount

function ReactLifeCycle() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <h1>React Life Cycle</h1>
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? "Hide" : "Show"}
      </button>
      {show && <LifeCycleComponent />}
    </div>
  );
}

function LifeCycleComponent() {
  const [count, setCount] = useState(0);

  // This will run on mount
  useEffect(() => {
    console.log("Mounting Phase Only [useEffect]");
  }, []);

  // This will run on update
  useEffect(() => {
    console.log("Update Phase Only! [UseEffect]");
  }, [count]);

  // This will run on unmount
  useEffect(() => {
    return () => {
      console.log("Unmounting Phase Only! [useEffect]");
    };
  }, []);

  // This will run on every lifecycle
  useEffect(() => {
    console.log("");
  });

  return (
    <>
      <div
        style={{
          backgroundColor: "#434343ff",
          border: "1px oslid grey",
          padding: "20px",
          borderRadius: "10px",
          margin: "20px",
        }}
      >
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Counter : {count}
        </button>
      </div>
    </>
  );
}

export default ReactLifeCycle;
