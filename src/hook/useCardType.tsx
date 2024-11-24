import { Amex, MasterCard, UnknownCard, Visa } from "@/assests";
import { cardTypeRegexes } from "@/constants";

const useCardType = () => {
	const cardImage = {
		visa: <Visa />,
		mastercard: <MasterCard />,
		amex: <Amex />,
		unknown: <UnknownCard />,
	};
	const detectCardType = (cardNumber: string) => {
		const result = {
			cardType: "unknown",
			cardImage: cardImage["unknown"],
		};
		for (const cardType in cardTypeRegexes) {
			if (
				cardTypeRegexes[cardType as keyof typeof cardTypeRegexes].test(
					cardNumber
				)
			) {
				result.cardType = cardType;
				result.cardImage = cardImage[cardType as keyof typeof cardImage];
				return result;
			}
		}
		return result;
	};
	return { detectCardType };
};

export default useCardType;
