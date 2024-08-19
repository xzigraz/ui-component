import React from "react";
import clsx from "clsx";
import "./loading.scss";

export interface LoadingProps {
	classes?: string
	loadingPlacement?: "page" | "action"
	repeat?: 2 | 3 | 4 | 5 | 8
	style?: "wave" | "rotate"
}

/**
 * Renders a loading component.
 *
 * @param loadingElement - Optional. The custom loading element to render.
 * @param loadingPlacement - Optional. The placement of the loading component. Can be "page" or "action". Defaults to "page".
 * @returns The loading component.
 */
export const Loading = ({
	classes, 
	loadingPlacement = "page",
	repeat = 3,
	style = "wave"
}: LoadingProps) => {
	return <>
		<div className={clsx("td-loading", style && style, loadingPlacement === "page" && "td-loading-whole")}>
			{[...Array(style === "rotate" ? 8 : repeat)].map((element, index) => <div key={index} className={clsx(classes ? classes : "dot")}>{element && element}</div>)}
		</div>
		{loadingPlacement === "page" && <div className={clsx("td-loading-mask")} />}
	</>
}