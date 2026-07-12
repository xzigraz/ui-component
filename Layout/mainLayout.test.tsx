import { render } from "@testing-library/react";
import { MainLayout } from "./mainLayout";

describe("MainLayout", () => {
	it("renders its children inside the base class", () => {
		const { container } = render(
			<MainLayout>
				<p>content</p>
			</MainLayout>
		);

		const wrapper = container.querySelector(".td-main-layout");
		expect(wrapper).toBeInTheDocument();
		expect(wrapper).toHaveTextContent("content");
	});

	it("appends an additional class name when provided", () => {
		const { container } = render(
			<MainLayout className="extra">
				<p>content</p>
			</MainLayout>
		);

		expect(container.querySelector(".td-main-layout.extra")).toBeInTheDocument();
	});
});
