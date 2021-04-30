import React from "react";
import { getUSDEth } from "../utils/currency";

import { filterMergedDataForAddress } from "../utils/contractData";

import { setupNFTContract, createNFT } from "../utils/nftContract";
import { setupRFTFactoryContract } from "../utils/rftFactoryContract";
import ICOForm from "./icoForm";
import NFTForm from "./nftForm";
import IcoStartForm from "./icoStartForm";

import withAppContext from "../hocs/withAppContext";
import ArtworkCollectionMasonry from "../components/masonry";

class Manager extends React.Component {
  state = {
    nftc: null,
    rftfc: null,
    nfts: [],
    collapse: "collapse",
  };

  async componentDidMount() {
    console.log(10 * (await getUSDEth()));
    this.props.appContext.registerForUpdates(this.updateNFTS);
    let nfts = await filterMergedDataForAddress(this.props.appContext.nfts);
    console.log(nfts);
    let nftc = setupNFTContract(this.getNFTEventHandlers());
    let rftfc = setupRFTFactoryContract(this.getRFTFactoryEventHandlers());
    this.setState({
      nfts: nfts,
      nftc: nftc,
      rftfc: rftfc,
    });
  }

  updateNFTS = async (allNfts) => {
    let nfts = await filterMergedDataForAddress(allNfts);
    this.setState({
      nfts: nfts,
    });
  };

  // updateNFTS = async (allNfts) => {
  //   console.log(allNfts);
  //   let nfts = await filterMergedDataForAddress(allNfts);
  //   console.log(nfts);
  //   this.setState({
  //     nfts: nfts,
  //   });
  // };

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

  handleBurnt = (error, tokenId, minter) => {
    if (error) {
      console.error("Burnt event", error);
    } else {
      console.log("tokenId", tokenId);
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
      handleMinted: this.handleMinted,
      handleBurnt: this.handleBurnt,
      handleTokenURIUpdated: this.handleTokenURIUpdated,
    };
  };

  publish = async (tokenData) => {
    createNFT(this.state.nftc, tokenData, this.handleCreateNFTReciept);
  };

  getCreateNFTJSX = () => {
    return (
      <React.Fragment>
        <div className="my-5">
          <p>
            <button
              className="btn btn-info dropdown-toggle"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseCreate"
            >
              New NFT
            </button>
          </p>
          <div className={this.state.collapse} id="collapseCreate">
            <div className="card card-body shadow">
              <NFTForm publish={this.publish} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  getICOJSX = (index, nft, icoFormJSX) => {
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
      let icoJSX = this.getICOJSX(
        index,
        nft,
        <ICOForm tokenId={nft.tokenId} />
      );
      if (nft.rft) {
        icoJSX = this.getICOJSX(
          index,
          nft,
          <IcoStartForm nft={nft}></IcoStartForm>
        );
      }
      return icoJSX;
    });
    return (
      <div>
        <div className="container">
          {this.getCreateNFTJSX()}
          <ArtworkCollectionMasonry nfts={this.state.nfts}>
            {childrenJSX}
          </ArtworkCollectionMasonry>
        </div>
      </div>
    );
  }
}

export default withAppContext(Manager);
