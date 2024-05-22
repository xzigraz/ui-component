import React from "react";
import clsx from "clsx";
import "./loading.scss";

interface LoadingProps {
	children?: React.ReactElement
	classes?: string
	loadingPlacement?: "page" | "action"
	repeat?: number
}

/**
 * Renders a loading component.
 *
 * @param loadingElement - Optional. The custom loading element to render.
 * @param loadingPlacement - Optional. The placement of the loading component. Can be "page" or "action". Defaults to "page".
 * @returns The loading component.
 */
export const Loading = ({
	children,
	classes, 
	loadingPlacement = "page",
	repeat = 3
}: LoadingProps) => {
	return <div className="td-loading">
		{[...Array(repeat)].map((element, index) => <div key={index} className={clsx(classes ? classes : "dot")}>{element && element}</div>)}
	</div>
}