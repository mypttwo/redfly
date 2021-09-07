import React from "react";

class BuyTableRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.data.number}</td>
        <td>{this.props.data.price}</td>
        <td>
          <input className="" style={{ width: "3rem" }}></input>
        </td>
        <td>
          <button type="button" className="btn btn-primary">
            Buy
          </button>
        </td>
      </tr>
    );
  }
}

export default BuyTableRow;
