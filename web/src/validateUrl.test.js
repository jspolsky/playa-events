import { validateURL } from "./validateUrl.js";

const urlchecks = [
  ["http://example.com", true],
  ["https://example.com", true],
  [
    "https://futureturtles.com/foo/event/28?kjsg-sad89gu9s8dug=89sdg987as98gd",
    true,
  ],
  ["", false],
  ["ftp://example.com", false],
  ["jpsdg://example.com", false],
  ["https::/example.com", false],
  ["https//example.com", false],
  ["https: //example.com", false],
  ["example.com", false],
];

test.each(urlchecks)("validateURL(%s)", (url, expected) => {
  expect(validateURL(url)).toBe(expected);
});
