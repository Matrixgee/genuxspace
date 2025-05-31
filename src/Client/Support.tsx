const Support = () => {
  return (
    <div className="relative w-full h-full overflow-y-auto bg-gradient-to-br from-gray-800 via-gray-900 to-purple-800 flex items-center justify-center px-4">
      {/* Background Visuals */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-16 right-20 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Support Card */}
      <div className="relative w-[70%] max-md:w-[90%] max-w-3xl bg-gradient-to-r from-gray-700 to-gray-800 border border-purple-700 backdrop-blur-md rounded-3xl shadow-lg shadow-purple-500/10 p-8 max-md:p-6 text-purple-100 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-purple-200">
            GenuxSpace Trading Platform
          </h1>
          <p className="text-purple-100 text-sm max-md:text-xs">
            For inquiries, suggestions or complaints, reach out via email
          </p>
          <p className="text-purple-400 underline underline-offset-4 cursor-pointer hover:text-purple-300 transition text-base max-md:text-sm">
            support@GenuxSpace.com
          </p>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-purple-200">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full h-40 bg-gray-800/60 border border-purple-600 text-purple-100 placeholder-purple-300 p-3 rounded-lg outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 resize-none transition-all duration-200"
            placeholder="Type your message here..."
          ></textarea>
          <button className="w-full h-12 bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition text-white font-semibold rounded-lg focus:outline-none">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Support;