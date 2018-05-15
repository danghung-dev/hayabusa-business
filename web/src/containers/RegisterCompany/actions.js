import { api_addCompany } from "../../api/api";

export function addCompany(data) {
  return async dispatch => {
    const result = await api_addCompany(data);
    dispatch({
      type: "ADD_COMPANY_SUCCESS",
      data: result.data,
      success: result.success
    });
  };
}
