import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import Star from "./Star";
import "../../font/css/font-awesome.min.css";
import lang from "../../languages";
import { Link } from "react-router-dom";
export default class Company extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div style={styles.index}>
        <div className="row no-gutters">
          <div className="col-xs-2">
            <div style={styles.number}> {this.props.number}</div>
          </div>
          <div style={{ paddingTop: 15 }} className="col-xs-10">
            <Link
              to={`/detail?id=${this.props.infor._id}`}
              style={styles.title}
              className="row no-gutters"
            >
              {this.props.infor.name}
            </Link>
            <Star number={4} />
            <div style={{ marginTop: 10 }} className="row no-gutters">
              <div style={{ border: "1px solid gray" }} className="col-xs-3 ">
                <img
                  src={
                    this.props.infor.thumbImage
                      ? this.props.infor.thumbImage
                      : ""
                  }
                  width="100%"
                  height="auto"
                />
              </div>
              <div
                style={{ paddingLeft: 20, paddingRight: 10, fontSize: 12 }}
                className="col-xs-8"
              >
                <p>
                  {lang.t("_company_Detail_address") +
                    "  " +
                    this.props.infor.address}
                </p>
                <p>
                  {" "}
                  {lang.t("_company_Detail_Tel")}{" "}
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    {"  " + this.props.infor.phoneNumber}
                  </span>
                </p>
              </div>
            </div>
            <div style={{ marginTop: 20 }} className="row no-gutters">
              {this.props.infor.images.map(item => {
                <div
                  style={{ border: "1px solid #cecece", marginRight: 5 }}
                  className="col-xs-2"
                >
                  <img src={item} width="100%" height="100%" />
                </div>;
              })}
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 20,
            border: "1px solid #cecece",
            backgroundColor: "#eddeee"
          }}
          className="row no-gutters"
        >
          <div
            style={{ paddingTop: 20, paddingBottom: 20 }}
            className="col-xs-6 row no-gutters justify-content-center"
          >
            <a
              href={`mailto:${this.props.infor.email}?subject=交流したい`}
              style={{ color: " #007BAC" }}
            >
              {lang.t("coordinator")}
            </a>
          </div>
          <div
            style={{ paddingTop: 20, paddingBottom: 20 }}
            className="col-xs-6 row no-gutters justify-content-center"
          >
            <a href={this.props.infor.website} style={{ color: " #007BAC" }}>
              {" "}
              {this.props.infor.website}{" "}
            </a>
          </div>
        </div>
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
    position: "relative"
  },
  number: {
    width: 30,
    height: 30,
    backgroundColor: "Yellow",
    textAlign: "center",
    fontSize: 15,
    marginTop: 20,
    marginLeft: 20,
    padding: 5
  },
  title: {
    color: "#333333",
    fontWeight: "bold"
  }
};
