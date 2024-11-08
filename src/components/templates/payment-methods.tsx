import React from "react";
import RadioGroup from "../molecules/radio-group";
import { paymentOptions } from "@/constants";
import { Button } from "../atom/button";

const PaymentMethods = () => {
	return (
		<div className="flex h-full flex-col justify-between md:items-center md:justify-center md:gap-20 md:w-[50%] xl:w-[30%] rounded-lg m-auto">
			<RadioGroup
				legend="Choose a payment method"
				options={paymentOptions}
				name="payment_method"
				wrapperClassName="justify-between w-full "
				fieldsetClassName="flex flex-col  w-full"
			/>

			<Button variant="primary" className="w-full h-[46px]">
				Proceed
			</Button>
		</div>
	);
};

export default PaymentMethods;
