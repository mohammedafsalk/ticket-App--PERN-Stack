import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginImage from "../../assets/login.jpg";
import { message } from "antd";
import { useAuth } from "../../context/context";
import { userLogin } from "../../services/user";
import Loader from "../loader/Loader";

export default function Userlogin() {
  const { setRefresh } = useAuth();

  const [formdata, setFormdata] = useState({
    password: "",
    email: "",
  });

  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { email, password } = formdata;
    const values = { email, password };
    let { data } = await userLogin(values);
    if (data.success) {
      setRefresh();
    } else {
      message.error(data.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex  max-w-6xl  p-4  bg-white rounded-lg shadow-lg">
          <div className="hidden md:block md:w-1/2">
            <img
              src={loginImage}
              alt="Login Image"
              className="w-full h-full object-cover object-center rounded-l-lg"
            />
          </div>
          <div className="w-full flex flex-col items-center justify-center text-center md:w-1/2 p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formdata.email}
                onChange={handleInputchange}
                className="mt-1 p-2 w-full md:w-3/4  border rounded-md"
              />
            </div>

            <div className="mb-1">
              <label className="block text-sm font-medium text-gray-600">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formdata.password}
                onChange={handleInputchange}
                className="mt-1 p-2 w-full md:w-3/4 border rounded-md"
              />
            </div>
            <div className=" mb-3 text-sm">
              <p>
                Dont have an account? <Link to={"/signup"}>Sign up</Link>
              </p>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
