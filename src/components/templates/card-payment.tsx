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
		<div className="h-full flex justify-center items-center">
			<Recaptcha showV2Checkbox={showV2Checkbox} />
			<form
				onSubmit={handleSubmit}
				className="md:bg-white md:shadow-sm md:py-10 md:px-8 flex h-full md:h-fit flex-col justify-between md:items-center md:justify-center md:gap-20 md:w-[50%] xl:w-[30%] rounded-lg m-auto"
			>
				<CardForm isLoading={isLoading} />
			</form>
		</div>
	);
};

export default WithLoader(CardPayment, "Processing");
