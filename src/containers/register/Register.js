import React, { Component } from "react";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: ""
  };

  onInputChange = (inputType, event) => {
    this.setState({ [inputType]: event.target.value });
  };

  onRegisterSubmit = event => {
    event.preventDefault();
    let { email, password, username } = this.state;
    if (!username || !email || !password) {
      return;
    }
    fetch(`${process.env.API_LINK}/register`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username })
    })
      .then(res => res.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      })
      .catch(console.error);
  };

  render() {
    return (
      <article className="br3 mv4 w-100 w-50-m w-25-l mw6 center">
        <main className="pa4 black-80">
          <form onSubmit={this.onRegisterSubmit} className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label
                  className="db fw6 lh-copy f6"
                  type="text"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="username"
                  onChange={event => this.onInputChange("username", event)}
                  id="username"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="email">
                  Email
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  onChange={event => this.onInputChange("email", event)}
                  id="email-address"
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
                  onChange={event => this.onInputChange("password", event)}
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default Register;
