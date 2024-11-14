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
};

export const formFields = {
	cardNumber: "cardNumber",
	expiryDate: "expiryDate",
	cvvNumber: "cvvNumber",
};
