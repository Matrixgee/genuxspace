/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FiMoon, FiSun } from "react-icons/fi";
import { RiMenu4Line, RiCloseLine } from "react-icons/ri";
import logo from "../assets/genuxLogo.png";
import { useTheme } from "../Context/theme";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`${
        scrolled
          ? isDark
            ? "bg-gray-800/95 backdrop-blur-md shadow-lg"
            : "bg-white/95 backdrop-blur-md shadow-lg"
          : isDark
          ? "bg-gray-800"
          : "bg-white"
      } ${
        isDark ? "text-purple-100" : "text-gray-800"
      } fixed z-[99] transition-all duration-300`}
      style={{
        width: "100%",
        height: "10vh",
        top: 0,
        left: 0,
      }}
    >
      <div
        className="flex items-center justify-between px-6 lg:px-8"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {/* Logo */}
        <div
          className="flex justify-center items-center cursor-pointer"
          style={{
            width: "30%",
            height: "100%",
          }}
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Logo"
            className="object-cover"
            style={{
              width: "70%",
              height: "70%",
            }}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-lg transition-colors ${
                  isActive
                    ? isDark
                      ? "text-purple-300 font-semibold bg-purple-800/40"
                      : "text-purple-600 font-semibold bg-purple-50"
                    : isDark
                    ? "text-purple-100 hover:bg-gray-700 hover:text-purple-200"
                    : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                }`
              }
              style={{
                padding: "8px 16px",
                margin: "0 4px",
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center" style={{ gap: "12px" }}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`rounded-full transition-colors ${
              isDark
                ? "bg-purple-800/40 text-yellow-400 hover:bg-purple-700/40"
                : "bg-purple-50 text-purple-600 hover:bg-purple-100"
            }`}
            style={{
              padding: "10px",
              width: "44px",
              height: "44px",
            }}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* Get Started Button */}
          <button
            onClick={() => navigate("/auth/register")}
            className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            style={{
              padding: "10px 20px",
              height: "44px",
            }}
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Controls */}
        <div className="flex md:hidden items-center" style={{ gap: "8px" }}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`rounded-full ${
              isDark
                ? "bg-purple-800/40 text-yellow-400"
                : "bg-purple-50 text-purple-600"
            }`}
            style={{
              padding: "8px",
              width: "40px",
              height: "40px",
            }}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`rounded-lg transition-colors ${
              mobileMenuOpen
                ? isDark
                  ? "bg-purple-800/40"
                  : "bg-purple-100"
                : isDark
                ? "text-purple-100"
                : "text-gray-800"
            }`}
            style={{
              padding: "8px",
              width: "40px",
              height: "40px",
            }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <RiCloseLine
                size={24}
                className={isDark ? "text-purple-300" : "text-purple-600"}
              />
            ) : (
              <RiMenu4Line
                size={24}
                className={isDark ? "text-purple-100" : "text-gray-800"}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`fixed z-50 transition-all duration-300 transform md:hidden ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{
          left: 0,
          right: 0,
          top: "60px",
        }}
      >
        <div
          className={`border-t ${
            isDark ? "border-purple-700" : "border-purple-150"
          } ${isDark ? "bg-gray-800" : "bg-white"} shadow-xl rounded-b-xl`}
          style={{
            width: "100%",
            paddingBottom: "16px",
          }}
        >
          <div
            className="flex flex-col"
            style={{
              padding: "16px 24px 0",
            }}
          >
            {/* Nav Links */}
            <div
              className="flex flex-col"
              style={{
                gap: "4px",
                marginBottom: "16px",
              }}
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `rounded-lg ${
                      isActive
                        ? isDark
                          ? "bg-purple-800/40 text-purple-300 font-medium"
                          : "bg-purple-50 text-purple-600 font-medium"
                        : isDark
                        ? "text-purple-100 hover:bg-gray-700 hover:text-purple-200"
                        : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                    }`
                  }
                  style={{
                    padding: "12px 16px",
                  }}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => navigate("/auth/login")}
              className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{
                width: "100%",
                padding: "12px 20px",
                marginBottom: "8px",
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
