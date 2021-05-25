import React from "react";
import { getUSDEth } from "../utils/currency";
import withAppContext from "../hocs/withAppContext";
import ArtworkCollectionMasonry from "../components/masonry";
import Search from "../components/search";
import IcoManager, { PAGETYPE } from "./icoManager";

import { filterMergedDataForAddress } from "../utils/contractData";
import IcoSetupForm from "./icoSetupForm";

import NFTWizard from "./nftWizard";

class Manager extends React.Component {
  state = {
    nfts: [],
    collapse: "collapse",
    search: "",
  };

  async componentDidMount() {
    // console.log(10 * (await getUSDEth()));

    this.props.appContext.registerForUpdates(this.updateNFTS);
    let nfts = await filterMergedDataForAddress(this.props.appContext.nfts);
    if (nfts) {
      this.setState({
        nfts: nfts,
      });
    }
  }

  updateNFTS = async (allNfts) => {
    let nfts = await filterMergedDataForAddress(allNfts);
    this.setState({
      nfts: nfts,
    });
  };

  updateSearch = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  getCreateNFTJSX = () => {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-4">
            <button
              className="btn btn-secondary dropdown-toggle btn-block"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseCreate"
            >
              New NFT
            </button>
          </div>
          <div className="col-8">{this.getSearch()}</div>
        </div>
        <div className={this.state.collapse} id="collapseCreate">
          <div>
            <NFTWizard></NFTWizard>
          </div>
        </div>
      </React.Fragment>
    );
  };

  getChildrenJSX = (nfts) => {
    return nfts.map((nft, index) => {
      let childJSX = <IcoSetupForm nft={nft} index={index} />;
      if (nft.rft) {
        childJSX = (
          <IcoManager
            key={nft.rft.rftAddress}
            nft={nft}
            index={index}
            pageType={PAGETYPE.MANAGER}
          ></IcoManager>
        );
      }
      return childJSX;
    });
  };

  getSearch = () => {
    return (
      <form>
        <div className="row">
          <div className="col">
            <Search
              search={this.state.search}
              updateSearch={this.updateSearch}
            ></Search>
          </div>
        </div>
      </form>
    );
  };

  render() {
    let nfts = this.state.nfts.filter(
      (nft) =>
        nft.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
        nft.desc.toLowerCase().includes(this.state.search.toLowerCase())
    );

    return (
      <div>
        <div className="container">
          {this.getCreateNFTJSX()}
          <ArtworkCollectionMasonry nfts={nfts}>
            {this.getChildrenJSX(nfts)}
          </ArtworkCollectionMasonry>
        </div>
      </div>
    );
  }
}

export default withAppContext(Manager);
