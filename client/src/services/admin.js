import axiosInstance from "./axios";

// Function to handle admin login
export const adminLogin = async (values) => {
  try {
    // Making a POST request to admin login endpoint with provided values
    return await axiosInstance("").post("admin/login", { ...values });
  } catch (error) {
    // Logging the error and returning it in case of an exception
    console.log(error);
    return error;
  }
};

// Function to get admin details
export const getDetails = async () => {
  try {
    // Making a GET request to get admin details endpoint
    return await axiosInstance("").get("admin/details");
  } catch (error) {
    // Logging the error and returning it in case of an exception
    console.log(error);
    return error;
  }
};

// Function to update the status of a ticket
export const updateStatus = async (value) => {
  try {
    // Making a PATCH request to update ticket status endpoint with provided value
    return await axiosInstance("").patch("admin/ticket", { value });
  } catch (error) {
    // Logging the error and returning it in case of an exception
    console.log(error);
    return error;
  }
};

// Function to check admin authentication status
export const adminAuthCheck = () => {
  // Making a GET request to check admin authentication status endpoint
  return axiosInstance("").get("admin/check");
};

// Function to handle admin logout
export const adminLogout = () => {
  // Making a GET request to admin logout endpoint
  return axiosInstance("").get("admin/logout");
};
