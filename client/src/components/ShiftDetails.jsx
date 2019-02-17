import React, { PureComponent } from 'react';
import DatePicker from './DatePicker'
import * as usr from '../utils/user';
import * as time from '../utils/time';

export default class ShiftDetails extends PureComponent {
  constructor(props) {
    super(props);

    const shift = { ...this.props.shift }
    this.state = {
      initShift: shift,
      nxtShift: shift,
    };
    
    this.handleClose = this.handleClose.bind(this);
    this.handleDateOnChange = this.handleDateOnChange.bind(this)
  }

  handleClose() {
    this.props.onClose && this.props.onClose();
  }

  handleDateOnChange(date) {
    const secs = time.dateStrToSec(date[0])
  }

  render() {
    const { open, shift, users } = this.props;
    // if (!open || !shift) return null;
    const { employee_id } = shift;
    const { startDate } = this.state
    return (
      <div className="absolute pin bg-grey-light flex justify-center items-center">
        <button
          onClick={this.handleClose}
          className="bg-white hover:bg-grey-lightest text-grey-darkest font-semibold py-2 px-4 mr-2 mt-2 border border-grey-light rounded shadow fixed pin-t pin-r"
        >
          close
        </button>
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-grey-lightest">
          <div className="p-8">
            <div className="pb-4">
              <div className="font-bold text-xl mb-2">
                {usr.getNameById(employee_id, users)}
              </div>
              <p className="text-grey-darker text-base">{'shift date'}</p>
            </div>
          </div>
        <DatePicker label="shift date" onChange={this.handleDateOnChange} value={startDate}/>
        </div>
      </div>
    );
  }
}
