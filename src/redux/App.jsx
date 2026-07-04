import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import Counter from "./Counter";

function ReduxApp() {
  return (
    <Provider store={store}>
      <h1>Redux Toolkit</h1>
      <Counter />
    </Provider>
  );
}

export default ReduxApp;
