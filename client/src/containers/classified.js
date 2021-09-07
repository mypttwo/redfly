// import React from "react";
// import { getUSDEth } from "../utils/currency";
// import withAppContext from "../hocs/withAppContext";
// import ArtworkCollectionMasonry from "../components/masonry";
// import Search from "../components/search";
// import IcoManager, { PAGETYPE } from "./icoManager";
// import nftFilter from "../utils/nftFilter";
// import { IcoFilter } from "../utils/nftFilter";
// import { filterMergedDataForAddress } from "../utils/contractData";

// class Classified extends React.Component {
//   state = {
//     nfts: [],
//     collapse: "collapse",
//     search: "",
//   };

//   async componentDidMount() {
//     // console.log(10 * (await getUSDEth()));

//     this.props.appContext.registerForUpdates(this.updateNFTS);
//     let nfts = await filterMergedDataForAddress(this.props.appContext.nfts);
//     if (nfts) {
//       this.setState({
//         nfts: nfts,
//       });
//     }
//   }

//   updateNFTS = async (allNfts) => {
//     let nfts = await filterMergedDataForAddress(allNfts);
//     this.setState({
//       nfts: nfts,
//     });
//   };

//   updateSearch = (event) => {
//     this.setState({
//       search: event.target.value,
//     });
//   };

//   getChildrenJSX = (nfts) => {
//     return nfts.map((nft, index) => {
//       let childJSX = <></>;
//       if (nft.rft) {
//         childJSX = (
//           <IcoManager
//             key={nft.rft.rftContractAddress}
//             nft={nft}
//             index={index}
//             pageType={PAGETYPE.MANAGER}
//           ></IcoManager>
//         );
//       }
//       return childJSX;
//     });
//   };

//   getSearch = () => {
//     return (
//       <form>
//         <div className="row">
//           <div className="col">
//             <Search
//               search={this.state.search}
//               updateSearch={this.updateSearch}
//             ></Search>
//           </div>
//         </div>
//       </form>
//     );
//   };

//   render() {
//     let nfts = nftFilter(
//       this.state.nfts,
//       this.state.search,
//       IcoFilter.filters[IcoFilter.COMPLETED]
//     );

//     return (
//       <div>
//         <div className="container">
//           <ArtworkCollectionMasonry nfts={nfts}>
//             {this.getChildrenJSX(nfts)}
//           </ArtworkCollectionMasonry>
//         </div>
//       </div>
//     );
//   }
// }

// export default withAppContext(Classified);
