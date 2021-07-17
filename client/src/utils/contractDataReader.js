const ICOStatus = {
  NOT_INIT: 0,
  PENDING: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
};

const getICOStatus = (nft) => {
  if (!nft.rft) {
    return ICOStatus.NOT_INIT;
  }
  if (nft.rft && !nft.rft.icoEndDate) {
    return ICOStatus.PENDING;
  }
  let today = new Date();
  if (nft.rft.icoEndDate && today <= nft.rft.icoEndDate) {
    return ICOStatus.IN_PROGRESS;
  }
  if (nft.rft.icoEndDate && today > nft.rft.icoEndDate) {
    return ICOStatus.COMPLETED;
  }
  return null;
};

const getICOStatusByIcoEndDate = (icoEndDate) => {
  if (!icoEndDate) {
    return ICOStatus.PENDING;
  }

  let today = new Date();
  if (icoEndDate && today <= icoEndDate) {
    return ICOStatus.IN_PROGRESS;
  }
  if (icoEndDate && today > icoEndDate) {
    return ICOStatus.COMPLETED;
  }
  return null;
};

export { ICOStatus, getICOStatus, getICOStatusByIcoEndDate };
