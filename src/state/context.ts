import { AppContextType } from "@/types";
import { createContext } from "react";

export const AppContext = createContext<AppContextType>({
	state: null,
	dispatch: () => {},
});
