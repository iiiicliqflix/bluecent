import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class TransactionTable extends Component {
  getTableData() {
    return this.props.transactions.filter((item) => {
      if (item.amount > 0 && (Math.ceil(item.amount) - item.amount) !== 0) {
        return true
      }
      return false
    });
  }

  render() {
    const columns = [{
      Header: 'Name',
      accessor: 'name'
    }, {
      Header: 'Date',
      accessor: 'date',
      width: 120
    }, {
      id: 'amount',
      Header: 'Amount',
      accessor: d => `$${(d.amount).toFixed(2)}`,
      width: 110
    }, {
      id: 'contribution',
      Header: 'Contribution',
      accessor: (d) => {
        return `$${(Math.ceil(d.amount) - d.amount).toFixed(2)}`
      },
      width: 110
    }];

    return (
      <div className="transaction-table">
        <h2 className="table-hdr">Transactions</h2>
        <ReactTable data={this.getTableData()} columns={columns} />
      </div>
    );
  }
}
