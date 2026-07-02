import React, { useRef } from "react";

function UseRefHook() {
  const inputRef = useRef(null);
  const h3Ref = useRef(null);

  function inputHandler() {
    console.log(inputRef);
    inputRef.current.focus();
    inputRef.current.style.color = "red";
    inputRef.current.placeholder = "Enter password!";
    inputRef.current.value = "Wasim";
  }

  function toggle() {
    if (inputRef.current.style.display !== "none") {
      inputRef.current.style.display = "none";
    } else {
      inputRef.current.style.display = "inline";
    }
  }

  function changeColor() {
    let colorIndex = Math.floor(Math.random() * 3);
    let color =
      colorIndex === 0 ? "#FE7F2D" : colorIndex === 1 ? "#B1D3B9" : "#F5788B";
    h3Ref.current.style.color = color;
  }

  return (
    <div>
      <h1>UseRefHook</h1>

      <div>
        <input ref={inputRef} type="text" placeholder="Enter username" />
        <button onClick={inputHandler}>Focus</button>
        <button onClick={toggle}>Toggle</button>
      </div>

      <div>
        <h3 ref={h3Ref}>Orange</h3>
        <button onClick={changeColor}>Change Color</button>
      </div>
    </div>
  );
}

export default UseRefHook;
