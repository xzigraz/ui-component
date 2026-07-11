import updateObjectWithFormData from "./updateObjectWithFormData";

describe("updateObjectWithFormData", () => {
	it("sets a flat field", () => {
		const result = updateObjectWithFormData<{ name?: string }>({}, { name: "Jane" });

		expect(result).toEqual({ name: "Jane" });
	});

	it("creates nested objects for a dot-separated path", () => {
		const result = updateObjectWithFormData<{ user?: { name?: string } }>({}, { "user.name": "Jane" });

		expect(result).toEqual({ user: { name: "Jane" } });
	});

	it("merges multiple fields under the same nested parent", () => {
		const result = updateObjectWithFormData<{ user?: { name?: string; email?: string } }>(
			{},
			{ "user.name": "Jane", "user.email": "jane@example.com" }
		);

		expect(result).toEqual({ user: { name: "Jane", email: "jane@example.com" } });
	});

	it("supports arbitrarily deep paths", () => {
		const result = updateObjectWithFormData<{ a?: { b?: { c?: string } } }>({}, { "a.b.c": "value" });

		expect(result).toEqual({ a: { b: { c: "value" } } });
	});

	it("preserves existing sibling data not covered by the update", () => {
		const base = { user: { name: "Jane", age: "30" } };

		const result = updateObjectWithFormData(base, { "user.name": "Janet" });

		expect(result).toEqual({ user: { name: "Janet", age: "30" } });
	});

	it("no-ops when a deeper path tries to traverse into an existing primitive value", () => {
		const base = { user: "already-a-string" };

		const result = updateObjectWithFormData(base, { "user.name": "Jane" });

		expect(result).toEqual({ user: "already-a-string" });
	});

	it("throws for a path with no addressable field", () => {
		expect(() => updateObjectWithFormData({}, { ".": "value" })).toThrow(
			"Invalid path for object: ."
		);
	});
});
