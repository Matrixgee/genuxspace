import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/theme";

const Review: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleBackToLogin = () => {
    navigate("/auth/login");
  };

  return (
    <div
      className={`w-full h-screen flex max-md:px-3 pt-4 justify-center items-center transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-800 via-gray-900 to-purple-800"
          : "bg-gradient-to-br from-purple-50 via-purple-75 to-purple-100"
      }`}
    >
      <div
        className={`w-full max-w-sm md:max-w-md lg:max-w-lg p-6 md:p-8 rounded-3xl shadow-xl transition-all duration-300 ${
          isDark
            ? "bg-gradient-to-r from-gray-700 to-gray-800 border border-purple-700"
            : "bg-gradient-to-r from-white to-purple-25 border border-purple-150"
        }`}
      >
        <h2
          className={`text-2xl md:text-3xl font-extrabold mb-4 ${
            isDark ? "text-purple-200" : "text-gray-800"
          }`}
        >
          Your Account is Activated but Under Review
        </h2>
        <p className={`mb-4 ${isDark ? "text-purple-100" : "text-gray-600"}`}>
          Your registration was successful!
        </p>
        <p className={`mb-4 ${isDark ? "text-purple-100" : "text-gray-600"}`}>
          We are excited to welcome you to the GenuxSpace Crypto community.
        </p>
        <p className={`mb-4 ${isDark ? "text-purple-100" : "text-gray-600"}`}>
          You will be able to access your account soon once you are confirmed,
          then you can start trading and earning.
        </p>
        <p className={`mb-4 ${isDark ? "text-purple-100" : "text-gray-600"}`}>
          If you need any help, do not hesitate to reach out to us on the Live
          Chat Support System or email us at{" "}
          <a
            href="mailto:GenuxSpace@gmail.com"
            className="text-purple-400 underline hover:text-purple-500"
          >
            GenuxSpace@gmail.com
          </a>
        </p>
        <p
          className={`font-semibold mb-4 ${
            isDark ? "text-purple-100" : "text-gray-600"
          }`}
        >
          Kind Regards, GenuxSpace
        </p>
        <button
          onClick={handleBackToLogin}
          className="mt-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300"
        >
          Back to Login
        </button>
        <p
          className={`mt-8 text-sm ${
            isDark ? "text-purple-200" : "text-gray-500"
          }`}
        >
          © 2024 GenuxSpace. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Review;
