"use client"
import React, { useState } from 'react'
import { FaBrain } from "react-icons/fa";
import { PiCameraFill, PiUploadSimpleLight  } from "react-icons/pi";

const page = () => {
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


  return (
    <div className="w-full">
      <div className="w-4/5 h-[150vh] border m-auto mt-20 flex flex-col  bg-white rounded-xl shadow-md ">
        <div className="w-[90%] h-full m-auto mt-7">
          <h1 className="font-bold font-lato mb-3 text-xl text-gray-600">
            AI Mood Detection
          </h1>
          <div className="w-full h-[45%] border-2 rounded-lg bg-blue-50 ">
            <div className="flex items-center gap-2 mt-2 ml-3">
              <FaBrain size={25} className="text-purple-500" />
              <p className="text-lg text-purple-600 font-medium ">
                Emotional State Analysis
              </p>
            </div>
            <div className="w-full h-full flex gap-6  justify-center px-3 mt-3">
              <div className="w-2/4 flex flex-col gap-6">
                <div className="h-2/5 border-2 border-dashed border-purple-300 bg-white rounded-lg flex flex-col items-center justify-center gap-2">
                  <PiCameraFill size={60} className="text-purple-300" />
                  <p className="text-purple-500 font-popins font-medium">
                    Take a selfie or upload an image
                  </p>
                  <div className="flex flex-col items-center gap-4">
                    {/* Hidden File Input for Upload */}
                    <input
                      type="file"
                      id="uploadInput"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />

                    {/* Hidden File Input for Camera Capture */}
                    <input
                      type="file"
                      id="cameraInput"
                      className="hidden"
                      accept="image/*"
                      capture="environment" // Opens Camera for Taking Image
                      onChange={handleCameraCapture}
                    />

                    {/* Buttons */}
                    <div className="flex gap-4">
                      {/* Take Image Button */}
                      <label
                        htmlFor="cameraInput"
                        className="px-4 py-2 bg-purple-500 text-white rounded-sm cursor-pointer flex items-center gap-1 hover:bg-purple-600 transition"
                      >
                        <PiCameraFill size={20}/>
                        Open Camera
                      </label>

                      {/* Upload Image Button */}
                      <label
                        htmlFor="uploadInput"
                        className="px-4 py-2 bg-blue-500 text-white rounded-sm cursor-pointer flex items-center gap-1 hover:bg-blue-600 transition"
                      >
                        <PiUploadSimpleLight size={20}/>
                        Upload Image
                      </label>
                    </div>

                    {/* Show Selected Image Preview */}
                    {imagePreview && (
                      <div className="mt-4">
                        <img
                          src={imagePreview}
                          alt="Selected"
                          className="w-40 h-40 object-cover rounded-lg shadow-md"
                        />
                        <p className="text-gray-700 mt-2">
                          {selectedFile?.name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="h-2/5 border-2 bg-white rounded-lg shadow-sm">
                  <p className='text-md font-lato font-semibold text-purple-500 pl-4 pt-3'>Current Emotional State</p>
                </div>
              </div>
              <div className="w-1/2  flex flex-col gap-6">
                <div className="border h-[32%] rounded-lg bg-white">
                   <p className='text-md font-lato font-semibold text-purple-500 pl-4 pt-3'>Personalized Recomendation</p>
                </div>
                <div className="border h-[32%] rounded-lg bg-white">
                  <p className='text-md font-lato font-semibold text-purple-500 pl-4 pt-3'>Mental Health Resource</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page