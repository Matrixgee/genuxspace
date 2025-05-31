import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

const Account = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#452a6d] via-gray-900 to-purple-900">
      <div className="w-full h-[83vh] px-5 py-8 phone:px-4">
        <div className="flex flex-col gap-3">
          <p className="text-base text-purple-100 phone:text-sm">
            My Account
          </p>
          <p className="text-4xl text-purple-200 phone:text-xl">
            Account Settings
          </p>
          <p className="text-sm text-purple-100 phone:text-xs">
            You have full control to manage your own account setting.
          </p>
        </div>

        <div className="mt-8">
          <div className="flex gap-5 text-sm font-semibold border-b border-purple-700">
            {["profile", "security"].map((tab) => (
              <NavLink
                key={tab}
                to={tab}
                className={({ isActive }) =>
                  isActive
                    ? "pb-2 border-b-2 border-purple-500 text-purple-400"
                    : "text-purple-200 hover:text-purple-400 transition-all duration-200"
                }
              >
                <div className="w-24 text-center cursor-pointer capitalize">
                  {tab}
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="mt-5 w-full h-[320px] phone:h-[400px] bg-gray-800/40 border border-purple-600 rounded-xl backdrop-blur-md overflow-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Account;