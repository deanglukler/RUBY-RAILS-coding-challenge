import React, { PureComponent } from 'react';
import Scheduler from './Scheduler';
import EmployeeShifts from './EmployeeShifts';
import Loading from './Loading';
import * as api from '../api';
import * as token from '../utils/token';

export default class Shifts extends PureComponent {
  state = {
    loading: true,
    users: null,
    shifts: null,
  };

  constructor(props) {
    super(props);
    this.getFreshData = this.getFreshData.bind(this);
  }

  componentDidMount() {
    this.getFreshData();
  }

  async getFreshData() {
    this.setState({ loading: true });
    const users = await api.getUsers();
    const shifts = await api.getShifts();
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
        <div className="max-w-lg rounded shadow-lg bg-grey-lightest overflow-scroll">
          <div className="p-4">
            <div className="font-bold text-xl mb-2">{user.name}</div>
            <p className="text-grey-darker text-base">{user.email}</p>
          </div>
          {isScheduler && shifts && users && (
            <Scheduler
              users={users}
              shifts={shifts}
              onUpdate={this.getFreshData}
            />
          )}
          {isEmployee && shifts && users && (
            <EmployeeShifts
              onUpdate={this.getFreshData}
              users={users}
              shifts={shifts}
            />
          )}
          <div className="p-4 pt-8">
            <span className="inline-block bg-grey-lighter rounded-full py-1 text-sm font-semibold text-grey-darker">
              {isEmployee && '#Employee'}
              {isScheduler && '#Scheduler'}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
