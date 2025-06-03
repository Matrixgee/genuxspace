// import { useState, useEffect } from "react";
// import { RouterProvider } from "react-router-dom";

// import logo from "./assets/genuxMain.png";
// import { MainRoutes } from "./Routes/MainRoutes";

// const App = () => {
//   const [loading, setLoading] = useState(true);

//   const baseUrl = "https://gen-75n5.onrender.com/api";

//   useEffect(() => {
//     const wakeUpServer = async () => {
//       try {
//         await fetch(baseUrl);
//         console.log("Server awakened");
//       } catch (error) {
//         console.error("Error waking up server:", error);
//       }
//     };

//     wakeUpServer();

//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 7000);

//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <div className="text-center">
//           <img
//             src={logo}
//             alt="Loading..."
//             className="mx-auto w-32 sm:w-40 md:w-60 lg:w-56 animate-fade-in-out"
//             style={{
//               animation: "fadeInOut 2s ease-in-out infinite",
//             }}
//           />
//         </div>
//         <style>{`
//           @keyframes fadeInOut {
//             0% {
//               opacity: 0;
//             }
//             50% {
//               opacity: 1;
//             }
//             100% {
//               opacity: 0;
//             }
//           }
//         `}</style>
//       </div>
//     );
//   }

//   return <RouterProvider router={MainRoutes} />;
// };

// export default App;

import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import logo from "./assets/newlog.png";
import { MainRoutes } from "./Routes/MainRoutes";

const App = () => {
  const [loading, setLoading] = useState(true);
  const baseUrl = "https://gen-75n5.onrender.com/api";

  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        await fetch(baseUrl);
        console.log("Server awakened");
      } catch (error) {
        console.error("Error waking up server:", error);
      }
    };

    wakeUpServer();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <img
            src={logo}
            alt="Loading..."
            className="mx-auto w-32 sm:w-40 md:w-60 lg:w-56 animate-fade-in-out"
            style={{
              animation: "fadeInOut 2s ease-in-out infinite",
            }}
          />
        </div>
        <style>{`
          @keyframes fadeInOut {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>GenuxSpace Finance | Smart Investing</title>
        <meta
          name="description"
          content="Join GenuxSpace to start investing securely with smart plans tailored to your goals."
        />
        <meta
          name="keywords"
          content="GenuxSpace, crypto investment, smart plans, finance, ROI"
        />
        <meta name="author" content=" GenuxSpace Team" />
        <meta property="og:title" content="GenuxSpace Finance" />
        <meta
          property="og:description"
          content="Secure and smart investment platform."
        />
        <meta property="og:image" content="./assets/genuxMain.png" />
        <meta property="og:url" content="https://www.genuxspace.com/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <RouterProvider router={MainRoutes} />
    </>
  );
};

export default App;
