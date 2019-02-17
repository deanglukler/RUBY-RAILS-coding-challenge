import React, { PureComponent } from 'react';
import ShiftDetails from './ShiftDetails';
import * as usr from '../utils/user';
import * as time from '../utils/time';

export default class Scheduler extends PureComponent {
  state = {
    shiftDetailsOpen: false,
    // shiftDetailsShift: null,
    shiftDetailsShift: this.props.shifts && this.props.shifts[0],
  };

  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.closeShiftDetails = this.closeShiftDetails.bind(this)
  }

  handleEdit(id) {
    this.setState({
      shiftDetailsOpen: true,
      shiftDetailsShift: this.props.shifts.find(shift => shift.id === id),
    });
  }

  closeShiftDetails() {
    this.setState({
      shiftDetailsOpen: false,
    })
  }

  renderShifts() {
    const { shifts, users } = this.props;
    if (!shifts || shifts.length === 0) {
      return <p>No shifts</p>;
    }
    return (
      <div>
        <h4>Shifts:</h4>
        {shifts.map(({ employee_id, id, start, end }) => (
          <div
            key={id}
            className="p-4 border-b hover:bg-blue-lightest cursor-pointer"
            onClick={() => {
              this.handleEdit(id);
            }}
          >
            <div className="pb-2 font-semibold text-grey-darker">
              Employee: {usr.getNameById(employee_id, users)}
            </div>
            <div className="px-2 inline-block bg-grey-light rounded-full py-1 text-sm font-semibold text-grey-darker">
              {time.length(start, end)}
            </div>
            <div className="mt-2">
              <div>S: {time.getDate(start)}</div>
              <div>E: {time.getDate(end)}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { shiftDetailsOpen, shiftDetailsShift } = this.state;
    const { users } = this.props;
    return (
      <div>
        {this.renderShifts()}
        <ShiftDetails
          open={shiftDetailsOpen}
          shift={shiftDetailsShift}
          users={users}
          onClose={this.closeShiftDetails}
        />
      </div>
    );
  }
}
