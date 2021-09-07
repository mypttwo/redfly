import React from "react";
import { getUSDEth } from "../utils/currency";
import withAppContext from "../hocs/withAppContext";
import ArtworkCollectionMasonry from "../components/masonry";
import Search from "../components/search";
import IcoManager, { PAGETYPE } from "./icoManager";
import nftFilter from "../utils/nftFilter";
import { IcoFilter } from "../utils/nftFilter";
import { filterMergedDataForAddress } from "../utils/contractData";
import IcoSetupForm from "./icoSetupForm";

import View from "../components/view";

import NFTWizard from "./nftWizard";

class Manager extends React.Component {
  state = {
    nfts: [],
    collapse: "collapse",
    search: "",

    viewNft: null,
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
        <div className="row">
          <div className="col">
            <div className={this.state.collapse} id="collapseCreate">
              <NFTWizard></NFTWizard>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  handleIcoSetupCompletion = (nft, receipt) => {
    console.log(
      `${nft.nftContractAddress} ${nft.tokenId} IcoSetup receipt`,
      receipt
    );
  };

  getChildrenJSX = (nfts) => {
    return nfts.map((nft, index) => {
      let childJSX = (
        <IcoSetupForm
          nft={nft}
          index={index}
          handleCompletion={this.handleIcoSetupCompletion}
        />
      );
      if (nft.rft) {
        childJSX = (
          <IcoManager
            key={nft.rft.rftContractAddress}
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

  displayView = (nft) => {
    this.setState({
      viewNft: nft,
    });
  };

  getPage = () => {
    if (this.state.viewNft) {
      return <View nft={this.state.viewNft} view={this.displayView}></View>;
    }

    let nfts = nftFilter(
      this.state.nfts,
      this.state.search,
      IcoFilter.filters[IcoFilter.ALL]
    );

    return (
      <>
        {this.getCreateNFTJSX()}
        <ArtworkCollectionMasonry nfts={nfts} view={this.displayView}>
          {this.getChildrenJSX(nfts)}
        </ArtworkCollectionMasonry>
      </>
    );
  };

  render() {
    return (
      <div>
        <div className="container">{this.getPage()}</div>
      </div>
    );
  }
}

export default withAppContext(Manager);
