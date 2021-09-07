import React from "react";
import withAppContext from "../hocs/withAppContext";
import BuyTableRow from "./buyTableRow";

const data = [
  { id: 1, number: 1, price: 2 },
  { id: 2, number: 1, price: 2 },
  { id: 3, number: 1, price: 2 },
  { id: 4, number: 1, price: 2 },
];

class Classifieds extends React.Component {
  closeBtn = () => {
    let btncolor = this.props.appContext.stylePath.includes("flatly")
      ? "btn-close-white"
      : "";

    return (
      <button
        type="button"
        class={"close my-2 " + btncolor}
        onClick={() => this.props.displayClassifieds(null)}
      >
        <span>&times;</span>
      </button>
    );
  };
  openTrade = () => {
    return (
      <>
        <div className="card">
          <div className="card-header h5">Sell</div>
          <div className="card-body">
            <form className="">
              <div class="row">
                <div class="form-group col-md-6">
                  <label>Number of shares</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Example : 1"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label>Price per share</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Example : 1"
                  />
                </div>
              </div>
              <div className="row  d-flex justify-content-center">
                <div className="col-auto">
                  <button type="button" className="btn btn-primary">
                    Place Sell Order
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };
  openTradeList = () => {
    return (
      <div className="card">
        <div className="card-header h5">Open Trades</div>
        <table
          class="table table text-center  table-borderless"
          cellspacing="0"
          width="100%"
        >
          <thead>
            <tr>
              <th class="th-sm">Number</th>
              <th class="th-sm">Price per share</th>
              <th class="th-sm">Buy Number</th>
              <th class="th-sm"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((dataItem) => (
              <BuyTableRow key={dataItem.id} data={dataItem}></BuyTableRow>
            ))}
          </tbody>
          {/* <tfoot>
          <tr>
            <th class="th-sm">Number of shares</th>
            <th class="th-sm">Price per share</th>
            <th class="th-sm">Buy Number</th>
            <th class="th-sm"></th>
          </tr>
        </tfoot> */}
        </table>
      </div>
    );
  };
  openOrderList = () => {
    return (
      <div className="card">
        <div className="card-header h5">Open Orders</div>
        <table
          class="table table text-center  table-borderless"
          cellspacing="0"
          width="100%"
        >
          <thead>
            <tr>
              <th class="th-sm">Number</th>
              <th class="th-sm">Price per share</th>
              <th class="th-sm"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((dataItem) => (
              <tr key={dataItem.id}>
                <td>{dataItem.number}</td>
                <td>{dataItem.price}</td>
                <td>
                  <button className="btn btn-primary">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* <tfoot>
          <tr>
            <th class="th-sm">Number of shares</th>
            <th class="th-sm">Price per share</th>
            <th class="th-sm">Buy Number</th>
            <th class="th-sm"></th>
          </tr>
        </tfoot> */}
        </table>
      </div>
    );
  };
  render() {
    return (
      <>
        <div className="d-flex justify-content-end">{this.closeBtn()}</div>
        <div className="d-flex justify-content-center h3 text-monospace text-warning">
          {this.props.nft.rft.symbol}
        </div>
        <div className="d-flex justify-content-center h4 text-monospace">
          This is the official marketplace for{" "}
          <span className="text-warning pl-2">{this.props.nft.rft.symbol}</span>
        </div>
        <div className="py-3"></div>
        {this.openTrade()}
        <div className="py-3"></div>
        {this.openOrderList()}
        <div className="py-3"></div>
        {this.openTradeList()}
      </>
    );
  }
}

export default withAppContext(Classifieds);
