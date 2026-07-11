import { render } from "@testing-library/react";
import Asterisk from "./asterisk";

describe("Asterisk", () => {
	it("renders an svg icon", () => {
		const { container } = render(<Asterisk />);

		expect(container.querySelector("svg")).toBeInTheDocument();
		expect(container.querySelector("path")).toBeInTheDocument();
	});
});
