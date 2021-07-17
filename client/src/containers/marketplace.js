import React from "react";
import { getUSDEth } from "../utils/currency";
import withAppContext from "../hocs/withAppContext";
import ArtworkCollectionMasonry from "../components/masonry";
import Search from "../components/search";
import IcoManager, { PAGETYPE } from "./icoManager";

import Loader from "react-loader-spinner";
// import IcoDropdown from "./icoDropdown";
import nftFilter from "../utils/nftFilter";
import { IcoFilter } from "../utils/nftFilter";
import NFTFilterDropdown from "./nftFilterDropdown";

class Marketplace extends React.Component {
  state = {
    nfts: [],
    search: "",
    icoFilter: IcoFilter.filters[IcoFilter.ALL],
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
          ></IcoManager>
        );
      }
      return icoJSX;
    });
  };

  getControls = () => {
    return (
      <form>
        <div className="row">
          <div className="col-4">
            {/* <IcoDropdown
              icoFilter={this.state.icoFilter}
              updateIcoFilter={this.updateIcoFilter}
            ></IcoDropdown> */}
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

    let nfts = this.filterNfts();

    return (
      <div className="container">
        {this.getControls()}
        <ArtworkCollectionMasonry nfts={nfts}>
          {this.getChildrenJSX(nfts)}
        </ArtworkCollectionMasonry>
      </div>
    );
  }
}

export default withAppContext(Marketplace);
