import React, { FormEvent, useContext } from "react";
import CardForm from "../molecules/card-form";
import { CardDataType, HOCPropType } from "@/types";
import useRecaptcha from "@/hook/useRecaptcha";
import Recaptcha from "../atom/recaptcha";
import WithLoader from "../hoc/loader";
import { AppContext } from "@/state/context";
import { ActionType } from "@/state/action";
import { cleanUpCardData, validateCCNumber, validateExpiryDate } from "@/utils";

const CardPayment = ({ setLoading, isLoading }: HOCPropType) => {
	const app = useContext(AppContext);
	const handlePaymentProcess = async () => {
		setLoading(false);
		try {
			const response = await fetch("api/card-purchase", {
				method: "POST",
				body: JSON.stringify(app?.state?.card),
			});
			const formattedResponse = await response.json();
			console.log(formattedResponse);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const { initRecaptcha, showV2Checkbox } = useRecaptcha({
		onFinish: handlePaymentProcess,
		onInit: () => setLoading(!isLoading),
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const cardData = Object.fromEntries(
			new FormData(e.currentTarget).entries()
		) as CardDataType;

		if (
			!validateCCNumber(cardData.cardNumber) ||
			!validateExpiryDate(cardData.expiryDate) ||
			cardData.cvvNumber.length < 3
		) {
			return;
		}

		app?.dispatch({
			type: ActionType.SET_CARD_DATA,
			payload: cleanUpCardData(cardData),
		});
		initRecaptcha();
	};

	return (
		<>
			<Recaptcha showV2Checkbox={showV2Checkbox} />
			<form
				onSubmit={handleSubmit}
				className="flex h-full flex-col justify-between md:items-center md:justify-center md:gap-20 md:w-[50%] xl:w-[30%] rounded-lg m-auto"
			>
				<CardForm isLoading={isLoading} />
			</form>
		</>
	);
};

export default WithLoader(CardPayment, "Processing");
