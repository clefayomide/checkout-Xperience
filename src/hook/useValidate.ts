import { appMsg, formFields } from "@/constants";
import { ValidateFieldsReturnType, ValidateFieldsType } from "@/types";
import { validateCCNumber, validateExpiryDate } from "@/utils";

const useValidate = () => {
	const validateFields = ({
		field,
		value,
	}: ValidateFieldsType): ValidateFieldsReturnType => {
		const result: ValidateFieldsReturnType = { error: "", field };

		switch (field) {
			case formFields.cardNumber:
				if (!value) {
					result.error = appMsg.creditCardReq;
				}
				if (!validateCCNumber(value)) {
					result.error = appMsg.invalidCreditCard;
				}
				return result;
			case formFields.expiryDate:
				if (!value) {
					result.error = appMsg.expDateReq;
				}

				if (!validateExpiryDate(value)) {
					result.error = appMsg.invalidExpDate;
				}
				return result;
			case formFields.cvvNumber:
				if (!value) {
					result.error = appMsg.cvvReq;
				}
				if (value.length < 3) {
					result.error = appMsg.invalidCvv;
				}
				return result;
			default:
				return result;
		}
	};
	return { validateFields };
};

export default useValidate;
