import React, { PureComponent } from 'react';
import ShiftDetails from './ShiftDetails';
import * as usr from '../utils/user';
import * as time from '../utils/time';

export default class Scheduler extends PureComponent {
  state = {
    shiftDetailsOpen: false,
    shiftDetailsShift: null,
    shiftCreateOpen: false,
  };

  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.closeShiftDetails = this.closeShiftDetails.bind(this);
    this.closeShiftCreate = this.closeShiftCreate.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
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
    });
  }

  handleCreate() {
    this.setState({
      shiftCreateOpen: true,
    });
  }

  closeShiftCreate() {
    this.setState({
      shiftCreateOpen: false,
    });
  }

  renderShifts() {
    const { shifts, users } = this.props;
    if (!shifts || shifts.length === 0) {
      return <p className="mx-6">No shifts</p>;
    }
    return (
      <div>
        <h4 className="mx-4">Shifts:</h4>
        <div className="mx-4">
          {shifts.map(({ employee_id, id, start, end }) => (
            <div
              key={id}
              className="py-4 px-2 border-b hover:bg-blue-lightest cursor-pointer"
              onClick={() => {
                this.handleEdit(id);
              }}
            >
              <div className="text-grey-darker text-lg ">
                {usr.getNameById(employee_id, users)}
              </div>
              <div className="font-semibold text-grey-darker">
                {time.getDayMin(start)}
              </div>
              <div className="font-semibold text-grey-darker mt-4">Start</div>
              <div>{time.getDate(start)}</div>
              <div className="font-semibold text-grey-darker mt-2">End</div>
              <div>{time.getDate(end)}</div>
              <div className="px-2 mt-2 inline-block bg-grey-light rounded-full py-1 text-sm font-semibold text-grey-darker">
                {time.length(start, end)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { shiftDetailsOpen, shiftDetailsShift, shiftCreateOpen } = this.state;
    const { users } = this.props;
    return (
      <div>
        {this.renderShifts()}
        {shiftDetailsOpen && (
          <ShiftDetails
            shift={shiftDetailsShift}
            users={users}
            onClose={this.closeShiftDetails}
            onSuccess={this.props.onUpdate}
          />
        )}
        {shiftCreateOpen && (
          <ShiftDetails
            create
            users={users}
            onClose={this.closeShiftCreate}
            onSuccess={this.props.onUpdate}
          />
        )}
        <div className="mx-4">
          <button
            className="bg-blue hover:bg-blue-dark text-white font-bold w-full py-2 mt-4 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={this.handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    );
  }
}
