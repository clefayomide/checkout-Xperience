import { MasterCard, Amex, Visa } from "@/assests";
import React from "react";

const SupportedCards = () => {
	return (
		<div className="flex gap-3 items-center">
			<MasterCard />
			<Visa />
			<Amex />
		</div>
	);
};

export default SupportedCards;
