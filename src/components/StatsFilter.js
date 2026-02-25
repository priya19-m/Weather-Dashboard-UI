import React from "react";

function StatsFilter({ statsYear, setStatsYear, handleStats }) {
  return (
    <div className="filter">
      <input
        type="number"
        placeholder="Enter Year for Statistics"
        value={statsYear}
        onChange={(e) => setStatsYear(e.target.value)}
      />
      <button onClick={handleStats}>Get Monthly statistics</button>
    </div>
  );
}

export default StatsFilter;