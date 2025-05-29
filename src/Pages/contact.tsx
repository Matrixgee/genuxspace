import { useTheme } from "../Context/theme";
import { motion } from "framer-motion";

const ContactUs = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const contactInfo = [
    {
      icon: "📧",
      title: "Email Us",
      value: "support@Genuspace.com",
      description: "Get in touch for general inquiries",
    },
    {
      icon: "📞",
      title: "Call Us",
      value: "+1903 330 0707",
      description: "Speak with our investment advisors",
    },
    {
      icon: "📍",
      title: "Visit Us",
      value: "123 Financial District, NY 10004",
      description: "Our headquarters in New York",
    },
    {
      icon: "💬",
      title: "Live Chat",
      value: "Available 24/7",
      description: "Instant support when you need it",
    },
  ];

  return (
    <section
      className={`relative overflow-hidden ${
        isDark
          ? "bg-gradient-to-br from-gray-800 via-gray-900 to-purple-800"
          : "bg-gradient-to-br from-purple-50 via-purple-75 to-purple-100"
      } pt-24 pb-16 min-h-screen`}
    >
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        {/* Header Section */}
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl -z-10"></div>

          <motion.h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
              isDark ? "text-purple-200" : "text-gray-800"
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Get In <span className="text-purple-500">Touch</span>
          </motion.h1>

          <motion.p
            className={`text-lg md:text-xl mb-10 max-w-3xl mx-auto ${
              isDark ? "text-purple-100" : "text-gray-600"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Ready to start your investment journey? Our team of experts is here
            to help you make informed decisions and achieve your financial
            goals.
          </motion.p>
        </motion.div>

        {/* Contact Info Grid */}
        <motion.div
          className="max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                className={`text-center p-6 rounded-xl border shadow-lg ${
                  isDark
                    ? "bg-gradient-to-br from-gray-700 to-gray-800 border-purple-700"
                    : "bg-gradient-to-br from-white to-purple-25 border-purple-150"
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    isDark ? "bg-purple-800/40" : "bg-purple-50"
                  }`}
                >
                  <span className="text-3xl">{info.icon}</span>
                </div>
                <h3
                  className={`text-xl font-bold mb-2 ${
                    isDark ? "text-purple-200" : "text-purple-600"
                  }`}
                >
                  {info.title}
                </h3>
                <p
                  className={`font-medium mb-1 ${
                    isDark ? "text-purple-100" : "text-gray-600"
                  }`}
                >
                  {info.value}
                </p>
                <p
                  className={`text-sm ${
                    isDark ? "text-purple-200" : "text-gray-500"
                  }`}
                >
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}
        >
          <div
            className={`${
              isDark
                ? "bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 border-purple-700"
                : "bg-gradient-to-r from-white via-purple-25 to-white border-purple-150"
            } rounded-xl p-8 md:p-12 border shadow-lg`}
          >
            <motion.h2
              className={`text-3xl font-bold text-center mb-8 ${
                isDark ? "text-purple-200" : "text-purple-600"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              Send us a Message
            </motion.h2>

            <motion.form
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.6 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.2, duration: 0.6 }}
                >
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-purple-100" : "text-gray-600"
                    }`}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark
                        ? "bg-gray-800 border-purple-700 text-purple-100"
                        : "bg-white border-purple-150 text-gray-900"
                    } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="Enter your first name"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.4, duration: 0.6 }}
                >
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-purple-100" : "text-gray-600"
                    }`}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark
                        ? "bg-gray-800 border-purple-700 text-purple-100"
                        : "bg-white border-purple-150 text-gray-900"
                    } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="Enter your last name"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.6, duration: 0.6 }}
              >
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-purple-100" : "text-gray-600"
                  }`}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDark
                      ? "bg-gray-800 border-purple-700 text-purple-100"
                      : "bg-white border-purple-150 text-gray-900"
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="Enter your email address"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8, duration: 0.6 }}
              >
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-purple-100" : "text-gray-600"
                  }`}
                >
                  Subject
                </label>
                <select
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDark
                      ? "bg-gray-800 border-purple-700 text-purple-100"
                      : "bg-white border-purple-150 text-gray-900"
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                >
                  <option>General Inquiry</option>
                  <option>Investment Advice</option>
                  <option>Technical Support</option>
                  <option>Partnership</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 0.6 }}
              >
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-purple-100" : "text-gray-600"
                  }`}
                >
                  Message
                </label>
                <textarea
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDark
                      ? "bg-gray-800 border-purple-700 text-purple-100"
                      : "bg-white border-purple-150 text-gray-900"
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.2, duration: 0.6 }}
              >
                <button
                  type="submit"
                  className="px-8 py-4 rounded-lg font-medium text-lg bg-purple-500 text-white hover:bg-purple-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  Send Message
                </button>
              </motion.div>
            </motion.form>
          </div>
        </motion.div>
      </div>

      {/* Decorative Background Elements */}
      <div className="hidden md:block absolute top-40 right-10 w-64 h-64 bg-purple-500 opacity-5 rounded-full blur-3xl -z-10"></div>
      <div className="hidden md:block absolute bottom-20 left-10 w-48 h-48 bg-purple-600 opacity-5 rounded-full blur-2xl -z-10"></div>
    </section>
  );
};

export default ContactUs;
