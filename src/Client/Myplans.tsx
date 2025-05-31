/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Plus,
  TrendingUp,
  Clock,
  DollarSign,
  Calendar,
  CheckCircle,
  AlertCircle,
  Activity,
} from "lucide-react";
import toast from "react-hot-toast";
import { Investment, setInvestments } from "../Function/Slice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Myplans = () => {
  const [myPlans, setMyPlans] = useState<Investment[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state: { user: any }) => state.user.user?._id);
  const userToken = useSelector((state: { user: any }) => state.user.token);

  useEffect(() => {
    if (userId) {
      getHandle();
    }
  }, [userId]);

  const getHandle = async () => {
    try {
      toast.loading("Fetching your investment plans...");
      const response = await axios.get(
        `https://gen-75n5.onrender.com/api/user/getAllInvestmentPlans/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.data && response.data.investments) {
        setMyPlans(response.data.investments);
        dispatch(setInvestments(response.data.investments));
        toast.dismiss();
        toast.success("Investment plans fetched successfully");
      } else {
        setMyPlans([]);
        toast.dismiss();
        toast.error("No investment plans found");
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.dismiss();
      toast.error("Failed to fetch investment plans");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-red-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "pending":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      default:
        return "text-red-400 bg-red-400/10 border-red-400/20";
    }
  };

  return (
    <div className="w-full h-[100vh] scrollbar-thin overflow-y-scroll bg-gradient-to-br from-gray-800 via-gray-900 to-purple-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full h-max flex flex-col px-10 phone:px-4 py-8 gap-6">
        {myPlans && myPlans.length > 0 ? (
          <>
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-purple-200">
                    My Investments
                  </h1>
                  <p className="text-purple-100">
                    Portfolio Overview ({myPlans.length} active plans)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/40 backdrop-blur-sm border border-purple-600 rounded-xl">
                <Activity className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">
                  Active Portfolio
                </span>
              </div>
            </div>

            {/* Investment Cards */}
            <div className="grid gap-6">
              {myPlans.map((plan) => (
                <div
                  key={plan._id}
                  className="group relative bg-gradient-to-r from-gray-700 to-gray-800 border border-purple-700 backdrop-blur-lg rounded-2xl p-6 hover:bg-gray-700/60 hover:border-purple-500 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  {/* Plan Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                        #{plan._id?.slice(-3).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-purple-200">
                          {plan.planName}
                        </h3>
                        <p className="text-purple-100 text-sm">Investment Plan</p>
                      </div>
                    </div>
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(
                        plan.status
                      )}`}
                    >
                      {getStatusIcon(plan.status)}
                      <span className="text-sm font-medium capitalize">
                        {plan.status}
                      </span>
                    </div>
                  </div>

                  {/* Investment Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Amount */}
                    <div className="bg-gray-800/60 rounded-xl p-4 border border-purple-600">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        <span className="text-purple-200 text-sm">
                          Amount Invested
                        </span>
                      </div>
                      <p className="text-purple-100 text-xl font-bold">
                        ${plan.amount.toLocaleString()}
                      </p>
                    </div>

                    {/* Duration */}
                    <div className="bg-gray-800/60 rounded-xl p-4 border border-purple-600">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-purple-200 text-sm">Duration</span>
                      </div>
                      <p className="text-purple-100 text-xl font-bold">
                        {plan.duration}
                      </p>
                    </div>

                    {/* Created Date */}
                    <div className="bg-gray-800/60 rounded-xl p-4 border border-purple-600">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-200 text-sm">Started</span>
                      </div>
                      <p className="text-purple-100 text-lg font-bold">
                        {new Date(plan.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    {/* Progress/Status */}
                    <div className="bg-gray-800/60 rounded-xl p-4 border border-purple-600">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-orange-400" />
                        <span className="text-purple-200 text-sm">Progress</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-800/40 rounded-full h-2">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-1000"
                            style={{
                              width: plan.status === "active" ? "65%" : "25%",
                            }}
                          ></div>
                        </div>
                        <span className="text-purple-100 text-sm font-medium">
                          {plan.status === "active" ? "65%" : "25%"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Empty State */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-purple-200">
                    My Investments
                  </h1>
                  <p className="text-purple-100">No active investments yet</p>
                </div>
              </div>
            </div>

            <div className="relative bg-gradient-to-r from-gray-700 to-gray-800 border border-purple-700 backdrop-blur-lg rounded-2xl p-12 text-center">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/5 rounded-2xl"></div>

              <div className="relative ">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-purple-200 mb-3">
                  Start Your Investment Journey
                </h3>
                <p className="text-purple-100 mb-8 max-w-md mx-auto">
                  You haven't made any investments yet. Choose from our premium
                  investment plans to start growing your wealth.
                </p>

                <button
                  onClick={() => navigate("/user/deposit")}
                  className="group flex items-center gap-3 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 mx-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  Start Investing Now
                  <div className="w-0 group-hover:w-6 transition-all duration-300 overflow-hidden">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Myplans;