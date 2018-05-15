// import { fromJS } from 'immutable';
const initState = {
  list: []
};
const ListReducer = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case "GET_LIST_SUCCESS":
      return { ...state, list: action.data };
    default:
      return state;
  }
};

export default ListReducer;
