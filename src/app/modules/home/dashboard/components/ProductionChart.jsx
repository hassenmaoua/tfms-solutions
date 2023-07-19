import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ProductionChart = () => {
  const [chartData] = useState({
    series: [
      {
        name: 'Activites',
        data: [0, 6, 10, 13, 12, 10, 15, 18, 20],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },

      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
        ],
      },
    },
  });

  return (
    <div id='chart'>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type='line'
        height={350}
      />
    </div>
  );
};

export default ProductionChart;
