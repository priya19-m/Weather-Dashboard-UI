import React from "react";

function MonthlyStats({ stats, statsYear }) {
  if (!stats) return null;

  return (
    <div className="stats-section">
      <h3>Monthly Statistics for {statsYear}</h3>
      <div className="stats-grid">
        {stats.map((m, index) => (
          <div key={index} className="stats-card">
            <h4>{m.monthName}</h4>
            <p>High: {m.high} °C</p>
            <p>Median: {m.median} °C</p>
            <p>Min: {m.min} °C</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MonthlyStats;