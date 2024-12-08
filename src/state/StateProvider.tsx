"use client";
import { ReactNode, useCallback, useEffect, useMemo, useReducer } from "react";
import { AppContext } from "./context";
import { appReducerFunc } from "./reducer";
import { decrypt, encrypt } from "@/utils";
import { config } from "@/config";

const StateProvider = ({ children }: { children: ReactNode }) => {
	const persistedData = sessionStorage.getItem("checkout");
	const decryptedData = persistedData
		? decrypt(persistedData, config.publicEncKey as string)
		: null;

	const [state, dispatch] = useReducer(appReducerFunc, decryptedData);
	
	const value = useMemo(() => {
		return { state, dispatch };
	}, [state]);

	const storeDataInStorage = useCallback(() => {
		const encryptedData = encrypt(state, config.publicEncKey as string);
		sessionStorage.setItem("checkout", encryptedData);
	}, [state]);

	useEffect(() => {
		storeDataInStorage();
	}, [storeDataInStorage]);
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default StateProvider;
