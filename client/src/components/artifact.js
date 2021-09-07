import React from "react";
import { dimensions } from "../utils/dimensions";
import { getUrlExtension } from "../utils/tokenURIReader";
import logo from "../logo.svg";
import ArtifactRenderer from "../containers/artifactRenderer";

const getImgJSX = (nft, sizeOriginal) => {
  let imgJSX;
  if (!nft.image) {
    imgJSX = (
      <div className="d-flex justify-content-center py-5 mb-5">
        <img src={logo} className="" alt="Could not load image..." />
      </div>
    );
  } else {
    let d = dimensions(nft.image);

    let class_ = "card-img-top";
    let style = {};
    if (sizeOriginal) {
      class_ = "shadowSpecial";
      style = { maxWidth: "100%" };
    }

    imgJSX = (
      <div className="d-flex justify-content-center ">
        <img src={nft.image} className={class_} alt={nft.image} style={style} />
      </div>
    );
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
  let jsx = "";
  if (!props.nft.image) {
    jsx = (
      <div className="d-flex justify-content-center py-5 mb-5">
        <img src={logo} className="" alt="Could not load image..." />
      </div>
    );
  } else {
    let urlExtension = getUrlExtension(props.nft.image);

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
            //   poster="https://URL/SOMETHING.jpg"
            className="card-img-top mt-0 pt-0 "
            loop
          >
            Sorry, your browser doesn't support embedded videos!
          </video>
        );
        break;
      case "png":
      case "gif":
      case "jpg":
      case "jpeg":
        jsx = getImgJSX(props.nft, props.sizeOriginal);
        break;
      default:
        jsx = (
          <ArtifactRenderer
            getImgJSX={getImgJSX}
            nft={props.nft}
            sizeOriginal={props.sizeOriginal}
          />
        );
    }
  }

  return jsx;
};

export default artifact;
