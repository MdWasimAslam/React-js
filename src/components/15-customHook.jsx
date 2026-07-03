import React from "react";
import useToggle from "../hooks/useToggle";

function CustomHook() {
  const { value: headingValue, toggle: HeadingToggle } = useToggle(true);
  const { value: paraValue, toggle: ParaToggle } = useToggle(true);

  return (
    <div>
      <h1>CustomHook</h1>
      <button onClick={HeadingToggle}>Toggle Heading</button>
      <h3>{headingValue ? "Lorem ipsum dolor sit amet." : ""}</h3>

      <button onClick={ParaToggle}>Toggle Paragraph</button>
      <p>{paraValue ? "Lorem ipsum dolor sit amet." : ""}</p>
    </div>
  );
}

export default CustomHook;
