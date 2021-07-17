import React from "react";
import Masonry from "react-masonry-css";

import { getBlockchainURL } from "../utils/network";
import { getMaskedAddress } from "../utils/shorten";
import Links from "./links";
import Artifact from "./artifact";

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

const ArtworkCollectionMasonry = (props) => {
  let nftJSX = props.nfts.map((nft, index) => {
    // console.log("nft", nft);
    let priceJSX = "";
    if (nft.rft && nft.rft.tokenPrice) {
      priceJSX = (
        <span className="fs-6 badge bg-warning text-primary">
          {nft.rft.tokenPrice} DAI
        </span>
      );
    }
    return (
      <div className="card" key={nft.nftContractAddress + nft.tokenId}>
        <div className="shadow rounded p-1 ">
          <Artifact nft={nft} />
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div className="h5 card-title mr-2">{nft.name}</div>
              {priceJSX}
            </div>
            <p className="card-text">{nft.description}</p>

            {/* <p className="card-text">{nft.nftContractAddress}</p> */}
            <Links nft={nft} />
          </div>

          {props.children[index]}
          <div className="card-footer d-flex justify-content-center">
            {getFooterJSX(nft)}
          </div>
        </div>
      </div>
    );
  });

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
    500: 1,
  };
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid pt-3"
      columnClassName="my-masonry-grid_column"
    >
      {nftJSX}
    </Masonry>
  );
};

export default ArtworkCollectionMasonry;
