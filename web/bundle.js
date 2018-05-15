/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var MainView = __webpack_require__(1);

	React.render(
	    React.createElement(MainView,{ height: '100%', width: '100%' }),
	    document.getElementById('content')
	);




/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Carousel = __webpack_require__(2);
	var Ease = __webpack_require__(7);
	var data = __webpack_require__(8);
	var setting = __webpack_require__(9);
	var MainView = React.createClass({
	    displayName: 'MainView',

	    getInitialState: function getInitialState() {
	        return {
	            images: this.getImagesFromData(data[0].company),
	            href: this.getHrefFromData(data[0].company),
	            text: this.getTitleFromData(data[0].company),
	            width: setting.imageWidth,
	            layout: 'prism',
	            ease: 'linear',
	            duration: 400
	        };
	    },
	    getCompanyFromId: function getCompanyFromId(data, id) {
	        var result = {};
	        if (data.length > 0) {
	            data.map(function (item, index) {
	                if (item.id === id) {
	                    result = item.company;
	                }
	            });
	        }
	        result = result.slice(0, setting.imageNumber);
	        return result;
	    },
	    getImagesFromData: function getImagesFromData(data) {
	        var result = [];
	        if (data.length > 0) {
	            data.map(function (item, index) {
	                result.push(item.image);
	            });
	        }
	        result = result.slice(0, setting.imageNumber);
	        return result;
	    },
	    getHrefFromData: function getHrefFromData(data) {
	        var result = [];
	        if (data.length > 0) {
	            data.map(function (item, index) {
	                result.push(item.href);
	            });
	        }
	        result = result.slice(0, setting.imageNumber);
	        return result;
	    },
	    getTitleFromData: function getTitleFromData(data) {
	        var result = [];
	        if (data.length > 0) {
	            data.map(function (item, index) {
	                result.push(item.title);
	            });
	        }
	        return result;
	    },
	    componentWillMount: function componentWillMount() {},
	    handleChange: function handleChange(event) {
	        //   alert(JSON.stringify(companyArray))
	        var companyArray = this.getCompanyFromId(data, event.target.value);
	        // alert(JSON.stringify(companyArray))
	        this.setState({
	            images: this.getImagesFromData(companyArray),
	            href: this.getHrefFromData(companyArray),
	            text: this.getTitleFromData(companyArray)
	        });
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            { style: { width: '100%' } },
	            React.createElement(
	                'div',
	                { style: { display: 'flex', flexDirection: 'row' } },
	                React.createElement('img', { style: { paddingTop: 25, paddingLeft: 30, width: '200px', height: '30', display: 'flex', alignContent: 'center', justifyContent: 'center' }, src: './image/logo/logo_hayabusa.png', alt: '1' }),
	                React.createElement(
	                    'h1',
	                    { style: { width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'center' } },
	                    'Hệ thống doanh nghiệp Nhật và Việt Nam'
	                )
	            ),
	            React.createElement(
	                'div',
	                { style: { marginTop: 20, width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'center' } },
	                React.createElement(
	                    'span',
	                    { style: { marginTop: 5 } },
	                    ' Chọn ngành nghề : '
	                ),
	                React.createElement(
	                    'select',
	                    { style: { marginLeft: 20, height: 30, width: 500 }, onChange: this.handleChange },
	                    React.createElement(
	                        'option',
	                        { value: '0' },
	                        'Chế xuất'
	                    ),
	                    React.createElement(
	                        'option',
	                        { value: '1' },
	                        'Nông Nghiệp'
	                    ),
	                    React.createElement(
	                        'option',
	                        { value: '2' },
	                        'Công Nghiệp'
	                    ),
	                    React.createElement(
	                        'option',
	                        { value: '3' },
	                        'Nuôi bò'
	                    )
	                )
	            ),
	            React.createElement(
	                'div',
	                { style: { marginTop: 50, width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'center' } },
	                React.createElement(Carousel, {
	                    width: this.state.width,
	                    images: this.state.images,
	                    href: this.state.href,
	                    text: this.state.text,
	                    ease: this.state.ease,
	                    duration: this.state.duration,
	                    layout: this.state.layout })
	            )
	        );
	    }
	});

	module.exports = MainView;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(3);

	var Util = __webpack_require__(4);
	var Layout = __webpack_require__(5);
	var Depot = __webpack_require__(6);

	var Carousel = React.createClass({
	    displayName: 'Carousel',

	    getInitialState: function getInitialState() {
	        return {
	            images: this.props.images,
	            text:this.props.text,
	            href:this.props.href,
	            width: this.props.width ? this.props.width : '400',
	            figures: Layout[this.props.layout].figures(this.props.width, this.props.images, 0),
	            rotationY: 0
	        };
	    },
	    componentWillMount: function componentWillMount() {
	        this.depot = Depot(this.getInitialState(), this.props, this.setState.bind(this));
	        this.onRotate = this.depot.onRotate.bind(this);
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.depot.onNextProps(nextProps);
	    },
	    render: function render() {
	        var angle = 2 * Math.PI / this.state.figures.length;
	        var translateZ = -Layout[this.props.layout].distance(this.props.width, this.state.figures.length);
	        var sef = this
	        var figures = this.state.figures.map(function (d, i) {
	            return React.createElement(
	                'figure',
	                { key: i, style: Util.figureStyle(d) },
	                  React.createElement('a',  { href:sef.props.href[i], target:"_blank" ,style: { height: 'auto', width: sef.state.width+'px',textDecoration: 'none' }},[
	                     React.createElement('img', { src: d.image, alt: i, height: 'auto', width: sef.state.width+'px' }),
	                //     React.createElement("a", { href:sef.props.href[i],style: {zIndex:1, height:'100',display:'block', fontSize:'25', marginTop:'-130', color: "white", backgroundColor: "rgba(0.5, 0.5, 0.5, 0.9)",textDecoration: 'none'}}, sef.props.text[i])
	                 ])
	            );
	        });
	        return React.createElement(
	            'section',
	            { className: 'react-3d-carousel' },
	            React.createElement(
	                'div',
	                { className: 'carousel',
	                    style: { transform: 'translateZ(' + translateZ + 'px)' } },
	                figures
	            ),
	            React.createElement('div', { className: 'prev', onClick: Util.partial(this.onRotate, +angle) }),
	            React.createElement('div', { className: 'next', onClick: Util.partial(this.onRotate, -angle) })
	        );
	    }
	});
	module.exports = Carousel;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = React;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	var _exports = module.exports = {};

	_exports.figureStyle = function figureStyle(d) {
	    var translateX = Object.hasOwnProperty.call(d, 'translateX') ? d.translateX : 0;
	    return {
	        transform: 'rotateY(' + d.rotateY + 'rad) ' + ' translateX(' + translateX + 'px)' + ' translateZ(' + d.translateZ + 'px)',
	        opacity: d.opacity
	    };
	};

	_exports.partial = function partial(func) {
	    var args = Array.prototype.slice.call(arguments, 1);
	    return function () {
	        return func.apply(this, args.concat(Array.prototype.slice.call(arguments, 0)));
	    };
	};

	_exports.range = function range(from, to) {
	    var res = [];
	    for (var i = from; i < to; ++i) {
	        res.push(i);
	    }
	    return res;
	};

	_exports.uniq = function uniq(a) {
	    var prims = { 'boolean': {}, 'number': {}, 'string': {} },
	        objs = [];
	    return a.filter(function (item) {
	        var type = typeof item;
	        if (type in prims) return prims[type].hasOwnProperty(item) ? false : prims[type][item] = true;else return objs.indexOf(item) >= 0 ? false : objs.push(item);
	    });
	};

	/**
	 * Merge defaults with user options
	 * @private
	 * @param {Object} defaults Default settings
	 * @param {Object} options User options
	 * @returns {Object} Merged values of defaults and options
	 */
	_exports.merge = function merge(defaults, options) {
	    var extended = {};
	    var prop;
	    for (prop in defaults) {
	        if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
	            extended[prop] = defaults[prop];
	        }
	    }
	    for (prop in options) {
	        if (Object.prototype.hasOwnProperty.call(options, prop)) {
	            extended[prop] = options[prop];
	        }
	    }
	    return extended;
	};

	_exports.pluck = function pluck(key, entries) {
	    return entries.map(function (entry) {
	        return entry[key];
	    });
	};

	_exports.mapObj = function mapObj(fn, obj) {
	    var res = {};
	    for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            res[key] = fn(obj[key]);
	        }
	    }
	    return res;
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Util = __webpack_require__(4);

	var _exports = module.exports = {};

	_exports.prism = {
	    distance: function apothem(width, sides) {
	        return Math.ceil(width / (2 * Math.tan(Math.PI / sides)));
	    },
	    figures: function figures(width, images, initial) {
	        var sides = images.length;
	        var angle = 2 * Math.PI / sides;
	        var acceptable = Math.round(initial / angle) * angle;
	        return Util.range(0, sides).map(function (d) {
	            return {
	                rotateY: d * angle + acceptable,
	                translateX: 0,
	                translateZ: _exports.prism.distance(width, sides),
	                opacity: 1,
	                present: true,
	                key: d,
	                image: images[d]
	            };
	        });
	    }
	};
	_exports.classic = {
	    distance: function distance(width, sides) {
	        return Math.round(width * Math.log(sides));
	    },
	    figures: function figures(width, images, initial) {
	        var sides = images.length;
	        var angle = 2 * Math.PI / sides;
	        var distance = _exports.classic.distance(width, sides);
	        var acceptable = Math.round(initial / angle) * angle;
	        return Util.range(0, sides).map(function (d) {
	            var angleR = d * angle + acceptable;
	            return {
	                rotateY: 0,
	                translateX: distance * Math.sin(angleR),
	                translateZ: distance * Math.cos(angleR),
	                opacity: 1,
	                present: true,
	                key: d,
	                image: images[d]
	            };
	        });
	    }
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Ease = __webpack_require__(7);
	var Layout = __webpack_require__(5);
	var Util = __webpack_require__(4);

	module.exports = function depot(initialState, initialProps, callback) {
	    var res = {};
	    var state = initialState;
	    var props = initialProps;
	    var requestID;

	    res.onNextProps = function onNextProps(nextProps) {
	        if (props.layout != nextProps.layout || props.images != nextProps.images) {
	            props = nextProps;
	            var to = Layout[props.layout].figures(props.width, props.images, state.rotationY);
	            var bounds = transitionFigures(state.figures, to, Ease[props.ease], props.duration);
	            var stepper = transit(bounds, to, props.duration);
	            playAnimation(state, to, stepper, callback);
	        }
	        props = nextProps;
	    };
	    res.onRotate = function (angle) {
	        var to = Layout[props.layout].figures(props.width, props.images, state.rotationY + angle);
	        state.rotationY += angle;
	        var bounds = transitionFigures(state.figures, to, Ease[props.ease], props.duration);
	        var stepper = transit(bounds, to, props.duration);
	        if (requestID) {
	            cancelAnimationFrame(requestID);
	        }
	        playAnimation(state, to, stepper, callback);
	    };
	    function playAnimation(state, to, stepper, callback) {
	        if (requestID) window.cancelAnimationFrame(requestID);
	        function animate(timestamp) {
	            requestID = requestAnimationFrame(animate);
	            state.figures = stepper(timestamp);
	            callback(state);
	            if (state.figures == to) {
	                cancelAnimationFrame(requestID);
	            }
	        }
	        requestAnimationFrame(animate);
	    }
	    return res;
	};

	function transitionFigures(from, to, ease) {
	    var keys = Util.uniq(Util.pluck('key', from.concat(to)));
	    var fromTo = [];
	    keys.forEach(function (key) {
	        fromTo.push(transfigure(startFrame(from[key], to[key]), endFrame(from[key], to[key]), ease));
	    });
	    return fromTo;
	}

	function transit(entries, to, duration) {
	    var start, end;
	    var withChange = addChange(entries);
	    var time = 0;
	    return function step(timestamp) {
	        if (!start) {
	            start = timestamp;
	            end = timestamp + duration;
	        }
	        if (timestamp >= end) {
	            return to;
	        }
	        time = timestamp - start;
	        return tally(time, withChange, duration);
	    };
	}

	function transfigure(from, to, ease) {
	    var keys = Util.uniq(Object.keys(from || {}).concat(Object.keys(to || {})));
	    var res = {};
	    keys.forEach(function (key) {
	        res[key] = {
	            from: from[key],
	            to: to[key]
	        };
	        res[key].ease = isNaN(res[key].from) ? secondArg : ease;
	    });
	    return res;
	}

	function addChange(entries) {
	    var len = entries.length;
	    var res = new Array(len);
	    for (var i = 0; i < len; ++i) {
	        res[i] = addObjChange(entries[i]);
	    }
	    return res;
	}

	function addObjChange(entry) {
	    var res = Object.create(null);
	    for (var key in entry) {
	        res[key] = Util.merge(entry[key], { change: entry[key].to - entry[key].from });
	    }
	    return res;
	}

	function tally(time, entries, duration) {
	    var len = entries.length;
	    var res = new Array(len);
	    var entry;
	    for (var i = 0; i < len; ++i) {
	        entry = entries[i];
	        var obj = Object.create(null);
	        for (var key in entry) {
	            obj[key] = entry[key].ease ? entry[key].ease(time, entry[key].from, entry[key].change, duration) : entry[key].from;
	        }
	        res[i] = obj;
	    }
	    return res;
	}

	var secondArg = function secondArg(x, y) {
	    return y;
	};

	var present = function present(entries) {
	    return entries.filter(function (entry) {
	        return entry.present;
	    });
	};

	function startFrame(now, then) {
	    return now || Util.merge(then, { present: true, opacity: 0 });
	}

	function endFrame(now, then) {
	    return now && !then ? Util.merge(now, { present: false, opacity: 0 }) // leaves
	    : Util.merge(then, { present: true, opacity: 1 });
	}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	(function () {

	    'use strict';


	    function bounceOut(time, begin, change, duration) {
	        if ((time /= duration) < 1 / 2.75) {
	            return change * (7.5625 * time * time) + begin;
	        } else if (time < 2 / 2.75) {
	            return change * (7.5625 * (time -= 1.5 / 2.75) * time + 0.75) + begin;
	        } else if (time < 2.5 / 2.75) {
	            return change * (7.5625 * (time -= 2.25 / 2.75) * time + 0.9375) + begin;
	        } else {
	            return change * (7.5625 * (time -= 2.625 / 2.75) * time + 0.984375) + begin;
	        }
	    }


	    function bounceIn(time, begin, change, duration) {
	        return change - bounceOut(duration - time, 0, change, duration) + begin;
	    }


	    function bounceInOut(time, begin, change, duration) {
	        if (time < duration / 2) {
	            return bounceIn(time * 2, 0, change, duration) * 0.5 + begin;
	        } else {
	            return bounceOut(time * 2 - duration, 0, change, duration) * 0.5 + change * 0.5 + begin;
	        }
	    };

	    function circIn(time, begin, change, duration) {
	        return -change * (Math.sqrt(1 - (time = time / duration) * time) - 1) + begin;
	    };

	    function circOut(time, begin, change, duration) {
	        return change * Math.sqrt(1 - (time = time / duration - 1) * time) + begin;
	    };

	    function circInOut(time, begin, change, duration) {
	        if ((time = time / (duration / 2)) < 1) {
	            return -change / 2 * (Math.sqrt(1 - time * time) - 1) + begin;
	        } else {
	            return change / 2 * (Math.sqrt(1 - (time -= 2) * time) + 1) + begin;
	        }
	    };

	    function cubicIn(time, begin, change, duration) {
	        return change * (time /= duration) * time * time + begin;
	    };

	    function cubicOut(time, begin, change, duration) {
	        return change * ((time = time / duration - 1) * time * time + 1) + begin;
	    };

	    function cubicInOut(time, begin, change, duration) {
	        if ((time = time / (duration / 2)) < 1) {
	            return change / 2 * time * time * time + begin;
	        } else {
	            return change / 2 * ((time -= 2) * time * time + 2) + begin;
	        }
	    };

	    function expoIn(time, begin, change, duration) {
	        if (time === 0) {
	            return begin;
	        }
	        return change * Math.pow(2, 10 * (time / duration - 1)) + begin;
	    };

	    function expoOut(time, begin, change, duration) {
	        if (time === duration) {
	            return begin + change;
	        }
	        return change * (-Math.pow(2, -10 * time / duration) + 1) + begin;
	    };

	    function expoInOut(time, begin, change, duration) {
	        if (time === 0) {
	            return begin;
	        } else if (time === duration) {
	            return begin + change;
	        } else if ((time = time / (duration / 2)) < 1) {
	            return change / 2 * Math.pow(2, 10 * (time - 1)) + begin;
	        } else {
	            return change / 2 * (-Math.pow(2, -10 * (time - 1)) + 2) + begin;
	        }
	    };

	    function linear(time, begin, change, duration) {
	        return change * time / duration + begin;
	    };

	    function quadIn(time, begin, change, duration) {
	        return change * (time = time / duration) * time + begin;
	    };

	    function quadOut(time, begin, change, duration) {
	        return -change * (time = time / duration) * (time - 2) + begin;
	    };

	    function quadInOut(time, begin, change, duration) {
	        if ((time = time / (duration / 2)) < 1) {
	            return change / 2 * time * time + begin;
	        } else {
	            return -change / 2 * ((time -= 1) * (time - 2) - 1) + begin;
	        }
	    };

	    function quartIn(time, begin, change, duration) {
	        return change * (time = time / duration) * time * time * time + begin;
	    };

	    function quartOut(time, begin, change, duration) {
	        return -change * ((time = time / duration - 1) * time * time * time - 1) + begin;
	    };

	    function quartInOut(time, begin, change, duration) {
	        if ((time = time / (duration / 2)) < 1) {
	            return change / 2 * time * time * time * time + begin;
	        } else {
	            return -change / 2 * ((time -= 2) * time * time * time - 2) + begin;
	        }
	    };

	    function quintIn(time, begin, change, duration) {
	        return change * (time = time / duration) * time * time * time * time + begin;
	    };

	    function quintOut(time, begin, change, duration) {
	        return change * ((time = time / duration - 1) * time * time * time * time + 1) + begin;
	    };

	    function quintInOut(time, begin, change, duration) {
	        if ((time = time / (duration / 2)) < 1) {
	            return change / 2 * time * time * time * time * time + begin;
	        } else {
	            return change / 2 * ((time -= 2) * time * time * time * time + 2) + begin;
	        }
	    };

	    function sineIn(time, begin, change, duration) {
	        return -change * Math.cos(time / duration * (Math.PI / 2)) + change + begin;
	    };

	    function sineOut(time, begin, change, duration) {
	        return change * Math.sin(time / duration * (Math.PI / 2)) + begin;
	    };

	    function sineInOut(time, begin, change, duration) {
	        return -change / 2 * (Math.cos(Math.PI * time / duration) - 1) + begin;
	    };

	    var Ease = {
	        bounceOut: bounceOut,
	        bounceIn: bounceIn,
	        bounceInOut: bounceInOut,
	        circIn: circIn,
	        circOut: circOut,
	        circInOut: circInOut,
	        cubicIn: cubicIn,
	        cubicOut: cubicOut,
	        cubicInOut: cubicInOut,
	        expoIn: expoIn,
	        expoOut: expoOut,
	        expoInOut: expoInOut,
	        linear: linear,
	        quadIn: quadIn,
	        quadOut: quadOut,
	        quadInOut: quadInOut,
	        quartIn: quartIn,
	        quartOut: quartOut,
	        quartInOut: quartInOut,
	        quintIn: quintIn,
	        quintOut: quintOut,
	        quintInOut: quintInOut,
	        sineIn: sineIn,
	        sineOut: sineOut,
	        sineInOut: sineInOut
	    }
	    if (true) {
	        module.exports = Ease;
	    } else if (typeof define === 'function' && define.amd) {
	        define(function () {
	            return Ease;
	        });
	    } else {
	        this.Ease = Ease;
	    }

	}.call(this));

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	// Sample images used in the demo
	module.exports = [
	    {
	      id:'0',
	      branch: 'Chế xuất',
	      company:
	      [
	        {
	        image:'./image/CongNghe/apple.jpg',
	        title:'Apple',
	        href:'https://www.apple.com/',
	        },
	        {
	        image:'./image/CongNghe/docomo.jpg',
	        title:'Docomo',
	        href:'https://www.docomo.jp',
	        },
	        {
	        image:'./image/CongNghe/HTC.jpg',
	        title:'HTC',
	        href:'https://www.HTC.com',
	        },
	        {
	        image:'./image/CongNghe/kyocera.jpg',
	        title:'Kyocera',
	        href:'https://www.kyocera.jp',
	        },
	        {
	        image:'./image/CongNghe/lenovo.jpg',
	        title:'Lenovo',
	        href:'https://www.lenovo.com',
	        },
	        {
	        image:'./image/CongNghe/LG.jpg',
	        title:'LG',
	        href:'https://www.LG.com',
	        },
	        {
	        image:'./image/CongNghe/samsung.jpg',
	        title:'Samsung',
	        href:'https://www.samsung.com',
	        },
	        {
	        image:'./image/CongNghe/sharp.jpg',
	        title:'Sharp',
	        href:'https://www.sharp.com',
	        },
	        {
	        image:'./image/CongNghe/SONY.jpg',
	        title:'SONY',
	        href:'https://www.SONY.com',
	        },
	        {
	        image:'./image/CongNghe/toshiba.jpg',
	        title:'Apple',
	        href:'https://www.toshiba.com',
	        },
	              {
	        image:'./image/CongNghe/apple.jpg',
	        title:'Apple',
	        href:'https://www.apple.com/',
	        },
	        {
	        image:'./image/CongNghe/docomo.jpg',
	        title:'Docomo',
	        href:'https://www.docomo.jp',
	        },
	        {
	        image:'./image/CongNghe/HTC.jpg',
	        title:'HTC',
	        href:'https://www.HTC.com',
	        },
	        {
	        image:'./image/CongNghe/kyocera.jpg',
	        title:'Kyocera',
	        href:'https://www.kyocera.jp',
	        },
	        {
	        image:'./image/CongNghe/lenovo.jpg',
	        title:'Lenovo',
	        href:'https://www.lenovo.com',
	        },
	        {
	        image:'./image/CongNghe/LG.jpg',
	        title:'LG',
	        href:'https://www.LG.com',
	        },
	        {
	        image:'./image/CongNghe/samsung.jpg',
	        title:'Samsung',
	        href:'https://www.samsung.com',
	        },
	        {
	        image:'./image/CongNghe/sharp.jpg',
	        title:'Sharp',
	        href:'https://www.sharp.com',
	        },
	        {
	        image:'./image/CongNghe/SONY.jpg',
	        title:'SONY',
	        href:'https://www.SONY.com',
	        },
	        {
	        image:'./image/CongNghe/toshiba.jpg',
	        title:'Apple',
	        href:'https://www.toshiba.com',
	        },
	      ],
	    },
	    {
	      id:'1',
	      branch: 'Nông Nghiệp',
	      company:
	      [
	        {
	        image:'./image/2.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/2.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/2.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/2.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/2.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/1.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/1.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	          {
	        image:'./image/2.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/2.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/2.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/2.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/2.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/1.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/1.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	      ],
	    },
	   {
	      id:'2',
	      branch: 'Công Nghiệp',
	      company:
	      [
	        {
	        image:'./image/3.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/3.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/1.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/1.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/1.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/1.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/1.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	      ],
	    },
	   {
	      id:'3',
	      branch: 'Nuôi bò',
	      company:
	      [
	        {
	        image:'./image/4.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/4.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/1.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/1.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/1.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/1.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	        {
	        image:'./image/1.jpg',
	        title:'Apple',
	        href:'google.com',
	        },
	      ],
	    },
	];

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = {
	  imageNumber: 15,
	  imageWidth: '400', // cann't change this props (no support)
	};

/***/ })
/******/ ]);