import axios from "axios";

const setAuthToken = () => {
  let token = localStorage.getItem("token");
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
