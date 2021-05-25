import { ICOStatus, getICOStatus } from "./contractDataReader";
export const IcoFilter = {
  ALL: 0,
  LIVE: 1,
  UPCOMING: 2,
  // COMPLETED: 3,
  filters: [
    { name: "All" },
    { name: "Live" },
    { name: "Upcoming" },
    // { name: "Completed" },
  ],
};

const isNFTinFilter = (nft, icoFilter) => {
  let icoStatus = getICOStatus(nft);

  if (icoFilter.name === IcoFilter.filters[IcoFilter.ALL].name) {
    return true;
  }
  if (icoFilter.name === IcoFilter.filters[IcoFilter.LIVE].name) {
    if (icoStatus == ICOStatus.IN_PROGRESS) {
      return true;
    }
  }
  if (icoFilter.name === IcoFilter.filters[IcoFilter.UPCOMING].name) {
    if (icoStatus == ICOStatus.NOT_INIT || icoStatus == ICOStatus.PENDING) {
      console.log(icoFilter.name);
      console.log(nft.name);
      return true;
    }
  }
  return false;
};

const nftFilter = (nfts, search, icoFilter) => {
  return nfts.filter(
    (nft) =>
      isNFTinFilter(nft, icoFilter) &&
      (nft.name.toLowerCase().includes(search.toLowerCase()) ||
        nft.desc.toLowerCase().includes(search.toLowerCase()) ||
        (nft.rft &&
          nft.rft.symbol.toLowerCase().includes(search.toLowerCase())))
  );
};

export default nftFilter;
