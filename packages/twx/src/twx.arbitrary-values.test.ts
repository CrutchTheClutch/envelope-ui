import { twx } from ".";

test("handles simple conflicts with arbitrary values correctly", () => {
  expect(twx("m-[2px] m-[10px]")).toBe("m-[10px]");
  expect(
    twx(
      "m-[2px] m-[11svmin] m-[12in] m-[13lvi] m-[14vb] m-[15vmax] m-[16mm] m-[17%] m-[18em] m-[19px] m-[10dvh]"
    )
  ).toBe("m-[10dvh]");
  expect(twx("z-20 z-[99]")).toBe("z-[99]");
  expect(twx("my-[2px] m-[10rem]")).toBe("m-[10rem]");
  expect(twx("cursor-pointer cursor-[grab]")).toBe("cursor-[grab]");
  expect(twx("m-[2px] m-[calc(100%-var(--arbitrary))]")).toBe(
    "m-[calc(100%-var(--arbitrary))]"
  );
  expect(twx("m-[2px] m-[length:var(--mystery-var)]")).toBe(
    "m-[length:var(--mystery-var)]"
  );
});

test("handles arbitrary length conflicts with labels and modifiers correctly", () => {
  expect(twx("hover:m-[2px] hover:m-[length:var(--c)]")).toBe(
    "hover:m-[length:var(--c)]"
  );
  expect(twx("hover:focus:m-[2px] focus:hover:m-[length:var(--c)]")).toBe(
    "focus:hover:m-[length:var(--c)]"
  );
});

test("handles complex arbitrary value conflicts correctly", () => {
  expect(twx("grid-rows-[1fr,auto] grid-rows-2")).toBe("grid-rows-2");
  expect(twx("grid-rows-[repeat(20,minmax(0,1fr))] grid-rows-3")).toBe(
    "grid-rows-3"
  );
});
