import { useState } from "react";
import Autosuggest from "react-autosuggest";
import "./style.css";
// import { useLoaderData } from "react-router";
import PropTypes from "prop-types";

const AutocompleteSearch = ({ defValue, airports }) => {
  const [value, setValue] = useState(defValue); // Current input value
  const [lastValidValue, setLastValidValue] = useState(defValue); // Last explicitly selected valid value
  const [isItemSelected, setIsItemSelected] = useState(false); // Tracks if an item was explicitly selected
  const [suggestions, setSuggestions] = useState([]);

  // Airports data
  // let airports = [
  //   { code: "DAC", name: "Hazrat Shahjalal International Airport" },
  //   { code: "CXB", name: "Cox's Bazar Airport" },
  //   { code: "JFK", name: "John F. Kennedy International Airport" },
  //   { code: "BKK", name: "Suvarnabhumi Airport" },
  //   { code: "KUL", name: "Kuala Lumpur International Airport" },
  //   { code: "CGP", name: "Shah Amanat International Airport" },
  //   { code: "LHR", name: "Heathrow Airport" },
  //   { code: "DXB", name: "Dubai International Airport" },
  //   { code: "SYD", name: "Sydney Kingsford Smith Airport" },
  //   { code: "HND", name: "Tokyo Haneda Airport" },
  //   { code: "LAX", name: "Los Angeles International Airport" },
  //   { code: "ATL", name: "Hartsfield-Jackson Atlanta Airport" },
  //   { code: "FRA", name: "Frankfurt Airport" }
  // ];
  // airports = useLoaderData();

  const getSuggestions = (inputValue) => {
    const regex = new RegExp(inputValue.trim(), "i");
    return airports.filter(
      (airport) =>
        regex.test(airport.cityName) || regex.test(airport.name) || regex.test(airport.code)
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
    setIsItemSelected(false); // Reset selection tracking when fetching suggestions
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    setIsItemSelected(false); // Reset selection tracking on manual input
  };

  const getSuggestionValue = (suggestion) => {
    // Update the value and last valid value when a suggestion is selected
    setLastValidValue(suggestion.code);
    setIsItemSelected(true); // Mark the item as explicitly selected
    return suggestion.code;
  };

  const renderSuggestion = (suggestion) => {
    const isLongName = suggestion.name.length > 10;
    return (
      <div className={`suggestion ${isLongName ? "ellipsis" : ""}`}>
        {suggestion.code} - {suggestion.cityName} - {suggestion.name}
      </div>
    );
  };

  const inputProps = {
    placeholder: "Type to search...",
    value,
    onChange,
    onBlur: () => {
      // Reset to the last valid value if no item was selected from the list
      if (!isItemSelected) {
        setValue(lastValidValue);
      }
    },
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      theme={{
        container: "autocomplete-container",
        suggestionsContainer: "suggestions-container",
        suggestion: "suggestion",
        suggestionHighlighted: "suggestion-highlighted",
        input: "autocomplete-input",
      }}
    />
  );
};

AutocompleteSearch.propTypes = {
  defValue: PropTypes.string.isRequired,
  airports: PropTypes.array.isRequired,
}

export default AutocompleteSearch;
