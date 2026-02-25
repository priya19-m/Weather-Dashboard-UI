import React from "react";

function DateFilter({ date, setDate, handleDateSearch }) {
  return (
    <div className="filter">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleDateSearch}>Get By Date</button>
    </div>
  );
}

export default DateFilter;