import { render, fireEvent } from "@testing-library/react";
import { TextInput } from "./textInput";

describe("TextInput", () => {
	it("renders an input by default with the given name and placeholder", () => {
		const onValueChange = jest.fn();
		const { container } = render(
			<TextInput name="email" placeholder="you@example.com" onValueChange={onValueChange} />
		);

		const input = container.querySelector('input[name="email"]');
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("placeholder", "you@example.com");
		expect(container.querySelector("textarea")).not.toBeInTheDocument();
	});

	it("renders a textarea with the requested row count when isTextArea is set", () => {
		const onValueChange = jest.fn();
		const { container } = render(
			<TextInput name="message" isTextArea textAreaRows={6} onValueChange={onValueChange} />
		);

		const textarea = container.querySelector('textarea[name="message"]');
		expect(textarea).toBeInTheDocument();
		expect(textarea).toHaveAttribute("rows", "6");
	});

	it("calls onValueChange when the textarea changes", () => {
		const onValueChange = jest.fn();
		const { container } = render(<TextInput name="message" isTextArea onValueChange={onValueChange} />);

		const textarea = container.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
		fireEvent.change(textarea, { target: { value: "Hello" } });

		expect(onValueChange).toHaveBeenCalledTimes(1);
		expect(onValueChange.mock.calls[0][0].target.value).toBe("Hello");
	});

	it("calls onValueChange with the change event", () => {
		const onValueChange = jest.fn();
		const { container } = render(<TextInput name="name" onValueChange={onValueChange} />);

		const input = container.querySelector('input[name="name"]') as HTMLInputElement;
		fireEvent.change(input, { target: { value: "Jane" } });

		expect(onValueChange).toHaveBeenCalledTimes(1);
		expect(onValueChange.mock.calls[0][0].target.value).toBe("Jane");
	});

	it("renders a label with an asterisk when required", () => {
		const onValueChange = jest.fn();
		const { container } = render(
			<TextInput name="name" label="Name" isRequired onValueChange={onValueChange} />
		);

		expect(container.querySelector("label")).toHaveTextContent("Name");
		expect(container.querySelector("label svg")).toBeInTheDocument();
		expect(container.querySelector(".td-input-container")).toHaveClass("is-required");
	});

	it("renders no label when one isn't provided", () => {
		const onValueChange = jest.fn();
		const { container } = render(<TextInput name="name" onValueChange={onValueChange} />);

		expect(container.querySelector("label")).not.toBeInTheDocument();
	});

	it("applies additional class names and capitalized-label styling", () => {
		const onValueChange = jest.fn();
		const { container } = render(
			<TextInput
				name="name"
				label="Name"
				additionalClassNames="extra"
				isLabelCapitalized
				onValueChange={onValueChange}
			/>
		);

		const wrapper = container.querySelector(".td-input-container");
		expect(wrapper).toHaveClass("extra", "cap-label");
	});
});
