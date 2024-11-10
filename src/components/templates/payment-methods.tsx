import React from "react";
import RadioGroup from "../molecules/radio-group";
import { paymentOptions } from "@/constants";
import { Button } from "../atom/button";

const PaymentMethods = () => {
	return (
		<div className="flex h-full flex-col justify-between md:items-center md:justify-center md:gap-20 md:w-[50%] xl:w-[30%] rounded-lg m-auto">
			<RadioGroup
				options={paymentOptions}
				name="method"
				wrapperClassName="justify-between w-full "
				fieldsetClassName="flex flex-col w-full"
			/>

			<Button type="submit" variant="primary" className="w-full h-[46px]">
				Proceed
			</Button>
		</div>
	);
};

export default PaymentMethods;
