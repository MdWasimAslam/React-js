import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customCounter, reset } from "./counterSlice";

function MiniComponent() {
  const [customCount, setCustomCount] = useState(0);

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{ marginTop: 10 }}>
      <h2>MiniComponent</h2>
      <div>
        <input
          type="number"
          placeholder="Enter Count.."
          value={customCount}
          onChange={(e) => {
            setCustomCount(e.target.value);
          }}
        />
      </div>
      <button
        onClick={() => {
          dispatch(reset());
        }}
      >
        Reset
      </button>
      <button
        onClick={() => {
          dispatch(customCounter(customCount));
        }}
      >
        Custom Count
      </button>
    </div>
  );
}

export default MiniComponent;
