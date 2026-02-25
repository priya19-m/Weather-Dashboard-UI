import React from "react";

function WeatherTable({ weatherData }) {
  if (weatherData.length === 0) return null;

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Condition</th>
          <th>Avg Temp (°C)</th>
          <th>Max Temp (°C)</th>
          <th>Min Temp (°C)</th>
          <th>Humidity (%)</th>
          <th>Pressure (hPa)</th>
        </tr>
      </thead>
      <tbody>
        {weatherData.map((item, index) => (
          <tr key={index}>
            <td>{item.date}</td>
            <td>{item.condition}</td>
            <td>{item.avgtempC}</td>
            <td>{item.maxtempC}</td>
            <td>{item.mintempC}</td>
            <td>{item.humidity}</td>
            <td>{item.pressure}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default WeatherTable;