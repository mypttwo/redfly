import React from "react";
import Masonry from "react-masonry-css";
import Artwork from "../components/artwork";
import IcoManager from "./icoManager";
import { getNFTDataArray } from "../utils/nftTokenTracker";

let numOfNfts = 3;
let numSiblings = 1;

class ArtworkCollectionMasonry extends React.Component {
  state = {
    nftDisplayList: [],
    currentPage: 0,
    errors: [],
  };

  setPageList = (list) => {
    this.setState({ nftDisplayList: list });
  };

  getNumPages = () => {
    return Math.ceil(this.props.nfts.length / numOfNfts);
  };
  updatePage = async (page) => {
    let nftEndIndex = (page + 1) * numOfNfts - 1; //8, 17, 26...

    let nftStartIndex = nftEndIndex - numOfNfts + 1; // 0, 9, 18...

    let nftArray = this.props.nfts.slice(nftStartIndex, nftEndIndex + 1);

    if (this.props.dynamicLoad) {
      await getNFTDataArray(nftArray, this.updatePageHandler(page));
    } else this.setState({ currentPage: page, nftDisplayList: nftArray });
  };
  updatePageHandler = (page) => {
    return (nftDataArray, errors) => {
      console.log(nftDataArray);
      this.setState({
        currentPage: page,
        nftDisplayList: nftDataArray,
        errors: errors,
      });
    };
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

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps) {
    if (this.props.nfts !== prevProps.nfts) {
      this.init();
    }
  }

  init = () => {
    let nftEndIndex = numOfNfts - 1;
    let nftStartIndex = 0;
    let nftDisplayList = this.props.nfts.slice(nftStartIndex, nftEndIndex + 1);
    console.log("nftDisplayList", nftDisplayList);
    this.setState({ nftDisplayList: nftDisplayList });
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

  display = () => {
    console.log(this.state.nftDisplayList);
    let nftJSX = this.state.nftDisplayList.map((nft, index) => {
      let icoJSX = "";
      if (nft.rft) {
        icoJSX = (
          <IcoManager
            key={nft.rft.rftContractAddress}
            nft={nft}
            index={index}
            pageType={this.props.pageType}
            displayClassifieds={this.props.displayClassifieds}
          ></IcoManager>
        );
      }
      return (
        <Artwork nft={nft} view={this.props.view} key={index}>
          {icoJSX}
        </Artwork>
      );
    });

    const breakpointColumnsObj = {
      default: 3,
      1100: 2,
      700: 1,
      500: 1,
    };

    let numPages = this.getNumPages();
    let links = [];
    // console.log("cp", this.state.currentPage);
    let gapInsertedBefore = false;
    let gapInsertedAfter = false;
    if (numPages < 7) {
      for (let c = 0; c < numPages; c++) {
        let active = this.state.currentPage == c ? "active" : "";
        links.push(
          <li className={`page-item ${active}`} key={c}>
            <a
              className="page-link"
              href="#"
              onClick={() => this.updatePage(c)}
            >
              {c + 1}
            </a>
          </li>
        );
      }
    } else {
      for (let c = 0; c < numPages; c++) {
        let active = this.state.currentPage == c ? "active" : "";
        if (
          c == 0 ||
          c == numPages - 1 ||
          c == this.state.currentPage ||
          c == this.state.currentPage + numSiblings ||
          c == this.state.currentPage - numSiblings
        ) {
          links.push(
            <li className={`page-item ${active}`} key={c}>
              <a
                className="page-link"
                href="#"
                onClick={() => this.updatePage(c)}
              >
                {c + 1}
              </a>
            </li>
          );
        } else {
          if (c < this.state.currentPage && !gapInsertedBefore) {
            links.push(
              <li className="px-2 page-item bg-success" key={c}>
                ...
              </li>
            );
            gapInsertedBefore = true;
          }
          if (c > this.state.currentPage && !gapInsertedAfter) {
            links.push(
              <li className="px-2 page-item bg-success" key={c}>
                ...
              </li>
            );
            gapInsertedAfter = true;
          }
        }
      }
    }

    return (
      <>
        <div className="d-flex justify-content-center">
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  tabindex="-1"
                  onClick={this.prev}
                >
                  <span>&laquo;</span>
                </a>
              </li>
              {links}
              <li className="page-item">
                <a className="page-link" href="#" onClick={this.next}>
                  <span>&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid pt-3"
          columnClassName="my-masonry-grid_column"
        >
          {nftJSX}
        </Masonry>
        {this.errorsJSX()}
      </>
    );
  };

  render() {
    return this.display();
  }
}

export default ArtworkCollectionMasonry;
