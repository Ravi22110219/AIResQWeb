import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

const WaterLevelChart = () => {
  const [data, setData] = useState([])
  const [chartData, setChartData] = useState({
    series: [{ name: 'Precipitation (mm)', data: [] }],
    options: {
      chart: {
        id: 'realtime',
        type: 'line',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: { speed: 1000 },
        },
      },
      stroke: { curve: 'smooth' },
      xaxis: { categories: [] },
      yaxis: { title: { text: 'Precipitation (mm)' } },
    },
  })

  // Load data from local JSON (later you can replace with S3 URL)
  useEffect(() => {
    fetch('https://amcdataflood.s3.ap-south-1.amazonaws.com/staticdata/rainfall_data.json')
      .then((res) => res.json())
      .then((json) => {
        setData(json)
      })
  }, [])

  // Simulate real-time updates (one point every 2 sec)
  useEffect(() => {
    if (data.length === 0) return

    let index = 0
    let interval = null
    const windowSize = 48 // Show 24 points (24 hours)

    interval = setInterval(() => {
      // Loop infinitely
      if (index >= data.length) {
        index = 0
      }
      // Get the window of data for right-to-left movement
      const start = Math.max(0, index - windowSize + 1)
      const windowData = data.slice(start, index + 1)
      setChartData((prev) => ({
        ...prev,
        series: [
          {
            name: 'Precipitation (mm)',
            data: windowData.map((d) => Number(d.ppt).toFixed(2)),
          },
        ],
        options: {
          ...prev.options,
          xaxis: {
            categories: windowData.map((d) => d.Date_and_Time),
          },
        },
      }))
      index++
    }, 2000)

    return () => clearInterval(interval)
  }, [data])

  return (
    <div>
      <h2 className="text-xl font-bold">Precipitation Per Hour</h2>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={400}
      />
    </div>
  )
}

export default WaterLevelChart
