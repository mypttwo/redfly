import React from "react";
import IcoDataPage from "./icoDataPage";
import { getUSDEth } from "../utils/currency";
import { setupNFTContract } from "../utils/nftContract";
import { setupRFTFactoryContract } from "../utils/rftFactoryContract";
import { getMaskedAddress } from "../utils/shorten";

import { ICOStatus, getICOStatus } from "../utils/contractDataReader";

import withAppContext from "../hocs/withAppContext";
import ArtworkCollectionMasonry from "../components/masonry";
import BuyCoinForm from "./buyCoinForm";

class Marketplace extends React.Component {
  state = {
    nfts: [],
  };

  async componentDidMount() {
    console.log(10 * (await getUSDEth()));
    this.props.appContext.registerForUpdates(this.updateNFTS);
    let nftc = setupNFTContract(this.getNFTEventHandlers());
    let rftfc = setupRFTFactoryContract(this.getRFTFactoryEventHandlers());
    this.setState({
      nfts: this.props.appContext.nfts,
      nftc: nftc,
      rftfc: rftfc,
    });
  }

  updateNFTS = (nfts) => {
    this.setState({
      nfts: nfts,
    });
  };

  handleNewRFT = (error, rft, creator, nft, tokenId) => {
    if (error) {
      console.error("New RFT event", error);
    } else {
      console.log("rft", rft);
    }
  };

  getRFTFactoryEventHandlers = () => {
    return {
      handleNewRFT: this.handleNewRFT,
    };
  };

  handleFeesUpdated = (error, fees) => {
    if (error) {
      console.error("FeesUpdated event", error);
    } else {
      console.log("fees", fees);
    }
  };

  handleFeesSent = (error, success, data, minter) => {
    if (error) {
      console.error("FeesSent event", error);
    } else {
      console.log("success", success);
      console.log("data", data);
      console.log("minter", minter);
    }
  };

  handleMinted = (error, tokenId, minter) => {
    if (error) {
      console.error("Minted event", error);
    } else {
      console.log("tokenId", tokenId);
      console.log("minter", minter);
    }
  };

  handleTokenURIUpdated = (error, tokenId, minter) => {
    if (error) {
      console.error("TokenURIUpdated event", error);
    } else {
      console.log("tokenId", tokenId);
      console.log("minter", minter);
    }
  };

  handleCreateNFTReciept = (error, receipt) => {
    if (error) {
      console.error("CreateNFT ", error);
    } else {
      console.log(receipt.transactionHash);
      this.getNFTS();
    }
  };

  getNFTEventHandlers = () => {
    return {
      handleFeesUpdated: this.handleFeesUpdated,
      handleFeesSent: this.handleFeesSent,
      handleMinted: this.handleMinted,
      handleTokenURIUpdated: this.handleTokenURIUpdated,
    };
  };

  buyERC20 = (index) => {
    console.log(this.state.nfts[index].uri);
  };

  getICOJSX = (index, icoFormJSX) => {
    let collapseTarget = `collapseCreateICO${index}`;
    return (
      <div key={index}>
        <div className="card-body">
          <p>
            <button
              className="btn btn-info dropdown-toggle"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#" + collapseTarget}
            >
              ICO
            </button>
          </p>
          <div className="collapse" id={collapseTarget}>
            <div className="card card-body">{icoFormJSX}</div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    let childrenJSX = this.state.nfts.map((nft, index) => {
      let icoJSX = "";
      let buyJSX = "";
      if (nft.rft) {
        if (getICOStatus(nft) === ICOStatus.IN_PROGRESS) {
          buyJSX = <BuyCoinForm nft={nft} />;
        }
        icoJSX = this.getICOJSX(
          index,
          <React.Fragment>
            <IcoDataPage nft={nft}></IcoDataPage>
            {buyJSX}
          </React.Fragment>
        );
      }
      return icoJSX;
    });
    return (
      <div className="container">
        <ArtworkCollectionMasonry nfts={this.state.nfts}>
          {childrenJSX}
        </ArtworkCollectionMasonry>
      </div>
    );
  }
}

export default withAppContext(Marketplace);
