import React, { FormEvent, useState } from "react";
import CardForm from "../molecules/card-form";
import { CardDataType } from "@/types";
import useRecaptcha from "@/hook/useRecaptcha";
import Recaptcha from "../atom/recaptcha";

const CardPayment = () => {
	const handlePaymentProcess = () => {
		setIsSubmitting(true);
	};
	const { initRecaptcha, showV2Checkbox } = useRecaptcha({
		onFinish: handlePaymentProcess,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = Object.fromEntries(
			new FormData(e.currentTarget).entries()
		) as CardDataType;
		console.log(data);
		initRecaptcha();
	};

	return (
		<>
			<Recaptcha showV2Checkbox={showV2Checkbox} />
			<form
				onSubmit={handleSubmit}
				className="flex h-full flex-col justify-between md:items-center md:justify-center md:gap-20 md:w-[50%] xl:w-[30%] rounded-lg m-auto"
			>
				<CardForm isLoading={isSubmitting} />
			</form>
		</>
	);
};

export default CardPayment;
