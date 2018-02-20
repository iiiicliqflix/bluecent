import React, { Component } from "react";
import { TransactionsUI } from "./ui";

const columns = [
  {
    Header: "Date",
    accessor: "date",
    width: 120
  },
  {
    Header: "Name",
    accessor: "name"
  },
  {
    id: "amount",
    Header: "Amount",
    accessor: d => `$${d.amount.toFixed(2)}`,
    width: 110
  },
  {
    id: "contribution",
    Header: "Contribution",
    accessor: d => `$${(Math.ceil(d.amount) - d.amount).toFixed(2)}`,
    width: 110
  }
];

export class TransactionsContainer extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { showActive: true };
  }

  toggle() {
    const { showActive } = this.state;
    this.setState({ showActive: !showActive });
  }

  render() {
    const { transactions } = this.props;
    const { showActive } = this.state;

    return (
      <TransactionsUI
        columns={columns}
        active={transactions.active}
        contributed={transactions.contributed}
        showActive={showActive}
        toggle={this.toggle}
      />
    );
  }
}
