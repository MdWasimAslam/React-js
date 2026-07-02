import React, { forwardRef, useRef } from "react";

function ForwardRef() {
  const inputRef = useRef(null);

  const handleUpdate = () => {
    inputRef.current.value = "Hello";
    inputRef.current.focus();
    inputRef.current.style.color = "red";
  };

  return (
    <div>
      <h1>ForwardRef</h1>
      <button onClick={handleUpdate}>Update Inputbox</button>
      <InputComponent ref={inputRef} />
    </div>
  );
}

// const InputComponent = forwardRef((props, ref) => {
//   return (
//     <div
//       style={{
//         backgroundColor: "#e5e5e5",
//         padding: 10,
//         margin: 5,
//         border: "1px solid white",
//         borderRadius: 10,
//         color: "black",
//       }}
//     >
//       <h3>Input Component</h3>
//       <input ref={ref} placeholder="Enter Your Name..." />
//     </div>
//   );
// });

function InputComponent(props) {
  return (
    <div
      style={{
        backgroundColor: "#e5e5e5",
        padding: 10,
        margin: 5,
        border: "1px solid white",
        borderRadius: 10,
        color: "black",
      }}
    >
      <h3>Input Component</h3>
      <input ref={props.ref} placeholder="Enter Your Name..." />
    </div>
  );
}

export default ForwardRef;
