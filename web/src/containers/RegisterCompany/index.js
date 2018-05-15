import React from "react";
import { parse } from "qs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import lang from "../../languages";
import { addCompany } from "./actions";
import { getList } from "../HomePage/actions";

import InlineForm from "../../compoments/InlineForm";
import InlineSelect from "../../compoments/InlineSelect";
import InlineImageInput from "../../compoments/InlineImageInput";
export class RegisterCompany extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      telephoneNumber: "",
      Fax: "",
      Website: "",
      city: "",
      email: "",
      director: "",
      directorEmail: "",
      mainCategory: "",
      shortDescription: "",
      imagePath: null,
      imageCompany: null,

      lang: localStorage.getItem("lang") ? localStorage.getItem("lang") : "en"
    };
    lang.changeLanguage(this.state.lang);
    this.isRegister = false;
    this.setInputState = this.setInputState.bind(this);
    this.setSelectState = this.setSelectState.bind(this);
    this.register = this.register.bind(this);
    this.chooseImage = this.chooseImage.bind(this);
  }
  componentDidMount() {
    this.props.getList();
  }
  setInputState(name, event) {
    this.setState({ [name]: event.target.value });
  }
  setSelectState(name, event) {
    this.setState({ [name]: event.value });
  }
  register() {
    if (this.state.mainCategory === "") {
      alert("Vui lòng nhập ngành nghề");
      return;
    }
    if (!this.state.imagePath) {
      alert("Vui lòng up ảnh");
      return;
    }
    this.isRegister = true;
    const data = {
      name: this.state.name,
      address: this.state.address,
      phoneNumber: this.state.telephoneNumber,
      website: this.state.Website,
      shortDescription: this.state.shortDescription,
      email: this.state.email,
      categoryId: this.state.mainCategory,
      thumb: this.state.imagePath
    };
    this.props.addCompany(data);
  }
  parseList(list) {
    let result = [];
    list.map(item => {
      let temp = {};
      temp.value = item._id;
      temp.label = this.state.lang === "jan" ? item.name : item.name_vi;
      result.push(temp);
    });
    return result;
  }
  chooseImage(event) {
    const reader = new FileReader();
    const imagePath = event.target.files[0];

    this.setState({ imagePath: imagePath });
    reader.onload = e => {
      this.setState({ imageCompany: e.target.result });
    };
    reader.readAsDataURL(imagePath);
  }
  render() {
    if (this.props.success && this.isRegister) {
      this.props.history.push(`/detail?id=${this.props.data._id}`);
    }
    return (
      <div style={{ marginBottom: 200 }}>
        <div
          style={{
            marginTop: 30,
            width: "100%",
            textAlign: "center",
            fontSize: 30,
            color: "red"
          }}
        >
          {lang.t("hayabusa")}
        </div>
        <div style={{ marginTop: 30 }} className="row">
          <div className="col-xs-10 col-sm-8 col-offset-1 col-sm-offset-2">
            <h1 style={{ color: "blue", marginTop: 20, marginBottom: 20 }}>
              {lang.t("companyInfor")}
            </h1>
            <div style={{ border: "1px solid gray" }} className="row">
              <form style={{ marginTop: 10, padding: 20 }} className="col-12">
                <InlineForm
                  label={lang.t("name")}
                  id="name"
                  placeholder=""
                  value={this.state.name}
                  onChange={event => {
                    this.setInputState("name", event);
                  }}
                />
                <InlineForm
                  label={lang.t("address")}
                  id="address"
                  placeholder=""
                  value={this.state.address}
                  onChange={event => {
                    this.setInputState("address", event);
                  }}
                />
                <InlineForm
                  label={lang.t("telephoneNumber")}
                  id="telephoneNumber"
                  placeholder=""
                  value={this.state.telephoneNumber}
                  onChange={event => {
                    this.setInputState("telephoneNumber", event);
                  }}
                />
                <InlineForm
                  label={lang.t("Fax")}
                  id="Fax"
                  placeholder=""
                  value={this.state.Fax}
                  onChange={event => {
                    this.setInputState("Fax", event);
                  }}
                />
                <InlineForm
                  label={lang.t("Website")}
                  id="Website"
                  placeholder=""
                  value={this.state.Website}
                  onChange={event => {
                    this.setInputState("Website", event);
                  }}
                />
                <InlineForm
                  label={lang.t("email")}
                  id="email"
                  placeholder=""
                  value={this.state.email}
                  onChange={event => {
                    this.setInputState("email", event);
                  }}
                />
                <InlineSelect
                  title={lang.t("city")}
                  id="city"
                  options={[
                    { value: "vi", label: lang.t("_VietName") },
                    { value: "jan", label: lang.t("_Jan") }
                  ]}
                  value={this.state.city}
                  onChange={event => {
                    this.setSelectState("city", event);
                  }}
                />
                <InlineForm
                  label={lang.t("director")}
                  id="director"
                  placeholder=""
                  value={this.state.director}
                  onChange={event => {
                    this.setInputState("director", event);
                  }}
                />
                <InlineForm
                  label={lang.t("directorEmail")}
                  id="directorEmail"
                  placeholder=""
                  value={this.state.directorEmail}
                  onChange={event => {
                    this.setInputState("directorEmail", event);
                  }}
                />
                <InlineSelect
                  title={lang.t("mainCategory")}
                  id="mainCategory"
                  options={this.parseList(this.props.listCategory)}
                  value={this.state.mainCategory}
                  onChange={event => {
                    this.setSelectState("mainCategory", event);
                  }}
                />
                <InlineImageInput
                  label={lang.t("imageCompany")}
                  id="imageCompany"
                  placeholder=""
                  image={this.state.imageCompany}
                  onChange={event => {
                    this.chooseImage(event);
                  }}
                />
                <div className="form-group row">
                  <label className="col-sm-12">
                    {lang.t("shortDescription")}
                  </label>
                  <div className="col-sm-12">
                    <textarea
                      type="name"
                      className="form-control"
                      id="shortDescription"
                      value={this.state.shortDescription}
                      onChange={event => {
                        this.setInputState("shortDescription", event);
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
            <button
              onClick={this.register}
              style={{ marginTop: 50, marginBottom: 20 }}
              type="submit"
              className="btn btn-primary col-xs-6 col-xs-offset-3 col-sm-4 offset-sm-4"
            >
              {lang.t("register")}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = store => {
  const state = store.registerCompany;
  const cateState = store.home;
  return {
    listCategory: cateState.list,
    data: state.data,
    success: state.success
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getList, addCompany }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterCompany);
