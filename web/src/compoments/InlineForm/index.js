import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
export default class InlineForm extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="form-group row ">
        <label className="col-form-label col-sm-3">{this.props.label}</label>
        <div className="col-sm-9">
          <input
            type="name"
            className="form-control"
            id={this.props.id}
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={this.props.onChange}
          />
        </div>
      </div>
    );
  }
}
InlineForm.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string
};
const styles = {};
