import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { addDays, format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";

const RoundTripDP = ({ defStartDate, defEndDate, setFlightDetails }) => {
  const [startDate, setStartDate] = useState(defStartDate);
  const [endDate, setEndDate] = useState(defEndDate);

  useEffect(() => {
    setFlightDetails((prevDetails) => ({
      ...prevDetails,
      startFlyDate: startDate,
      endFlyDate: endDate,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Custom date format: "28 Nov, Thu, 2024"
  const customDateFormat = (date) => (date ? format(date, "dd MMM, EEE, yyyy") : "");

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date > endDate) {
      // setEndDate(null); // Set endDate to null if startDate is greater
      setEndDate(addDays(date, 2));
    }
    setFlightDetails((prevDetails) => ({
      ...prevDetails,
      startFlyDate: date,
      ...(date > endDate && { endFlyDate: addDays(date, 2) }),
    }));
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setFlightDetails((prevDetails) => ({
      ...prevDetails,
      endFlyDate: date,
    }));
  };

  const today = new Date(); // Get today's date

  return (
    <div className="mt-4 lg:mt-0 space-x-5 flex">
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
    </div>
  );
};

const CustomInput = ({ value, onClick, onFocus }) => (
  <input
    className="custom-date-input"
    value={value}
    onClick={onClick}
    onFocus={onFocus}
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

RoundTripDP.propTypes = {
  defStartDate: PropTypes.instanceOf(Date).isRequired,
  defEndDate: PropTypes.instanceOf(Date).isRequired,
  setFlightDetails: PropTypes.func.isRequired,
};

CustomInput.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
};

export default RoundTripDP;
