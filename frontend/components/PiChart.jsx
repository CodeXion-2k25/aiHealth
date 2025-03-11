"use client";

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, LabelList, ResponsiveContainer } from "recharts";

const data = [
  { name: "Proteins", value: 35, color: "#4D5DFB" },
  { name: "Carbs", value: 40, color: "#20C997" },
  { name: "Fats", value: 25, color: "#F4A52E" },
];

const NutritionChart = () => {
  const [chartSize, setChartSize] = useState({ width: 400, height: 300 });

  useEffect(() => {
    // Function to update chart size based on screen width
    const updateSize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        setChartSize({ width: 300, height: 250 }); // Mobile
      } else if (screenWidth < 1024) {
        setChartSize({ width: 500, height: 300 }); // Tablet
      } else {
        setChartSize({ width: 1000, height: 300 }); // Desktop
      }
    };

    updateSize(); // Set initial size
    window.addEventListener("resize", updateSize); // Listen for screen resizes

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      <ResponsiveContainer width="100%" height={chartSize.height}>
        <PieChart className="border">
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={chartSize.width < 400 ? 40 : 70}
            outerRadius={chartSize.width < 400 ? 80 : 120}
            fill="#8884d8"
            dataKey="value"
            labelLine={false}
            cornerRadius={10} // Rounded corners for each cell
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <LabelList dataKey="value" position="inside" fill="#fff" fontSize={12} />
          </Pie>
          <Legend verticalAlign="middle" align="right" layout="vertical" iconType="square" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NutritionChart;
