import { Bitcoin, Card, Wallet } from "../assests/index";
import { RadioGroupOptionType } from "@/types";

export const paymentOptions: RadioGroupOptionType = [
	{
		id: "card",
		label: "Debit Card",
		iconBefore: Card,
		required: true,
		value: "card",
	},
	{
		id: "bank_transfer",
		label: "Bank Transfer",
		iconBefore: Wallet,
		required: true,
		value: "bank-transfer",
	},
	{
		id: "bitcoin",
		label: "Bitcoin",
		iconBefore: Bitcoin,
		required: true,
		value: "bitcoin",
	},
];

export const allowedKeys = ["backspace", "control"];
export const appMsg = {
	creditCardReq: "card number is required",
	invalidCreditCard: "invalid card number",
	expDateReq: "expiry date is required",
	invalidExpDate: "invalid expiry date",
	cvvReq: "cvv number is required",
	invalidCvv: "invalid cvv number",
};

export const formFields = {
	cardNumber: "cardNumber",
	expiryDate: "expiryDate",
	cvvNumber: "cvvNumber",
};

export const cardTypeRegexes = {
	visa: /^4\d{12}(?:\d{3})?$/,
	mastercard: /^5[1-5]\d{14}$/,
	amex: /^3[47]\d{13}$/,
};

export const testCards = {
	visa: ["4000000000002503"],
	mastercard: ["5123450000000008"],
	verve: ["5060990580000217499"],
	amex: ["378282246310005"],
};

export const appGenerics = {
	maxRecaptchaScore: 0.9,
	badRequest: {
		code: 400,
		status: false,
	},
	successfulRequest: {
		status: true,
		code: 200,
	},
	serverError: {
		status: false,
		code: 500,
	},
};

export const providers = ["providerA", "providerB"];

