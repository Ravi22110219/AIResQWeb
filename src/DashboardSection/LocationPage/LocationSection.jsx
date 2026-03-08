import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Chart from "react-apexcharts";
import styles from "./LocationSection.module.css"; // CSS module for styling

// Dummy data simulating API response
const cityData = [
  {
    city: "Mumbai",
    subCities: ["Andheri", "Borivali", "Dadar", "Thane"],
    iframeLink: "https://ravi22110219.github.io/KozhikodeFloodMap/",
    insights: "Mumbai insights data for the selected date.",
  },
  {
    city: "Delhi",
    subCities: ["Connaught Place", "Chandni Chowk", "Rohini", "Dwarka"],
    iframeLink: "https://example.com/delhi",
    insights: "Delhi insights data for the selected date.",
  },
  {
    city: "Bangalore",
    subCities: ["Koramangala", "Whitefield", "Indiranagar", "Jayanagar"],
    iframeLink: "https://example.com/bangalore",
    insights: "Bangalore insights data for the selected date.",
  },
  {
    city: "Chennai",
    subCities: ["T. Nagar", "Adyar", "Velachery", "Anna Nagar"],
    iframeLink: "https://example.com/chennai",
    insights: "Chennai insights data for the selected date.",
  },
  {
    city: "Kolkata",
    subCities: ["Howrah", "Salt Lake", "New Town", "Park Street"],
    iframeLink: "https://example.com/kolkata",
    insights: "Kolkata insights data for the selected date.",
  },
  {
    city: "Hyderabad",
    subCities: ["Madhapur", "Banjara Hills", "Kukatpally", "Gachibowli"],
    iframeLink: "https://example.com/hyderabad",
    insights: "Hyderabad insights data for the selected date.",
  },
];

const LocationSection = () => {
  const [selectedCity, setSelectedCity] = useState(cityData[0].city);
  const [selectedSubCity, setSelectedSubCity] = useState(
    cityData[0].subCities[0]
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [iframeContent, setIframeContent] = useState(cityData[0].iframeLink);
  const [insightsContent, setInsightsContent] = useState(cityData[0].insights);
  const [chartData, setChartData] = useState(generateDummyData());

  // Generate random dummy data for the chart
  function generateDummyData() {
    return {
      time: Array.from({ length: 24 }, (_, i) => i + 1), // Hours of the day
      waterLevel: Array.from({ length: 24 }, () =>
        Math.floor(Math.random() * 100) + 1
      ), // Random water levels
    };
  }

  // Update iframe, insights, and chart data when city, sub-city, or date changes
  useEffect(() => {
    const cityInfo = cityData.find((data) => data.city === selectedCity);
    if (cityInfo) {
      setIframeContent(cityInfo.iframeLink);
      setInsightsContent(
        `${cityInfo.insights} Selected Sub-City: ${selectedSubCity}. Date: ${selectedDate.toLocaleDateString()}`
      );
      setChartData(generateDummyData());
    }
  }, [selectedCity, selectedSubCity, selectedDate]);

  return (
    <div className={styles.locationSection}>
      {/* Filters Section */}
      <div className={styles.filters}>
        <select
          className={styles.cityDropdown}
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            setSelectedSubCity(cityData.find((c) => c.city === e.target.value).subCities[0]);
          }}
        >
          {cityData.map((data) => (
            <option key={data.city} value={data.city}>
              {data.city}
            </option>
          ))}
        </select>
        <select
          className={styles.subCityDropdown}
          value={selectedSubCity}
          onChange={(e) => setSelectedSubCity(e.target.value)}
        >
          {cityData
            .find((data) => data.city === selectedCity)
            .subCities.map((subCity) => (
              <option key={subCity} value={subCity}>
                {subCity}
              </option>
            ))}
        </select>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className={styles.datePicker}
          placeholderText="Select date"
        />
      </div>

      {/* Content Section */}
      <div className={styles.content}>
        {/* Iframe Section */}
        <div className={styles.htmlSection}>
          <iframe
            src={iframeContent}
            title="Dynamic Content"
            width="100%"
            height="100%"
            style={{ border: "none" }}
          />
        </div>

        {/* Insights Section */}
        <div className={styles.insightsSection}>
          <p>{insightsContent}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className={styles.chartSection}>
        <ChartBox
          title={`Water Level in ${selectedSubCity}`}
          timeData={chartData.time}
          waterLevelData={chartData.waterLevel}
        />
      </div>
    </div>
  );
};

// Chart Box Component
const ChartBox = ({ title, timeData, waterLevelData }) => {
  const options = {
    chart: { id: title },
    xaxis: { categories: timeData, title: { text: "Time (Hours)" } },
    yaxis: { title: { text: "Water Level" } },
  };
  const series = [{ name: "Water Level", data: waterLevelData }];

  return (
    <div className={styles.chartBox}>
      <h3>{title}</h3>
      <Chart options={options} series={series} type="line" height={300} />
    </div>
  );
};

export default LocationSection;
