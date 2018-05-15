import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
export default class Star extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return [0, 0, 0, 0, 0].map((item, index) => {
      if (index < this.props.number) {
        return <span style={styles.yellowStar} className="fa fa-star" />;
      }
      return <span style={styles.blackStar} className="fa fa-star" />;
    });
  }
}
Star.propTypes = {
  number: PropTypes.any
};

const styles = {
  yellowStar: {
    color: "yellow"
  },
  blackStar: {
    color: "gray"
  }
};
