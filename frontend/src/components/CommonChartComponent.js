import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
const CommonChartComponent = (props) => {
  debugger;
  const [stated, setStated] = useState({
    series: props.question.series,
    options: {
      chart: {
        width: 300,
        type: "donut",
        align: "center",
        offsetX: 10,
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      labels: props.question.labels,
      fill: {
        type: "gradient",
      },
      legend: {
        position: "left",
        width: 200,
        fontSize: "16px",
        offsetY: 20,
        offsetX: 20,
        fontFamily: 'Roboto sans-serif'
      },
      title: {
        style: {
          fontSize: "16px",
          fontFamily: 'Roboto sans-serif',
        },
        margin: 10,
        align: "left",
        text: props.question.title,
      },
      responsive: [
        {
          breakpoint: 380,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              horizontalAlign: "right",
              floating: true,
            },
          },
        },
      ],
    },
  });
  return (
    <ReactApexChart
      options={stated.options}
      series={stated.series}
      type="donut"
      width={500}
    />
  );
};

export default CommonChartComponent;
