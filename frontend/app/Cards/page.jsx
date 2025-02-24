"use client"
import React from 'react'
const cards = [
    {
        title: "Smart Symptom Checker",
        desc: "Advanced Ai analysis of your symptoms with personolized and instant medical guidence",
        btn: "Check Symptoms",
        image:"/assets/symptomChecker.jpg",
        btnColor: "bg-[#0fb881]"
    },
    {
        title: "Nutration Planner",
        desc: "Personalize meal plans, nutration insights, and smart grocery recommendation tailored to your goals",
        btn:"Plan Meals",
        image:"/assets/nutrationPlanner.jpeg",
        btnColor: "bg-[#fb701a]",
    },
    {
        title:"Mental Wellness",
        desc:"Track your mood, practice guidedmeditation, and access AI-curated therapeutic content.",
        btn:"Start jouney",
        image: "/assets/mentalWellness.jpg",
        btnColor: "bg-[#3c82f1]"
    }
]


const page = () => {
  return (
        <>
            <div className='flex flex-wrap mt-5 gap-5 justify-center'>
                {cards.map((card,idx)=>{ 
                    return (
                      <div
                        key={idx}
                        // bg-[url(/assets/card-bg.webp)]
                        className="w-[20vw] flex flex-col items-start gap-2 bg-white p-4 border rounded-lg shadow-md"
                      > 
                        <img src={card.image} width={300} alt="" className='rounded-md'/>
                        <h1 className="tracking-tighter text-xl font-bold">{card.title}</h1>
                        <p className="tracking-tighter text-gray-600">{card.desc}</p>
                        <button className={`mt-2 px-4 py-2 text-white rounded ${card.btnColor}`}>{card.btn}</button>
                      </div>
                    );
                })}
            </div>
        </>
  )
}

export default page