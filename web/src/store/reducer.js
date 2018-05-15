import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import home from "../containers/HomePage/reducer";
import company from "../containers/Company/reducer";
import registerCompany from "../containers/RegisterCompany/reducer";
import companyDetail from "../containers/CompanyDetail/reducer";
export default combineReducers({
  router: routerReducer,
  home,
  company,
  registerCompany,
  companyDetail
});
