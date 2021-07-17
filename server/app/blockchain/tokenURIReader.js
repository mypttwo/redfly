"use strict";

const getName = (tokenURI) => {
  return tokenURI.name;
};

const getImage = (tokenURI) => {
  if (tokenURI.image) {
    return tokenURI.image;
  }
  if (tokenURI.url) {
    return tokenURI.url;
  }
  return "";
};

const getDescription = (tokenURI) => {
  if (tokenURI.description) {
    return tokenURI.description;
  }
  if (tokenURI.desc) {
    return tokenURI.desc;
  }
  return "";
};

const getUrlExtension = (url) => {
  if (url) {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  }
  return "";
};

module.exports = { getUrlExtension, getDescription, getImage, getName };
