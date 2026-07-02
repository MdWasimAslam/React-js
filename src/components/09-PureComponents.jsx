import React from "react";

let guest = 0;
function PureComponents() {
  return (
    <div>
      <h1>PureComponents</h1>
      <Cup />
      <Cup />
      <Cup />
    </div>
  );
}

function Cup() {
  guest = guest + 1;
  return (
    <div>
      We have {guest} guest and we have to make {guest} cup of tea
    </div>
  );
}

export default PureComponents;
