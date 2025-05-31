import { useState } from "react";
import {
  Wallet,
  ArrowUpRight,
  Shield,
  Bitcoin,
  DollarSign,
} from "lucide-react";
import toast from "react-hot-toast";

// Define the type for supported payment methods
type PaymentMethod = "btc" | "eth" | "usdt";

// Define the structure of each crypto option
interface CryptoOption {
  value: PaymentMethod;
  label: string;
  icon: string;
  gradient: string;
}

const Withdraw = () => {
  const [amount, setAmount] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const cryptoOptions: CryptoOption[] = [
    {
      value: "btc",
      label: "Bitcoin",
      icon: "₿",
      gradient: "from-orange-400 to-orange-600",
    },
    {
      value: "eth",
      label: "Ethereum",
      icon: "Ξ",
      gradient: "from-blue-400 to-purple-600",
    },
    {
      value: "usdt",
      label: "USDT",
      icon: "₮",
      gradient: "from-green-400 to-emerald-600",
    },
  ];

  const handleWithdraw = async () => {
    if (!amount || !walletAddress || !paymentMethod) {
      toast.error("Please fill all fields before withdrawing.");
      return;
    }

    setIsProcessing(true);

    // Simulate API request delay
    setTimeout(() => {
      // Reset fields
      setAmount("");
      setWalletAddress("");
      setPaymentMethod(null);
      setIsProcessing(false);
      toast.success("Withdrawal request sent successfully!");
    }, 2000);
  };

  return (
    <div className="w-full h-[calc(100vh-4rem)] overflow-y-scroll px-10 max-md:px-4 py-16 bg-gradient-to-br from-gray-800 via-gray-900 to-purple-800 flex flex-col items-center relative">
      {/* Decorative Blurs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-purple-600/20 rounded-full blur-xl opacity-10 animate-pulse transform -translate-x-1/2 -translate-y-1/2 delay-500" />
      </div>

      <div className="w-1/2 max-md:w-full bg-gradient-to-r from-gray-700 to-gray-800 border border-purple-700 backdrop-blur-lg rounded-2xl px-20 max-md:px-5 py-10 flex flex-col gap-6 items-center shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full">
            <ArrowUpRight className="w-6 h-6 text-white" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-purple-200 max-md:text-xl">Crypto Withdrawal</h2>
            <p className="text-sm text-purple-100">Secure & instant transfers</p>
          </div>
        </div>

        {/* Amount Input */}
        <div className="w-full flex flex-col gap-3">
          <label className="text-sm text-purple-200 font-medium flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Amount <span className="text-xs text-purple-300">(USD)</span>
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full h-14 bg-gray-800/60 border border-purple-600 backdrop-blur-sm text-purple-100 placeholder-purple-300 outline-none pl-4 pr-12 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              placeholder="Enter amount..."
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="w-full flex flex-col gap-3">
          <label className="text-sm text-purple-200 font-medium flex items-center gap-2">
            <Bitcoin className="w-4 h-4" />
            Payment Method
          </label>
          <div className="grid grid-cols-1 gap-3">
            {cryptoOptions.map((crypto) => (
              <div
                key={crypto.value}
                onClick={() => setPaymentMethod(crypto.value)}
                className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                  paymentMethod === crypto.value
                    ? "border-purple-500 bg-gray-700/60 shadow-lg shadow-purple-500/20"
                    : "border-purple-600 bg-gray-800/40 hover:bg-gray-700/60 hover:border-purple-500"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-r ${crypto.gradient} flex items-center justify-center text-white font-bold text-lg`}
                    >
                      {crypto.icon}
                    </div>
                    <span className="text-purple-100 font-medium">{crypto.label}</span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      paymentMethod === crypto.value
                        ? "border-purple-500 bg-purple-500"
                        : "border-purple-400"
                    } transition-all duration-300`}
                  >
                    {paymentMethod === crypto.value && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wallet Address Input */}
        <div className="w-full flex flex-col gap-3">
          <label className="text-sm text-purple-200 font-medium flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            Wallet Address
          </label>
          <div className="relative">
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full h-14 bg-gray-800/60 border border-purple-600 backdrop-blur-sm text-purple-100 placeholder-purple-300 outline-none pl-4 pr-12 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              placeholder="Enter wallet address..."
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300">
              <Shield className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Withdraw Button */}
        <button
          onClick={handleWithdraw}
          disabled={isProcessing}
          className={`w-full h-14 rounded-xl text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 focus:ring-2 focus:ring-purple-500/20 ${
            isProcessing
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95"
          }`}
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <ArrowUpRight className="w-5 h-5" />
              WITHDRAW FUNDS
            </>
          )}
        </button>

        {/* Security Message */}
        <div className="w-full p-3 bg-purple-500/10 border border-purple-600/30 rounded-lg">
          <div className="flex items-center gap-2 text-purple-200 text-xs">
            <Shield className="w-4 h-4" />
            <span>All transactions are secured with end-to-end encryption.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
