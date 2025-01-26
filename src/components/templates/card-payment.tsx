import React from "react";
import CardForm from "../molecules/card-form";
import { HOCPropType } from "@/types";
import Recaptcha from "../atom/recaptcha";
import WithLoader from "../hoc/loader";
import useCardPaymentProcess from "@/hook/payment-process/useCardPaymentProcess";

const CardPayment = ({ setLoading, isLoading }: HOCPropType) => {
	const { showV2Checkbox, handleSubmit } = useCardPaymentProcess({
		setLoading,
		isLoading,
	});
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
