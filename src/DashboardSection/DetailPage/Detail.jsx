import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Chart from "react-apexcharts";
import styles from "./Detail.module.css";


// for API Call

// useEffect(() => {
//   // Example API call
//   fetch("https://api.example.com/cities")
//     .then((response) => response.json())
//     .then((data) => {
//       // Process and set the city and sub-city data
//     });
// }, []);

// Dummy data simulating API response
const cityData = [
  {
    city: "Mumbai",
    subCities: ["Andheri", "Borivali", "Dadar", "Thane"],
  },
  {
    city: "Delhi",
    subCities: ["Connaught Place", "Chandni Chowk", "Rohini", "Dwarka"],
  },
  {
    city: "Bangalore",
    subCities: ["Koramangala", "Whitefield", "Indiranagar", "Jayanagar"],
  },
  {
    city: "Chennai",
    subCities: ["T. Nagar", "Adyar", "Velachery", " Anna Nagar"],
  },
  {
    city: "Kolkata",
    subCities: ["Howrah", "Salt Lake", "New Town", "Park Street"],
  },
  {
    city: "Hyderabad",
    subCities: ["Madhapur", "Banjara Hills", "Kukatpally", "Gachibowli"],
  },
];

const DetailPage = () => {
  const [selectedCity, setSelectedCity] = useState(cityData[0].city);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [subCityData, setSubCityData] = useState(generateDummyData());

  // Generate random dummy data for sub-cities
  function generateDummyData() {
    return Array.from({ length: 4 }, () => ({
      time: Array.from({ length: 24 }, (_, i) => i + 1), // Hours of the day
      waterLevel: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100) + 1), // Random water levels
    }));
  }

  // Update sub-city data when city or date changes
  useEffect(() => {
    setSubCityData(generateDummyData());
  }, [selectedCity, selectedDate]);

  return (
    <div className={styles.detailPage}>
      {/* Filters Section */}
      <div className={styles.filters}>
        <select
          className={styles.cityDropdown}
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {cityData.map((data) => (
            <option key={data.city} value={data.city}>
              {data.city}
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

      {/* Charts Section */}
      <div className={styles.chartsContainer}>
        {cityData
          .find((data) => data.city === selectedCity)
          .subCities.map((subCity, index) => (
            <ChartBox
              key={subCity}
              title={`Water Level in ${subCity}`}
              timeData={subCityData[index].time}
              waterLevelData={subCityData[index].waterLevel}
            />
          ))}
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

export default DetailPage;
