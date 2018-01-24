import React from "react";
import { Header } from "../../shared";
import "react-table/react-table.css";
import "./style.css";

export const AppUI = ({ children }) => (
  <div className="app">
    <Header />
    {children}
  </div>
);
