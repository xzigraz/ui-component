import { renderHook } from "@testing-library/react";
import { createRef } from "react";
import useIsRefInView from "./checkIsInview";

type MockEntry = { isIntersecting: boolean; target: Element };

const installMockObserver = (isIntersecting: boolean) => {
	global.IntersectionObserver = class {
		callback: (entries: MockEntry[]) => void;
		unobserve = jest.fn();

		constructor(callback: (entries: MockEntry[]) => void) {
			this.callback = callback;
		}

		observe(target: Element) {
			this.callback([{ isIntersecting, target }]);
		}

		disconnect() {}
	} as unknown as typeof IntersectionObserver;
};

describe("useIsRefInView", () => {
	it("returns true once the element intersects the viewport", () => {
		installMockObserver(true);
		const ref = { current: document.createElement("div") };

		const { result } = renderHook(() => useIsRefInView(ref));

		expect(result.current).toBe(true);
	});

	it("stays false when the element does not intersect", () => {
		installMockObserver(false);
		const ref = { current: document.createElement("div") };

		const { result } = renderHook(() => useIsRefInView(ref));

		expect(result.current).toBe(false);
	});

	it("stays false and never observes when the ref has no current element", () => {
		installMockObserver(true);
		const observeSpy = jest.fn();
		global.IntersectionObserver = class {
			constructor(_callback: unknown) {}
			observe = observeSpy;
			disconnect() {}
		} as unknown as typeof IntersectionObserver;

		const ref = createRef<HTMLElement>();

		const { result } = renderHook(() => useIsRefInView(ref));

		expect(result.current).toBe(false);
		expect(observeSpy).not.toHaveBeenCalled();
	});

	it("removes the scroll listener when re-observing after already being in view", () => {
		// The effect only depends on [ref], so isInView is read from a closure that's
		// only fresh when the effect itself re-runs (i.e. ref changes identity).
		// Force that by rerendering with a new ref object once isInView is already true.
		installMockObserver(true);
		const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

		const { result, rerender } = renderHook(({ ref }) => useIsRefInView(ref), {
			initialProps: { ref: { current: document.createElement("div") } },
		});

		expect(result.current).toBe(true);

		rerender({ ref: { current: document.createElement("div") } });

		expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));

		removeEventListenerSpy.mockRestore();
	});

	it("re-checks on scroll and removes the listener on unmount", () => {
		installMockObserver(false);
		const ref = { current: document.createElement("div") };
		const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
		const addEventListenerSpy = jest.spyOn(window, "addEventListener");

		const { unmount } = renderHook(() => useIsRefInView(ref));

		expect(addEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));

		window.dispatchEvent(new Event("scroll"));

		unmount();

		expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));

		addEventListenerSpy.mockRestore();
		removeEventListenerSpy.mockRestore();
	});
});
