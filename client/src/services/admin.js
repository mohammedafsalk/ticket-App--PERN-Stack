import axiosInstance from "./axios";

export const adminLogin = (values) => {
    return axiosInstance("").post("admin/login", { ...values });
  };

export const adminAuthCheck = () => {
    return axiosInstance("").get("admin/check");
  };
export const adminLogout = () => {
    return axiosInstance("").get("admin/logout");
  };
  