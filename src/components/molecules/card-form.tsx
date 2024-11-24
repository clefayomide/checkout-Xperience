import React, { useMemo, useState } from "react";
import Fieldset from "../atom/fieldset";
import Input from "../atom/input";
import SupportedCards from "../atom/supported-cards";
import {
	formatCreditCardNumber,
	formatExpirationDate,
	handleNumberOnlyKeyPress,
	handleNumberOnlyPaste,
} from "@/utils";
import { CheckoutFieldName, CheckoutFormFields } from "@/types";
import { Button } from "../atom/button";
import useValidate from "@/hook/useValidate";
import { formFields } from "@/constants";
import useCardType from "@/hook/useCardType";
import { UnknownCard } from "@/assests";

const CardForm = () => {
	const { validateFields } = useValidate();
	const { detectCardType } = useCardType();
	const [formData, setFormData] = useState<CheckoutFormFields>({
		cardNumber: { value: "", error: "" },
		expiryDate: { value: "", error: "" },
		cvvNumber: { value: "", error: "" },
	});

	const formIsValid = useMemo(() => {
		return Object.values(formData).every((field) => {
			return field.value && !field.error;
		});
	}, [formData]);

	const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const formattedData = handleNumberOnlyPaste(e);
		const key = e.currentTarget.name as CheckoutFieldName;
		const result = validateFields({ field: key, value: formattedData });

		setFormData((prev) => {
			return {
				...prev,
				[key]: {
					...prev[key],
					value: formattedData,
					error: result.error,
				},
			};
		});
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target as {
			name: CheckoutFieldName;
			value: string;
		};
		let formattedCreditCardNumber: string;
		let formattedExpiryDate: string;
		const isCreditCardField = name === "cardNumber";
		const isExpiryDateField = name === "expiryDate";
		if (isExpiryDateField) {
			formattedExpiryDate = formatExpirationDate(value);
		}
		if (isCreditCardField) {
			formattedCreditCardNumber = formatCreditCardNumber(value);
		}

		const result = validateFields({ field: name, value });

		setFormData((prev) => {
			return {
				...prev,
				[name]: {
					...prev[name],
					value: isCreditCardField
						? formattedCreditCardNumber
						: isExpiryDateField
						? formattedExpiryDate
						: value,
					error: result.error,
				},
			};
		});
	};

	const cardIcon = useMemo(() => {
		const cardType = detectCardType(
			formData.cardNumber.value.replaceAll(" ", "")
		);
		return cardType?.cardImage;
	}, [formData.cardNumber.value, detectCardType]);
	return (
		<Fieldset
			legend="Enter your card details"
			className="w-full h-full md:h-auto relative"
		>
			<div>
				<div className="mt-8">
					<SupportedCards />
				</div>

				<Input
					label="Card Number"
					id="cardNumber"
					className="w-full rounded"
					labelClassName="mt-10 text-sm"
					autoComplete="cc-number"
					placeholder="4234 3457 2367 5748"
					onKeyDown={handleNumberOnlyKeyPress}
					endContent={cardIcon}
					onPaste={handleOnPaste}
					onChange={handleOnChange}
					name={formFields.cardNumber}
					required
					errorMessage={formData.cardNumber.error}
					value={formData.cardNumber.value}
					pattern="[0-9\s]+"
					inputMode="numeric"
					maxLength={23}
				/>

				<div className="flex gap-5  mt-8">
					<Input
						label="Expiry Date"
						id="expDate"
						className="w-full rounded"
						labelClassName="text-sm"
						placeholder="MM / YY"
						onKeyDown={handleNumberOnlyKeyPress}
						onPaste={handleOnPaste}
						onChange={handleOnChange}
						autoComplete="cc-exp"
						name={formFields.expiryDate}
						required
						errorMessage={formData.expiryDate.error}
						value={formData.expiryDate.value}
						inputMode="numeric"
						maxLength={7}
						endContent={<UnknownCard />}
					/>
					<Input
						label="Cvv Number"
						id="ccvNumber"
						className="w-full rounded"
						labelClassName="text-sm"
						placeholder="365"
						autoComplete="cc-csc"
						name={formFields.cvvNumber}
						onKeyDown={handleNumberOnlyKeyPress}
						onPaste={handleOnPaste}
						onChange={handleOnChange}
						required
						errorMessage={formData.cvvNumber.error}
						value={formData.cvvNumber.value}
						pattern="[0-9\s]+"
						inputMode="numeric"
						maxLength={3}
						endContent={<UnknownCard />}
					/>
				</div>
			</div>
			<Button
				disabled={!formIsValid}
				type="submit"
				variant="primary"
				className="w-full font-semibold h-[46px] absolute md:static md:mt-16 bottom-0"
			>
				Pay ₦2,000
			</Button>
		</Fieldset>
	);
};

export default CardForm;
