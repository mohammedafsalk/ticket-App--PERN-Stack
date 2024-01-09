import axios from "axios";

// Function to create an Axios instance with default configurations
const axiosInstance = () => {
  // Creating an Axios instance
  const instance = axios.create({
    // Base URL for API requests
    baseURL: "http://localhost:3000/api/",
    // Allowing credentials to be sent with the request
    withCredentials: true,
    // Timeout for requests in milliseconds
    timeout: 5000,
    // Setting the content type for requests
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Adding an interceptor to handle responses
  instance.interceptors.response.use(
    // Successful response
    (response) => {
      return response;
    },
    // Error response
    (error) => {
      // Logging the error response
      console.error("Error:", error.response);
      // Rejecting the promise with the error response
      return Promise.reject(error.response);
    }
  );

  // Returning the configured Axios instance
  return instance;
};

// Exporting the axiosInstance function for use in other modules
export default axiosInstance;
