import { allowedKeys, providers } from "@/constants";
import { AppStateType, CardDataType } from "@/types";
import CryptoJS from "crypto-js";

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
	return formatCreditCardNumber(ret);
};

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

export const validateCCNumber = (cardNumber: string) => {
	const formattedCardNumber = cardNumber
		.replaceAll(" ", "")
		.split("")
		.map(Number);
	for (let i = formattedCardNumber.length - 2; i >= 0; i -= 2) {
		let temp = formattedCardNumber[i] * 2;
		if (temp > 9) {
			temp = (temp % 10) + 1;
		}
		formattedCardNumber[i] = temp;
	}

	let total = 0;
	for (const i of formattedCardNumber) {
		total += i;
	}
	return total % 10 === 0;
};

export const validateExpiryDate = (expiryDate: string) => {
	const [month, year] = expiryDate.split("/");
	const dateString = `${month}-1-${year}`.replaceAll(" ", "");
	const expDateMilisec = new Date(dateString).setSeconds(0);
	const currentDateMilisec = new Date().setSeconds(0);
	return expDateMilisec > currentDateMilisec;
};

export const encrypt = (data: Partial<AppStateType>, key: string) => {
	return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
};

export const decrypt = (data: string, key: string) => {
	const bytes = CryptoJS.AES.decrypt(data, key);
	const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	return decryptedData;
};

export const cleanUpCardData = (cardData: CardDataType) => {
	return {
		cardNumber: cardData.cardNumber.replace(/\s+/g, ""),
		expiryDate: cardData.expiryDate.replaceAll(" / ", ""),
		cvvNumber: cardData.cvvNumber.replace(/\s+/g, ""),
	};
};

export const getProvider = () => {
	const randomNumber = Math.floor(Math.random() * 2) + 1;
	const selectedProvider = providers[randomNumber - 1];
	return selectedProvider;
};
