import axiosInstance from "./axios";

export const userLogin = async (values) => {
  try {
    return await axiosInstance("").post("user/login", { ...values });
  } catch (error) {
    return error;
  }
};

export const createTicket = async (values) => {
  try {
    return await axiosInstance("").post("user/create", { ...values });
  } catch (error) {
    return error;
  }
};

export const getTickets = async (values) => {
  try {
    return await axiosInstance("").get("user/tickets");
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const userSignup = async (values) => {
  try {
    return await axiosInstance("").post("user/register", { ...values });
  } catch (error) {
    return error;
  }
};

export const userAuthCheck = () => {
  return axiosInstance("").get("user/check");
};

export const userLogout = () => {
  return axiosInstance("").get("user/logout");
};

export const getAssignees = () => {
  return axiosInstance("").get("user/assignees");
};


