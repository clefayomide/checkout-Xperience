import "@testing-library/jest-dom";
import CardForm from "@/components/molecules/card-form";
import {
	act,
	cleanup,
	fireEvent,
	render,
	screen,
} from "@testing-library/react";
import { appMsg, testCards } from "@/constants";

const touchField = (field: HTMLInputElement[]) => {
	act(() => {
		field.forEach((f) => {
			f.focus();
			f.blur();
		});
	});
};

const changeFieldValue = (
	fieldSet: Array<{ field: HTMLInputElement; value: string }>
) => {
	fieldSet.forEach(({ field, value }) => {
		fireEvent.change(field, { target: { value } });
	});
};

describe("Checkout Form", () => {
	let cardNumberInput: HTMLInputElement;
	let expDateInput: HTMLInputElement;
	let cvvNumberInput: HTMLInputElement;

	beforeEach(() => {
		render(<CardForm />);
		cardNumberInput = screen.getByTestId("card-number-input");
		expDateInput = screen.getByTestId("card-exp-input");
		cvvNumberInput = screen.getByTestId("card-cvv-input");
	});

	afterEach(() => {
		cleanup();
	});

	it("validate required fields", () => {
		touchField([cardNumberInput, expDateInput, cvvNumberInput]);
		changeFieldValue([
			{ field: cardNumberInput, value: "4444555" },
			{ field: expDateInput, value: "11 / 11" },
			{ field: cvvNumberInput, value: "222" },
		]);

		changeFieldValue([
			{ field: cardNumberInput, value: "" },
			{ field: expDateInput, value: "" },
			{ field: cvvNumberInput, value: "" },
		]);

		const cardNumberReqMsg = screen.getByText(appMsg.creditCardReq);
		const expDateReqMsg = screen.getByText(appMsg.expDateReq);
		const cvvReqMsg = screen.getByText(appMsg.cvvReq);
		expect(cardNumberReqMsg).toBeInTheDocument();
		expect(expDateReqMsg).toBeInTheDocument();
		expect(cvvReqMsg).toBeInTheDocument();
	});
	it("validate card number field", () => {
		touchField([cardNumberInput]);
		changeFieldValue([{ field: cardNumberInput, value: "4444555" }]);
		let errorMessage = screen.queryByText(appMsg.invalidCreditCard);
		expect(errorMessage).toBeInTheDocument();
		changeFieldValue([{ field: cardNumberInput, value: testCards.verve[0] }]);
		errorMessage = screen.queryByText(appMsg.invalidCreditCard);
		expect(errorMessage).not.toBeInTheDocument();
	});

	it("validate expiry date field", () => {
		touchField([expDateInput]);
		changeFieldValue([{ field: expDateInput, value: "11 / 11" }]);
		let errorMessage = screen.queryByText(appMsg.invalidExpDate);
		expect(errorMessage).toBeInTheDocument();
		changeFieldValue([{ field: expDateInput, value: "11 / 25" }]);
		errorMessage = screen.queryByText(appMsg.invalidExpDate);
		expect(errorMessage).not.toBeInTheDocument();
	});

	it("validate cvv number field", () => {
		touchField([cvvNumberInput]);
		changeFieldValue([{ field: cvvNumberInput, value: "22" }]);
		let errorMessage = screen.queryByText(appMsg.invalidCvv);
		expect(errorMessage).toBeInTheDocument();
		changeFieldValue([{ field: cvvNumberInput, value: "111" }]);
		errorMessage = screen.queryByText(appMsg.invalidCvv);
		expect(errorMessage).not.toBeInTheDocument();
	});

	it("detect valid visa card number", () => {
		touchField([cardNumberInput]);
		testCards.visa.forEach((card) => {
			changeFieldValue([{ field: cardNumberInput, value: card }]);
			expect(
				screen.queryByText(appMsg.invalidCreditCard)
			).not.toBeInTheDocument();
			const icon = screen.getAllByRole("img", { name: "visa" });
			expect(icon[0]).toBeInTheDocument();
		});
	});

	it("detect valid mastercard number", () => {
		touchField([cardNumberInput]);
		testCards.mastercard.forEach((card) => {
			changeFieldValue([{ field: cardNumberInput, value: card }]);
			expect(
				screen.queryByText(appMsg.invalidCreditCard)
			).not.toBeInTheDocument();
			const icon = screen.getAllByRole("img", { name: "mastercard" });
			expect(icon[0]).toBeInTheDocument();
		});
	});

	it("detect valid amex card number", () => {
		touchField([cardNumberInput]);
		testCards.amex.forEach((card) => {
			changeFieldValue([{ field: cardNumberInput, value: card }]);
			expect(
				screen.queryByText(appMsg.invalidCreditCard)
			).not.toBeInTheDocument();
			const icon = screen.getAllByRole("img", { name: "amex" });
			expect(icon[0]).toBeInTheDocument();
		});
	});
});
