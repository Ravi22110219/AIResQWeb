import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./SummarySection.module.css";


import { useEffect } from "react";

// Example useEffect for API call
// useEffect(() => {
//   fetch("https://api.example.com/cities")
//     .then((response) => response.json())
//     .then((data) => {
//       // Process and set the API data
//     });
// }, []);


// Dummy data simulating API response
const cityData = [
  {
    city: "Mumbai",
    iframeLink: "https://ravi22110219.github.io/KozhikodeFloodMap/",
    insights: "Mumbai insights data for the selected date.",
  },
  {
    city: "Delhi",
    iframeLink: "https://example.com/delhi",
    insights: "Delhi insights data for the selected date.",
  },
  {
    city: "Bangalore",
    iframeLink: "https://example.com/bangalore",
    insights: "Bangalore insights data for the selected date.",
  },
  {
    city: "Chennai",
    iframeLink: "https://example.com/chennai",
    insights: "Chennai insights data for the selected date.",
  },
  {
    city: "Kolkata",
    iframeLink: "https://example.com/kolkata",
    insights: "Kolkata insights data for the selected date.",
  },
  {
    city: "Hyderabad",
    iframeLink: "https://example.com/hyderabad",
    insights: "Hyderabad insights data for the selected date.",
  },
];

const SummarySection = () => {
  const [selectedCity, setSelectedCity] = useState(cityData[0].city);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [iframeContent, setIframeContent] = useState(cityData[0].iframeLink);
  const [insightsContent, setInsightsContent] = useState(cityData[0].insights);

  // Handle city change
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  // Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Update iframe and insights content based on city and date
    const cityInfo = cityData.find((data) => data.city === selectedCity);
    if (cityInfo) {
      setIframeContent(cityInfo.iframeLink);
      setInsightsContent(
        `${cityInfo.insights} Date: ${date.toLocaleDateString()}`
      );
    }
  };

  return (
    <div className={styles.heroSection}>
      <div className={styles.filters}>
        <select
          className={styles.cityDropdown}
          value={selectedCity}
          onChange={handleCityChange}
        >
          {cityData.map((data) => (
            <option key={data.city} value={data.city}>
              {data.city}
            </option>
          ))}
        </select>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          className={styles.datePicker}
          placeholderText="Select date"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.htmlSection}>
          <iframe
            src={iframeContent}
            title="Dynamic Content"
            width="100%"
            height="100%"
            style={{ border: "none" }}
          />
        </div>
        <div className={styles.insightsSection}>
          <p>{insightsContent}</p>
        </div>
      </div>
    </div>
  );
};

export default SummarySection;
