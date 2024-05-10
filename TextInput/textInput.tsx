import React, { useState } from "react";
import clsx from "clsx";
import "./text.input.scss";

interface TextInputProps {
	label?: string
	isLabelCapitalized?: boolean
	type?: string
	min?: string
	max?: string
	isRequired?: string
	placeholderText?: string
	onValueChange: (value: string) => void
}

export const TextInput = ({
	label, 
	isLabelCapitalized = false,
	type = "text", 
	min, 
	max, 
	isRequired, 
	placeholderText,
	onValueChange, 
	...props}: TextInputProps) => {
	const [value, setValue] = useState<string>("");

	const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		onValueChange(e.target.value);
	}

	return <div className={clsx("td-input-container", isLabelCapitalized && "cap-label")}>
		{label && <label>{label}</label>}
		<input type={type} placeholder={placeholderText && placeholderText} onChange={(e) => handleValueChange(e)} value={value}/>
	</div>
}