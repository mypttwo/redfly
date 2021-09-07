import React from "react";
import Artifact from "./artifact";
import withAppContext from "../hocs/withAppContext";
import IcoManager, { PAGETYPE } from "../containers/icoManager";

const View = (props) => {
  let btncolor = props.appContext.stylePath.includes("flatly")
    ? "btn-close-white"
    : "";
  let rftData = "";
  if (props.nft.rft) {
    rftData = (
      <>
        <div className="py-3"></div>
        <IcoManager
          key={props.nft.rft.rftContractAddress}
          nft={props.nft}
          index={0}
          pageType={PAGETYPE.VIEW}
        ></IcoManager>
      </>
    );
  }
  return (
    <>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          class={"close my-2 " + btncolor}
          onClick={() => props.view(null)}
        >
          <span>&times;</span>
        </button>
      </div>
      <div className="">
        <Artifact nft={props.nft} sizeOriginal={true} />
      </div>
      <div className="container" style={{ width: "50%" }}>
        <div className="row">
          <div className="col">
            <div class="card text-center my-5">
              <div class="card-header">{props.nft.name}</div>
              <div class="card-body">
                <h5 class="card-title">{props.nft.description}</h5>
                {/* <p class="card-text">
                  <span className="small"> NFT Contract : </span>
                  {props.nft.nftContractAddress}{" "}
                  <span className="small"> Token Id : </span>{" "}
                  {props.nft.tokenId}
                </p> */}

                {rftData}
              </div>
              {/* <div class="card-footer text-muted"></div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAppContext(View);
