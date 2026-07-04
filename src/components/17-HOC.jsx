import React from "react";

/* 
  DEFINITION of HOC:
  A Higher-Order Component (HOC) is a design pattern in React.
  It is a function that takes a component as an argument and returns a new component.
  
  Formula: const EnhancedComponent = higherOrderComponent(OriginalComponent);
  
  Why use it?
  To reuse component logic, such as adding styles, injecting props, or tracking analytics 
  without copying and pasting code.
*/

// 1. A basic, simple component
function SimpleText() {
  return <p>This is a simple text inside a component.</p>;
}

// 2. The Higher-Order Component (HOC)
// It is just a function that wraps any component with a red border
function withRedBorder(WrappedComponent) {
  return function EnhancedComponent() {
    return (
      <div style={{ border: "3px solid red", padding: "10px", margin: "10px" }}>
        {/* Render the original component inside the border */}
        <WrappedComponent />
      </div>
    );
  };
}

// 3. Create the enhanced version of our component
const SimpleTextWithRedBorder = withRedBorder(SimpleText);

// 4. Display the HOC in action
function HOC() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Super Simple HOC Example</h1>

      <h3>Original Component:</h3>
      <SimpleText />

      <h3>Enhanced Component (using HOC):</h3>
      <SimpleTextWithRedBorder />
    </div>
  );
}

export default HOC;
