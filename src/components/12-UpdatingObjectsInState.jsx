import React, { useState } from "react";

function UpdatingObjectsInState() {
  const [fruits, setFruits] = useState(["Mango", "Papaya", "Banana", "Apple"]);
  const [data, setData] = useState({
    name: "Wasim",
    address: {
      city: "Kolkata",
      street: "Marquis Street",
      pin: "700016",
      country: "India",
    },
  });

  const handleName = (value) => {
    data.name = value;
    setData({ ...data });
  };

  const handleFruit = (value) => {
    fruits[fruits.length - 1] = value;
    setFruits([...fruits]);
  };

  console.log(fruits);
  return (
    <div>
      <h1>Updating Objects In State</h1>
      <input
        type="text"
        placeholder="Update Name"
        onChange={(e) => handleName(e.target.value)}
      />

      <div style={{ margin: 10 }}>
        <h4>Name : {data?.name}</h4>
        <h4>City : {data?.address?.city}</h4>
        <h4>Country : {data?.address?.country}</h4>
      </div>

      <button onClick={handleName}>Update Name</button>

      <div style={{ marginTop: 50 }}>
        <input
          type="text"
          placeholder="Update Last Fruit"
          onChange={(e) => handleFruit(e.target.value)}
        />
        {fruits.map((item) => (
          <div>{item}</div>
        ))}
      </div>
    </div>
  );
}

export default UpdatingObjectsInState;
