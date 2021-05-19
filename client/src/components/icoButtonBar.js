import React from "react";

const icoButtonBar = (props) => {
  //   let collapseTarget = `collapseCreateICO${props.index}`;
  return (
    <div key={props.index}>
      {/* <div> */}
      {/* <p>
          <button
            className="btn btn-warning dropdown-toggle btn-block"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={"#" + collapseTarget}
          >
            ICO
          </button>
        </p> */}
      {/* <div className="collapse" id={collapseTarget}> */}
      {/* <div className="card card-body"> */}
      {props.icoFormJSX}
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default icoButtonBar;
