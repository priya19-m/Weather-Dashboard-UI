import React from "react";

function MonthFilter({
  month,
  setMonth,
  monthYear,
  setMonthYear,
  handleMonthSearch,
}) {
  return (
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
  );
}

export default MonthFilter;