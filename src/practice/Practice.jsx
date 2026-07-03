import React from "react";
import { List } from "react-window";

function Practice() {
  const users = Array.from({ length: 10000 }, (_, index) => ({
    id: index,
    name: `User ${index + 1}`,
  }));

  function Row({ index }) {
    return <div key={index}>{users[index].name}</div>;
  }

  return (
    <div>
      <h1>Practice</h1>
      <List
        rowComponent={Row}
        rowCount={users.length}
        rowHeight={40}
        rowProps={{}}
        height={400}
        width={300}
      />
    </div>
  );
}

export default Practice;
