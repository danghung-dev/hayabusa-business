// import { fromJS } from 'immutable';
const initState = {
  success: false,
  data: {}
};
const getCompanyID = (state = initState, action) => {
  switch (action.type) {
    case "GET_COMPANY_FROM_CATEGORY_SUCCESS":
      return { ...state, data: action.data, success: action.success };
    default:
      return state;
  }
};

export default getCompanyID;
