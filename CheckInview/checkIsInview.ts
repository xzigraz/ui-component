import { useEffect, useState } from "react";

/**
 * Checks if a given element referenced by a React ref is in the current view.
 * @param ref - Reference to the element to check visibility for.
 * @returns Boolean indicating whether the element is in the current view.
 */
const isRefInView = (ref: React.RefObject<HTMLElement>) => {
	const [isInView, setIsInView] = useState<boolean>(false);

	useEffect(() => {
		const handleScroll = () => {
			const observer = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					setIsInView(entry.isIntersecting);
					observer.unobserve(entry.target);
				}
			}, {threshold: 0.15});

			if (ref.current) {
				observer.observe(ref.current);

				if (isInView) {
					window.removeEventListener('scroll', handleScroll);
				}
			}
		}

		handleScroll(); // Initial check

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [ref]);

	return isInView;
}

export default isRefInView;