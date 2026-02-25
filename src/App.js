import React, { useState } from "react";
import "./App.css";
import DateFilter from "./components/DateFilter";
import MonthFilter from "./components/MonthFilter";
import StatsFilter from "./components/StatsFilter";
import WeatherTable from "./components/WeatherTable";
import MonthlyStats from "./components/MonthlyStats";

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

  const getWeatherCondition = (code) => {
    if (code === 0) return "Clear Sky";
    if (code <= 3) return "Partly Cloudy";
    if (code <= 48) return "Fog";
    if (code <= 67) return "Rain";
    if (code <= 77) return "Snow";
    if (code <= 82) return "Heavy Rain";
    if (code <= 99) return "Thunderstorm";
    return "Unknown";
  };

  const fetchWeatherData = async (startDate, endDate) => {
    try {
      const response = await fetch(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,weathercode,relative_humidity_2m_mean,surface_pressure_mean&timezone=Asia/Kolkata`
      );

      const data = await response.json();

      if (data?.daily?.time) {
        return data.daily.time.map((d, i) => ({
          date: d,
          avgtempC: data.daily.temperature_2m_mean[i],
          maxtempC: data.daily.temperature_2m_max[i],
          mintempC: data.daily.temperature_2m_min[i],
          humidity: data.daily.relative_humidity_2m_mean[i],
          pressure: data.daily.surface_pressure_mean[i],
          condition: getWeatherCondition(data.daily.weathercode[i]),
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

    const lastDay = new Date(monthYear, month, 0).getDate();

    const startDate = `${monthYear}-${month.toString().padStart(2, "0")}-01`;
    const endDate = `${monthYear}-${month
      .toString()
      .padStart(2, "0")}-${lastDay}`;

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

    setMessage("Loading monthly statistics...");
    setWeatherData([]);

    const startDate = `${statsYear}-01-01`;
    const endDate = `${statsYear}-12-31`;

    const data = await fetchWeatherData(startDate, endDate);

    if (data.length === 0) {
      setMessage("No data found");
      setStats(null);
      return;
    }

    const monthNames = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const monthlyStatsArray = [];

    for (let i = 1; i <= 12; i++) {
      const monthStr = i.toString().padStart(2, "0");

      const monthData = data.filter(
        (item) => item.date.split("-")[1] === monthStr
      );

      if (monthData.length > 0) {
        const temps = monthData.map((item) => item.avgtempC).sort((a, b) => a - b);

        const min = temps[0];
        const max = temps[temps.length - 1];

        const median =
          temps.length % 2 === 0
            ? (temps[temps.length / 2] + temps[temps.length / 2 - 1]) / 2
            : temps[Math.floor(temps.length / 2)];

        monthlyStatsArray.push({
          monthName: monthNames[i - 1],
          min: min.toFixed(1),
          high: max.toFixed(1),
          median: median.toFixed(1),
        });
      }
    }

    setStats(monthlyStatsArray);
    setMessage("");
  };

  return (
    <div className="container">
      <h2>Delhi Weather Dashboard</h2>

      <DateFilter date={date} setDate={setDate} handleDateSearch={handleDateSearch} />

      <MonthFilter
        month={month}
        setMonth={setMonth}
        monthYear={monthYear}
        setMonthYear={setMonthYear}
        handleMonthSearch={handleMonthSearch}
      />

      <StatsFilter
        statsYear={statsYear}
        setStatsYear={setStatsYear}
        handleStats={handleStats}
      />

      <div className="message">{message}</div>

      <WeatherTable weatherData={weatherData} />

      <MonthlyStats stats={stats} statsYear={statsYear} />
    </div>
  );
}

export default App;