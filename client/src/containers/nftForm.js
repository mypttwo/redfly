import React from "react";
import connectToMetamask from "../utils/metamask";
import { createNFT } from "../utils/nftContract";
import { server } from "../config";
import axios from "axios";
import Loader from "react-loader-spinner";
import Web3 from "web3";
import withAppContext from "../hocs/withAppContext";
import twitter from "../svg/twitter.svg";
import instagram from "../svg/instagram.svg";
import facebook from "../svg/facebook.svg";
import person from "../svg/person.svg";
import reddit from "../svg/reddit.svg";
import youtube from "../svg/youtube.svg";

class NFTForm extends React.Component {
  state = {
    url: "",
    name: "",
    description: "",
    getSocialJSX: false, // show PUBLISH button
    rows: [{}], // link urls
    disableActionButton: false,
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
    this.setState({
      [name]: value,
    });
  };

  handleRowChange = (idx) => (e) => {
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx] = {
      [name]: value,
    };
    this.setState({
      rows,
    });
  };
  handleAddRow = () => {
    const item = {
      url: "",
    };
    this.setState({
      rows: [...this.state.rows, item],
    });
  };

  handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows];
    rows.splice(idx, 1);
    this.setState({ rows });
  };

  handleCreateNFTReciept = (error, receipt) => {
    if (error) {
      console.error("CreateNFT ", error);
      this.setState({
        getSocialJSX: false,
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
        getSocialJSX: false,
      });
    }
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
    }
  };

  getLinksTable = () => {
    return (
      <div className="mb-3">
        <label htmlFor="links" className="form-label">
          Links
        </label>

        <div>
          <div className="container">
            <div className="row clearfix">
              <div className="col border border-dark pb-2">
                <table
                  className="table table-sm table-striped table-hover table-borderless"
                  id="tab_logic"
                >
                  <thead>
                    <tr>
                      <th scope="col" className="col text-center">
                        Link URL
                      </th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.rows.map((item, idx) => (
                      <tr scope="row" id="addr0" key={idx}>
                        <th>
                          <input
                            type="text"
                            name="url"
                            value={this.state.rows[idx].url}
                            onChange={this.handleRowChange(idx)}
                            className="form-control  form-control-sm"
                            placeholder="Example : https://twitter.com/MyptOne"
                          />
                        </th>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={this.handleRemoveSpecificRow(idx)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  type="button"
                  onClick={this.handleAddRow}
                  className="btn btn-primary btn-sm"
                >
                  Add Link URL
                </button>
                {/* <button
                type="button"
                onClick={this.handleRemoveRow}
                className="btn btn-danger float-right"
              >
                Delete Last Row
              </button> */}
              </div>
            </div>
          </div>
        </div>
        <div id="desc-help" className="form-text">
          Add links that could provide more information for the NFT. This will
          be public.
        </div>
      </div>
    );
  };

  getSocialMediaLinks = () => {
    return (
      <div className="mb-3">
        <label htmlFor="image-url" className="form-label">
          Social Media
        </label>
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
    );
  };

  render() {
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
      <div className="container">
        <div className="row">
          <div className="col">
            <form>
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
                  Specify the link of the art work itself. Not the page where
                  its available.
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
                  Enter the title of the art work. This will be public. See
                  Guidelines for further details.
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
                  Enter the description of the NFT. This will be public. See
                  Guidelines for further details.
                </div>
              </div>
              {this.getSocialMediaLinks()}
              {/* {this.getLinksTable()} */}
              {btnJSX}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withAppContext(NFTForm);
