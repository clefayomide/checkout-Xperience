import { AppStateType } from "@/types";
import React, { createContext } from "react";
import { Action } from "./action";

export const AppContext = createContext<{
	state: AppStateType;
	dispatch: React.Dispatch<Action>;
} | null>(null);
