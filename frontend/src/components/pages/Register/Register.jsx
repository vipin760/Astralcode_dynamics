import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../../redux/users/user.action";
const USER_API = "http://localhost:3000/api/v2";

const Register = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => {
   return state.userDetails
  });

  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [Errors, setErrors] = useState({});

  const [Show, setShow] = useState(true);

  const handleChange = (e) => {
    setErrors({});
    const { name, value } = e.target;
    setFormData({
      ...FormData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
 
    const validationErrors = {};
    if (!FormData.name.trim()) {
      validationErrors.name = "please enter your name";
    } else if (FormData.name.length < 3) {
      validationErrors.name = "please enter atleast 3 character";
    }

    if (!FormData.email.trim()) {
      validationErrors.email = "please enter your email";
    } else if (!emailRegex.test(FormData.email)) {
      validationErrors.email = "please enter valid email";
    }

    if (!FormData.password.trim()) {
      validationErrors.password = "please enter password";
    } else if (FormData.password.length < 8) {
      validationErrors.password = "please enter password atleast 8 character";
    } else if (!passwordRegex.test(FormData.password)) {
      validationErrors.password = "please make your password strong";
    }

    if (!FormData.cpassword.trim()) {
      validationErrors.cpassword = "please enter confirm password";
    } else if (FormData.password !== FormData.cpassword) {
      validationErrors.cpassword = "password and confirm password not match";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(userRegister(FormData));
     if(userDetails.userData.status){
        setTimeout(() => {
            window.location.href="/login"
        }, 2000);
     }
    }
  };

  const passwordShow = () => {
    setShow(!Show);
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center transition ease-in-out delay-150">
      <div className="bg-gray-100 flex shadow-lg max-w-3xl p-5">
        <div className="w-1/2 p-5 sm:block hidden">
          <img
            className="rounded-2xl"
            src="https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=400"
          />
        </div>

        <div className="sm:w-1/2 px-16 mt-10">
          <h2 className="font-bold text-2xl">Register</h2>
          <p className="text-sm mt-4">new member</p>
          <form
            action=""
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="name"
                className="p-2 mt-8 rounded-xl border w-full"
                onChange={handleChange}
              />
              {Errors.name && (
                <p className="text-sm text-red-700">&nbsp; * {Errors.name}</p>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                name="email"
                placeholder="email"
                className="p-2 rounded-xl border w-full"
                onChange={handleChange}
              />
              {Errors.email && (
                <p className="text-sm text-red-700">&nbsp; * {Errors.email}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  type={Show ? "password" : "text"}
                  name="password"
                  placeholder="password"
                  className="p-2 rounded-xl border w-full"
                  onChange={handleChange}
                />
                <i
                  className="fa-solid fa-eye absolute top-1/2 right-2 -translate-y-1/2"
                  onClick={passwordShow}
                ></i>
              </div>
              {Errors.password && (
                <p className="text-sm text-red-700">
                  &nbsp; * {Errors.password}
                </p>
              )}
            </div>
            <div>
              <div className="relative">
                <input
                  type={false ? "password" : "text"}
                  name="cpassword"
                  placeholder="confirm password"
                  className="p-2 rounded-xl border w-full"
                  onChange={handleChange}
                />
              </div>
              {Errors.cpassword && (
                <p className="text-sm text-red-700">
                  &nbsp; * {Errors.cpassword}
                </p>
              )}
            </div>
            <button className="bg-blue-800 p-2 rounded-xl text-white transition delay-180 hover:scale-1 duration-300">
              Register
            </button>
          </form>
          <div className="mt-3 text-xs flex justify-between items-center">
            <p>already have an account</p>
            <a href="/login" className="bg-white py-2 px-5 rounded-xl border-b">
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
