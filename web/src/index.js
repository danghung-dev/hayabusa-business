import React from "react";
import ReactDOM from "react-dom";

// import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import store, { history } from "./store";
// import createHistory from "history/createBrowserHistory";
import { Route } from "react-router";

import {
  ConnectedRouter
  // routerReducer,
  // routerMiddleware,
  // push
} from "react-router-redux";

import Video from "./containers/Video";
import HomePage from "./containers/HomePage";
import Register from "./containers/RegisterCompany";
import CompanyDetal from "./containers/CompanyDetail";
import Company from "./containers/Company";
import Header from "./compoments/Header";
import "./index.css";
// Create a history of your choosing (we're using a browser history in this case)
// const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
// const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
// const store = createStore(
//     MyReducers,applyMiddleware(middleware)
// );

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

ReactDOM.render(
  <Provider store={store}>
    {/* ConnectedRouter will use the store from Provider automatically */}
    <ConnectedRouter history={history}>
      <div>
        <Header />
        <Route exact path="/category/:categoryid" component={Company} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/company" component={Company} />
        <Route exact path="/detail" component={CompanyDetal} />
        <Route path="/video" component={Video} />
        <Route exact path="/" component={HomePage} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
