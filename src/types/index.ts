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
	} & Pick<RadioType, "labelClassName">
>;

export type RadioGroupType = {
	name: string;
	options: RadioGroupOptionType;
	legend?: string;
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
