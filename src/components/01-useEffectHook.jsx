import React, { useEffect, useState } from "react";

function UseEffectHook() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(0);

  function callOnce() {
    console.log("callOnce function called!");
  }

  useEffect(() => {
    callOnce();
  }, [count]);

  // callOnce();

  return (
    <div>
      <h1>UseEffectHook</h1>
      <div>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Counter : {count}
        </button>
      </div>

      <div>
        <button
          onClick={() => {
            setData(data + 1);
          }}
        >
          Data : {data}
        </button>
      </div>

      <ChildComponent data={data} />
    </div>
  );
}

function ChildComponent(props) {
  useEffect(() => {
    console.log("ChildComponent UseEffect Called!");
  }, [props.data]);

  return (
    <>
      <h4>Child Component</h4>
    </>
  );
}

export default UseEffectHook;
