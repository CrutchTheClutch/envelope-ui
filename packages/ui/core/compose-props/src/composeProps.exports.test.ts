import { composeProps } from ".";

test("exports", () => {
  expect(typeof composeProps).toEqual("function");
  expect(typeof composeProps({})).toEqual("object");
});
