import React, { PureComponent } from 'react';
import Loading from './Loading';
import * as usr from '../utils/user';
import * as time from '../utils/time';
import { orderChrono } from '../utils/shifts';
import { empUpdateShift } from '../api';

export default class EmployeeShifts extends PureComponent {
  static defaultProps = {
    onUpdate: () => {},
  };

  state = {
    loading: false,
  };

  constructor(props) {
    super(props);
    this.handleShiftConfirm = this.handleShiftConfirm.bind(this);
  }

  async handleShiftConfirm(id, checked) {
    this.setState({ loading: true });
    const apiRes = await empUpdateShift({
      shiftId: id,
      data: { confirmed: checked },
    });
    if (apiRes.apiOk) {
      this.props.onUpdate();
    }
    this.setState({ loading: false });
  }

  renderShifts() {
    const { shifts, users } = this.props;
    if (!shifts || shifts.length === 0) {
      return <p className="px-4">No shifts</p>;
    }
    return (
      <div>
        <h4 className="px-4">Shifts:</h4>
        {orderChrono(shifts).map(({ id, start, end, user_id, confirmed }) => (
          <div key={id} className="py-4 mx-4 border-b">
            <div className="mt-2">
              <div className="text-grey-darker text-lg">{time.getDayMin(start)}</div>
              <div className="font-semibold text-grey-darker mt-4">Start</div>
              <div>{time.getDate(start)}</div>
              <div className="font-semibold text-grey-darker mt-2">End</div>
              <div>{time.getDate(end)}</div>
              <div className="px-2 mt-2 inline-block bg-grey-light rounded-full py-1 text-sm font-semibold text-grey-darker">
                {time.length(start, end)}
              </div>
              <div className="mt-4 font-semibold text-grey-darker">
                <span>Scheduler:</span>
                <span className="ml-1 text-black font-normal">
                  {usr.getNameById(user_id, users)}
                </span>
              </div>
              <div className="mt-2">
                <input
                  className="mr-2"
                  type="checkbox"
                  onChange={e => {
                    this.handleShiftConfirm(id, e.target.checked);
                  }}
                  checked={confirmed}
                />

                <span className="text-grey-darker font-semibold">
                  Confirm Shift
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <Loading loading={loading} />
        {this.renderShifts()}
      </div>
    );
  }
}
