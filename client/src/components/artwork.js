import React from "react";
import Links from "./links";
import Artifact from "./artifact";

import { getBlockchainURL } from "../utils/network";
import { getMaskedAddress } from "../utils/shorten";

const getFooterJSX = (nft) => {
  if (nft.rft) {
    return (
      <small>
        <a
          className="font-monospace"
          href={getBlockchainURL(nft.rft.rftContractAddress)}
          target="_blank"
        >
          Token Holders
        </a>
      </small>
    );
  }
  return (
    <small className="font-monospace">{getMaskedAddress(nft.owner)}</small>
  );
};

const Artwork = (props) => {
  // console.log("nft", nft);
  let priceJSX = "";
  if (props.nft.rft && props.nft.rft.tokenPrice) {
    priceJSX = (
      <span className="fs-6 badge bg-warning text-primary">
        {props.nft.rft.tokenPrice} DAI
      </span>
    );
  }
  return (
    <div
      className="card"
      key={props.nft.nftContractAddress + props.nft.tokenId}
    >
      <div className="shadow rounded p-1 ">
        <div className="mouse" onClick={() => props.view(props.nft)}>
          <Artifact nft={props.nft} />
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div className="h5 card-title mr-2">{props.nft.name}</div>
            {priceJSX}
          </div>
          <p className="card-text">{props.nft.description}</p>

          {/* <p className="card-text">{props.nft.nftContractAddress}</p> */}
          <Links nft={props.nft} />
        </div>

        {props.children}
        <div className="card-footer d-flex justify-content-center">
          {getFooterJSX(props.nft)}
        </div>
      </div>
    </div>
  );
};

export default Artwork;
