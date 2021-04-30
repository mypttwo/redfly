import React from "react";

class LoginAdmin extends React.Component {
  render() {
    return (
      <div className="container">
        <form>
          <div className="mb-3">
            <label htmlFor="InputEmail1" className="form-label">
              Email address
            </label>
            <input type="email" className="form-control" id="InputEmail1" />
          </div>
          <div className="mb-3">
            <label htmlFor="InputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="InputPassword1"
            />
          </div>

          <button type="button" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginAdmin;
