import PropTypes from 'prop-types';
import React, { Component } from 'react';
import $ from 'jquery';
import HiddenFields from './HiddenFields';
import InputMask from 'react-input-mask';
import SelectConstructor from './SelectConstructor';

require('../addKeyboard');
require('jquery-ujs');
require('jquery-ui/ui/core.js');
require('jquery-ui/ui/position');

export default class BloodPressureForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measurement: null,
      units: 'mmHG',
    }
    this.keyboardize = this.keyboardize.bind(this)
    this.handleMeasurementChange = this.handleMeasurementChange.bind(this)
  }

  componentWillMount() {
    this.$el = $(this.el);
    this.$el.addKeyboard();
  }

  componentWillUnmount() {
    this.$el.addKeyboard('destroy');
  }

  keyboardize(e) {
    e.preventDefault();
    this.$el = $(this.el);
    const kb = this.$el.getkeyboard();
    // close the keyboard if the keyboard is visible and the button is clicked a second time
    if (kb.isOpen) {
      kb.close();
    } else {
      kb.reveal();
    }
  }

  handleMeasurementChange(event) {
    this.props.onMeasChange({
      [event.target.name]: event.target.value,
    })
    console.log(this.state)
  }

  render() {
    const options = this.props.topic.units_of_measurement
    return (
      <div className="form-inline col-10">
        <HiddenFields
          visit={this.props.visit}
          topic={this.props.topic}
          parameterizedPlural={this.props.parameterizedPlural}
          rowID={this.props.rowID}
        />
        <InputMask
          mask="999/999"
          name="measurement"
          id={'visit_' + this.props.parameterizedPlural + '_attributes_' + this.props.rowID + '_test_amount'}
          className='form-control calculator'
          value={this.state.measurement}
          ref={el => this.el = el}
          onChange={this.handleMeasurementChange}
        />
        <button
          className="btn btn-light calculator"
          type="button"
          id={this.props.parameterizedPlural + '_' + this.props.rowID + '_test_calc_button'}
          onClick={this.keyboardize}
        >
          <i className="fa fa-calculator" />
        </button>
        <SelectConstructor
          arr={options}
          title={this.props.title}
          attribute={this.props.title}
          other={false}
          name="test_unit_of_meas"
          parameterizedPlural={this.props.parameterizedPlural}
          rowID={this.props.rowID}
          multiSelect={this.props.multiSelect}
          onUnitChange={this.handleMeasurementChange}
        />
      </div>
    );
  }
}

BloodPressureForm.defaultProps = {
  title: 'units',
  multiSelect: false,
};

BloodPressureForm.propTypes = {
  topic: PropTypes.object.isRequired,
  parameterizedPlural: PropTypes.string.isRequired,
  multiSelect: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  rowID: PropTypes.number.isRequired,
};
