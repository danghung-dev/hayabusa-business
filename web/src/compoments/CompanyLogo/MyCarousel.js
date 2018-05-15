var React = require("react");
var Carousel = require("../../MyLib/react-3d-carousel/js/Carousel");
var createReactClass = require('create-react-class');
var MyCarousel = createReactClass({
  render: function() {
    return (
      <div key={this.props.key3D} className={this.props.className} style={this.props.style}>
        <Carousel
          width={this.props.width}
          height={this.props.height}
          images={this.props.images}
          key3D={this.props.key3D}
          href={this.props.href}
          text={this.props.text}
          ease={this.props.ease}
          duration={this.props.duration}
          layout={this.props.layout}
          auto={this.props.auto}
          autoRotateTime={this.props.autoRotateTime}
        />
      </div>
    );
  }
});
module.exports = MyCarousel;    
