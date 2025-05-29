import { useState } from "react";
import { useTheme } from "../Context/theme";
import { FiEyeOff } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../config/axiosconig";
import { Userdata, userToken } from "../Function/Slice";
import { isAxiosError } from "axios";
import logo from "../assets/genuxMain.png";

const Login = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    const Toastloading = toast.loading("Please wait...");

    try {
      const response = await axios.post("/user/login", formData);
      dispatch(Userdata(response.data.data));
      dispatch(userToken(response.data.token));
      localStorage.setItem("id", response.data.data._id);
      toast.success("Login successful!", { duration: 3000 });
      setTimeout(() => {
        if (response.data.data.isAdmin) {
          navigate("/welcomeadmin");
        } else {
          navigate("/user/overview");
        }
      }, 3000);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const errorMsg =
          error.response?.data?.message || "An unexpected error occurred";
        toast.error(errorMsg);
      } else {
        toast.error("Error occurred");
      }
    } finally {
      setLoading(false);
      toast.dismiss(Toastloading);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 flex items-center justify-center py-12 px-4 ${
        isDark 
          ? "bg-gradient-to-br from-gray-800 via-gray-900 to-purple-800" 
          : "bg-gradient-to-br from-purple-50 via-purple-75 to-purple-100"
      }`}
    >
      <div
        className={`max-w-md w-full space-y-8 p-10 max-md:p-4 rounded-xl shadow-2xl transition-colors duration-300 ${
          isDark 
            ? "bg-gradient-to-r from-gray-700 to-gray-800 border border-purple-700" 
            : "bg-gradient-to-r from-white to-purple-25 border border-purple-150"
        }`}
      >
        <div className="flex flex-col items-center">
          <div
            className={`h-20 w-20 rounded-full flex items-center justify-center mb-4 ${
              isDark ? "bg-purple-800/40" : "bg-purple-50"
            }`}
            onClick={() => navigate("/")}
          >
            <span className="text-white text-2xl font-bold">
              <img src={logo} alt="logo" />
            </span>
          </div>
          <h2
            className={`mt-6 text-center text-3xl font-extrabold transition-colors duration-300 ${
              isDark ? "text-purple-200" : "text-gray-800"
            }`}
          >
            Login your account
          </h2>
          <p
            className={`mt-2 text-center text-sm transition-colors duration-300 ${
              isDark ? "text-purple-100" : "text-gray-600"
            }`}
          >
            Welcome back to GenuxSpace.com
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDark ? "text-purple-200" : "text-gray-500"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className={`w-full px-3 py-3 border rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDark
                    ? "bg-gray-700 border-purple-600 text-purple-100 placeholder-purple-300"
                    : "bg-white border-purple-200 text-gray-800 placeholder-gray-500"
                }`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDark ? "text-purple-200" : "text-gray-500"
                }`}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  className={`w-full px-3 py-3 pr-10 border rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    isDark
                      ? "bg-gray-700 border-purple-600 text-purple-100 placeholder-purple-300"
                      : "bg-white border-purple-200 text-gray-800 placeholder-gray-500"
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                    isDark ? "text-purple-200" : "text-gray-500"
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <BsEye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex max-md:flex-col max-md:items-start items-center justify-between">
            <div className="text-sm">
              <p
                className={`text-sm ${
                  isDark ? "text-purple-200" : "text-gray-500"
                }`}
              >
                Don't have an account?{" "}
                <Link
                  to="/auth/register"
                  className="font-medium text-purple-500 hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
            <div
              className="text-sm px-3 max-md:px-0 flex justify-end items-center"
              onClick={() => navigate("/auth/forget")}
            >
              <span className="text-purple-500 font-semibold cursor-pointer hover:underline">
                Forget Password?
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p
            className={`text-sm transition-colors duration-300 ${
              isDark ? "text-purple-200" : "text-gray-500"
            }`}
          >
            Copyright 2023 GenuxSpace. all rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;