/**
 * Rounds a price to the correct number of decimal places based on the symbol's tick size
 */
export function roundToTickSize(price: number, tickSize: string): number {
  if (!tickSize) {
    return price;
  }

  // Calculate precision from tick size (e.g., 0.00010000 → 4 decimal places)
  const precision = tickSize.indexOf('1') - 1;
  if (precision < 0) {
    return Math.floor(price);
  }

  // Round to the nearest tick
  const tickSizeNum = parseFloat(tickSize);
  const rounded = Math.floor(price / tickSizeNum) * tickSizeNum;

  // Format with correct precision
  return +rounded.toFixed(precision);
}

/**
 * Rounds a quantity to the correct step size
 */
export function roundToStepSize(quantity: number, stepSize: string): number {
  if (!stepSize) {
    return quantity;
  }

  // Calculate precision from step size
  const precision = stepSize.indexOf('1') - 1;
  if (precision < 0) {
    return Math.floor(quantity);
  }

  // Round to the nearest step
  const stepSizeNum = parseFloat(stepSize);
  const rounded = Math.floor(quantity / stepSizeNum) * stepSizeNum;

  // Format with correct precision
  return +rounded.toFixed(precision);
}
