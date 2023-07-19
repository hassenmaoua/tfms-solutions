import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ActivitesStatusChart = () => {
  const statusCount = [5, 10, 64];
  const status = ['Nouveaux', 'En Cours', 'Terminer'];
  const colors = ['#6B7280', '#3B82F6', '#10B981'];

  const series = statusCount;
  const options = {
    chart: {
      type: 'donut',
    },
    labels: status,
    legend: {
      position: 'bottom',
    },
    dataLabels: {
      enabled: false,
    },
    colors: colors,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <div id='chart'>
      <ReactApexChart options={options} series={series} type='donut' />
    </div>
  );
};

export default ActivitesStatusChart;
