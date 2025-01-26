"use client";
import { ReactNode, useCallback, useEffect, useMemo, useReducer } from "react";
import { AppContext } from "./context";
import { appReducerFunc } from "./reducer";
import { decrypt, encrypt } from "@/utils";
import { config } from "@/config";

const StateProvider = ({ children }: { children: ReactNode }) => {
	const initialState = useMemo(() => {
		if (typeof window !== "undefined") {
			const persistedData = window.sessionStorage.getItem("checkout");
			const decryptedData = persistedData
				? decrypt(persistedData, config.publicEncKey)
				: null;
			return decryptedData;
		}
		return null;
	}, []);

	const [state, dispatch] = useReducer(appReducerFunc, initialState);

	const value = useMemo(() => {
		return { state, dispatch };
	}, [state]);

	const storeDataInStorage = useCallback(() => {
		if (typeof window !== "undefined") {
			const encryptedData = encrypt(state as never, config.publicEncKey);
			window.sessionStorage.setItem("checkout", encryptedData);
		}
	}, [state]);

	useEffect(() => {
		storeDataInStorage();
	}, [storeDataInStorage]);
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default StateProvider;
