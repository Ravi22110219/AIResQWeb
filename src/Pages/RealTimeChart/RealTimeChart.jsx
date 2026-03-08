import React, { useState, useEffect, useRef } from "react";
import Chart from "react-apexcharts";
import Papa from "papaparse";

const CSV_URL =
  "https://airesq-web-video.s3.ap-south-1.amazonaws.com/kohirainfall/kozhikoderainfall.csv";

const WINDOW_SIZE = 12;

const RealTimeChart = () => {
  const [categories, setCategories] = useState([]);
  const [series, setSeries] = useState([
    { name: "Precipitation", data: [] },
  ]);
  const [stats, setStats] = useState({
    current: 0,
    max: 0,
    avg: 0,
    lastUpdate: null
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(2000);
  const [showAlert, setShowAlert] = useState(false);
  const [lastDataDate, setLastDataDate] = useState('');

  const fullDataRef = useRef({ times: [], values: [], rawDates: [] });
  const indexRef = useRef(0);
  const intervalRef = useRef(null);

  // Load from S3
  useEffect(() => {
    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const clean = results.data.filter(r => r.time);

        // Store raw dates for last update info
        const rawDates = clean.map(d => new Date(d.time));
        
        const times = clean.map(d =>
          new Date(d.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          })
        );

        const values = clean.map(d => d.precipitation);

        // Get the last date from the data
        if (rawDates.length > 0) {
          const lastDate = rawDates[rawDates.length - 1];
          setLastDataDate(lastDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }));
        }

        fullDataRef.current = { times, values, rawDates };

        const initialData = values.slice(0, WINDOW_SIZE);
        setCategories(times.slice(0, WINDOW_SIZE));
        setSeries([{ name: "Precipitation", data: initialData }]);
        updateStats(initialData);

        indexRef.current = WINDOW_SIZE;
      },
      error: (err) => {
        console.error("CSV load error:", err);
      },
    });
  }, []);

  // Update statistics
  const updateStats = (data) => {
    const currentVal = data[data.length - 1] || 0;
    const maxVal = Math.max(...data);
    const avgVal = data.reduce((a, b) => a + b, 0) / data.length || 0;
    
    setStats({
      current: currentVal.toFixed(1),
      max: maxVal.toFixed(1),
      avg: avgVal.toFixed(1),
      lastUpdate: new Date().toLocaleTimeString()
    });

    // Trigger alert for heavy rain (>10mm)
    setShowAlert(currentVal > 10);
  };

  // Real-time sliding
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        const { times, values } = fullDataRef.current;
        if (!times.length) return;

        const i = indexRef.current % times.length;

        setCategories(prev => [...prev.slice(1), times[i]]);
        setSeries(prev => {
          const newData = [...prev[0].data.slice(1), values[i]];
          updateStats(newData);
          return [{ name: "Precipitation", data: newData }];
        });

        indexRef.current += 1;
      }, speed);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, speed]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetChart = () => {
    const { times, values } = fullDataRef.current;
    if (!times.length) return;

    indexRef.current = WINDOW_SIZE;
    const resetData = values.slice(0, WINDOW_SIZE);
    
    setCategories(times.slice(0, WINDOW_SIZE));
    setSeries([{ name: "Precipitation", data: resetData }]);
    updateStats(resetData);
  };

  // New color theme: #6BC3D2, #5CADBA, #5298A9
  const primaryColor = "#6BC3D2";
  const secondaryColor = "#5CADBA";
  const tertiaryColor = "#5298A9";

  const options = {
    chart: {
      id: "rain-realtime",
      type: "area",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: { speed: 600 },
      },
      toolbar: { 
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
      },
      zoom: { enabled: true },
      background: '#ffffff',
      foreColor: '#333333',
      dropShadow: {
        enabled: true,
        top: 3,
        left: 2,
        blur: 4,
        opacity: 0.1,
        color: '#000000'
      }
    },

    title: {
      text: "Kozhikode",
      align: "left",
      style: { 
        fontSize: "20px", 
        fontWeight: 600,
        color: '#1a2639',
        fontFamily: 'Inter, sans-serif'
      },
    },

    subtitle: {
      text: `Last data: ${lastDataDate || '--'} • Updated: ${stats.lastUpdate || '--'}`,
      align: "left",
      style: {
        fontSize: "12px",
        color: '#6b7280'
      }
    },

    stroke: { 
      curve: "smooth", 
      width: 3,
      lineCap: 'round',
      colors: [primaryColor]
    },

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: primaryColor,
            opacity: 0.6
          },
          {
            offset: 50,
            color: secondaryColor,
            opacity: 0.4
          },
          {
            offset: 100,
            color: tertiaryColor,
            opacity: 0.1
          }
        ]
      },
    },

    colors: [primaryColor],

    dataLabels: {
      enabled: false
    },

    markers: {
      size: 4,
      colors: ['#ffffff'],
      strokeColors: primaryColor,
      strokeWidth: 2,
      hover: {
        size: 6
      }
    },

    xaxis: { 
      categories,
      labels: {
        style: {
          colors: '#4b5563',
          fontSize: '11px',
          fontWeight: 500
        },
        rotate: -45,
        rotateAlways: true,
        trim: true
      },
      axisBorder: {
        color: '#e5e7eb'
      },
      axisTicks: {
        color: '#e5e7eb'
      },
      title: {
        text: 'Time',
        style: {
          color: '#374151',
          fontSize: '12px',
          fontWeight: 500
        }
      }
    },

    yaxis: {
      title: { 
        text: "Precipitation (mm)",
        style: {
          color: '#374151',
          fontSize: '12px',
          fontWeight: 500
        }
      },
      min: 0,
      labels: {
        style: {
          colors: '#4b5563',
          fontSize: '11px'
        }
      },
      axisBorder: {
        color: '#e5e7eb'
      }
    },

    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 5,
      row: {
        colors: ['#f9fafb', 'transparent'],
        opacity: 0.3
      }
    },

    tooltip: {
      theme: 'light',
      y: { 
        formatter: val => `${val} mm`,
        title: {
          formatter: () => 'Rainfall:'
        }
      },
      marker: {
        show: true,
        fillColors: [primaryColor]
      },
      style: {
        fontSize: '12px',
        background: '#ffffff'
      }
    },

    annotations: showAlert ? {
      yaxis: [
        {
          y: 10,
          borderColor: "#ef4444",
          borderWidth: 2,
          label: {
            text: "⚠️ Heavy Rain Alert",
            style: {
              background: "#ef4444",
              color: "#fff",
              fontSize: "11px",
              fontWeight: 600,
              padding: { left: 8, right: 8, top: 4, bottom: 4 },
              borderRadius: "12px"
            },
          },
        },
      ],
    } : {},

    states: {
      hover: {
        filter: {
          type: 'lighten',
          value: 0.05
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'darken',
          value: 0.2
        }
      }
    }
  };

  return (
    <div style={{ maxWidth: '96%', margin: '20px auto' }}>
      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        marginBottom: '20px',
        padding: '0 10px'
      }}>
        <div style={statCardStyle}>
          <span style={statLabelStyle}>Max (24h)</span>
          <span style={{...statValueStyle, color: '#dc2626'}}>{stats.max} mm</span>
        </div>
        <div style={statCardStyle}>
          <span style={statLabelStyle}>Average</span>
          <span style={{...statValueStyle, color: '#059669'}}>{stats.avg} mm</span>
        </div>
        <div style={statCardStyle}>
          <span style={statLabelStyle}>Status</span>
          <span style={{
            ...statValueStyle,
            color: showAlert ? '#dc2626' : '#059669',
            fontSize: '14px'
          }}>
            {showAlert ? '⚠️ Heavy Rain' : '✓ Normal'}
          </span>
        </div>
      </div>

      {/* Main Chart Container */}
      <div
        style={{
          width: "100%",
          height: "480px",
          background: "#ffffff",
          borderRadius: "24px",
          padding: "24px",
          boxShadow: "0 20px 40px -15px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)",
          border: "1px solid #f3f4f6",
        }}
      >
        <Chart options={options} series={series} type="area" height={400} />
        
        {/* Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '20px',
          paddingTop: '16px',
          borderTop: '1px solid #f0f0f0'
        }}>
          {/* Commented out controls as per original */}
        </div>
      </div>

      {/* Legend */}
      <div style={{
        marginTop: '16px',
        padding: '12px 20px',
        background: '#f9fafb',
        borderRadius: '40px',
        fontSize: '13px',
        color: '#4b5563',
        display: 'flex',
        gap: '24px',
        border: '1px solid #f0f0f0',
        flexWrap: 'wrap'
      }}>
        <span>📊 <strong>10mm</strong> = Heavy rain threshold</span>
        <span>⏱️ rainfall data interval: 30 min</span>
    
      </div>
    </div>
  );
};

// Styles
const statCardStyle = {
  background: '#ffffff',
  padding: '16px 20px',
  borderRadius: '20px',
  border: '1px solid #f0f0f0',
  boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px'
};

const statLabelStyle = {
  fontSize: '13px',
  color: '#6b7280',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.3px'
};

const statValueStyle = {
  fontSize: '28px',
  fontWeight: 600,
  lineHeight: '1.2'
};

const controlButtonStyle = {
  padding: '8px 20px',
  borderRadius: '40px',
  border: '1px solid #e5e7eb',
  fontSize: '13px',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.2s',
  outline: 'none'
};

const selectStyle = {
  padding: '8px 32px 8px 16px',
  borderRadius: '40px',
  border: '1px solid #e5e7eb',
  fontSize: '13px',
  color: '#1f2937',
  background: '#ffffff',
  cursor: 'pointer',
  outline: 'none',
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center',
  backgroundSize: '14px'
};

export default RealTimeChart;