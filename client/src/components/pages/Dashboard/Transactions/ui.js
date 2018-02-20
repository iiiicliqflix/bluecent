import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./style.css";

export const TransactionsUI = ({ columns, active, contributed, showActive, toggle }) => (
  <div className="transactions">
    <div className="transactions__table">
      <div className="transactions__header">
        <h3 className="transactions__title">Transactions</h3>
        <div className="transactions__toggle">
          <button
            className={`transactions__button ${showActive ? "transactions__button--selected" : ""}`}
            onClick={toggle}
          >
            Active
          </button>
          <button
            className={`transactions__button ${showActive ? "" : "transactions__button--selected"}`}
            onClick={toggle}
          >
            Contributed
          </button>
        </div>
      </div>
      {showActive ? (
        <ReactTable
          data={active}
          columns={columns}
          pageSize={active.length}
          showPageSizeOptions={false}
          showPageJump={false}
          showPagination={false}
          noDataText="No active transactions to display."
        />
      ) : (
        <ReactTable
          data={contributed}
          columns={columns}
          pageSize={contributed.length}
          showPageSizeOptions={false}
          showPageJump={false}
          showPagination={false}
          noDataText="No contributed transactions to display."
        />
      )}
    </div>
  </div>
);
