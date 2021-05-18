export const dimensions = (imgSrc) => {
  // https://medium.com/edonec/the-best-way-to-get-image-dimensions-and-use-it-in-functional-components-6e02368095c3
  const theImage = new Image();
  theImage.src = imgSrc;

  const imageWidth = theImage.width;
  const imageHeight = theImage.height;

  const imgDimensions = { width: imageWidth, height: imageHeight };

  return imgDimensions;
};
