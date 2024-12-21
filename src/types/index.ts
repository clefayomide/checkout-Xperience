import { Action } from "@/state/action";
import { ReactNode } from "react";

export type RadioType = {
	label: string;
	id: string;
	name: string;
	labelClassName?: string;
	inputClassName?: string;
	wrapperClassName?: string;
	reverse?: boolean;
} & Omit<JSX.IntrinsicElements["input"], "type">;

export type RadioGroupOptionType = Array<
	{
		id: string;
		label: string;
		iconBefore?: () => React.JSX.Element;
	} & Partial<RadioType>
>;

export type RadioGroupType = {
	name: string;
	options: RadioGroupOptionType;
	fieldsetClassName?: string;
} & Pick<RadioType, "wrapperClassName">;

export type FieldsetType = {
	legend: string | undefined;
	children: React.ReactNode;
} & JSX.IntrinsicElements["fieldset"];

export type ButtonPropType = {
	variant?: "primary" | "secondary";
} & JSX.IntrinsicElements["button"];

type TypographyVariantType = keyof JSX.IntrinsicElements;

export type TypographyPropType = {
	variant?: TypographyVariantType;
	children: React.ReactNode;
	className?: string;
};

export type InputPropType = {
	labelClassName?: string;
	label: string;
	errorMessage?: string;
	endContent?: ReactNode;
} & JSX.IntrinsicElements["input"];

export type CardDataType = {
	cardNumber: string;
	expiryDate: string;
	cvvNumber: string;
};

export type AppStateType = {
	card: CardDataType;
} | null;

export type CheckoutFieldName = "cardNumber" | "expiryDate" | "cvvNumber";

export type CheckoutFormFields = {
	[key in CheckoutFieldName]: {
		value: string;
		error: string;
	};
};

export type ValidateFieldsType = {
	field: string;
	value: string;
};

export type ValidateFieldsReturnType = {
	field: string;
	error: string;
};

export type RecaptchaResponseType = {
	status: boolean;
	code: number;
	message: string;
	data: {
		success: boolean;
		challenge_ts: string;
		hostname: string;
		score: number;
		action: string;
	};
};

export type HOCPropType = {
	setLoading: (isComponentLoading: boolean) => void;
	isLoading: boolean;
};

export type UseRecaptchaHookPropType = {
	onFinish: () => Promise<void>;
	onInit?: () => void;
};

export type AppContextType = {
	state: AppStateType;
	dispatch: React.Dispatch<Action>;
} | null;

export type PaymentProcessResponseType = {
	code: number;
	status: boolean;
	message: string;
	data: {
		transactionRef: string;
		amount: number;
		provider: string;
	};
};

export type PurchaseCallResponseType = {
	status: boolean;
	code: number;
	message: string;
	data: { pin: boolean; provider: string; sessionId: string };
};

export type TransactionConfirmationType = {
	status: boolean;
	code: number;
	message: string;
	data: { amount: number; transactionRef: string };
};

export type PurchaseDetails = CardDataType & { pin?: string; amount: number };
export type BaseStrategy = {
	confirmPayment(transactionRef: string): Promise<TransactionConfirmationType>;
	setStrategy(strategy: Strategy): void;
	makePayment(): Promise<PaymentProcessResponseType | PurchaseCallResponseType>;
};

export type PayType = (
	selectedProvider: string,
	purchaseDetails: PurchaseDetails
) => Promise<PurchaseCallResponseType>;
export interface ProviderAStrategy {
	pay: PayType;
}
export interface ProviderBStrategy {
	pay: PayType;
}

export type Strategy = ProviderAStrategy | ProviderBStrategy;
