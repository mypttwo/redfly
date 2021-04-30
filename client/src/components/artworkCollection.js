import React from "react";

const ArtworkCollection = (props) => {
  let nftJSX = (
    <div
      // className="row row-cols-1 row-cols-md-3 g-4 mt-3"
      className="row mt-3"
      data-masonry='{"percentPosition": true }'
    >
      {props.nfts.map((nft, index) => {
        return (
          <div className="col-sm-6 col-lg-4 mb-4" key={index}>
            <div className="card  shadow rounded p-2">
              <img src={nft.uri} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{nft.name}</h5>
                <p className="card-title">{nft.description}</p>
              </div>
              {props.children[index]}
            </div>
          </div>
        );
      })}
    </div>
  );
  return <>{nftJSX}</>;
};

export default ArtworkCollection;
