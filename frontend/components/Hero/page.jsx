import React from 'react'

const page = () => {
  return (
    <div
      className="relative mt-[100px] w-2/3 h-[500px] rounded-lg overflow-hidden bg-cover bg-center flex justify-center mx-auto "
      style={{
        backgroundImage: "url('/assets/symptomChecker.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
      <div className="relative flex flex-col items-start top-[200px] left-[50px] text-white">
        <h1 className="text-3xl w-2/3 font-bold font-lato mb-4">Your personal AI health assistant</h1>
        <p className="text-lg  w-2/3 font-popins mb-6">
        Experience the future Healthcare with our AI powered platform. Get personalized health insights, nutrition guidance and mental Wellness support.
        </p>
        <button className="px-6 py-3 font-lato bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold transition">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default page