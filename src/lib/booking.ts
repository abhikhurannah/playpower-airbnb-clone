export type StayInput = {
  checkIn: string;
  checkOut: string;
  guests: number;
  maxGuests: number;
  nightlyPrice: number;
  includeFees: boolean;
};
function parseDay(value: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const timestamp = Date.parse(`${value}T00:00:00Z`);
  if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== value)
    return null;
  return timestamp;
}
export function calculateStay(input: StayInput) {
  const start = parseDay(input.checkIn),
    end = parseDay(input.checkOut);
  if (start === null || end === null)
    return { valid: false as const, error: "Choose valid check-in and checkout dates." };
  const nights = (end - start) / 86_400_000;
  if (nights <= 0) return { valid: false as const, error: "Check-out must be after check-in." };
  if (!Number.isInteger(input.guests) || input.guests < 1 || input.guests > input.maxGuests)
    return { valid: false as const, error: `Choose between 1 and ${input.maxGuests} guests.` };
  const subtotal = Math.round(nights * input.nightlyPrice * 100) / 100;
  const cleaning = input.includeFees ? 65 : 0;
  const serviceFee = input.includeFees ? Math.round(subtotal * 0.14) : 0;
  return {
    valid: true as const,
    nights,
    subtotal,
    cleaning,
    serviceFee,
    total: Math.round((subtotal + cleaning + serviceFee) * 100) / 100,
  };
}
