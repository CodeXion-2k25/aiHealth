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
      <div className="relative flex flex-col items-start top-[200px] left-[-200px] text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
        <p className="text-lg mb-6">
          Discover amazing content and explore our services.
        </p>
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold transition">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default page