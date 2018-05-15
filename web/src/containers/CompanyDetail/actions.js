import { api_getCompanyFromID } from "../../api/api";

export function getCompany(companyID) {
  return async dispatch => {
    const result = await api_getCompanyFromID(companyID);
    dispatch({
      type: "GET_COMPANY_FROM_CATEGORY_SUCCESS",
      data: result.data,
      success: result.success
    });
  };
}
