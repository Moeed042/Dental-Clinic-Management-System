/**
 * Utility to generate unique, readable booking references
 * Example output: DEN-782491, DEN-931045
 */
export const generateBookingRef = () => {
  const prefix = 'DEN';
  const randomDigits = Math.floor(100000 + Math.random() * 900000); // 6 digits
  return `${prefix}-${randomDigits}`;
};
