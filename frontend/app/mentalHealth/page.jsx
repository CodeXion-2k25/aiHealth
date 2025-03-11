import React from 'react'
import Graph from '@/components/Graph'
import DailyJournal from '@/components/DailyJournal'
import Timer from '@/components/Timer'

const page = () => {
  return (
    <>
      <div className="w-4/5 h-[70vh] m-auto mt-20 flex flex-col items-center gap-8 bg-white rounded-xl shadow-md mb-5 ">
        <div className="w-[90%]  mt-7">
          <h1 className="font-bold font-lato mb-3 text-xl text-gray-600">
            Mood Tracker
          </h1>
          <Graph/>
        </div>
      </div>
      <div className="w-4/5 h-[40vh] m-auto mt-10 flex flex-col items-center gap-8 bg-white rounded-xl shadow-md mb-5 ">
        <div className="w-[90%] mt-7">
          <h1 className="font-bold font-lato mb-3 text-xl text-gray-600">
            Daily Journal
          </h1>
          <DailyJournal/>
        </div>
      </div> 
      <div className="w-4/5 h-[40vh] m-auto mt-10 flex flex-col items-center gap-8 bg-white rounded-xl shadow-md mb-5 ">
        <div className="w-[90%] mt-7">
          <h1 className="font-bold font-lato mb-3 text-xl text-gray-600">
            Daily Journal
          </h1>
          <Timer/>
        </div>
      </div> 
    </>
  )
}

export default page