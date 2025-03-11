"use client"
import React from 'react'
import dynamic from "next/dynamic";
import ProgressBar from '@/components/ProgressBar'
import Food from '@/components/Food'
import Recipe from '@/components/Recipe'

const NutritionChart = dynamic(() => import("@/components/PiChart"), {
  ssr: false, // Disable Server-Side Rendering
});


const page = () => {
  return (
    <>
     <div className="w-4/5 h-[60vh] m-auto mt-20 flex flex-col items-center gap-8 bg-white rounded-xl shadow-md mb-5 ">
        <div className="w-[90%]  mt-7">
          <h1 className="font-bold font-lato mb-3 text-xl text-gray-600">
            Nutration Overview
          </h1>
          <NutritionChart/>
        </div>
      </div> 
      <div className="w-4/5 m-auto mt-7 flex flex-col items-center gap-8 bg-white rounded-xl shadow-md mb-5 ">
        <div className=" w-[90%] py-4">
          <ProgressBar/>
        </div>
      </div> 
      <div className="w-4/5 m-auto mt-7 flex flex-col items-center gap-8 bg-white rounded-xl shadow-md mb-5 ">
        <div className="w-[90%] py-4">
          <h1 className="font-bold font-lato mb-3 text-xl text-gray-600">
            Meal Tracker
          </h1>
          <Food/>
        </div>
      </div> 
      <div className="w-4/5 m-auto mt-7 flex flex-col items-center gap-8 bg-white rounded-xl shadow-md mb-5 ">
        <div className="w-[90%] py-4">
          <h1 className="font-bold font-lato mb-3 text-xl text-gray-600">
            Meal Tracker
          </h1>
          <Recipe/>
        </div>
      </div> 
      
    </> 
  )  
}

export default page