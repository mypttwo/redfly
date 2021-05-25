import React from "react";
import connectToMetamask from "../utils/metamask";
import { createNFT } from "../utils/nftContract";
import { server } from "../config";
import axios from "axios";
import Loader from "react-loader-spinner";
import Web3 from "web3";
import withAppContext from "../hocs/withAppContext";

import Links from "../components/links";
import Artifact from "../components/artifact";

import twitter from "../svg/twitter.svg";
import instagram from "../svg/instagram.svg";
import facebook from "../svg/facebook.svg";
import person from "../svg/person.svg";
import reddit from "../svg/reddit.svg";
import youtube from "../svg/youtube.svg";

const DETAILS = 1;
const SOCIAL = 2;
const PREVIEW = 3;

class NFTWizard extends React.Component {
  state = {
    page: DETAILS,
    url: "",
    name: "",
    description: "",
    processing: false, // show PUBLISH button
    rows: [{}], // link urls
    disableActionButton: true,
    twitter: "",
    instagram: "",
    facebook: "",
    reddit: "",
    youtube: "",
    website: "",
  };

  async componentDidMount() {
    try {
      let web3 = new Web3(window.web3.currentProvider);
      let { accounts } = await connectToMetamask(null);
    } catch (error) {
      this.setState({ disableActionButton: true });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    let disabled = this.state.disableActionButton;
    if (this.state.url && this.state.name && this.state.description) {
      disabled = false;
    } else {
      disabled = true;
    }
    this.setState({
      [name]: value,
      disableActionButton: disabled,
    });
  };

  getDetails = () => {
    return (
      <div>
        {this.getDetailsJSX()}
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => this.setState({ page: SOCIAL })}
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  getSocial = () => {
    return (
      <div>
        {this.getSocialJSX()}
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => this.setState({ page: DETAILS })}
          >
            Prev
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => this.setState({ page: PREVIEW })}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  getTokenInfo = () => {
    let tokenInfo = {
      url: this.state.url,
      name: this.state.name,
      desc: this.state.description,
      links: [],
    };
    if (this.state.twitter) {
      tokenInfo.links.push({
        name: "twitter",
        url: this.state.twitter,
      });
    }
    if (this.state.instagram) {
      tokenInfo.links.push({
        name: "instagram",
        url: this.state.instagram,
      });
    }
    if (this.state.facebook) {
      tokenInfo.links.push({
        name: "facebook",
        url: this.state.facebook,
      });
    }
    if (this.state.website) {
      tokenInfo.links.push({
        name: "website",
        url: this.state.website,
      });
    }
    if (this.state.reddit) {
      tokenInfo.links.push({
        name: "reddit",
        url: this.state.reddit,
      });
    }
    if (this.state.youtube) {
      tokenInfo.links.push({
        name: "youtube",
        url: this.state.youtube,
      });
    }

    return tokenInfo;
  };

  publish = async () => {
    this.setState({
      processing: true,
    });
    let { accounts } = await connectToMetamask();
    if (this.state.url && this.state.name && this.state.description) {
      if (accounts) {
        let tokenInfo = this.getTokenInfo();
        let response = await axios.post(`${server}/tokenInfo`, tokenInfo);

        if (response.status === 200) {
          let tokenUri = `https://gateway.pinata.cloud/ipfs/${response.data}`;

          createNFT(
            this.props.appContext.nftc,
            tokenUri,
            this.handleCreateNFTReciept
          );
        } else {
          // What here?
        }
      }
    } else {
      console.log("cannot publish empty token!");
      this.setState({
        processing: false,
      });
    }
  };
  handleCreateNFTReciept = (error, receipt) => {
    if (error) {
      console.error("CreateNFT ", error);
      this.setState({
        processing: false,
      });
    } else {
      console.log(receipt.transactionHash);
      this.setState({
        url: "",
        name: "",
        description: "",
        twitter: "",
        facebook: "",
        instagram: "",
        website: "",
        reddit: "",
        processing: false,
        page: DETAILS,
      });
    }
  };

  getPreview = () => {
    let nft = this.getTokenInfo();
    let disabled = this.state.disableActionButton;
    let btnJSX = (
      <button
        type="button"
        className="btn btn-primary"
        onClick={this.publish}
        disabled={disabled}
      >
        Mint
      </button>
    );
    if (this.state.processing) {
      btnJSX = (
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          timeout={60000} //3 secs
        />
      );
    }
    return (
      <div>
        <div className="h4 text-info">Preview</div>

        <div className="d-flex justify-content-center">
          <div className="card shadow   " style={{ width: "22rem" }}>
            <div className="shadow rounded p-1 ">
              <Artifact nft={nft} />
              <div className="card-body">
                <h5 className="card-title">{nft.name}</h5>
                <p className="card-title">{nft.desc}</p>
                <Links nft={nft} />
              </div>

              <div className="card-footer d-flex justify-content-center">
                <small>Your Address</small>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div
            className="alert alert-light mt-5"
            role="alert"
            style={{ width: "22rem" }}
          >
            This is how your NFT will appear. Check if the data entered is
            correctly displayed before proceeding. Once it is minted on the
            blockchain it will be very expensive to correct!
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => this.setState({ page: SOCIAL })}
          >
            Prev
          </button>
          {btnJSX}
        </div>
      </div>
    );
  };

  getPage = () => {
    switch (this.state.page) {
      case DETAILS:
        return this.getDetails();
      case SOCIAL:
        return this.getSocial();
      case PREVIEW:
        return this.getPreview();

      default:
        break;
    }
  };

  getDetailsJSX = () => {
    return (
      <>
        <div className="h4 text-info">Basic Details</div>
        <div className="h5">These fields are required.</div>
        <div className="mb-3">
          <label htmlFor="image-url" className="form-label">
            URL of the art work
          </label>
          <input
            type="text"
            className="form-control"
            id="image-url"
            placeholder="Example : http://somewhere.com/photos/mymasterpiece.png"
            value={this.state.url}
            name="url"
            onChange={this.handleChange}
          />
          <div id="image-help" className="form-text">
            Specify the link of the art work itself. Not the page where its
            available.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Example : My Masterpiece"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <div id="name-help" className="form-text">
            Enter the title of the art work. This will be public.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="desc"
            name="description"
            placeholder="Example : This is the most awesome NFT!"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <div id="desc-help" className="form-text">
            Enter the description of the NFT. This will be public.
          </div>
        </div>
      </>
    );
  };

  getSocialJSX = () => {
    return (
      <>
        <div className="h4 text-info">Social Media</div>
        <div className="h5">These fields are optional.</div>
        <div className="mb-3">
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              <img src={twitter} alt="twitter" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Example : https://twitter.com/you"
              value={this.state.twitter}
              name="twitter"
              onChange={this.handleChange}
            />
          </div>
          <div id="image-help" className="form-text  mb-2">
            Optional. You can add your Twitter handle here.
          </div>
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              <img src={instagram} alt="instagram" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Example : https://instagram.com/you"
              value={this.state.instagram}
              name="instagram"
              onChange={this.handleChange}
            />
          </div>
          <div id="image-help" className="form-text  mb-2">
            Optional. You can add your Twitter handle here.
          </div>
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              <img src={facebook} alt="facebook" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Example : https://facebook.com/you"
              value={this.state.facebook}
              name="facebook"
              onChange={this.handleChange}
            />
          </div>
          <div id="image-help" className="form-text mb-2">
            Optional. You can add your Facebook handle here.
          </div>
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              <img src={youtube} alt="youtube" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Example : https://youtube.com/you"
              value={this.state.youtube}
              name="youtube"
              onChange={this.handleChange}
            />
          </div>
          <div id="image-help" className="form-text mb-2">
            Optional. You can add your Youtube handle here.
          </div>
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              <img src={reddit} alt="reddit" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Example : https://reddit.com/you"
              value={this.state.reddit}
              name="reddit"
              onChange={this.handleChange}
            />
          </div>
          <div id="image-help" className="form-text mb-2">
            Optional. You can add your Reddit handle here.
          </div>
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              <img src={person} alt="website" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Example : https://mywebsite.com"
              value={this.state.website}
              name="website"
              onChange={this.handleChange}
            />
          </div>
          <div id="image-help" className="form-text mb-2">
            Optional. You can add the link to your personal website here. See
            Guidelines for further details.
          </div>
        </div>
      </>
    );
  };

  render() {
    return (
      <div className="container">
        <div className="card shadow">
          <div className="card-header d-flex justify-content-center mb-3 h4">
            Create NFT
          </div>
          <div className="card-body">{this.getPage()}</div>
        </div>
      </div>
    );
  }
}

export default withAppContext(NFTWizard);
