export const formatString = (str: string): string => {
  if (typeof str !== 'string' || !str) {
    return str;
  }
  // Trim whitespace from start and end, and replace multiple spaces with a single space.
  return str.trim().replace(/\s\s+/g, ' ');
};

export const formatNumberString = (numStr: string): string => {
  if (typeof numStr !== 'string' || !numStr) {
    return numStr;
  }
  // This will correctly handle integers (e.g., "007" -> "7") and decimals ("0.5" -> "0.5")
  // It avoids removing the zero before a decimal point.
  if (numStr.includes('.')) {
    return parseFloat(numStr).toString();
  }
  return parseInt(numStr, 10).toString();
};

export const formatPrice = (price: string | number) => {
  const numericPrice =
    typeof price === "string" ? parseFloat(price.replace(/,/g, "")) : price;
  if (isNaN(numericPrice)) {
    return "Invalid Price";
  }
  return `KSh ${numericPrice.toLocaleString()}`;
};
