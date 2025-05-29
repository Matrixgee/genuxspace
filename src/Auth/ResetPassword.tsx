import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTheme } from "../Context/theme";
import { userToken } from "../Function/Slice";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const url = `https://hexg.onrender.com/api/user/Reset/${userToken}`;
    const data = { password, confirmPassword };
    const toastloading = toast.loading("Please wait...");

    try {
      const response = await axios.put(url, data);
      toast.dismiss(toastloading);
      toast.success(response.data.message || "Password reset successfully");
      navigate("/login");
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
        className={`w-[30%] max-md:w-[90%] h-[70%] max-md:h-[90%] rounded-md shadow-lg flex flex-col justify-around items-center transition-all duration-300 ${
          isDark
            ? "bg-gradient-to-r from-gray-700 to-gray-800 border border-purple-700"
            : "bg-gradient-to-r from-white to-purple-25 border border-purple-150"
        }`}
      >
        {/* Heading */}
        <div className="w-full h-[10%] flex justify-center items-center">
          <p
            className={`font-bold text-3xl transition-colors duration-300 ${
              isDark ? "text-purple-200" : "text-gray-800"
            }`}
          >
            Reset Password
          </p>
        </div>

        {/* Form */}
        <div className="w-full h-[50%] flex justify-around items-center">
          <form
            className="w-full h-full gap-4 flex flex-col justify-around items-center"
            onSubmit={handleResetPassword}
          >
            {/* Password Field */}
            <div className="w-[90%] h-[40%] px-1 flex flex-col justify-center items-start">
              <label
                className={`font-semibold ${
                  isDark ? "text-purple-200" : "text-gray-500"
                }`}
              >
                New Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className={`py-3 px-4 w-full rounded-md outline-none border transition-all duration-300 focus:ring-2 focus:ring-purple-500 ${
                  isDark
                    ? "bg-gray-700 text-purple-100 border-purple-600 placeholder-purple-300"
                    : "bg-white text-gray-800 border-purple-200 placeholder-gray-500"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="w-[90%] h-[40%] px-1 flex flex-col justify-center items-start">
              <label
                className={`font-semibold ${
                  isDark ? "text-purple-200" : "text-gray-500"
                }`}
              >
                Confirm Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                className={`py-3 px-4 w-full rounded-md outline-none border transition-all duration-300 focus:ring-2 focus:ring-purple-500 ${
                  isDark
                    ? "bg-gray-700 text-purple-100 border-purple-600 placeholder-purple-300"
                    : "bg-white text-gray-800 border-purple-200 placeholder-gray-500"
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Button */}
            <div className="w-[90%] h-[20%] flex justify-center items-center">
              <button
                type="submit"
                className="py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition duration-300"
              >
                Reset Password
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
            Remember your password?{" "}
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

export default ResetPassword;
