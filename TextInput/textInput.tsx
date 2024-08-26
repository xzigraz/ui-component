import React, { useState } from "react";
import clsx from "clsx";
import "./text.input.scss";
import Asterisk from "../svgs/asterisk";

interface TextInputProps {
	name: string
	label?: string
	isLabelCapitalized?: boolean
	type?: string
	min?: string
	max?: string
	isRequired?: boolean
	isTextArea?: boolean
	textAreaRows?: number
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
	isTextArea = false,
	textAreaRows = 4,
	onValueChange, 
	...props}: TextInputProps) => {
	const [value, setValue] = useState<string>("");

	const handleValueChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value);
		onValueChange(e.target.value);
	}

	return <div className={clsx("td-input-container", isLabelCapitalized && "cap-label", isRequired && "is-required")}>
		{label && <label>{isRequired && <Asterisk />}{label}</label>}
		{isTextArea 
			? <textarea name={name} placeholder={props.placeholder} rows={textAreaRows} onChange={(e) => handleValueChange(e)} value={value}/>
			: <input name={name} type={type} placeholder={props.placeholder} onChange={(e) => handleValueChange(e)} value={value}/>
		}
	</div>
}