import { appMsg, formFields } from "@/constants";
import { ValidateFieldsReturnType, ValidateFieldsType } from "@/types";
import { validateCCNumber } from "@/utils";

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
					return result;
				}
				if (!validateCCNumber(value)) {
					result.error = appMsg.invalidCreditCard;
					return result;
				}

			default:
				return { error: "", field };
		}
	};
	return { validateFields };
};

export default useValidate;
