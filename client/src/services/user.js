import axiosInstance from "./axios";

// Function to handle user login
export const userLogin = async (values) => {
  try {
    // Making a POST request to user login endpoint with provided values
    return await axiosInstance("").post("user/login", { ...values });
  } catch (error) {
    // Returning the error in case of an exception
    return error;
  }
};

// Function to create a ticket
export const createTicket = async (values) => {
  try {
    // Making a POST request to create ticket endpoint with provided values
    return await axiosInstance("").post("user/create", { ...values });
  } catch (error) {
    // Returning the error in case of an exception
    return error;
  }
};

// Function to get user's tickets
export const getTickets = async () => {
  try {
    // Making a GET request to get user's tickets endpoint
    return await axiosInstance("").get("user/tickets");
  } catch (error) {
    // Logging the error and returning it in case of an exception
    console.log(error);
    return error;
  }
};

// Function to handle user signup
export const userSignup = async (values) => {
  try {
    // Making a POST request to user signup endpoint with provided values
    return await axiosInstance("").post("user/register", { ...values });
  } catch (error) {
    // Returning the error in case of an exception
    return error;
  }
};

// Function to check user authentication status
export const userAuthCheck = () => {
  // Making a GET request to check user authentication status endpoint
  return axiosInstance("").get("user/check");
};

// Function to handle user logout
export const userLogout = () => {
  // Making a GET request to user logout endpoint
  return axiosInstance("").get("user/logout");
};

// Function to get available assignees
export const getAssignees = () => {
  // Making a GET request to get available assignees endpoint
  return axiosInstance("").get("user/assignees");
};
