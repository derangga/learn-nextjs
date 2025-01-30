export const priceFormat = (price) => {
  // Convert the price to a string
  const priceStr = price.toString();

  // Split the string into the integer part and the decimal part
  let integerPart = priceStr.slice(0, -3); // Everything except the last 3 digits
  const decimalPart = priceStr.slice(-3); // The last 3 digits

  // Add thousand separators to the integer part
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Combine the integer part and the decimal part with a dot
  const formattedPrice = integerPart + "." + decimalPart;

  return formattedPrice;
};
