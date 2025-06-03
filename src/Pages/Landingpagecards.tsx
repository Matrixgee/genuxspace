import { motion } from "framer-motion";
import "animate.css";

export const Financecards = (props: any) => {
  return (
    <div className="w-[100%] h-auto p-10 bg-[#fff] rounded-2xl hover:shadow-2xl flex-grow-1 flex-basis-200 smallmax-md:p-5 ">
      <div className="w-[100%] h-[200px] ">
        <img src={props.img} alt="" className="w-[100%] h-[100%]" />
      </div>
      <h2 className="text-xl font-semibold mt-2 max-md:text-lg ">{props.h2}</h2>
      <p className=" text-base font-normal text-[#3450a4] leading-7 mt-3 max-md:text-sm ">
        {props.p}
      </p>
      <button className="w-[50%] h-[50px] bg-blue-500 hover:bg-blue-700 rounded-full text-[white] text-lg font-semibold mt-5 max-md:text-sm max-md:w-[70%] smallmax-md:h-[40px] ">
        Learn More
      </button>
    </div>
  );
};

export const Bottomcard = (props: any) => {
  return (
    <div className="w-[100%] h-auto p-10 bg-[#fff]  rounded-xl hover:shadow-2xl smallmax-md:p-5 ">
      <h2 className="text-xl text-orange-600 font-semibold mt-2 max-md:text-lg ">
        {props.h2}
      </h2>
      <p className=" text-base font-normal text-[#3450a4] leading-7 mt-3 max-md:text-sm ">
        {props.p}
      </p>
    </div>
  );
};

export const Riskresearch = (props: any) => {
  return (
    <div className="w-[100%] h-[100%] flex justify-between items-center max-md:flex-col max-md:text-center max-md:gap-5  ">
      <motion.div
        initial={false}
        transition={{
          type: "spring",
          stiffness: 30,
          mass: 1.5,
        }}
        animate={{ x: -100 }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          // once: true,
          margin: "-30px",
        }}
        className="w-[40%] h-[90%] max-md:w-[100%] animate__animated "
      >
        <img
          src={props.img}
          alt=""
          className="w-[100%] h-[100%] rounded-2xl "
        />
      </motion.div>
      <motion.div
        initial={false}
        transition={{
          type: "spring",
          stiffness: 30,
          mass: 1.5,
        }}
        animate={{ x: 70 }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={
          {
            // once: true,
          }
        }
        className="w-[55%] h-[100%] flex flex-col justify-center gap-5 pr-36 max-md:w-[100%] max-md:p-0 max-md:gap-2 animate__animated "
      >
        <h1 className="text-4xl font-semibold text-[#fff] leading-normal max-md:text-xl ">
          {props.h1}
        </h1>
        <p className="text-white text-base leading-7 max-md:text-sm ">
          {props.p}
        </p>
      </motion.div>
    </div>
  );
};
