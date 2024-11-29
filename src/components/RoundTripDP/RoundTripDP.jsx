import { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

const RoundTripDP = ({ defStartDate, defEndDate }) => {
  const [startDate, setStartDate] = useState(defStartDate);
  const [endDate, setEndDate] = useState(defEndDate);

  // Custom date format: "28 Nov, Thu, 2024"
  const customDateFormat = (date) => (date ? format(date, "dd MMM, EEE, yyyy") : "");

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date > endDate) {
      setEndDate(null); // Set endDate to null if startDate is greater
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const today = new Date(); // Get today's date

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat="dd MMM, EEE, yyyy" // Internal parsing
        customInput={<CustomInput value={customDateFormat(startDate)} />}
        minDate={today} // Disable dates before today for startDate
      />
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate || today} // Ensure endDate is after startDate and today's date
        dateFormat="dd MMM, EEE, yyyy"
        customInput={<CustomInput value={customDateFormat(endDate)} />} // Leave empty if null
      />
    </>
  );
};

const CustomInput = ({ value, onClick }) => (
  <input
    className="custom-date-input"
    value={value}
    onClick={onClick}
    readOnly
    style={{
      width: "100%",
      padding: "8px",
      cursor: "pointer",
      border: "1px solid #ccc",
      borderRadius: "4px",
      textAlign: "center",
    }}
  />
);

export default RoundTripDP;
