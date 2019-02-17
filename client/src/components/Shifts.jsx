import React, { PureComponent } from 'react';
import Scheduler from './Scheduler';
import Loading from './Loading';
import * as api from '../api';
import * as token from '../utils/token';

export default class Shifts extends PureComponent {
  state = {
    loading: true,
    users: null,
    shifts: null,
  };

  async componentDidMount() {
    const users = await api.getUsers(token.get());
    const shifts = await api.getShifts(token.get());
    this.setState({
      loading: false,
      users,
      shifts,
    });
  }

  render() {
    const { loading, users, shifts } = this.state;
    const { user } = this.props;
    const isEmployee = user && user.role === 2;
    const isScheduler = user && user.role === 1;
    return (
      <div>
        <Loading loading={loading} />
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-grey-lightest">
          <div className="p-8">
            <div className="pb-4">
              <div className="font-bold text-xl mb-2">{user.name}</div>
              <p className="text-grey-darker text-base">{user.email}</p>
            </div>
            {isScheduler && shifts && <Scheduler users={users} shifts={shifts} />}
            <div className="pt-8">
              <span className="inline-block bg-grey-lighter rounded-full py-1 text-sm font-semibold text-grey-darker">
                {isEmployee && '#Employee'}
                {isScheduler && '#Scheduler'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
