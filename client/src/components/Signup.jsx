import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `https://one-to-one-chat-app-blond.vercel.app/api/v1/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/login");
      }
      setUser({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="min-w-96 mx-auto ">
      <div className="w-full p-6 rounded-lg shadow-md  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center">Signup</h1>
        <form onSubmit={submitHandler} action="">
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              type="text"
              placeholder="Full Name"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              placeholder="Username"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password </span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div className="flex pt-4">
            <div className="flex items-center">
              <p>Male</p>
              <input
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-sm mx-2"
              />
            </div>
            <div className="flex items-center">
              <p>Female</p>
              <input
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-sm mx-2"
              />
            </div>
          </div>
          <p className="w-ful text-center">
            Already have an account?
            <Link className="btn btn-link" to={"/login"}>
              Login
            </Link>
          </p>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm border border-slate-700"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
