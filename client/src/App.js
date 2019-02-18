import React, { Component } from 'react';

import './App.css';
import Login from './components/Login';
import Shifts from './components/Shifts';
import Loading from './components/Loading';
import getUser from './userauth/getuser';
import * as token from './utils/token'

class App extends Component {
  state = {
    user: null,
    loading: true,
  };

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  // App will serve as the authentication layer
  // keep it simple man
  async componentDidMount() {
    // Retrieve the object from storage
    const t = token.get();
    if (!t) {
      this.setState({
        loading: false,
      })
      return null;
    }
    this.getUser(t);
  }

  handleLogin(t) {
    // Put the object into storage
    token.set(t)
    this.getUser(t);
  }

  async getUser(t) {
    this.setState({
      loading: true,
    });
    const res = await getUser(t);

    this.setState({
      loading: false,
    });

    if (!res.apiOk) {
      console.log('Something\'s is broken here');
      token.clear()
      return null;
    }
    // then we get the user and set it to state
    this.setState({
      user: res.data,
    });
  }

  handleSignOut() {
    token.clear();
    this.setState({
      user: null,
    });
  }

  renderContent() {
    return this.state.user ? (
      <Shifts user={this.state.user} />
    ) : (
      <Login onLogin={this.handleLogin} />
    );
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div style={{ padding: '4em 0' }} className="flex w-screen min-h-screen justify-center items-center bg-grey-lighter">
        {user && (
          <button
            onClick={this.handleSignOut}
            className="bg-white hover:bg-grey-lightest text-grey-darkest font-semibold py-2 px-4 mr-2 mt-2 border border-grey-light rounded shadow fixed pin-t pin-r"
          >
            sign out
          </button>
        )}
        <p className="fixed pin-b pin-r p-5 text-grey-dark">DoubleTime</p>
        <Loading loading={loading} />
        {this.renderContent()}
      </div>
    );
  }
}

export default App;
