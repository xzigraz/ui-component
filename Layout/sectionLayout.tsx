import React, { ReactElement } from "react";
import clsx from "clsx";
import "./section.layout.scss";

interface SectionLayoutProps {
	children: ReactElement
	className?: string
	bgImg?: string
	id?: string
	isBgFullWidth?: boolean
	isDarkBG?: boolean
	handleFullBannerClick?: () => void
	handleMouseEnter?: () => void
	handleMouseLeave?: () => void
}

export const SectionLayout = ({
	children, 
	className,
	bgImg,
	id, 
	isBgFullWidth = true, 
	isDarkBG = false,
	handleFullBannerClick,
	handleMouseEnter,
	handleMouseLeave}: SectionLayoutProps) => {
	return <div 
		className={clsx("td-section-layout", className && className, isDarkBG && "light-text")} 
		id={id && id} 
		style={{backgroundImage: bgImg && isBgFullWidth ? `url(${bgImg})` : "none"}}
		onClick={() => handleFullBannerClick && handleFullBannerClick()}
		onMouseEnter={() => handleMouseEnter && handleMouseEnter()}
		onMouseLeave={() => handleMouseLeave && handleMouseLeave()}>
		<div className="content-wrapper" style={{backgroundImage: bgImg && !isBgFullWidth ? `url(${bgImg})` : "none"}}>
			{React.Children.map(children, child => child)}
		</div>
	</div>;
}