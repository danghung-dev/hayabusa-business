import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import Star from "./Star";
import "../../font/css/font-awesome.min.css";
import lang from "../../languages";
export default class Company extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div
        style={styles.index}
        className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2"
      >
        <h5 style={{ paddingTop: 20 }}>{this.props.infor.name}</h5>
        <Star number={5} />
        <div style={{ marginTop: 10 }} className="row no-gutters">
          <div style={{ border: "1px solid gray" }} className="col-xs-3  ">
            <img
              src={
                this.props.infor.thumbImage ? this.props.infor.thumbImage : ""
              }
              width="100%"
              height="auto"
            />
          </div>
          <div
            style={{ paddingLeft: 20, paddingRight: 10, fontSize: 12 }}
            className="col-xs-9"
          >
            <p style={{ color: "#888" }}>
              {lang.t("_company_Detail_address")}{" "}
              <span style={{ color: "#0066cc" }}>
                {" "}
                {this.props.infor.address}
              </span>
            </p>
            <p style={{ color: "#888" }}>
              {lang.t("_company_Detail_Tel")}{" "}
              <span style={{ color: "#0066cc" }}>
                {" "}
                {this.props.infor.phoneNumber}
              </span>
            </p>
            <p style={{ color: "#888" }}>
              {lang.t("_company_Detail_email")}{" "}
              <span style={{ color: "#0066cc" }}>
                {" "}
                {this.props.infor.email}
              </span>
            </p>
            <p style={{ color: "#888" }}>
              {lang.t("_company_Detail_web")}{" "}
              <a href={this.props.infor.website} style={{ color: "#0066cc" }}>
                {this.props.infor.website}
              </a>
            </p>
          </div>
        </div>

        <p style={{ color: "#888", marginTop: 10 }}>
          {lang.t("_company_Detail_Infor")}
        </p>
        <p style={{ color: "black" }}>{this.props.infor.shortDescription}</p>
      </div>
    );
  }
}
Company.propTypes = {
  title: PropTypes.string,
  child: PropTypes.array,
  onClick: PropTypes.func
};

const styles = {
  index: {
    marginTop: 20,
    height: "auto",
    background: "#FFFFFF",
    borderRadius: "6px 6px 0px 0px",
    border: "1px solid #eeeeee",
    position: "relative"
  }
};
