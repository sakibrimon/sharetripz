import { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

import "./style.css"; // Adjust the path based on your file structure

const OneWayDP = ({ defStartDate }) => {
    const [startDate, setStartDate] = useState(defStartDate);

    // Custom date format: "29 Nov, Fri, 2024"
    const customDateFormat = (date) => format(date, "dd MMM, EEE, yyyy"); // Ensure correct display format
    //

    return (
        <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd MMM, EEE, yyyy" // Custom format: e.g., 29 Nov, Fri, 2024
            customInput={<CustomInput value={customDateFormat(startDate)} />}
        />
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

export default OneWayDP;