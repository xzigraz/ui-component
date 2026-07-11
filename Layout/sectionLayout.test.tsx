import { render, fireEvent } from "@testing-library/react";
import { createRef } from "react";
import { SectionLayout } from "./sectionLayout";

describe("SectionLayout", () => {
	it("renders its children with default styles", () => {
		const { container } = render(
			<SectionLayout>
				<p>content</p>
			</SectionLayout>
		);

		const wrapper = container.querySelector(".td-section-layout") as HTMLElement;
		expect(wrapper).toBeInTheDocument();
		expect(wrapper).toHaveTextContent("content");
		expect(wrapper.style.backgroundImage).toBe("none");
		expect(wrapper.style.height).toBe("auto");
		expect(wrapper).not.toHaveClass("light-text");
	});

	it("applies className, id, and light-text when requested", () => {
		const { container } = render(
			<SectionLayout className="extra" id="my-section" isDarkBG height="200px">
				<p>content</p>
			</SectionLayout>
		);

		const wrapper = container.querySelector("#my-section") as HTMLElement;
		expect(wrapper).toHaveClass("extra", "light-text");
		expect(wrapper.style.height).toBe("200px");
	});

	it("sets the wrapper's own background image only when full-width", () => {
		const { container } = render(
			<SectionLayout bgImg="/full.jpg" isBgFullWidth>
				<p>content</p>
			</SectionLayout>
		);

		const wrapper = container.querySelector(".td-section-layout") as HTMLElement;
		const contentWrapper = container.querySelector(".content-wrapper") as HTMLElement;
		expect(wrapper.style.backgroundImage).toBe('url(/full.jpg)');
		expect(contentWrapper.style.backgroundImage).toBe("none");
	});

	it("sets the inner content-wrapper's background image when not full-width", () => {
		const { container } = render(
			<SectionLayout bgImg="/inner.jpg">
				<p>content</p>
			</SectionLayout>
		);

		const wrapper = container.querySelector(".td-section-layout") as HTMLElement;
		const contentWrapper = container.querySelector(".content-wrapper") as HTMLElement;
		expect(wrapper.style.backgroundImage).toBe("none");
		expect(contentWrapper.style.backgroundImage).toBe('url(/inner.jpg)');
	});

	it("calls the click/hover handlers when provided", () => {
		const handleFullBannerClick = jest.fn();
		const handleMouseEnter = jest.fn();
		const handleMouseLeave = jest.fn();

		const { container } = render(
			<SectionLayout
				handleFullBannerClick={handleFullBannerClick}
				handleMouseEnter={handleMouseEnter}
				handleMouseLeave={handleMouseLeave}
			>
				<p>content</p>
			</SectionLayout>
		);

		const wrapper = container.querySelector(".td-section-layout") as HTMLElement;
		fireEvent.click(wrapper);
		fireEvent.mouseEnter(wrapper);
		fireEvent.mouseLeave(wrapper);

		expect(handleFullBannerClick).toHaveBeenCalledTimes(1);
		expect(handleMouseEnter).toHaveBeenCalledTimes(1);
		expect(handleMouseLeave).toHaveBeenCalledTimes(1);
	});

	it("does not throw when interacted with and no handlers are provided", () => {
		const { container } = render(
			<SectionLayout>
				<p>content</p>
			</SectionLayout>
		);

		const wrapper = container.querySelector(".td-section-layout") as HTMLElement;
		expect(() => {
			fireEvent.click(wrapper);
			fireEvent.mouseEnter(wrapper);
			fireEvent.mouseLeave(wrapper);
		}).not.toThrow();
	});

	it("forwards the ref to the outer div", () => {
		const ref = createRef<HTMLDivElement>();

		render(
			<SectionLayout ref={ref}>
				<p>content</p>
			</SectionLayout>
		);

		expect(ref.current).not.toBeNull();
		expect(ref.current).toHaveClass("td-section-layout");
	});
});
