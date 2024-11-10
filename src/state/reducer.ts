import { AppStateType } from "@/types";
import { Action, ActionType } from "./action";

export const appReducerFunc = (
	state: AppStateType,
	action: Action
): AppStateType => {
	switch (action.type) {
		case ActionType.SET_CARD_DATA:
			return {
				...state,
				card: { ...action.payload },
			};

		default:
			return state;
	}
};
