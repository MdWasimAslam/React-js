import React from "react";

function Fragment() {
  // <> shortcode for fragment use <Fragment> when redning a list
  return (
    <>
      <h1>Fragment</h1>
      <ChildComponent />
      <ChildComponent />
      <ChildComponent />
      <ChildComponent />
    </>
  );
}

function ChildComponent(params) {
  return (
    <>
      <span>hello</span>
    </>
  );
}

export default Fragment;
