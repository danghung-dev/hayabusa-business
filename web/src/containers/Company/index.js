import React from "react";
import { parse } from "qs";
import { connect } from "react-redux";
import { getCompanyFromCategory } from "./actions";

import { bindActionCreators } from "redux";
import CompanyList from "../../compoments/CompanyList";
import lang from "../../languages";
export class Company extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lang: localStorage.getItem("lang") ? localStorage.getItem("lang") : "en"
    };
    lang.changeLanguage(this.state.lang);

    const query = parse(this.props.location.search.substr(1));
  }
  componentDidMount() {
    const { match: { params } } = this.props;
    console.log("param", params);
    this.props.getCompanyFromCategory(params.categoryid);
  }
  render() {
    return (
      <div>
        <div
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 30,
            color: "blue"
          }}
        >
          {" "}
          {lang.t("hayabusa")}
        </div>
        <div style={{ marginTop: 20 }}>
          <CompanyList
            data={this.props.list}
            categoryInfo={this.props.categoryInfo}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = store => {
  const state = store.company;
  return {
    list: state.list,
    categoryInfo: state.categoryInfo
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCompanyFromCategory
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Company);
