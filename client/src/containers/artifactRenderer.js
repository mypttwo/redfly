import React from "react";
import logo from "../logo.svg";
import Loader from "react-loader-spinner";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import delay from "../utils/delay";

class ArtifactRenderer extends React.Component {
  state = {
    contentType: "",
  };
  componentDidMount() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("HEAD", this.props.nft.image);
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState == xhttp.DONE) {
        let contentType = xhttp.getResponseHeader("Content-Type");
        console.log(contentType);
        delay();
        this.setState({ contentType });
      }
    }.bind(this);
    xhttp.send();
  }
  render() {
    //use https://blog.bitsrc.io/how-to-implement-smooth-transitions-in-react-bd0497b06b8
    // React Transition Group for smooth rendering

    let jsx = (
      <div className="d-flex justify-content-center py-5 mb-5">
        <Loader
          type="Grid"
          color="#00BFFF"
          height="500"
          // timeout={60000} //3 secs
        />
      </div>
    );
    if (this.state.contentType.includes("video")) {
      jsx = (
        <video
          // controls
          src={this.props.nft.image}
          // poster={logo}
          className="card-img-top mt-0 pt-0 "
          loop
          autoPlay
        >
          Sorry, your browser doesn't support embedded videos!
        </video>
      );
    } else if (this.state.contentType.includes("image")) {
      jsx = this.props.getImgJSX(this.props.nft, this.props.sizeOriginal);
    }
    return jsx;
  }
}

export default ArtifactRenderer;
