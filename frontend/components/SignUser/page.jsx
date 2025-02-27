"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { FaAppleAlt,FaBriefcaseMedical, FaUser } from "react-icons/fa";
import { RiMentalHealthFill } from "react-icons/ri";
import { TbDeviceWatchBolt } from "react-icons/tb";
import { IoLockClosed } from "react-icons/io5";

const directLink= [
    {
        name: "google",
        img: "/assets/google.png"
        
    },
    {
        name: "facebook",
        img: "/assets/facebook.png"
        
    }
];

const logSideDesign =[
  {
    icon:<RiMentalHealthFill size={25}/>,
    title:"Mentalk Wellness Tracking"
  },
  {
    icon:<TbDeviceWatchBolt size={25} />,
    title:"Health Monitoring"
  },
  {
    icon:<FaAppleAlt size={25} />,
    title:"Nutration planning"
  },
  {
    icon:<FaBriefcaseMedical size={25} />,
    title:"Medical Assistance"
  }
];

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="z-20 flex items-center min-h-screen">
      <div className=" flex items-center justify-center rounded-lg overflow-hidden ">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          key={isSignUp ? "signup" : "signin"}
          className="flex items-center justify-center"
        >
          <div className="w-[450px] h-[539px] relative p-6 rounded-s-xl shadow-lg border border-white/30 backdrop-blur-lg">
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-400 opacity-60 rounded-s-xl"></div>

            {/* Content */}
            <div className="flex flex-wrap gap-6 relative">
              {logSideDesign.map((icon, idx) => {
                return (
                  <div
                    key={idx}
                    className="w-[180px] h-[120px] text-white bg-white/40 rounded-lg p-4 flex flex-col gap-3"
                  >
                    {icon.icon}
                    <p className="text-white font-popins">{icon.title}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Login / Sign up Div */}

          <div className=" bg-white/60 backdrop-blur-lg border border-white/30 rounded-e-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-3 font-popins">
              {isSignUp ? "Sign Up" : "Sign In"}
            </h2>

            {/* ----user login form---- */}
            <form className="w-[450px] h-[300px] flex flex-col items-start justify-center ">
              {/* for sign up */}
              {isSignUp ? (
                <>
                  <label className="flex items-center gap-3">
                    <input
                      required
                      type="text"
                      placeholder="First Name"
                      className=" p-1 mb-3 border rounded"
                    />
                    <input
                      required
                      type="text"
                      placeholder="Last Name"
                      className=" p-1 mb-3 border rounded"
                    />
                  </label>
                  <label className="flex gap-2 mb-3">
                    <input
                      required
                      type="text"
                      placeholder="Mobile "
                      className="w-full p-1 border rounded"
                    />
                    <input
                      type="button"
                      value="Get OTP"
                      className="bg-blue-500 p-1 rounded-md text-white cursor-pointer hover:bg-blue-600"
                    />
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    className="w-full p-1 mb-3 border rounded"
                  />
                  <input
                    required
                    type="password"
                    placeholder="Password"
                    className="w-full p-1 mb-4 border rounded"
                  />
                  <input
                    required
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full p-1 mb-4 border rounded"
                  />
                </>
              ) : (
                //for sign in
                <>
                  <div className="w-full h-full flex flex-col items-center justify-center ">
                    <label className="w-2/3 mt-1 mb-3 ">
                      <div className="flex items-center gap-2 mb-2">
                        <FaUser className="text-purple-600" />
                        <p className="font-popins font-semibold text-gray-700">Email or username</p>
                      </div>
                      <input
                        type="text"
                        placeholder="username"
                        className="w-full bg-blue-50 text-gray-800 outline-none p-1 border rounded"
                      />
                    </label>
                    <label className="w-2/3 mt-1 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <IoLockClosed className="text-purple-600" />
                        <p className="font-popins font-semibold text-gray-700">Password</p>
                      </div>
                      <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-blue-50 outline-none text-gray-800 m-auto mt-1 p-1 mb-4 border rounded"
                      />
                    </label>
                  </div>
                  <div className="w-full relative flex justify-between mb-4">
                    <label className="flex gap-1 items-center">
                      <input type="checkbox" name="rememberMe" id="" className="accent-purple-500" />
                      <p>Remember me</p>
                    </label>
                    <a href="/" className="text-purple-500">
                      Forget password?
                    </a>
                  </div>
                </>
              )}
              {/* button for submitting the form */}

              <button className="w-2/3 text-white font-semibold  relative m-auto mt-1 mb-1 p-2 inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-400 rounded hover:shadow-md">
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>

            {/*---authentication direct links---*/}
            <p className="text-center mt-1 mb-2">or continue with</p>
            <div className="flex gap-10 items-center justify-center">
              {directLink.map((link, idx) => {
                return (
                  <div key={idx} className="p-2">
                    <button className="w-[30px] flex flex-col items-center ">
                      <img src={link.img} alt="" />
                      <p className="text-gray-600">{link.name}</p>
                    </button>
                  </div>
                );
              })}
            </div>

            <p className="mt-4 text-center text-sm">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button
                className="text-blue-500 font-semibold ml-1"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
