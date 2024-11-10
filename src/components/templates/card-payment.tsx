import React from "react";
import CardForm from "../molecules/card-form";

const CardPayment = () => {
	return (
		<form className="flex h-full flex-col justify-between md:items-center md:justify-center md:gap-20 md:w-[50%] xl:w-[30%] rounded-lg m-auto">
			<CardForm />
		</form>
	);
};

export default CardPayment;
