const Ease = require("ease-functions");
const Layout = require("./layout");
const Util = require("./util");
module.exports = function depot(initialState, initialProps, callback) {
  const res = {};
  const state = initialState;
  let props = initialProps;
  let requestID;

  res.onNextProps = function onNextProps(nextProps) {
    if (props.layout != nextProps.layout || props.images != nextProps.images) {
      props = nextProps;
      const to = Layout[props.layout].figures(
        props.width,
        props.images,
        state.rotationY
      );
      const bounds = transitionFigures(
        state.figures,
        to,
        Ease[props.ease],
        props.duration
      );
      const stepper = transit(bounds, to, props.duration);
      playAnimation(state, to, stepper, callback);
    }
    props = nextProps;
  };
  res.onRotate = function(angle) {
    const to = Layout[props.layout].figures(
      props.width,
      props.images,
      state.rotationY + angle
    );
    state.rotationY += angle;
    const bounds = transitionFigures(
      state.figures,
      to,
      Ease[props.ease],
      props.duration
    );
    const stepper = transit(bounds, to, props.duration);
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
  const keys = Util.uniq(Util.pluck("key", from.concat(to)));
  const fromTo = [];
  keys.forEach(key => {
    fromTo.push(
      transfigure(
        startFrame(from[key], to[key]),
        endFrame(from[key], to[key]),
        ease
      )
    );
  });
  return fromTo;
}

function transit(entries, to, duration) {
  let start, end;
  const withChange = addChange(entries);
  let time = 0;
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
  const keys = Util.uniq(Object.keys(from || {}).concat(Object.keys(to || {})));
  const res = {};
  keys.forEach(key => {
    res[key] = {
      from: from[key],
      to: to[key]
    };
    res[key].ease = isNaN(res[key].from) ? secondArg : ease;
  });
  return res;
}

function addChange(entries) {
  const len = entries.length;
  const res = new Array(len);
  for (let i = 0; i < len; ++i) {
    res[i] = addObjChange(entries[i]);
  }
  return res;
}

function addObjChange(entry) {
  const res = Object.create(null);
  for (const key in entry) {
    res[key] = Util.merge(entry[key], {
      change: entry[key].to - entry[key].from
    });
  }
  return res;
}

function tally(time, entries, duration) {
  const len = entries.length;
  const res = new Array(len);
  let entry;
  for (let i = 0; i < len; ++i) {
    entry = entries[i];
    const obj = Object.create(null);
    for (const key in entry) {
      obj[key] = entry[key].ease
        ? entry[key].ease(time, entry[key].from, entry[key].change, duration)
        : entry[key].from;
    }
    res[i] = obj;
  }
  return res;
}

var secondArg = function secondArg(x, y) {
  return y;
};

const present = function present(entries) {
  return entries.filter(entry => entry.present);
};

function startFrame(now, then) {
  return now || Util.merge(then, { present: true, opacity: 0 });
}

function endFrame(now, then) {
  return now && !then
    ? Util.merge(now, { present: false, opacity: 0 }) // leaves
    : Util.merge(then, { present: true, opacity: 1 });
}
