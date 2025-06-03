// import React, { useState, useRef } from "react";
// import { Modal } from "antd";
// import { FaRegBell, FaCaretDown } from "react-icons/fa";
// import { PiSignOut, PiGearSix } from "react-icons/pi";
// import { FaCircleUser } from "react-icons/fa6";
// import { AiOutlineUser } from "react-icons/ai";
// import { motion, AnimatePresence } from "framer-motion";
// import MobileMenu from "./MobileMenu";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { clearUser } from "../Function/Slice"; // Adjust the import path according to your project structure

// const DasHeader: React.FC = () => {
//   const [showMenu, setShowMenu] = useState(false);
//   const [userImage, setUserImage] = useState<string | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const navigate = useNavigate();
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const dispatch = useDispatch();

//   const user = useSelector((state: any) => state.user.user);

//   const handleShowMenu = () => {
//     setShowMenu(!showMenu);
//   };

//   const handleUserIconClick = () => {
//     setIsModalVisible(true);
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       const file = event.target.files[0];
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setUserImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleOk = () => {
//     setIsModalVisible(false);
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const handleLogout = () => {
//     dispatch(clearUser());
//     navigate("/auth/login");
//   };

//   const menuItems = [
//     {
//       label: "My Profile",
//       icon: <AiOutlineUser className="text-2xl" />,
//       path: "account/profile",
//     },
//     {
//       label: "Settings",
//       icon: <PiGearSix className="text-2xl" />,
//       path: "account/security",
//     },
//     {
//       label: "Notifications",
//       icon: <FaRegBell className="text-2xl" />,
//       path: "/user/overview",
//       mobileOnly: true,
//     },
//   ];

//   // const getTransactionDetails = () => {
//   //   if (!gateway || !selectedPaymentMethod) return null;

//   //   return {
//   //     walletAddress: gateway.add,
//   //     qrCode: gateway.image,
//   //   };
//   // };
//   // const transactionDetails = getTransactionDetails();

//   // <div>
//   //  <p className="text-[18px] text-gray-600 font-semibold text-center">
//   // //                 Please proceed with your payment of ${amount} to the wallet address below.
//   // //               </p>
//   //             </div>
//   // </div>
//   //    */}

//   return (
//     <div className="w-[100%] h-[12%] bg-[#ffff] border-gray-100 border-b-2 justify-between flex max-md:h-[10%]">
//       <div className="w-[20%] h-[100%] hidden justify-center items-center max-md:flex relative">
//         <MobileMenu />
//       </div>
//       <div className="w-[30%] h-[100%] flex justify-around items-center max-md:hidden">
//         <button
//           className="w-[40%] h-[57%] bg-yellow-500 rounded-md text-white"
//           onClick={() => navigate("/user/deposit")}
//         >
//           Fund Account
//         </button>
//         <button
//           className="w-[40%] h-[57%] bg-red-500 rounded-md text-white"
//           onClick={() => navigate("/user/withdraw")}
//         >
//           Withdraw Funds
//         </button>
//       </div>
//       <div className="w-[37%] h-[100%] flex justify-center items-center max-md:w-[36%] max-md:justify-around">
//         <div className="w-[60%] h-[100%] flex justify-center gap-6 items-center max-md:w-[90%]">
//           <div className="w-[40px] h-[40px] bg-slate-200 rounded-full flex justify-center items-center max-md:hidden">
//             <FaRegBell className="text-2xl" />
//           </div>
//           <div className="w-[60%] h-[50%] flex justify-around items-center max-md:w-[80%]">
//             <div
//               className="w-[40px] h-[40px] bg-slate-300 border rounded-full flex justify-center items-center cursor-pointer max-md:w-[50px] max-md:h-[50px] smallmax-md:w-[30px] smallmax-md:h-[30px]"
//               onClick={handleUserIconClick}
//             >
//               {userImage ? (
//                 <img
//                   src={userImage}
//                   alt="User"
//                   className="w-full h-full rounded-full object-cover"
//                 />
//               ) : (
//                 <FaCircleUser className="text-5xl" />
//               )}
//             </div>
//             <input
//               type="file"
//               ref={fileInputRef}
//               className="hidden"
//               onChange={handleFileChange}
//               accept="image/*"
//             />
//             <div className="font-semibold max-md:hidden smallmax-md:hidden text-slate-500 cursor-pointer">
//               {user?.firstName}
//             </div>
//             <div className="w-[10%] h-[40%] flex relative justify-center items-center max-md:w-[90%]">
//               <FaCaretDown
//                 className="text-2xl cursor-pointer text-slate-500"
//                 onClick={handleShowMenu}
//               />
//               <AnimatePresence>
//                 {showMenu && (
//                   <motion.div
//                     className="dropDown-dashboard w-[15rem] h-[13rem] flex justify-around items-start px-4 flex-col bg-white shadow-md absolute top-11 right-[-20%]"
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {menuItems.map((item, index) => (
//                       <div
//                         key={index}
//                         className={`w-[90%] h-[20%] gap-3 rounded-md transition-all transform duration-300 cursor-pointer px-5 flex justify-start items-center hover:bg-[#CCCCCC] ${
//                           item.mobileOnly ? "hidden max-md:flex" : ""
//                         }`}
//                         onClick={() => {
//                           setShowMenu(false);
//                           navigate(item.path);
//                         }}
//                       >
//                         {item.icon}
//                         <p className="text-xl">{item.label}</p>
//                       </div>
//                     ))}
//                     <div
//                       className="w-[90%] h-[20%] gap-3 rounded-md mb-2 transition-all transform duration-300 cursor-pointer px-5 flex justify-start items-center hover:bg-[#CCCCCC]"
//                       onClick={handleLogout}
//                     >
//                       <PiSignOut className="text-2xl" />
//                       <p className="text-xl">Log Out</p>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Modal
//         title="Add Image"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <p>Do you want to add an image?</p>
//       </Modal>
//     </div>
//   );
// };

// export default DasHeader;
