import axios from "axios";

const axiosInstance = () => {
  const instance = axios.create({
    baseURL: "http://localhost:3000/api/",
    withCredentials: true,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.error("Error:", error.response);
      return Promise.reject(error.response);
    }
  );

  return instance;
};

export default axiosInstance;
