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
			if (ref.current) {
				const rect = ref.current.getBoundingClientRect();
				const inView = (
					rect.top >= 0 &&
					rect.left >= 0 &&
					rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
					rect.right <= (window.innerWidth || document.documentElement.clientWidth)
				);
				setIsInView(inView);

				if (inView) {
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