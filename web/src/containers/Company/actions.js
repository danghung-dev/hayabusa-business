import { api_getListCompany, api_getCompanyCategory } from "../../api/api";

export function getListCompany() {
  return async dispatch => {
    const result = await api_getListCompany();
    dispatch({
      type: "GET_LIST_COMPANY_SUCCESS",
      data: result.data,
      success: result.success
    });
  };
}

export function getCompanyFromCategory(categoryId) {
  return async dispatch => {
    const result = await api_getCompanyCategory(categoryId);
    dispatch({
      type: "GET_LIST_COMPANY_CATEGORY_SUCCESS",
      data: result.data,
      categoryInfo: result.categoryInfo,
      success: result.success
    });
  };
}
