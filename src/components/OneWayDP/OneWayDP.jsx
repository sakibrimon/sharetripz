import { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

import "./style.css"; // Adjust the path based on your file structure
import PropTypes from "prop-types";

const OneWayDP = ({ defStartDate }) => {
    const [startDate, setStartDate] = useState(defStartDate);

    // Custom date format: "29 Nov, Fri, 2024"
    const customDateFormat = (date) => format(date, "dd MMM, EEE, yyyy"); // Ensure correct display format

    const today = new Date(); // Get today's date

    return (
        <div className="mt-4 lg:mt-0">
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd MMM, EEE, yyyy" // Custom format: e.g., 29 Nov, Fri, 2024
                customInput={<CustomInput value={customDateFormat(startDate)} />}
                minDate={today} // Disable dates before today
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

// Add PropTypes validation for OneWayDP
OneWayDP.propTypes = {
    defStartDate: PropTypes.instanceOf(Date).isRequired, // Ensures defStartDate is a Date object
};

// Add PropTypes validation for CustomInput
CustomInput.propTypes = {
    value: PropTypes.string.isRequired, // Ensures value is a string
    onClick: PropTypes.func.isRequired, // Ensures onClick is a function
    onFocus: PropTypes.func.isRequired,
};

export default OneWayDP;
