"use client"
import { useState } from "react";
import { motion } from "framer-motion";

const directLink= [
    {
        name: "google",
        img: "/assets/google.png"
        
    },
    {
        name: "facebook",
        img: "/assets/facebook.png"
        
    },{
        name: "instagram",
        img: "/assets/instagram.png"
        
    },{
        name: "LinkdIn",
        img: "/assets/linkedin.png"
        
    },{
        name: "X",
        img: "/assets/X.png"
        
    }
];

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="z-20 flex items-center min-h-screen">
      <div className="relative flex items-center justify-center rounded-lg overflow-hidden ">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          key={isSignUp ? "signup" : "signin"}
          className="flex items-center justify-center"
        >
          <div className="w-[450px] h-[300px] bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-lg">hello</div>
          <div className=" bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-2">
              {isSignUp ? "Sign Up" : "Sign In"}
            </h2>

            {/* ----user login form---- */}
            <form className="w-[450px] h-[300px] flex flex-col items-start justify-center ">
              {/* for sign up */}
              {isSignUp ? (
                <>
                  <label className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="First Name"
                      className=" p-1 mb-3 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className=" p-1 mb-3 border rounded"
                    />
                  </label>
                  <label className="flex gap-2 mb-3">
                    <input
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
                    type="email"
                    placeholder="Email"
                    className="w-full p-1 mb-3 border rounded"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-1 mb-4 border rounded"
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full p-1 mb-4 border rounded"
                  />
                </>
              ) : (
                //for sign in 
                <>
                  <input
                    type="email or username"
                    placeholder="text"
                    className="w-2/3 m-auto mt-1 p-1 mb-3 border rounded"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-2/3 m-auto mt-1 p-1 mb-4 border rounded"
                  />
                  <div className="w-full relative flex justify-between mb-4">
                    <label className="flex gap-2">
                      <p>Remember me</p>
                      <input type="checkbox" name="rememberMe" id="" />
                    </label>
                    <a href="/" className="text-blue-500">Forget password?</a>
                  </div>
                </>
              )}
                {/* button for submitting the form */}

              <button className="w-2/3 relative m-auto mt-1 mb-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>
              
              {/*---authentication direct links---*/}
            <p className="text-center mb-2">or</p>
            <div className="flex gap-10 items-center justify-center">
              {directLink.map((link, idx) => {
                return (
                  <div key={idx} className="p-2">
                    <button className="w-[30px] flex flex-col items-center ">
                      <img src={link.img} alt="" />
                      <p className="text-gray-400">{link.name}</p>
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
