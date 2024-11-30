export function getOrdinalSuffix(num) {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = num % 100;
    const index = (value - 20) % 10 || value || 0;
    return num + (suffixes[index] || "th");
}