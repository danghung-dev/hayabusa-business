import React from "react";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { parse } from "qs";
import { connect } from "react-redux";
import { getCompany } from "./actions";
import CompanyDetailCompoments from "../../compoments/CompanyDetail";
import lang from "../../languages";
export class CompanyDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lang: localStorage.getItem("lang") ? localStorage.getItem("lang") : "en"
    };
    lang.changeLanguage(this.state.lang);
  }
  componentWillMount() {
    const query = parse(this.props.location.search.substr(1));
    this.props.getCompany(query.id);
  }

  render() {
    const sef = this;
    return (
      <div>
        <div
          style={{
            marginTop: 30,
            width: "100%",
            height: 100,
            textAlign: "center",
            fontSize: 30,
            color: "red"
          }}
        >
          {lang.t("hayabusa")}
        </div>
        <CompanyDetailCompoments infor={this.props.companyDetail} />
      </div>
    );
  }
}
const mapStateToProps = store => {
  const state = store.companyDetail;
  return {
    companyDetail: state.data
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCompany
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetail);
