import React, { useEffect, useState } from "react";

function ApiMethods() {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const url = "https://dummyjson.com/users";
    let response = await fetch(url);
    response = await response.json();
    console.log(response);
    setUsersData(response?.users);
  }

  return (
    <div>
      <h1>Api Methods</h1>

      <div>
        {usersData &&
          usersData?.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  backgroundColor: "#ccc",
                  color: "black",
                  border: "1px solid white",
                  borderRadius: 5,
                  margin: "10px 0",
                  padding: 10,
                }}
              >
                <div>
                  <img src={item?.image} height={50} width={50} />
                </div>
                Name : {item?.firstName} {item?.lastName}
                <div>Age : {item?.age}</div>
                <div>Phone : {item?.phone}</div>
                <div>Email : {item?.email}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ApiMethods;
