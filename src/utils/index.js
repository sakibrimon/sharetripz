export function getOrdinalSuffix(num) {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = num % 100; // Get the last two digits

    // Special case for 11, 12, 13
    if (value >= 11 && value <= 13) {
        return num + "th";
    }

    const index = num % 10; // Get the last digit
    return num + (suffixes[index] || "th");
}

export function formatBDT(amount) {
    return `৳${amount.toLocaleString('en-BD', {
        // minimumFractionDigits: 2, // Ensures two decimal places
        maximumFractionDigits: 2, // Ensures two decimal places
    })}`;
}

export function getCityNameByCode(code) {
    // Step 1: Retrieve the data from localStorage
    const storedData = localStorage.getItem("airports");
    
    // Step 2: Parse the JSON string back into an array
    const airports = JSON.parse(storedData);
    
    // Step 3: Find the object with the matching code
    const airport = airports.find(airport => airport.code === code);
    
    // Step 4: Return the cityName if found, or a default message
    // return airport ? airport.cityName : "Code not found";
    return airport.cityName;
  }
  
  // Example usage:
  const cityName = getCityNameByCode("ANW");
  console.log(cityName); // Outputs: "Ainsworth"
  