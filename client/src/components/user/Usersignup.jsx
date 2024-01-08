import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../assets/login.jpg";
import { message } from "antd";
import { userSignup } from "../../services/user";

export default function Usersignup() {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    password: "",
    email: "",
    name: "",
  });

  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { email, password, name } = formdata;
    const values = { email, password, name };
    let data = await userSignup(values);
    if (data.success) {
      navigate("/login");
    } else {
      message.error(data.message);
    }
  };

  return (
    <div className="flex  max-w-6xl  p-4  bg-white rounded-lg shadow-lg">
      <div className="hidden md:block md:w-1/2">
        <img
          src={loginImage}
          alt="Login Image"
          className="w-full h-full object-cover object-center rounded-l-lg"
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center text-center md:w-1/2 p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Signup</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Username:
          </label>
          <input
            type="text"
            name="name"
            value={formdata.name}
            onChange={handleInputchange}
            className="mt-1 p-2 w-full md:w-3/4  border rounded-md"
          />
        </div>

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
            Already have an account? <Link to={"/login"}>Login</Link>
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
  );
}
