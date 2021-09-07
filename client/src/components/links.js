import React from "react";
import twitter from "../svg/twitter.svg";
import instagram from "../svg/instagram.svg";
import facebook from "../svg/facebook.svg";
import youtube from "../svg/youtube.svg";
import reddit from "../svg/reddit.svg";
import person from "../svg/person.svg";

const linksJSX = (props) => {
  let twitterJSX = "";
  let instaJSX = "";
  let fbJSX = "";
  let youtubeJSX = "";
  let redditJSX = "";
  let websiteJSX = "";
  if (props.nft.links) {
    let twitterLinks = props.nft.links.filter((link) => {
      return link.name == "twitter";
    });
    if (twitterLinks.length) {
      twitterJSX = (
        <a
          className="btn btn-light btn-sm border-0"
          href={twitterLinks[0].url}
          target="_blank"
        >
          <img src={twitter} alt="twitter" />
        </a>
      );
    }
    let instaLinks = props.nft.links.filter((link) => {
      return link.name == "instagram";
    });
    if (instaLinks.length) {
      instaJSX = (
        <a
          className="btn btn-light btn-sm border-0"
          href={instaLinks[0].url}
          target="_blank"
        >
          <img src={instagram} alt="instagram" />
        </a>
      );
    }
    let fbLinks = props.nft.links.filter((link) => {
      return link.name == "facebook";
    });
    if (fbLinks.length) {
      fbJSX = (
        <a
          className="btn btn-light btn-sm border-0"
          href={fbLinks[0].url}
          target="_blank"
        >
          <img src={facebook} alt="facebook" />
        </a>
      );
    }
    let websiteLinks = props.nft.links.filter((link) => {
      return link.name == "website";
    });
    if (websiteLinks.length) {
      websiteJSX = (
        <a
          className="btn btn-light btn-sm border-0"
          href={websiteLinks[0].url}
          target="_blank"
        >
          <img src={person} alt="website" />
        </a>
      );
    }
    let youtubeLinks = props.nft.links.filter((link) => {
      return link.name == "youtube";
    });
    if (youtubeLinks.length) {
      youtubeJSX = (
        <a
          className="btn btn-light btn-sm border-0"
          href={youtubeLinks[0].url}
          target="_blank"
        >
          <img src={youtube} alt="youtube" />
        </a>
      );
    }
    let redditLinks = props.nft.links.filter((link) => {
      return link.name == "reddit";
    });
    if (redditLinks.length) {
      redditJSX = (
        <a
          className="btn btn-light btn-sm border-0"
          href={redditLinks[0].url}
          target="_blank"
        >
          <img src={reddit} alt="reddit" />
        </a>
      );
    }
  }
  return (
    <div className="d-flex justify-content-around pt-3">
      {twitterJSX}
      {instaJSX}
      {fbJSX}
      {youtubeJSX}
      {redditJSX}
      {websiteJSX}
    </div>
  );
};

export default linksJSX;
