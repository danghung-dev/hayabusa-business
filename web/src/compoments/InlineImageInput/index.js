import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
export default class InlineInput extends React.Component {
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
            type="file"
            className="form-control"
            id={this.props.id}
            placeholder={this.props.placeholder}
            onChange={this.props.onChange}
          />
          <img
            style={{ marginTop: 20 }}
            src={this.props.image}
            width={100}
            height={100}
          />
        </div>
      </div>
    );
  }
}
InlineInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  image: PropTypes.any
};
const styles = {};
