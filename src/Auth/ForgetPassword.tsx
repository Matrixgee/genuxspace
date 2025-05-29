import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/theme";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const userToken = useSelector((state: any) => state.user.token);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const url = "https://hexg.onrender.com/api/user/forgotPass";
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };

  const forgetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastloading = toast.loading("Please wait....");

    try {
      const response = await axios.post(url, { email }, { headers });
      toast.dismiss(toastloading);
      toast.success(
        response.data.message || "Password reset link sent successfully"
      );
      setEmail("");
    } catch (error: any) {
      toast.dismiss(toastloading);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div
      className={`w-full h-screen flex justify-center items-center transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-800 via-gray-900 to-purple-800"
          : "bg-gradient-to-br from-purple-50 via-purple-75 to-purple-100"
      }`}
    >
      <div
        className={`w-[30%] max-md:w-[90%] h-[60%] max-md:h-[55%] rounded-md flex flex-col justify-around items-center shadow-lg transition-all duration-300 ${
          isDark
            ? "bg-gradient-to-r from-gray-700 to-gray-800 border border-purple-700"
            : "bg-gradient-to-r from-white to-purple-25 border border-purple-150"
        }`}
      >
        {/* Heading */}
        <div className="w-full h-[20%] flex justify-center items-center">
          <h2
            className={`text-center text-3xl font-extrabold transition-colors duration-300 ${
              isDark ? "text-purple-200" : "text-gray-800"
            }`}
          >
            Password Reset
          </h2>
        </div>

        {/* Form */}
        <div className="w-full h-[50%] flex justify-center items-center">
          <form
            className="w-full h-full flex flex-col justify-center items-center"
            onSubmit={forgetPassword}
          >
            <div className="w-[90%] h-[60%] gap-2 px-1 flex flex-col justify-start items-start">
              <label
                className={`font-semibold transition-colors ${
                  isDark ? "text-purple-200" : "text-gray-500"
                }`}
              >
                Your Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`py-3 px-4 w-full rounded-md outline-none border transition-all duration-300 focus:ring-2 focus:ring-purple-500 ${
                  isDark
                    ? "bg-gray-700 text-purple-100 border-purple-600 placeholder-purple-300"
                    : "bg-white text-gray-800 border-purple-200 placeholder-gray-500"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="w-full h-[40%] flex justify-center items-center mt-4">
              <button
                type="submit"
                className="py-3 px-6 font-semibold text-white rounded-md bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
              >
                Email Password Reset Link
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="w-full h-[25%] flex flex-col items-center justify-around px-6 text-center">
          <p
            className={`transition-colors ${
              isDark ? "text-purple-200" : "text-gray-600"
            }`}
          >
            Repeat Login?{" "}
            <span
              className="text-purple-500 hover:underline font-bold cursor-pointer"
              onClick={() => navigate("/auth/login")}
            >
              Login
            </span>
          </p>
          <p
            className={`text-sm ${
              isDark ? "text-purple-200" : "text-gray-500"
            }`}
          >
            © Copyright 2024 GenuxSpace. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
