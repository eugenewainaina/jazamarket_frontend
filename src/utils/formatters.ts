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

/**
 * Formats ISO date string to readable format with time
 * Example: "2025-07-25T13:02:19.279904Z" -> "25 July 2025 13:02"
 */
export const formatPostDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const dateOptions: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    
    const formattedDate = date.toLocaleDateString('en-GB', dateOptions);
    const formattedTime = date.toLocaleTimeString('en-GB', timeOptions);
    
    return `${formattedDate} ${formattedTime}`;
  } catch (error) {
    return 'Invalid Date';
  }
};

/**
 * Truncates text to specified length and adds ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || typeof text !== 'string') {
    return '';
  }
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).trim() + '...';
};
