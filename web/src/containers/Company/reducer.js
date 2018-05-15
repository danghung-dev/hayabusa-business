// import { fromJS } from 'immutable';
const initState = {
  list: [],
  categoryInfo: {}
};
const ListCompany = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case "GET_LIST_COMPANY_CATEGORY_SUCCESS":
      return { ...state, list: action.data, categoryInfo: action.categoryInfo };
    default:
      return state;
  }
};

export default ListCompany;
