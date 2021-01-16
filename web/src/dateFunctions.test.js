import {
  burningManDates,
  laborDayForYear,
  yearDefault,
} from "./dateFunctions.js";

const futureLaborDays = [
  [2021, 6],
  [2022, 5],
  [2023, 4],
  [2024, 2],
  [2025, 1],
  [2026, 7],
];

test.each(futureLaborDays)("Labor Day calculation for %i", (year, expected) => {
  const ld = laborDayForYear(year);
  expect(ld.getMonth()).toBe(8);
  expect(ld.getDate()).toBe(expected);
});

test("Burning Man Date calculation 2021", () => {
  const [first, last] = burningManDates(2021);
  expect(first).toEqual(new Date(2021, 7, 29));
  expect(last).toEqual(new Date(2021, 8, 6));
});

test.each([
  ["2021-01-16T12:00:00.000Z", 2021],
  ["2021-08-16T12:00:00.000Z", 2021],
  ["2021-10-16T12:00:00.000Z", 2021],
  ["2021-11-30T12:00:00.000Z", 2021],
  ["2021-12-01T12:00:00.000Z", 2022],
  ["2022-01-01T12:00:00.000Z", 2022],
])("Default year %s", (fakedate, expectedyear) => {
  jest
    .spyOn(global.Date, "now")
    .mockImplementationOnce(() => new Date(fakedate).valueOf());

  expect(yearDefault()).toBe(expectedyear);
});
