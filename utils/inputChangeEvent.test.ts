import { getInputChangeData } from "./inputChangeEvent";

describe("getInputChangeData", () => {
	it("returns an object keyed by the event's target name", () => {
		const event = { target: { name: "email", value: "jane@example.com" } };

		expect(getInputChangeData(event)).toEqual({ email: "jane@example.com" });
	});

	it("works with non-string values too", () => {
		const event = { target: { name: "age", value: 30 } };

		expect(getInputChangeData(event)).toEqual({ age: 30 });
	});
});
