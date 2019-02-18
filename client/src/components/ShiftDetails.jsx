import React, { PureComponent } from 'react';
import DatePicker from './DatePicker';
import * as usr from '../utils/user';
import * as time from '../utils/time';
import * as token from '../utils/token';
import * as api from '../api';

export default class ShiftDetails extends PureComponent {
  constructor(props) {
    super(props);

    const shift = { ...this.props.shift };
    this.state = {
      initShift: shift,
      nxtShift: shift,
      timeInputVal: String(time.parseHourFloatBySecs(shift.end - shift.start)),
      error: null,
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleDateOnChange = this.handleDateOnChange.bind(this);
    this.handleShiftLenOnChange = this.handleShiftLenOnChange.bind(this);
    this.handleTimeInputOnChange = this.handleTimeInputOnChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleClose() {
    this.props.onClose && this.props.onClose();
  }

  handleDateOnChange(ts) {
    const { nxtShift } = this.state
    const shiftLen = nxtShift.end - nxtShift.start
    this.setState({
      nxtShift: {
        ...this.state.nxtShift,
        start: ts,
        end: ts + shiftLen,
      },
    });
  }

  handleShiftLenOnChange(e) {
    const hrs = parseInt(e.target.value);
    const secs = hrs * 3600;
    this.updateShiftLengthData(secs)
  }

  handleTimeInputOnChange(e) {
    const val = e.target.value;
    if (!val) {
      return this.updateShiftLengthData(0, '');
    }
    // dont adjust things if user inputs a '.'
    const { timeInputVal } = this.state;
    if (val.endsWith('.') && !timeInputVal.endsWith('.')) {
      return this.updateShiftLengthData(null, val);
    }
    let hrs = Math.floor(parseFloat(val) * 10) / 10;
    if (isNaN(hrs)) return this.updateShiftLengthData(0, '');
    if (hrs > 99) hrs = 99;
    const secs = hrs * 3600;
    this.updateShiftLengthData(secs);
  }

  updateShiftLengthData(length, timeInputVal) {
    const { nxtShift } = this.state;
    const end = length ? nxtShift.start + length : nxtShift.end;
    this.setState({
      nxtShift: {
        ...nxtShift,
        end,
      },
      timeInputVal:
        typeof timeInputVal === 'string'
          ? timeInputVal
          : String(time.parseHourFloatBySecs(length)),
    });
  }

  async handleSave() {
    const { nxtShift } = this.state;
    const data = await api.updateShift({
      token: token.get(),
      shiftId: nxtShift.id,
      data: nxtShift,
    });
    if (data.apiOk) {
      return;
    }
    this.setState({
      error: data.error || 'Somethings wrong',
    });
  }

  render() {
    const { shift, users } = this.props;
    if (!shift) return null;
    const { employee_id } = shift;
    const { nxtShift, timeInputVal } = this.state;

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
              {[
                `${time.getDay(nxtShift.start)}`,
                `start: ${time.getHour(nxtShift.start)}`,
                `end: ${time.getHour(nxtShift.end)}`,
              ].map(content => (
                <p className="text-grey-darker text-base my-1" key={content}>
                  {content}
                </p>
              ))}
            </div>
            <p className="text-grey-darker text-base pb-1">
              Start Date and Time
            </p>
            <DatePicker
              className="bg-grey-lightest pb-2"
              onChange={this.handleDateOnChange}
              value={nxtShift.start}
            />
            <p className="text-grey-darker text-base pb-1">Shift Length</p>
            <form className="flex flex-col">
              {[4, 8, 10].map(len => (
                <div className="my-1" key={len}>
                  <input
                    onChange={this.handleShiftLenOnChange}
                    type="radio"
                    name="shift-length"
                    value={len}
                    checked={(() => {
                      const { start, end } = this.state.nxtShift;
                      return (end - start) / 3600 === len;
                    })()}
                  />
                  <span className="ml-2">{len} hours</span>
                </div>
              ))}
              <div className="mt-2">
                <span className="mb-1">hrs:</span>
                <input
                  className="appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-teal"
                  type="text"
                  value={timeInputVal}
                  onChange={this.handleTimeInputOnChange}
                />
              </div>
            </form>
            <p className="text-red text-xs italic">{this.state.error}</p>
            <button
              className="bg-blue hover:bg-blue-dark text-white font-bold w-full py-2 mt-4 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={this.handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}
