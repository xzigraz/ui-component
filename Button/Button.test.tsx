import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

// Button uses Next.js's <style jsx> (styled-jsx) syntax, which needs a build-time
// babel plugin to strip. Outside Next.js (i.e. here), `jsx` just passes through as
// an unrecognized DOM attribute - harmless, but React warns about it in dev mode.
let consoleErrorSpy: jest.SpyInstance;

beforeAll(() => {
	consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
	consoleErrorSpy.mockRestore();
});

describe("Button", () => {
	it("renders the label and defaults to secondary/medium", () => {
		render(<Button label="Click me" />);

		const button = screen.getByRole("button", { name: "Click me" });
		expect(button).toHaveClass("storybook-button--secondary");
		expect(button).toHaveClass("storybook-button--medium");
	});

	it("applies the primary class when primary is true", () => {
		render(<Button label="Go" primary />);

		expect(screen.getByRole("button")).toHaveClass("storybook-button--primary");
	});

	it("applies the requested size", () => {
		render(<Button label="Go" size="large" />);

		expect(screen.getByRole("button")).toHaveClass("storybook-button--large");
	});

	it("calls onClick when clicked", () => {
		const onClick = jest.fn();
		render(<Button label="Go" onClick={onClick} />);

		fireEvent.click(screen.getByRole("button"));

		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
