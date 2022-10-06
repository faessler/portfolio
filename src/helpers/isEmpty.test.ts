import { isEmpty } from "src/helpers";

test("returns true on empty object", () => {
  const value = {};
  const isEmptyReturn = isEmpty(value);
  expect(isEmptyReturn).toBeTruthy();
});
test("returns false on filled object", () => {
  const value = { foo: "bar" };
  const isEmptyReturn = isEmpty(value);
  expect(isEmptyReturn).toBeFalsy();
});
test("returns true on empty array", () => {
  const value: Array<any> = [];
  const isEmptyReturn = isEmpty(value);
  expect(isEmptyReturn).toBeTruthy();
});
test("returns false on filled array", () => {
  const value = ["foo", "bar"];
  const isEmptyReturn = isEmpty(value);
  expect(isEmptyReturn).toBeFalsy();
});
