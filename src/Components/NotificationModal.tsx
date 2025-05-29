import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../Context/theme";
import { FaTimes, FaDollarSign, FaUser, FaMapMarkerAlt } from "react-icons/fa";

interface NotificationModalProps {
  message: string;
  visible: boolean;
  onClose?: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  message,
  visible,
  onClose,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Parse the message to extract name, city, and earning
  const parseMessage = (msg: string) => {
    const nameMatch = msg.match(/<b>([^<]+)<\/b> from/);
    const cityMatch = msg.match(/from ([^<]+) just/);
    const earningMatch = msg.match(/\$(\d+)/);

    return {
      name: nameMatch ? nameMatch[1] : "Someone",
      city: cityMatch ? cityMatch[1] : "Unknown",
      earning: earningMatch ? earningMatch[1] : "0",
    };
  };

  const { name, city, earning } = parseMessage(message);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.6,
          }}
          className="fixed bottom-6 left-6 z-50"
        >
          <div
            className={`relative rounded-xl px-12 py-3 shadow-2xl border max-w-sm ${
              isDark
                ? "bg-gradient-to-r from-purple-900 to-purple-700 border-purple-400 text-white"
                : "bg-gradient-to-r from-white to-gray-50 border-gray-200 text-gray-800"
            }`}
          >
            {/* Close button */}
            {onClose && (
              <button
                onClick={onClose}
                className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  isDark
                    ? "hover:bg-purple-500/30 text-white hover:text-white"
                    : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                }`}
              >
                <FaTimes className="w-3 h-3" />
              </button>
            )}

            {/* Notification content */}
            <div className="flex items-start space-x-3">
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  isDark ? "bg-purple-800/60" : "bg-green-100"
                }`}
              >
                <FaUser
                  className={`w-4 h-4 ${
                    isDark ? "text-green-300" : "text-green-600"
                  }`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-sm">{name}</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-500 text-white">
                    NEW
                  </span>
                </div>

                <div className="flex items-center space-x-1 mb-2">
                  <FaMapMarkerAlt className="w-3 h-3 opacity-70" />
                  <span className="text-xs opacity-80">{city}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs opacity-80">Just earned</span>
                  <div className="flex items-center space-x-1">
                    <FaDollarSign className="w-3 h-3 text-green-500" />
                    <span className="font-bold text-green-500 text-sm">
                      {earning}
                    </span>
                  </div>
                  <span className="text-lg">🎉</span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <motion.div
              className={`absolute bottom-0 left-0 h-1 rounded-b-xl ${
                isDark ? "bg-purple-400" : "bg-green-500"
              }`}
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
            />

            {/* Glow effect */}
            <div
              className={`absolute inset-0 rounded-xl opacity-20 ${
                isDark ? "bg-purple-500" : "bg-green-300"
              } blur-xl -z-10`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;
