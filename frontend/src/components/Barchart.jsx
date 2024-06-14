'use client'
import React from 'react'
import { Bar } from 'react-chartjs-2';
import {} from 'chart.js/auto';

const Barchart = ({dataChart, optionsChart}) => {
  return (
    <div className="barchart-container mt-[10px] ml-[50px] h-[60vh] w-[55vw]">
        <Bar data={dataChart} options={optionsChart} />
    </div>
  )
}

export default Barchart