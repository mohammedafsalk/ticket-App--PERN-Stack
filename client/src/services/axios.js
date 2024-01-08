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
    (response) => response,
    (error) => Promise.reject(error.response.data)
  );

  return instance;
};

export default axiosInstance;
