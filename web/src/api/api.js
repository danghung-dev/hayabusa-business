import request from "request";
const BASE_URL = "http://dev.hayasw.com:4001/api";

export async function api_getListCategory() {
  const options = {
    url: `${BASE_URL}/categories`,
    method: "GET"
  };
  try {
    const result = await doRequest(options);
    return result;
  } catch (error) {
    return { success: false, data: null };
  }
}

export async function api_getListCompany() {
  const options = {
    url: `${BASE_URL}/companies`,
    method: "GET"
  };
  try {
    const result = await doRequest(options);
    return result;
  } catch (error) {
    return { success: false, data: null };
  }
}

export async function api_getCompanyCategory(categoryId) {
  const options = {
    url: `${BASE_URL}/companies/category/${categoryId}`,
    method: "GET"
  };
  try {
    const result = await doRequest(options);
    return result;
  } catch (error) {
    return { success: false, data: null };
  }
}
export async function api_getCompanyFromID(companyID) {
  const options = {
    url: `${BASE_URL}/companies/${companyID}`,
    method: "GET"
  };
  try {
    const result = await doRequest(options);
    return result;
  } catch (error) {
    return { success: false, data: null };
  }
}
export async function api_addCompany(data) {
  const dataForm = new FormData();

  Object.keys(data).forEach(key => {
    dataForm.append(key, data[key]);
  });
  const url = `${BASE_URL}/companies`;
  const options = {
    method: "POST",
    headers: {},
    body: dataForm
  };
  try {
    const result = await doRequestFormData(url, options);
    return result;
  } catch (error) {
    console.log(error);
    return { success: false, data: null };
  }
}

function doRequest(options) {
  return new Promise((resolve, reject) => {
    try {
      // console.log("options", options);
      request(options, (err, response, payload) => {
        if (err) return reject(err);
        try {
          const json = JSON.parse(payload);
          resolve(json);
        } catch (error) {
          console.log("error: ", error);
          reject(error);
        }
      });
    } catch (error) {
      console.log("error: ", error);
      reject(error);
    }
  });
}
function doRequestFormData(url, options) {
  return new Promise((resolve, reject) => {
    try {
      // console.log("options", options);
      fetch(url, options)
        .then(data => {
          resolve(data.json());
        })
        .catch(function(error) {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
}
// module.exports = {
//   getListCategory
// };
