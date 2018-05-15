import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import Company from "./CompanyDetail";
import lang from "../../languages";
export default class CompanyList extends React.Component {
  constructor() {
    super();
    this.state = {
      lang: localStorage.getItem("lang") ? localStorage.getItem("lang") : "en"
    };
  }
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="row no-gutters">
        <div className="col-xs-3" />
        <div
          style={{
            backgroundColor: "#ededed",
            border: " 1px solid #e0e0e0",
            height: "auto"
          }}
          className="col-xs-6"
        >
          <div style={{ margin: 20 }}>
            <h5 style={styles.title}>
              {lang.t("cateName")}{" "}
              {this.state.lang === "jan"
                ? this.props.categoryInfo.name
                : this.props.categoryInfo.name_vi}
            </h5>
            {this.props.data.map((item, id) => (
              <Company key={id} infor={item} number={id + 1} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
CompanyList.propTypes = {
  title: PropTypes.any,
  child: PropTypes.any,
  onClick: PropTypes.func
};
const styles = {
  title: {
    margin: 0,
    fontSize: 20,
    color: "#CC3366"
  }
};
