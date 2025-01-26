import { AppContext } from "@/state/context";
import { FormEvent, useContext } from "react";
import useRecaptcha from "../useRecaptcha";
import { CardDataType, HOCPropType } from "@/types";
import { cleanUpCardData, validateCCNumber, validateExpiryDate } from "@/utils";
import { ActionType } from "@/state/action";

export default function useCardPaymentProcess({
	isLoading,
	setLoading,
}: HOCPropType) {
	const app = useContext(AppContext);

	const handleCardPaymentProcess = async () => {
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
		onFinish: handleCardPaymentProcess,
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

	return { handleSubmit, showV2Checkbox };
}
