import { Amex, MasterCard, UnknownCard, Visa } from "@/assests";
import { cardTypeRegexes } from "@/constants";

const useCardType = () => {
	// This function uses a loop to check the card number against the predefined regexes in the cardTypeRegexes object.
	// If a match is found, it updates the cardType and cardImage state variables accordingly and returns the result.
	// If no match is found, it sets the cardType to "unknown" and returns the result.
	// The cardImage object is used to display the appropriate card logo based on the detected card type.
	// Finally, the function returns an object containing the detected card type and card image.
	// This hook is used to determine the card type based on the provided card number in the CheckoutForm component.
	// Note: Make sure to import the necessary card logo components (Visa, MasterCard, Amex, UnknownCard) from the @/assests directory.
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
