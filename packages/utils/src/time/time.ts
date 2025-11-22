export function formatTime(date: Date): string {
  if (!(date instanceof Date)) {
    throw new TypeError(`Expected a Date object, got ${typeof date}`);
  }
  if (isNaN(date.getTime())) {
    throw new Error("Invalid Date: the date is not a valid calendar date");
  }
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;
  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${hours}:${minutesStr} ${ampm}`;
}
