import { useState } from "react";
import Autosuggest from "react-autosuggest";
import "./style.css";
import { useLoaderData } from "react-router";

const AutocompleteSearch = ({ defValue }) => {
  const [value, setValue] = useState(defValue); // Current input value
  const [lastValidValue, setLastValidValue] = useState(defValue); // Last explicitly selected valid value
  const [isItemSelected, setIsItemSelected] = useState(false); // Tracks if an item was explicitly selected
  const [suggestions, setSuggestions] = useState([]);

  // Airports data
  let airports = [
    { iata_code: "DAC", name: "Hazrat Shahjalal International Airport" },
    { iata_code: "CXB", name: "Cox's Bazar Airport" },
    { iata_code: "JFK", name: "John F. Kennedy International Airport" },
    { iata_code: "BKK", name: "Suvarnabhumi Airport" },
    { iata_code: "KUL", name: "Kuala Lumpur International Airport" },
    { iata_code: "CGP", name: "Shah Amanat International Airport" },
  ];
  airports = useLoaderData();

  const getSuggestions = (inputValue) => {
    const regex = new RegExp(inputValue.trim(), "i");
    return airports.filter(
      (airport) =>
        regex.test(airport.name) || regex.test(airport.iata_code)
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
    setLastValidValue(suggestion.iata_code);
    setIsItemSelected(true); // Mark the item as explicitly selected
    return suggestion.iata_code;
  };

  const renderSuggestion = (suggestion) => {
    const isLongName = suggestion.name.length > 10;
    return (
      <div className={`suggestion ${isLongName ? "ellipsis" : ""}`}>
        {suggestion.iata_code} - {suggestion.name}
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

export default AutocompleteSearch;
