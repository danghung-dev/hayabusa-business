import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import "react-select/dist/react-select.css";
export default class MySelect extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div
        style={{ marginTop: 10, marginBottom: 10 }}
        className="form-group row "
        className={this.props.className ? this.props.className : "row"}
      >
        <span style={{ marginTop: 5, fontWeight: "bold" }} className="col-sm-3">
          {this.props.title}
        </span>
        <div style={{}} className="col-sm-9">
          <Select
            name="form-field-name"
            clearable={false}
            value={this.props.value}
            options={this.props.options}
            onChange={this.props.onChange}
          />
        </div>
      </div>
    );
  }
}
MySelect.propTypes = {
  className: PropTypes.any,
  title: PropTypes.string,
  value: PropTypes.any,
  options: PropTypes.any,
  onChange: PropTypes.func
};
