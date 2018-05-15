// import { fromJS } from 'immutable';
const initState = {
  success: false,
  list: {}
};
const AddCompany = (state = initState, action) => {
  switch (action.type) {
    case "ADD_COMPANY_SUCCESS":
      return { ...state, data: action.data, success: action.success };
    default:
      return state;
  }
};

export default AddCompany;
