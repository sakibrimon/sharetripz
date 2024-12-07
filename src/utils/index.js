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