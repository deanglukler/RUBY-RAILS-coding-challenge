import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/airbnb.css';
import * as time from '../utils/time';

class DatePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(date) {
    const ts = time.dateStrToSec(date[0]);
    this.props.onChange && this.props.onChange(ts);
  }

  render() {
    const { value, onChange, isRequired, noCalendar, ...props } = this.props;
    return (
      <Flatpickr
        options={{
          noCalendar,
          clickOpens: true,
          enableTime: true,
        }}
        value={value * 1000}
        onChange={this.handleOnChange}
        {...props}
      />
    );
  }
}

DatePicker.propTypes = {
  label: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  fullWidth: PropTypes.bool,
};
DatePicker.defaultProps = {
  value: new Date(),
};

export default DatePicker;
