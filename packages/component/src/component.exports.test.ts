import { expect, test } from "bun:test";
import { Component } from ".";

test("exports", () => {
  expect(typeof Component).toEqual("object");
});
