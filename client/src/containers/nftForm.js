import React from "react";
import connectToMetamask from "../utils/metamask";
import { server } from "../config";
import axios from "axios";

class NFTForm extends React.Component {
  state = {
    url: "",
    name: "",
    description: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  publish = async () => {
    let { accounts } = await connectToMetamask();
    if (this.state.url && this.state.name && this.state.description) {
      if (accounts && this.state.url) {
        console.log();
        let tokenInfo = {
          url: this.state.url,
          name: this.state.name,
          desc: this.state.description,
        };
        let response = await axios.post(`${server}/tokenInfo`, tokenInfo);

        if (response.status === 200) {
          console.log(response.data);
          this.setState({
            url: "",
            name: "",
            description: "",
            progress: 0,
          });
          this.props.publish(response.data);
        } else {
          // What here?
        }
      }
    } else {
      console.log("cannot publish empty token!");
    }
  };

  render() {
    return (
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
            Specify the link of the art work itself. Not the page where its
            available. See Guidelines for further details.
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
            Enter the title of the art work. This will be public. See Guidelines
            for further details.
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
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.publish}
          data-bs-toggle="collapse"
          data-bs-target="#collapseCreate"
        >
          Publish
        </button>
      </form>
    );
  }
}

export default NFTForm;
