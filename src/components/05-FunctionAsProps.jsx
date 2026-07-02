import React from "react";

function FunctionAsProps() {
  function greet(name) {
    console.log("hello " + name);
  }
  return (
    <div>
      <h1>FunctionAsProps</h1>

      <ChildComponent greet={greet} name={"wasim"} />
      <ChildComponent greet={greet} name={"anil"} />
      <ChildComponent greet={greet} name={"john"} />
      <ChildComponent greet={greet} name={"monkey"} />
    </div>
  );
}

function ChildComponent({ greet, name }) {
  return (
    <>
      <button
        onClick={() => {
          greet(name);
        }}
      >
        Greet
      </button>
    </>
  );
}

export default FunctionAsProps;
