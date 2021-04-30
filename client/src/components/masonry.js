import Masonry from "react-masonry-css";

import React from "react";

const ArtworkCollectionMasonry = (props) => {
  let nftJSX = props.nfts.map((nft, index) => {
    return (
      <div className="" key={index}>
        <div className="card  shadow rounded p-1">
          <img src={nft.uri} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{nft.name}</h5>
            <p className="card-title">{nft.description}</p>
          </div>
          {props.children[index]}
          <div className="card-footer">
            <small className="text-muted">{nft.owner}</small>
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
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {nftJSX}
    </Masonry>
  );
};

export default ArtworkCollectionMasonry;
