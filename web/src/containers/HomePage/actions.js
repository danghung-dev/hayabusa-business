import { api_getListCategory } from "../../api/api";

export function getList() {
  return async dispatch => {
    const result = await api_getListCategory();
    dispatch({
      type: "GET_LIST_SUCCESS",
      data: result.data,
      success: result.success
    });
  };
}
