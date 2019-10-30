import React from "react";
import { render } from "react-dom";

import HomePage from "./HomePage";
import AppDataContext from "./AppDataContext";

const App = () => {
  const [value] = React.useState([]);
  return (
    <div>
      <AppDataContext.Provider value={value}>
        <HomePage />
      </AppDataContext.Provider>
    </div>
  );
};
render(<App />, document.getElementById("root"));
