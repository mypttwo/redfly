// Moved to containers artworkCollectionMasonry.js
import React from "react";
import Masonry from "react-masonry-css";

import Artwork from "./artwork";

const ArtworkCollectionMasonry = (props) => {
  let nftJSX = props.nfts.map((nft, index) => {
    return (
      <Artwork nft={nft} view={props.view}>
        {props.children[index]}
      </Artwork>
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
