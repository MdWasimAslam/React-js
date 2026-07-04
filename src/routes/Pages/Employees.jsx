import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { List } from "react-window";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const paramsData = useParams();
  console.log(paramsData, "paramsData");

  const loadEmployees = async () => {
    // 1. Reset state to an array before fetching so .map() doesn't fail on re-render
    if (!paramsData.id) {
      setEmployees([]);
    }

    let apiResponse = [];
    if (paramsData.id) {
      apiResponse = await fetch(
        `https://api-hub-wasim.vercel.app/users/${paramsData.id}`,
      );
    } else {
      apiResponse = await fetch(
        "https://api-hub-wasim.vercel.app/users?page=1&limit=20",
      );
    }

    const apiResult = await apiResponse.json();
    setEmployees(paramsData?.id ? apiResult : apiResult.results);
  };

  useEffect(() => {
    loadEmployees();
  }, [paramsData?.id]);

  return (
    <div>
      <h1>Employees</h1>

      {paramsData?.id ? (
        <div>
          <h3>Name: {employees.name}</h3>
          <Link to={"/employees"}>
            <button>All Employees</button>
          </Link>
        </div>
      ) : (
        <>
          {Array.isArray(employees) &&
            employees?.map((item) => {
              return (
                <div>
                  <Link to={`/employees/${item?.id}`}>
                    <p>{item?.name}</p>
                  </Link>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
}

export default Employees;
