import React from "react";
import Header from "../../shared/Header";
import "react-table/react-table.css";
import "./App.css";

const App = ({ children }) => (
  <div>
    <Header />
    <div className="content">{children}</div>
  </div>
);

export default App;
