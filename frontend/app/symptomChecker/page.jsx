"use client";
import React, { useState } from "react";
import { FaBrain, FaHeartbeat, FaAppleAlt } from "react-icons/fa";
import { PiCameraFill, PiUploadSimpleLight } from "react-icons/pi";
import { IoCloseCircle, IoShieldHalfOutline } from "react-icons/io5";
import { RiRobot2Fill } from "react-icons/ri";

const Page = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle File Selection (For Uploading Image)
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // Show preview
    }
  };

  // Handle Camera Capture (For Taking Image)
  const handleCameraCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // Show preview
    }
  };

  // Reset Image Selection
  const handleReset = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  return (
    <div className="">
      <div className="w-4/5 h-[140vh] m-auto mt-20 flex flex-col items-center gap-8 bg-white rounded-xl shadow-md mb-5 ">
        <div className="w-[90%] h-[60%]  mt-7">
          <h1 className="font-bold font-lato mb-3 text-xl text-gray-600">
            AI Mood Detection
          </h1>
          <div className="w-full h-full border-2 rounded-lg bg-blue-50">
            <div className="flex items-center gap-2 mt-2 ml-3">
              <FaBrain size={25} className="text-purple-500" />
              <p className="text-lg text-purple-600 font-medium">
                Emotional State Analysis
              </p>
            </div>
            <div className="w-full h-full flex gap-6 justify-center px-3 mt-3">
              <div className="w-2/4 flex flex-col gap-6">
                <div className=" py-6 border-2 border-dashed border-purple-300 bg-white rounded-lg flex flex-col items-center justify-center gap-2 relative">
                  {/* Hide UI when image is selected */}
                  {!imagePreview ? (
                    <>
                      <PiCameraFill size={60} className="text-purple-300" />
                      <p className="text-purple-500 font-popins font-medium">
                        Take a selfie or upload an image
                      </p>

                      <div className="flex gap-4">
                        {/* Take Image Button */}
                        <label
                          htmlFor="cameraInput"
                          className="px-4 py-2 bg-purple-500 text-white rounded-sm cursor-pointer flex items-center gap-1 hover:bg-purple-600 transition"
                        >
                          <PiCameraFill size={20} />
                          Open Camera
                        </label>

                        {/* Upload Image Button */}
                        <label
                          htmlFor="uploadInput"
                          className="px-4 py-2 bg-blue-500 text-white rounded-sm cursor-pointer flex items-center gap-1 hover:bg-blue-600 transition"
                        >
                          <PiUploadSimpleLight size={20} />
                          Upload Image
                        </label>
                      </div>

                      {/* Hidden Inputs */}
                      <input
                        type="file"
                        id="uploadInput"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <input
                        type="file"
                        id="cameraInput"
                        className="hidden"
                        accept="image/*"
                        capture="environment"
                        onChange={handleCameraCapture}
                      />
                    </>
                  ) : (
                    <>
                      {/* Show Selected Image Preview */}
                      <img
                        src={imagePreview}
                        alt="Selected"
                        className="w-20 object-cover rounded-lg shadow-md"
                      />

                      {/* Process and Reset Buttons */}
                      <div className="flex gap-4 mt-3">
                        <button className="px-4 py-2 bg-green-500 text-white rounded-sm hover:bg-green-600 transition">
                          Process Image
                        </button>
                        <button
                          onClick={handleReset}
                          className="px-4 py-2 bg-red-500 text-white rounded-sm flex items-center gap-1 hover:bg-red-600 transition"
                        >
                          <IoCloseCircle size={20} />
                          Reset
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <div className="h-[30%] border-2 bg-white rounded-lg shadow-sm">
                  <p className="text-md font-lato font-semibold text-purple-500 pl-4 pt-3">
                    Current Emotional State
                  </p>
                </div>
              </div>

              <div className="w-1/2 flex flex-col gap-6">
                <div className="border h-[32%] rounded-lg bg-white">
                  <p className="text-md font-lato font-semibold text-purple-500 pl-4 pt-3">
                    Personalized Recommendation
                  </p>
                </div>
                <div className="border h-[32%] rounded-lg bg-white">
                  <p className="text-md font-lato font-semibold text-purple-500 pl-4 pt-3">
                    Mental Health Resource
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[90%] m-auto mt-7 mb-4 ">
          <h1 className="font-bold font-lato mb-3 text-xl text-gray-600">
            AI Mood Detection
          </h1>
          <div className="w-full  border-2 flex flex-col items-center rounded-lg bg-blue-50 pb-6">
            <div className="w-full flex flex-col items-center">
              <div className="w-full my-2 ml-12 flex flex-col gap-2">
                <div className="flex items-center gap-2 ">
                  <RiRobot2Fill className="text-violet-500 text-3xl" />
                  <p className="text-lg text-violet-600 font-medium">
                    Interactive Symptom Analysis
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  Describe your symptoms, concerns, or how you're feeling. Our
                  AI will analyze your condition and provide personalized
                  insights.
                </p>
              </div>
              <textarea
                className="w-[96%]  min-h-[9rem] font-popins text-gray-700 text-sm border-2 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                placeholder="Example: I've been experiencing a headeche for the past 2 days, along with mild fever and fatigue..."
              ></textarea>
              <div className="w-full flex items-center justify-between px-6 mt-3">
                <div className="flex items-center text-xs gap-1">
                  <IoShieldHalfOutline className="text-green-400" />
                  <p className="text-gray-500">
                    Your information is private & secure
                  </p>
                </div>
                <button className="text-sm p-2 rounded-md border-2 border-purple-400 bg-purple-600 text-slate-100 font-medium hover:bg-violet-800 hover:text-white transition">
                  Analyze Symptom
                </button>
              </div>
            </div>
          </div>
          <div className="w-full h-32 flex mt-3 gap-5">
            <div className="w-1/2 border-2 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 font-medium mt-2 ml-2">
                Common symptoms
              </p>
            </div>
            <div className="w-1/2 border-2 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 font-medium mt-2 ml-2">
                Your symptoms
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-4/5 h-[37vh] m-auto mt-8 py-6 px-9 gap-8 bg-white rounded-xl shadow-md mb-5 ">
        <h1 className="font-bold font-lato mb-3 text-xl text-gray-600 px-5">
          Health Resources
        </h1>
        <div className="w-full flex items-center justify-center gap-5 px-5">
          <div className="w-1/3 border-2 bg-purple-100 border-purple-300 p-4 rounded-lg flex flex-col gap-3 items-start">
              <div className="flex items-center gap-1 text-base font-semibold text-purple-600">
                <FaBrain/>
                <p>Mental Wellness</p>
              </div>
              <p className="text-sm font-light text-purple-500">Access resources fpr stress management, anxiety relife, and emotional support.</p>
              <button className="p-2 border-2 rounded-md font-semibold text-slate-100 bg-purple-500 border-purple-300 hover:bg-purple-700 transition">Explore Resourses</button>
          </div>
          <div className="w-1/3 border-2  bg-blue-100 border-blue-300 p-4 rounded-lg flex flex-col gap-3 items-start">
              <div className="flex items-center gap-1 text-base font-semibold text-blue-600">
                <FaHeartbeat/>
                <p>Preventive Care</p>
              </div>
              <p className="text-sm font-light text-blue-700">Learn about screenings, vaccinations, and preventive measures</p>
              <button className="p-2 border-2 rounded-md font-semibold text-slate-100 bg-blue-600 border-blue-400 hover:bg-blue-700 transition">View Guidelines</button>
          </div>
          <div className="w-1/3 border-2  bg-green-100 border-green-300 p-4 rounded-lg flex flex-col gap-3 items-start">
              <div className="flex items-center gap-1 text-base font-semibold text-green-800">
                <FaAppleAlt/>
                <p>Nutration Guide</p>
              </div>
              <p className="text-sm font-light text-green-700">Get personalized nutration advice and healthy meal planning tips.</p>
              <button className="p-2 border-2 rounded-md font-semibold text-slate-100 bg-green-700 border-green-500 hover:bg-green-800 transition">Get Advice</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
