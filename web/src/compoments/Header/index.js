import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { DropdownButton, MenuItem } from "react-bootstrap";
import lang from "../../languages";
import logo from "../../img/logo.png";
import vietnamflag from "../../img/vietnam.png";
import janflag from "../../img/japan.png";
import englishflag from "../../img/English.png";
export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      lang: localStorage.getItem("lang") ? localStorage.getItem("lang") : "en"
    };
    lang.changeLanguage(this.state.lang);
    this.setLanguageTitle = this.setLanguageTitle.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
  }
  setLanguageTitle(languageKey) {
    switch (languageKey) {
      case "vi":
        return (
          <span>
            <img src={vietnamflag} style={{ width: 20, height: 13 }} />
            <span style={{ marginLeft: 10 }}>Việt Nam</span>
          </span>
        );
      case "en":
        return (
          <span>
            <img src={englishflag} style={{ width: 20, height: 10 }} />
            <span style={{ marginLeft: 10 }}>English</span>
          </span>
        );
      case "jan":
        return (
          <span>
            <img src={janflag} style={{ width: 20, height: 14 }} />
            <span style={{ marginLeft: 10 }}>日本</span>
          </span>
        );
      default:
        return (
          <div>
            <img src={englishflag} style={{ width: 20, height: 10 }} />
            <span style={{ marginLeft: 10 }}>English</span>
          </div>
        );
    }
  }
  changeLanguage(eventkey) {
    //alert(JSON.stringify(event))
    lang.changeLanguage(eventkey);
    localStorage.setItem("lang", eventkey);
    this.setState({
      lang: eventkey
    });
    window.location.reload();
  }
  render() {
    return (
      <div
        style={{ height: 50, backgroundColor: "yellow", margin: 0 }}
        className="row"
      >
        <div className="col-xs-3">
          <Link to={`/`}>
            <img
              style={{ paddingLeft: 30, paddingTop: 15 }}
              src={logo}
              width="auto"
              height={30}
            />
          </Link>
        </div>
        <div className="col-xs-9">
          <div style={{ color: "black", textAlign: "right" }}>
            <DropdownButton
              id="language"
              style={{ width: 120, marginTop: 7 }}
              onSelect={this.changeLanguage}
              title={this.setLanguageTitle(this.state.lang)}
            >
              <MenuItem eventKey="en">
                <img src={englishflag} style={{ width: 20, height: 10 }} />
                <span style={{ marginLeft: 10 }}>English</span>
              </MenuItem>
              <MenuItem eventKey="vi">
                <img src={vietnamflag} style={{ width: 20, height: 13 }} />
                <span style={{ marginLeft: 10 }}>Việt Nam</span>
              </MenuItem>
              <MenuItem eventKey="jan">
                <img src={janflag} style={{ width: 20, height: 14 }} />
                <span style={{ marginLeft: 10 }}>日本</span>
              </MenuItem>
            </DropdownButton>
          </div>
        </div>
      </div>
    );
  }
}
Header.propTypes = {};
