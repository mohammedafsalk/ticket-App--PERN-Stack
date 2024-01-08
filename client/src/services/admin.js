import axiosInstance from "./axios";

export const adminLogin = async (values) => {
  try {
    return await axiosInstance("").post("admin/login", {values });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getDetails = async () => {
  try {
    return await axiosInstance("").get("admin/details");
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateStatus = async (value) => {
  try {
    return await axiosInstance("").patch("admin/ticket", { value });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const adminAuthCheck = () => {
  return axiosInstance("").get("admin/check");
};
export const adminLogout = () => {
  return axiosInstance("").get("admin/logout");
};
