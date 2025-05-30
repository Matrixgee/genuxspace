import { FormEvent, useState } from "react";
import { useTheme } from "../Context/theme";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "../config/axiosconig";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import logo from "../assets/genuxMain.png";

const SignUp = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    const toastLoading = toast.loading("Please wait");

    if (
      !formData.firstName ||
      !formData.userName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill all fields");
      toast.dismiss(toastLoading);
      return;
    }

    if (formData.confirmPassword !== formData.password) {
      toast.error("Passwords do not match");
      toast.dismiss(toastLoading);
      return;
    }

    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions");
      toast.dismiss(toastLoading);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/user/signup", formData);
      toast.success(response.data.message);
      setFormData({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      });
      setTermsAccepted(false);
      navigate("/review");
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMsg = error.response?.data?.message || "An error occurred";
        toast.error(errorMsg);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
      toast.dismiss(toastLoading);
    }
  };

  const inputClasses = `w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
    isDark
      ? "bg-gray-800 border-purple-600 text-purple-100 placeholder-purple-300 focus:ring-purple-500 focus:border-purple-500"
      : "bg-white border-purple-200 text-gray-900 placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
  }`;

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-gray-800 via-gray-900 to-purple-800"
          : "bg-gradient-to-br from-purple-50 via-purple-75 to-purple-100"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`max-w-lg w-full rounded-2xl shadow-xl overflow-hidden transition-colors duration-500 ${
          isDark
            ? "bg-gradient-to-r from-gray-700 to-gray-800 border border-purple-700"
            : "bg-gradient-to-r from-white to-purple-25 border border-purple-150"
        }`}
      >
        <div className="p-8 max-md:p-4 sm:p-10">
          <div className="flex flex-col items-center mb-8">
            <div
              className={`h-20 w-20 rounded-full flex items-center justify-center mb-4 cursor-pointer ${
                isDark ? "bg-purple-800/40" : "bg-purple-50"
              }`}
              onClick={() => navigate("/")}
            >
              <span className="text-white text-2xl font-bold">
                <img src={logo} alt="logo" />
              </span>
            </div>
            <h2
              className={`text-center text-3xl font-bold mb-2 ${
                isDark ? "text-purple-200" : "text-gray-800"
              }`}
            >
              Create Account
            </h2>
            <p
              className={`text-center ${
                isDark ? "text-purple-100" : "text-gray-600"
              }`}
            >
              Fill in your details below
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSignup}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                className={inputClasses}
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                className={inputClasses}
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <input
              id="userName"
              name="userName"
              type="text"
              placeholder="Username"
              className={inputClasses}
              value={formData.userName}
              onChange={handleChange}
            />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              className={inputClasses}
              value={formData.email}
              onChange={handleChange}
            />
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="Phone Number"
              className={inputClasses}
              value={formData.phoneNumber}
              onChange={handleChange}
            />

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`${inputClasses} pr-10`}
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className={`absolute right-3 top-[.85rem] ${
                  isDark ? "text-purple-300" : "text-purple-500"
                }`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>

            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className={`${inputClasses} pr-10`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className={`absolute right-3 top-[.85rem] ${
                  isDark ? "text-purple-300" : "text-purple-500"
                }`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>

            <div className="flex items-start mt-4">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className={`h-4 w-4 rounded focus:ring-2 ${
                  isDark
                    ? "bg-gray-700 border-purple-600 text-purple-500 focus:ring-purple-500"
                    : "border-purple-200 text-purple-600 focus:ring-purple-500"
                }`}
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label
                htmlFor="terms"
                className={`ml-3 text-sm ${
                  isDark ? "text-purple-200" : "text-gray-500"
                }`}
              >
                I agree with the{" "}
                <a href="#" className="text-purple-500 hover:underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="text-purple-500 hover:underline">
                  Terms & Conditions
                </a>
              </label>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg shadow-sm text-white ${
                isDark
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-purple-600 hover:bg-purple-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed`}
              whileHover={{ scale: loading ? 1 : 1.03 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                "Processing..."
              ) : (
                <>
                  Create Account <FiCheck className="ml-2" />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p
              className={`text-sm ${
                isDark ? "text-purple-200" : "text-gray-500"
              }`}
            >
              Already have an account?{" "}
              <a
                href="/auth/login"
                className="font-medium text-purple-500 hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
