import React, { useState } from "react";
import clsx from "clsx";
import "./text.input.scss";

interface TextInputProps {
	name: string
	label?: string
	isLabelCapitalized?: boolean
	type?: string
	min?: string
	max?: string
	isRequired?: boolean
	placeholder?: string
	onValueChange: (value: string) => void
}

export const TextInput = ({
	name,
	label, 
	isLabelCapitalized = false,
	type = "text", 
	min, 
	max, 
	isRequired = false, 
	onValueChange, 
	...props}: TextInputProps) => {
	const [value, setValue] = useState<string>("");

	const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		onValueChange(e.target.value);
	}

	return <div className={clsx("td-input-container", isLabelCapitalized && "cap-label")}>
		{label && <label>{label}</label>}
		<input name={name} type={type} placeholder={props.placeholder} onChange={(e) => handleValueChange(e)} value={value}/>
	</div>
}