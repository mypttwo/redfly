import React from "react";
import { getUSDEth } from "../utils/currency";
import withAppContext from "../hocs/withAppContext";
import ArtworkCollectionMasonry from "./artworkCollectionMasonry";
import Search from "../components/search";
import IcoManager, { PAGETYPE } from "./icoManager";
import View from "../components/view";
import Classifieds from "./classifieds";

import Loader from "react-loader-spinner";
import nftFilter from "../utils/nftFilter";
import { IcoFilter } from "../utils/nftFilter";
import NFTFilterDropdown from "./nftFilterDropdown";

const DISPLAY = {
  MAIN: 1,
  VIEW: 2,
  CLASSIFIEDS: 3,
};

class Marketplace extends React.Component {
  state = {
    nfts: [],
    search: "",
    icoFilter: IcoFilter.filters[IcoFilter.ALL],
    display: DISPLAY.MAIN,
    selectedNft: null,
  };

  async componentDidMount() {
    // console.log(10 * (await getUSDEth()));

    this.props.appContext.registerForUpdates(this.updateNFTS);
    this.setState(
      {
        nfts: this.props.appContext.nfts,
      },
      console.log("loading completed")
    );
  }

  updateIcoFilter = (icoFilter) => {
    this.setState({ icoFilter });
  };

  updateNFTS = (nfts) => {
    // console.log(JSON.stringify(nfts));
    this.setState({
      nfts: nfts,
    });
  };

  updateSearch = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  getChildrenJSX = (nfts) => {
    return nfts.map((nft, index) => {
      let icoJSX = "";

      if (nft.rft) {
        icoJSX = (
          <IcoManager
            key={nft.rft.rftContractAddress}
            nft={nft}
            index={index}
            pageType={PAGETYPE.MARKETPLACE}
            displayClassifieds={this.displayClassifieds}
          ></IcoManager>
        );
      }
      return icoJSX;
    });
  };

  getControls = (nfts) => {
    return (
      <form>
        <div className="row">
          <div className="col-4">
            <NFTFilterDropdown
              icoFilter={this.state.icoFilter}
              updateIcoFilter={this.updateIcoFilter}
            ></NFTFilterDropdown>
          </div>
          <div className="col-8">
            <Search
              search={this.state.search}
              updateSearch={this.updateSearch}
            ></Search>
          </div>
        </div>
      </form>
    );
  };

  filterNfts = () => {
    let nfts = [];
    if (this.state.icoFilter.name === IcoFilter.filters[IcoFilter.ALL].name) {
      let nftsLive = nftFilter(
        this.state.nfts,
        this.state.search,
        IcoFilter.filters[IcoFilter.LIVE]
      );
      let nftsUpcoming = nftFilter(
        this.state.nfts,
        this.state.search,
        IcoFilter.filters[IcoFilter.UPCOMING]
      );
      nfts = nftsLive.concat(nftsUpcoming);
    } else {
      nfts = nftFilter(
        this.state.nfts,
        this.state.search,
        this.state.icoFilter
      );
    }

    return nfts;
  };

  displayView = (nft) => {
    let display = DISPLAY.MAIN;
    if (nft) {
      display = DISPLAY.VIEW;
    }
    this.setState({
      selectedNft: nft,
      display: display,
    });
  };
  displayClassifieds = (nft) => {
    let display = DISPLAY.MAIN;
    if (nft) {
      display = DISPLAY.CLASSIFIEDS;
    }
    this.setState({
      selectedNft: nft,
      display: display,
    });
  };

  getPage = () => {
    switch (this.state.display) {
      case DISPLAY.VIEW:
        return (
          <View nft={this.state.selectedNft} view={this.displayView}></View>
        );
      case DISPLAY.CLASSIFIEDS:
        return (
          <Classifieds
            nft={this.state.selectedNft}
            displayClassifieds={this.displayClassifieds}
          ></Classifieds>
        );
      default:
        let nfts = this.filterNfts();
        return (
          <>
            {this.getControls(nfts)}
            <ArtworkCollectionMasonry
              nfts={nfts}
              view={this.displayView}
              displayClassifieds={this.displayClassifieds}
              pageType={PAGETYPE.MARKETPLACE}
              key={1}
            ></ArtworkCollectionMasonry>
          </>
        );
    }
  };

  render() {
    if (this.props.appContext.loading) {
      console.log("loading");
      return (
        <div className="container full-height d-flex align-items-center justify-content-center">
          <Loader
            // className="d-flex align-items-center justify-content-center"
            type="Grid"
            color="red"
            timeout={600000} //3 secs
          />
        </div>
      );
    }

    return <div className="container">{this.getPage()}</div>;
  }
}

export default withAppContext(Marketplace);
