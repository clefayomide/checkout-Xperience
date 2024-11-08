import { Bitcoin, Card, Wallet } from "../assests/index";
import { RadioGroupOptionType } from "@/types";

export const paymentOptions: RadioGroupOptionType = [
	{
		id: "card",
		label: "Debit Card",
		iconBefore: Card,
	},
	{
		id: "bank_transfer",
		label: "Bank Transfer",
		iconBefore: Wallet,
	},
	{ id: "bitcoin", label: "Bitcoin", iconBefore: Bitcoin },
];
