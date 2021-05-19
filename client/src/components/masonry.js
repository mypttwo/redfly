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
          className=""
          href={getBlockchainURL(nft.rft.rftAddress)}
          target="_blank"
        >
          Token Holders
        </a>
      </small>
    );
  }
  return <small>{getMaskedAddress(nft.owner)}</small>;
};

const ArtworkCollectionMasonry = (props) => {
  let nftJSX = props.nfts.map((nft, index) => {
    return (
      <div className="card" key={index}>
        <div className="shadow rounded p-1 ">
          <Artifact nft={nft} />
          <div className="card-body">
            <h5 className="card-title">{nft.name}</h5>
            <p className="card-title">{nft.desc}</p>
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
