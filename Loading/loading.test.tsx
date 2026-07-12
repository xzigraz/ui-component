import { render } from "@testing-library/react";
import { Loading } from "./loading";

describe("Loading", () => {
	it("renders the default 3 wave dots plus the page mask", () => {
		const { container } = render(<Loading />);

		expect(container.querySelectorAll(".dot")).toHaveLength(3);
		expect(container.querySelector(".td-loading-whole")).toBeInTheDocument();
		expect(container.querySelector(".td-loading-mask")).toBeInTheDocument();
	});

	it("renders 8 dots for the rotate style regardless of repeat", () => {
		const { container } = render(<Loading style="rotate" repeat={2} />);

		expect(container.querySelectorAll(".dot")).toHaveLength(8);
	});

	it("respects a custom repeat count for non-rotate styles", () => {
		const { container } = render(<Loading style="wave" repeat={5} />);

		expect(container.querySelectorAll(".dot")).toHaveLength(5);
	});

	it("omits the page mask for action placement", () => {
		const { container } = render(<Loading loadingPlacement="action" />);

		expect(container.querySelector(".td-loading-whole")).not.toBeInTheDocument();
		expect(container.querySelector(".td-loading-mask")).not.toBeInTheDocument();
	});

	it("uses a custom class name for the dots when provided", () => {
		const { container } = render(<Loading classes="custom-dot" />);

		expect(container.querySelectorAll(".custom-dot")).toHaveLength(3);
		expect(container.querySelectorAll(".dot")).toHaveLength(0);
	});
});
