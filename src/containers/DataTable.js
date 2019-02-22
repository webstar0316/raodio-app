import React, { Component } from "react";
import ReactTable from "react-table";

import "react-table/react-table.css";

class DataTable extends Component {
  constructor(props) {
    super();

    let data = [];
    props.data.map((item) => {
      if (item.writer_username === props.user)
        data.push(item);
    });

    this.state = {
      data,
      activeRow: -1
    };
    this.renderEditable = this.renderEditable.bind(this);
  }

  renderEditable(cellInfo) {
    if (cellInfo.original.datastore_id === this.state.activeRow) {
      return (
        <div
          style={{ boxShadow: '0 0 0 0.2rem rgba(0,0,0,.1)'}}
          contentEditable
          suppressContentEditableWarning
          onBlur={e => {
            const data = [...this.state.data];
            data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
            this.setState({ data });
          }}
          dangerouslySetInnerHTML={{
            __html: this.state.data[cellInfo.index][cellInfo.column.id]
          }}
        />
      );
    }
    return <div>{cellInfo.value}</div>
  }
  editMethod = (row) => {
    this.setState({ activeRow: row.original.datastore_id });
  }
  render() {
    const { data } = this.state;
    return (
      <div style={{textAlign: "right", direction: "rtl"}}>
        <ReactTable
          resizable={false}
          data={data}
          columns={[
            {
              Header: '',
              Cell: row => (
                  <div>
                    <button onClick={() => this.editMethod(row)}>Edit</button>
                  </div>
              ),
              width: 50
            },
            {
              Header: "Modified Date",
              accessor: "last_modified",
              width: 350,
              Cell: row => this.renderEditable(row)
            },
            {
              Header: "Place",
              accessor: "place",
              width: 238,
              Cell: row => this.renderEditable(row)
            },
            {
              Header: "Question",
              accessor: "question",
              Cell: row => this.renderEditable(row)
            }
          ]}
          defaultSorted={[{
            id: "last_modified",
            desc: true
          }]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default DataTable;
