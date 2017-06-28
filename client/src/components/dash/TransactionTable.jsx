import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class TransactionTable extends Component {
  getTableData() {
    return this.props.transactions.filter((item) => {
      return item.amount > 0;
    });
  }

  render() {
    const columns = [{
      Header: 'Name',
      accessor: 'name'
    }, {
      Header: 'Date',
      accessor: 'date'
    }, {
      Header: 'Amount',
      accessor: 'amount'
    }, {
      id: 'contribution',
      Header: 'Contribution',
      accessor: d => (Math.ceil(d.amount) - d.amount).toFixed(2)
    }];

    return (
      <ReactTable data={this.getTableData()} columns={columns} />
    );
  }
}
