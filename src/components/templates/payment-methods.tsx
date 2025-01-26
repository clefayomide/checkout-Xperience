import React from "react";
import RadioGroup from "../molecules/radio-group";
import { paymentOptions } from "@/constants";
import { Button } from "../atom/button";

const PaymentMethods = () => {
	return (
		<div className="h-full flex justify-center items-center">
			<div className="md:bg-white w-full md:shadow-sm md:py-10 md:px-8 flex h-full md:h-fit flex-col justify-between md:items-center md:justify-center md:gap-20 md:w-[50%] xl:w-[30%] rounded-lg m-auto">
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
		</div>
	);
};

export default PaymentMethods;
