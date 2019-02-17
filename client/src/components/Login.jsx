import React, { PureComponent } from 'react';
import axios from 'axios';

import authenticate from '../userauth/authenticate';
import Loading from './Loading'

export default class Login extends PureComponent {
  state = {
    email: '',
    password: '',
    schedulers: [],
    employees: [],
    users: [],
    loading: true,
  };

  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  async componentDidMount() {
    const res = (await axios.get('/api/users')).data;
    if (!res.apiOk || !Array.isArray(res.data)) {
      console.warn('somethings wrong getting users');
      return null;
    }
    const schedulers = [];
    const employees = [];
    res.data.forEach((user, i) => {
      user.photo = `https://randomuser.me/api/portraits/men/${50 + i}.jpg`;
      if (user.role === 1) {
        return schedulers.push(user);
      }
      employees.push(user);
    });
    this.setState({
      schedulers,
      employees,
      users: res.data,
      loading: false,
    });
  }

  handleInput(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  }

  async handleLogin() {
    const token = await authenticate({
      email: this.state.email,
      password: this.state.password,
    });
    if (!token) {
      this.setState({
        error: 'Invalid Email or Password',
      });
    }
    this.props.onLogin(token);
  }

  renderUsers(users) {
    return users.map(({ email, name, role, photo }, i) => (
      <div
        key={email}
        onClick={() => {
          this.setState({
            email,
            password: 'password',
          });
        }}
        className="cursor-pointer py-2 hover:bg-grey-lightest rounded"
      >
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={photo}
            alt="Avatar"
          />
          <div className="text-sm">
            <p className="text-black leading-none">{name}</p>
            <p className="text-grey-dark">
              {role === 1 ? 'Scheduler' : 'Employee'}
            </p>
          </div>
        </div>
      </div>
    ));
  }

  render() {
    const { loading } = this.state
    return (
      <div className="w-full max-w-xs">
        <Loading loading={loading} />
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="mb-4">Sign In</h2>
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              type="text"
              placeholder="Email"
              onChange={this.handleInput}
              value={this.state.email}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                this.state.error ? 'border-red' : ''
              }`}
              name="password"
              type="password"
              placeholder={`try: "password"`}
              onChange={this.handleInput}
              value={this.state.password}
            />
            <p className="text-red text-xs italic">{this.state.error}</p>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue hover:bg-blue-dark text-white font-bold w-full py-2 mb-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={this.handleLogin}
            >
              Sign In
            </button>
          </div>
          {this.state.users.length > 0 && (
            <div className="pt-2 border-t-2 border-grey-light">
            <h4>Users: (try one)</h4>
            {this.renderUsers(this.state.schedulers)}
            {this.renderUsers(this.state.employees)}
          </div>
          )}
        </form>
        <p className="text-center text-grey text-xs">
          ©2019 DoubleTime. All rights reserved.
        </p>
      </div>
    );
  }
}
