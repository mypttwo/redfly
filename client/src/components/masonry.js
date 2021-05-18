import React from "react";
import Masonry from "react-masonry-css";
import { dimensions } from "../utils/dimensions";
import twitter from "../svg/twitter.svg";
import instagram from "../svg/instagram.svg";
import facebook from "../svg/facebook.svg";
import person from "../svg/person.svg";
import { getBlockchainURL } from "../utils/network";
import { getMaskedAddress } from "../utils/shorten";

const getImgJSX = (nft) => {
  let d = dimensions(nft.url);

  let imgJSX = <img src={nft.url} className="card-img-top" alt="..." />;
  if (d.width < 100 && d.width != 0) {
    imgJSX = (
      <div className="d-flex justify-content-center py-5 mb-5 bg-dark">
        <img src={nft.url} className="" alt="..." />
      </div>
    );
  }

  return imgJSX;
};

const getLinksJSX = (nft) => {
  let twitterJSX = "";
  let instaJSX = "";
  let fbJSX = "";
  let websiteJSX = "";
  if (nft.links) {
    let twitterLinks = nft.links.filter((link) => {
      return link.name == "twitter";
    });
    if (twitterLinks.length) {
      twitterJSX = (
        <a
          className="btn btn-outline-light btn-sm border-0"
          href={twitterLinks[0].url}
          target="_blank"
        >
          <img src={twitter} alt="twitter" />
        </a>
      );
    }
    let instaLinks = nft.links.filter((link) => {
      return link.name == "instagram";
    });
    if (instaLinks.length) {
      instaJSX = (
        <a
          className="btn btn-outline-light btn-sm border-0"
          href={instaLinks[0].url}
          target="_blank"
        >
          <img src={instagram} alt="instagram" />
        </a>
      );
    }
    let fbLinks = nft.links.filter((link) => {
      return link.name == "facebook";
    });
    if (fbLinks.length) {
      fbJSX = (
        <a
          className="btn btn-outline-light btn-sm border-0"
          href={fbLinks[0].url}
          target="_blank"
        >
          <img src={facebook} alt="facebook" />
        </a>
      );
    }
    let websiteLinks = nft.links.filter((link) => {
      return link.name == "website";
    });
    if (websiteLinks.length) {
      websiteJSX = (
        <a
          className="btn btn-outline-light btn-sm border-0"
          href={websiteLinks[0].url}
          target="_blank"
        >
          <img src={person} alt="website" />
        </a>
      );
    }
  }
  return (
    <div className="d-flex justify-content-around">
      {twitterJSX}
      {instaJSX}
      {fbJSX}
      {websiteJSX}
    </div>
  );
};

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
          {getImgJSX(nft)}
          <div className="card-body">
            <h5 className="card-title">{nft.name}</h5>
            <p className="card-title">{nft.desc}</p>
            {getLinksJSX(nft)}
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
