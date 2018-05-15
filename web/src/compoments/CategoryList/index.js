import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { Link } from "react-router-dom";
export default class CategoryList extends React.Component {
  constructor() {
    super();
    this.state = {
      lang: localStorage.getItem("lang") ? localStorage.getItem("lang") : "en"
    };
    this.parseTable = this.parseTable.bind(this);
  }
  // eslint-disable-line react/prefer-stateless-function
  parseTable(list, number) {
    let result = [];
    let row = [];
    if (!list) return [];
    list.map(item => {
      row.push(item);
      if (row.length > 3) {
        result.push(row);
        row = [];
      }
      return true;
    });
    if (row.length > 0) {
      result.push(row);
    }
    return result;
  }
  render() {
    //  const link = `/category/${this.props._id}`;
    const sef = this;
    const table = this.parseTable(this.props.listCategory);
    return (
      <table class="table table-bordered">
        <tbody>
          {table.map(item => {
            let row = item.map(item1 => {
              let link = `/category/${item1._id}`;
              return (
                <td>
                  <Link to={link}>{this.state.lang==="jan" ? item1.name : item1.name_vi}</Link>
                </td>
              );
            });
            return <tr> {row} </tr>;
          })}
        </tbody>
      </table>
    );
  }
}
CategoryList.propTypes = {
  name: PropTypes.any,
  id: PropTypes.any
};
