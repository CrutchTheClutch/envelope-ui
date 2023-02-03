import { twx } from ".";

test("merges tailwind classes with important modifier correctly", () => {
  expect(twx("!font-medium !font-bold")).toBe("!font-bold");
  expect(twx("!font-medium !font-bold font-thin")).toBe("!font-bold font-thin");
  expect(twx("!right-2 !-inset-x-px")).toBe("!-inset-x-px");
  expect(twx("focus:!inline focus:!block")).toBe("focus:!block");
});
