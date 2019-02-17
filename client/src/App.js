import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Login from './components/Login';
import Shifts from './components/Shifts';
import Loading from './components/Loading';
import getUser from './userauth/getuser';

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
    const token = localStorage.getItem('tokenDT');
    if (!token) {
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 800);
      return null;
    }
    this.getUser(token);
  }

  handleLogin(token) {
    // Put the object into storage
    localStorage.setItem('tokenDT', token);
    this.getUser(token);
  }

  async getUser(token) {
    this.setState({
      loading: true,
    });
    const res = await getUser(token);

    if (!res.apiOk) {
      console.log('Something is broken here');
      this.clearToken();
      return null;
    }
    // then we get the user and set it to state
    this.setState({
      loading: false,
      user: res.data,
    });
  }

  handleSignOut() {
    this.clearToken();
    this.setState({
      user: null,
    });
  }

  clearToken() {
    localStorage.removeItem('tokenDT');
  }

  renderContent() {
    return this.state.user ? <Shifts /> : <Login onLogin={this.handleLogin} />;
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div className="flex w-screen h-screen justify-center items-center bg-grey-lighter">
        {user && (
          <button
            onClick={this.handleSignOut}
            className="bg-white hover:bg-grey-lightest text-grey-darkest font-semibold py-2 px-4 mr-2 mt-2 border border-grey-light rounded shadow fixed pin-t pin-r"
          >
            sign out
          </button>
        )}
        <p className="absolute pin-b pin-r p-5 text-grey-dark">DoubleTime</p>
        <Loading loading={loading} />
        {!loading && this.renderContent()}
      </div>
    );
  }
}

export default App;
