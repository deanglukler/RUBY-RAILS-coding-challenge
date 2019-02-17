import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/airbnb.css';

class DatePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(date) {
    this.props.onChange && this.props.onChange(date)
  }

  render() {
    const {
      label,
      helperText,
      className,
      value,
      onChange,
      isRequired,
      fullWidth,
      ...props
    } = this.props;
    return (
      <div {...props}>
        {label && <label>{label}</label>}
        <div>
          <div>
            <Flatpickr
              options={{
                clickOpens: true,
                enableTime: true,
                defaultDate: value * 1000,
              }}
              value={value * 1000}
              onChange={this.handleOnChange}
            />
          </div>
          {helperText && <span className="clr-subtext">Helper Text</span>}
        </div>
      </div>
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
