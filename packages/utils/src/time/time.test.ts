import { formatTime } from "@repo/utils";

describe("formatTime", () => {
  it("formats midnight correctly", () => {
    expect(formatTime(new Date("2025-11-22T00:00:00"))).toBe("12:00 AM");
  });
  it("formats noon correctly", () => {
    expect(formatTime(new Date("2025-11-22T12:00:00"))).toBe("12:00 PM");
  });
  it("formats morning correctly", () => {
    expect(formatTime(new Date("2025-11-22T08:05:00"))).toBe("8:05 AM");
  });
  it("formats afternoon correctly", () => {
    expect(formatTime(new Date("2025-11-22T15:30:00"))).toBe("3:30 PM");
  });
  it("formats late night correctly", () => {
    expect(formatTime(new Date("2025-11-22T23:59:00"))).toBe("11:59 PM");
  });
  it("throws if input is the wrong type", () => {
    expect(() => formatTime("not a date lmao" as unknown as Date)).toThrow(
      TypeError,
    );
  });
  it("throws if date is a non-calendar date", () => {
    expect(() => formatTime(new Date("2025-13-01T26:00:00"))).toThrow(
      "Invalid Date: the date is not a valid calendar date",
    );
  });
});
