import React from "react";
import ArtworkCollectionMasonry from "../components/masonry";
import { getNFTsForAddress, getNFTDataArray } from "../utils/nftTokenTracker";
import IcoSetupForm from "./icoSetupForm";
import Loader from "react-loader-spinner";
import withAppContext from "../hocs/withAppContext";

const numOfNfts = 4;

class ImportNFT extends React.Component {
  state = {
    nftArray: [],
    nftDataArray: [],
    currentPage: 0,
    errors: [],
    dataLoaded: false,
  };
  async componentDidMount() {
    let result = await getNFTsForAddress(
      this.props.appContext.nftTokenDataMap,
      this.props.appContext.nftMap
    );
    // console.log(result);
    if (Array.isArray(result))
      this.setState({ nftArray: result }, () =>
        this.updatePage(this.state.currentPage)
      );
  }

  handleIcoSetupCompletion = (nft, receipt) => {
    console.log(
      `${nft.nftContractAddress} ${nft.tokenId} IcoSetup receipt`,
      receipt
    );
    let nftDataArray = this.state.nftDataArray.filter(
      (nftData) => nftData.nftContractAddress != nft.nftContractAddress
    );
    this.setState({
      nftDataArray: nftDataArray,
    });
  };

  getChildrenJSX = (nftDataArray) => {
    return nftDataArray.map((nft, index) => {
      let childJSX = (
        <IcoSetupForm
          nft={nft}
          index={index}
          handleCompletion={this.handleIcoSetupCompletion}
        />
      );

      return childJSX;
    });
  };

  getNumPages = () => {
    return Math.floor(this.state.nftArray.length / numOfNfts);
  };

  next = () => {
    let nextPage = this.state.currentPage + 1;
    if (nextPage < this.getNumPages()) {
      this.updatePage(nextPage);
    }
  };
  prev = () => {
    let prevPage = this.state.currentPage - 1;
    if (prevPage >= 0) {
      this.updatePage(prevPage);
    }
  };
  updatePage = async (page) => {
    let nftEndIndex = (page + 1) * numOfNfts - 1; //8, 17, 26...

    let nftStartIndex = nftEndIndex - numOfNfts + 1; // 0, 9, 18...
    // console.log("s", nftStartIndex);
    // console.log("e", nftEndIndex);
    let nftArray = this.state.nftArray.slice(nftStartIndex, nftEndIndex);
    await getNFTDataArray(nftArray, this.updatePageHandler(page));
  };
  updatePageHandler = (page) => {
    return (nftDataArray, errors) => {
      //   console.log(nftDataArray);
      this.setState({
        currentPage: page,
        nftDataArray: nftDataArray,
        errors: errors,
        dataLoaded: true,
      });
    };
  };

  getPagination = () => {
    if (this.state.nftArray.length < numOfNfts) {
      return <></>;
    }
    let numPages = this.getNumPages();
    let links = [];
    // console.log("cp", this.state.currentPage);
    for (let c = 0; c < numPages; c++) {
      let active = this.state.currentPage == c ? "active" : "";
      links.push(
        <li className={`page-item ${active}`} key={c}>
          <a className="page-link" href="#" onClick={() => this.updatePage(c)}>
            {c + 1}
          </a>
        </li>
      );
    }

    return (
      <nav aria-label="...">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" tabindex="-1" onClick={this.prev}>
              Previous
            </a>
          </li>
          {links}
          <li className="page-item">
            <a className="page-link" href="#" onClick={this.next}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  render() {
    if (this.state.dataLoaded) {
      return (
        <div className="container">
          {this.getPagination()}
          <ArtworkCollectionMasonry nfts={this.state.nftDataArray}>
            {this.getChildrenJSX(this.state.nftDataArray)}
          </ArtworkCollectionMasonry>
          {/* {this.getPagination()} */}
          {this.errorsJSX()}
        </div>
      );
    }
    return this.loadingJSX();
  }

  loadingJSX = () => {
    return (
      <>
        <div className="container d-flex justify-content-center">
          <div className="row my-5">
            <div className="col">
              <Loader
                type="Grid"
                color="#00BFFF"
                timeout={60000} //3 secs
              />
            </div>
          </div>
        </div>
        <div className="container d-flex justify-content-center">
          <div className="row">
            <div className="col h3 text-danger">Scanning the blockchain...</div>
          </div>
        </div>
      </>
    );
  };

  errorsJSX = () => {
    if (this.state.errors.length == 0) {
      return;
    }
    console.log("errors", this.state.errors);
    return (
      <div className="container">
        <div className="py-3 text-danger">
          We could not load the following NFTs. Please contact the creator of
          the NFT to check if the below NFTs are still valid.
        </div>
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name(Symbol)</th>
              <th scope="col">Token Id</th>
              <th scope="col">Token URI</th>
            </tr>
          </thead>
          <tbody>
            {this.state.errors.map((nftData, index) => (
              <tr key={index}>
                <th scope="row">{index}</th>
                <td>
                  {nftData.nftName}({nftData.nftSymbol})
                </td>
                <td>{nftData.tokenId}</td>
                <td>{nftData.tokenURI}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
}

export default withAppContext(ImportNFT);
