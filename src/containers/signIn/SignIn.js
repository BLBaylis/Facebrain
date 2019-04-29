import React, { Component } from "react";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  onInputChange = (inputType, event) => {
    this.setState({ [inputType]: event.target.value });
  };

  onSignInSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    fetch(`${process.env.REACT_APP_API_LINK}/signin`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(user => {
      if (user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange("home");
      } else {
        console.error("invalid user");
      }
    })
    .catch(console.error);
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
        <main className="pa4 black-80">
          <form onSubmit={this.onSignInSubmit} className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={event => this.onInputChange("email", event)}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={event => this.onInputChange("password", event)}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <a
                onClick={() => onRouteChange("register")}
                href="#0"
                className="f6 link dim black db"
              >
                Register
              </a>
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default SignIn;
