import { CardDataType } from "@/types";

export enum ActionType {
	SET_CARD_DATA = "SET_CARD_DATA",
}

export interface SET_CARD_DATA {
	type: ActionType.SET_CARD_DATA;
	payload: CardDataType;
}

export type Action = SET_CARD_DATA;
