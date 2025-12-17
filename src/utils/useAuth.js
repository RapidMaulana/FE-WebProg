
export const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem("token", token);
      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete instance.defaults.headers.common["Authorization"];
    }
  };
  
  export const getAuthToken = () => {
    return localStorage.getItem("token");
  };
  
  export const isAuthenticated = () => {
    return !!getAuthToken();
  };
  
  // Set token dari localStorage saat app start
  const token = getAuthToken();
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }