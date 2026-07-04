import React from "react";

function BasicAuthHOC() {
  const Auth = withAuth(Dashboard);
  return (
    <div>
      <Auth />
    </div>
  );
}

function withAuth(Component) {
  let auth = true;

  return function () {
    if (auth) {
      return <Component />;
    } else {
      return <div>Please Login to continue!</div>;
    }
  };
}

function Dashboard() {
  return (
    <div>
      <>Hello, How are you John!</>
    </div>
  );
}

export default BasicAuthHOC;
