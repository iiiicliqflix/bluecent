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
      Header: 'Date',
      accessor: 'date',
      width: 120
    },
    {
      Header: 'Name',
      accessor: 'name'
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
        <div className="table-hdr">
          <h2 className="table-title">Transactions</h2>
          <div className="table-toggle">
            <button className="toggle-btn left">Active</button>
            <button className="toggle-btn right">Contributed</button>
          </div>
        </div>
        <ReactTable
          data={this.getTableData()}
          columns={columns}
          defaultPageSize={25}
          showPageSizeOptions={false}
          showPageJump={false} />
      </div>
    );
  }
}
