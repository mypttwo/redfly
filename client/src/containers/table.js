import React from "react";

//https://stackoverflow.com/questions/49171107/how-to-add-and-remove-table-rows-dynamically-in-react-js

class Table extends React.Component {
  state = {
    rows: [{}],
  };
  handleRowChange = (idx) => (e) => {
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx] = {
      [name]: value,
    };
    this.setState({
      rows,
    });
  };
  handleAddRow = () => {
    const item = {
      url: "",
    };
    this.setState({
      rows: [...this.state.rows, item],
    });
  };
  //   handleRemoveRow = () => {
  //     this.setState({
  //       rows: this.state.rows.slice(0, -1),
  //     });
  //   };
  handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows];
    rows.splice(idx, 1);
    this.setState({ rows });
  };
  render() {
    return (
      <div>
        <div className="container">
          <div className="row clearfix">
            <div className="col border border-dark pb-2">
              <table
                className="table table-sm table-striped table-hover table-borderless"
                id="tab_logic"
              >
                <thead>
                  <tr>
                    <th scope="col" className="col text-center">
                      Link URL
                    </th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {this.state.rows.map((item, idx) => (
                    <tr scope="row" id="addr0" key={idx}>
                      <th>
                        <input
                          type="text"
                          name="url"
                          value={this.state.rows[idx].url}
                          onChange={this.handleRowChange(idx)}
                          className="form-control  form-control-sm"
                          placeholder="Example : https://twitter.com/MyptOne"
                        />
                      </th>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={this.handleRemoveSpecificRow(idx)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                onClick={this.handleAddRow}
                className="btn btn-primary btn-sm"
              >
                Add Link URL
              </button>
              {/* <button
                type="button"
                onClick={this.handleRemoveRow}
                className="btn btn-danger float-right"
              >
                Delete Last Row
              </button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Table;
