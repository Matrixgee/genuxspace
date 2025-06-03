import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

const Account = () => {
  return (
    <>
      <div className="w-full h-[100vh] bg-purple-600/30 px-5 py-8 max-md:px-4">
        <div className="flex flex-col gap-3">
          <p className="text-base text-[whitesmoke] max-md:text-sm">
            My Account
          </p>
          <p className="text-4xl text-[whitesmoke] max-md:text-xl">
            Account Settings
          </p>
          <p className="text-sm text-[whitesmoke] max-md:text-xs">
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
                    ? "pb-2 border-b-2 border-purple-500 text-purple-500"
                    : "text-[#bfbfbf] hover:text-[#0238ac] transition-all"
                }
              >
                <div className="w-24 text-center cursor-pointer capitalize">
                  {tab}
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="mt-5 w-full h-[320px] max-md:h-[400px] bg-purple-600/30 border border-[#0238ac50] rounded-xl backdrop-blur-md overflow-auto p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Account;
