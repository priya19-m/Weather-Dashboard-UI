import React, { useState } from "react";
import "./App.css";

function App() {
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [monthYear, setMonthYear] = useState("");
  const [statsYear, setStatsYear] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [stats, setStats] = useState(null);
  const [message, setMessage] = useState("");

  const latitude = 28.7041; 
  const longitude = 77.1025;
  const fetchWeatherData = async (startDate, endDate) => {
    try {
      const response = await fetch(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean&timezone=Asia/Kolkata`
      );
      const data = await response.json();
      if (data?.daily?.time) {
        return data.daily.time.map((d, i) => ({
          date: d,
          avgtempC: data.daily.temperature_2m_mean[i],
          maxtempC: data.daily.temperature_2m_max[i],
          mintempC: data.daily.temperature_2m_min[i],
        }));
      }
      return [];
    } catch (error) {
      setMessage("Failed to fetch weather data");
      return [];
    }
  };

  const handleDateSearch = async () => {
    if (!date) {
      setMessage("Please select a date");
      return;
    }
    setMessage("Loading...");
    setStats(null);

    const data = await fetchWeatherData(date, date);
    if (data.length === 0) {
      setWeatherData([]);
      setMessage("No data found");
    } else {
      setWeatherData(data);
      setMessage("");
    }
  };

  const handleMonthSearch = async () => {
    if (!month || !monthYear) {
      setMessage("Please select month and year");
      return;
    }
    setMessage("Loading...");
    setStats(null);
    const startDate = `${monthYear}-${month.toString().padStart(2, "0")}-01`;
    const endDate = `${monthYear}-${month.toString().padStart(2, "0")}-31`;
    const data = await fetchWeatherData(startDate, endDate);
    if (data.length === 0) {
      setWeatherData([]);
      setMessage("No data found");
    } else {
      setWeatherData(data);
      setMessage("");
    }
  };

  const handleStats = async () => {
    if (!statsYear) {
      setMessage("Please enter year for statistics");
      return;
    }
    setMessage("Loading...");
    setWeatherData([]);
    const startDate = `${statsYear}-01-01`;
    const endDate = `${statsYear}-12-31`;
    const data = await fetchWeatherData(startDate, endDate);
    if (data.length === 0) {
      setMessage("No data found");
      return;
    }
    const temps = data.map((item) => item.avgtempC).sort((a, b) => a - b);
    const min = temps[0];
    const max = temps[temps.length - 1];
    const median =
      temps.length % 2 === 0
        ? (temps[temps.length / 2] + temps[temps.length / 2 - 1]) / 2
        : temps[Math.floor(temps.length / 2)];

    setStats({ min, high: max, median });
    setMessage("");
  };

  return (
    <div className="container">
      <h2>Delhi Weather Dashboard</h2>
      <div className="filter">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleDateSearch}>Get By Date</button>
      </div>
      <div className="filter">
        <input
          type="number"
          placeholder="Enter Year"
          value={monthYear}
          onChange={(e) => setMonthYear(e.target.value)}
        />
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">Select Month</option>
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <button onClick={handleMonthSearch}>Get By Month</button>
      </div>
      <div className="filter">
        <input
          type="number"
          placeholder="Enter Year for Statistics"
          value={statsYear}
          onChange={(e) => setStatsYear(e.target.value)}
        />
        <button onClick={handleStats}>Get Statistics</button>
      </div>
      <div className="message">{message}</div>
      {weatherData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Avg Temp (°C)</th>
              <th>Max Temp (°C)</th>
              <th>Min Temp (°C)</th>
            </tr>
          </thead>
          <tbody>
            {weatherData.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.avgtempC}</td>
                <td>{item.maxtempC}</td>
                <td>{item.mintempC}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {stats && (
        <div className="stats">
          <h3>Temperature Statistics</h3>
          <p>High: {stats.high} °C</p>
          <p>Median: {stats.median} °C</p>
          <p>Minimum: {stats.min} °C</p>
        </div>
      )}
    </div>
  );
}

export default App;