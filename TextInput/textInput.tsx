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
	value?: string
	onValueChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
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
	placeholder,
	value,
	onValueChange, 
	...props}: TextInputProps) => {

	const handleValueChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		onValueChange(e);
	}

	return <div className={clsx("td-input-container", isLabelCapitalized && "cap-label", isRequired && "is-required")}>
		{isTextArea 
			? <textarea name={name} placeholder={placeholder} rows={textAreaRows} onChange={(e) => handleValueChange(e)} value={value}/>
			: <input name={name} type={type} placeholder={placeholder} onChange={(e) => handleValueChange(e)} value={value}/>
		}
		{label && <label>{isRequired && <Asterisk />}{label}</label>} 
	</div>
}