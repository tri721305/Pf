export function checkUndefinedNull(params) {
    if(params == undefined || params == null)
        return true;
    return false; 
}

export const convertToObject = (queryString) => {
    const params = queryString.split('&');
    const queryObject = {};
    params.forEach((param) => {
      const [key, value] = param.split('=');
      queryObject[key] = value;
    });
    return queryObject;
  };