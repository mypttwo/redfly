import React from "react";
import { addToken } from "../utils/addToken";
import mmlogo from "../metamask-fox.svg";

const AddToken = (props) => {
  return (
    <button
      class="btn btn-warning btn-sm text-dark"
      style={{ height: "30px" }}
      onClick={() => addToken(props.rftContractAddress, props.symbol)}
    >
      <i class="fa fa-plus-circle px-1" />
      <img
        src={mmlogo}
        className="mm-logo"
        style={{ width: "30px" }}
        alt="metamask"
      />
    </button>
  );
};

export default AddToken;
