import axios from "axios";

const apiurl = axios.create({
  baseURL: "http://localhost:9065", // your backend URL
});

// ⬇️ Attach token with every request
apiurl.interceptors.request.use((config) => {
  //get the token from local storeage 
  const token = localStorage.getItem("token");

  //put the token in Authorization headers
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiurl;