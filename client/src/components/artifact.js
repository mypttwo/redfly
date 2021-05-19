import React from "react";
import { dimensions } from "../utils/dimensions";

const getUrlExtension = (url) => {
  return url.split(/[#?]/)[0].split(".").pop().trim();
};

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

const artifact = (props) => {
  let urlExtension = getUrlExtension(props.nft.url);
  let jsx = "";
  switch (urlExtension) {
    case "mp4":
    case "mp3":
    case "ogg":
    case "wav":
    case "webm":
    case "mpg":
    case "mpeg":
      jsx = (
        <video
          controls
          src={props.nft.url}
          //   poster="https://previews.123rf.com/images/balabolka/balabolka1803/balabolka180300169/97679530-cartoon-cute-doodles-disco-music-seamless-pattern-colorful-deta.jpg"
          className="card-img-top mt-0 pt-0 "
          loop
        >
          Sorry, your browser doesn't support embedded videos!
        </video>
      );
      break;

    default:
      jsx = getImgJSX(props.nft);
      break;
  }
  return jsx;
};

export default artifact;
