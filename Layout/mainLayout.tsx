import React, { ReactElement } from "react";
import clsx from "clsx";
import "./main.layout.scss";


interface MainLayoutProps {
	children: ReactElement
	className?: string
}

export const MainLayout = ({children, className}: MainLayoutProps) => {
	return <div className={clsx("td-main-layout", className && className)}>
		{React.Children.map(children, child => child)}
	</div>;
}