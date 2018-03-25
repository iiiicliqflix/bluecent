import React from "react";
import "react-table/react-table.css";
import { Header } from "../../shared";
import "./style.css";

export const AppUI = ({ children }) => (
  <div className="app">
    <Header />
    {children}
  </div>
);
