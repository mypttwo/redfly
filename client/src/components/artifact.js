import React from "react";
import { dimensions } from "../utils/dimensions";
import { getUrlExtension } from "../utils/tokenURIReader";
import logo from "../logo.svg";

const getImgJSX = (nft) => {
  let imgJSX;
  if (!nft.image) {
    imgJSX = (
      <div className="d-flex justify-content-center py-5 mb-5 bg-dark  border-bottom">
        <img src={logo} className="" alt="Could not load image..." />
      </div>
    );
  } else {
    let d = dimensions(nft.image);

    imgJSX = <img src={nft.image} className="card-img-top" alt="..." />;
    if (d.width < 100 && d.width != 0) {
      imgJSX = (
        <div className="d-flex justify-content-center py-5 mb-5 bg-dark">
          <img src={nft.image} className="" alt="..." />
        </div>
      );
    }
  }

  return imgJSX;
};

const artifact = (props) => {
  let urlExtension = getUrlExtension(props.nft.image);
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
          src={props.nft.image}
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
