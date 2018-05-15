const React = require("react");
const createReactClass = require("create-react-class");
const Util = require("./util");
const Layout = require("./layout");
const Depot = require("./depot");
const rightImage = require("./../img/right.png");
const leftImage = require("./../img/left.png");
const Carousel = createReactClass({
  displayName: "Carousel",
  getInitialState: function getInitialState() {
    return {
      count: 0,
      images: this.props.images,
      text: this.props.text,
      href: this.props.href,
      width: this.props.width ? parseInt(this.props.width) : 400,
      height: this.props.height ? parseInt(this.props.height) : 200,
      figures: Layout[this.props.layout].figures(
        this.props.width,
        this.props.images,
        0
      ),
      rotationY: 0
    };
  },
  componentWillMount: function componentWillMount() {
    this.depot = Depot(
      this.getInitialState(),
      this.props,
      this.setState.bind(this)
    );
    this.onRotate = this.depot.onRotate.bind(this);
    const angle = 2 * Math.PI / this.state.figures.length;
    const autoRotateTime = this.props.autoRotateTime
      ? this.props.autoRotateTime
      : 3000;
    if (this.props.auto) {
      setInterval(Util.partial(this.onRotate, angle), autoRotateTime);
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.depot.onNextProps(nextProps);
  },
  render: function render() {
    const angle = 2 * Math.PI / this.state.figures.length;
    const translateZ = -Layout[this.props.layout].distance(
      this.props.width,
      this.state.figures.length
    );
    const sef = this;
    // alert(sef.props.key)
    const figures = this.state.figures.map((d, i) =>
      React.createElement(
        "figure",
        {
          key: sef.props.key3D + i,
          style: Util.figureStyle(d, sef.props.width, sef.props.height)
        },
        React.createElement(
          "a",
          {
            href: sef.props.href[i],
            target: "_blank",
            style: {
              height: `${sef.state.height}px`,
              width: `${sef.state.width}px`,
              textDecoration: "none"
            }
          },
          [
            React.createElement("img", {
              src: d.image,
              key: i,
              alt: i,
              height: sef.state.height,
              width: `${sef.state.width}px`
            })
            //     React.createElement("a", { href:sef.props.href[i],style: {zIndex:1, height:'100',display:'block', fontSize:'25', marginTop:'-130', color: "white", backgroundColor: "rgba(0.5, 0.5, 0.5, 0.9)",textDecoration: 'none'}}, sef.props.text[i])
          ]
        )
      )
    );
    return React.createElement(
      "section",
      {
        className: "react-3d-carousel",
        key: sef.props.key3D,
        style: { width: `${this.props.width}px` }
      },
      React.createElement(
        "div",
        {
          className: "carousel",
          style: {
            transform: `translateZ(${translateZ}px)`,
            height: `${sef.state.height}px`
          }
        },
        figures
      ),
      React.createElement("img", {
        src: leftImage,
        className: "prev",
        onClick: Util.partial(this.onRotate, -angle),
        style: {
          position: "absolute",
          top: `${parseInt(
            sef.state.height / 2 - parseInt(sef.state.width / 9, 10) + 30,
            10
          )}px`,
          left: "5px",
          width: `${parseInt(sef.state.width / 9, 10)}px`,
          height: `${parseInt(sef.state.width / 9, 10)}px`,
          zIndex: 100000
        }
      }),
      React.createElement("img", {
        src: rightImage,
        className: "next",
        onClick: Util.partial(this.onRotate, +angle),
        style: {
          position: "absolute",
          top: `${parseInt(
            (sef.state.height + 60) / 2 - parseInt(sef.state.width / 9, 10),
            10
          )}px`,
          left: `${parseInt(sef.state.width - sef.state.width / 9 + 10, 10)}px`,
          width: `${parseInt(sef.state.width / 9, 10)}px`,
          height: `${parseInt(sef.state.width / 9, 10)}px`,
          zIndex: 100000
        }
      })
    );
  }
});
module.exports = Carousel;
