import { allowedKeys } from "@/constants";
import React from "react";

export const classnames = (...args: string[]) => {
	let ret = "";
	args.forEach((classes) => {
		ret += `${classes} `;
	});
	return ret.trimEnd();
};

export const handleNumberOnlyKeyPress = (
	e: React.KeyboardEvent<HTMLInputElement>
) => {
	if (
		(e.key.charCodeAt(0) < 48 || e.key.charCodeAt(0) > 57) &&
		!allowedKeys.includes(e.key.toLowerCase()) &&
		!e.ctrlKey
	) {
		e.preventDefault();
	}
};

export const handleNumberOnlyPaste = (
	e: React.ClipboardEvent<HTMLInputElement>
) => {
	e.preventDefault();
	const text = e.clipboardData.getData("text");
	let ret = "";
	for (const char of text) {
		if (char.charCodeAt(0) < 48 || char.charCodeAt(0) > 57) {
			ret += "";
		} else {
			ret += char;
		}
	}
	return ret;
};

export const validateCheckoutFields = () => {};

export const formatCreditCardNumber = (value: string) => {
	return value
		.replace(/\s+/g, "")
		.replace(/(\d{4})/g, "$1 ")
		.trim();
};

export const formatExpirationDate = (value: string) => {
	value = value.replaceAll(" / ", "");
	if (value.length > 2) {
		return `${value.slice(0, 2)} / ${value.slice(2)}`;
	}
	return value;
};
