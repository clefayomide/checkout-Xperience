"use client"
import { ReactNode, useMemo, useReducer } from "react";
import { AppContext } from "./context";
import { appReducerFunc } from "./reducer";

const StateProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(appReducerFunc, null);
	const value = useMemo(() => {
		return { state, dispatch };
	}, [state]);
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default StateProvider;
