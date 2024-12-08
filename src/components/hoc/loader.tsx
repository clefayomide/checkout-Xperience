import React, { FC, useState } from "react";
import Loader from "../atom/loader";
import { HOCPropType } from "@/types";

const WithLoader = (Component: FC<HOCPropType>, message?: string) => {
	function LoadingComponent() {
		const [isLoading, setIsLoading] = useState(false);
		const updateLoadingState = (isComponentLoading: boolean) => {
			setIsLoading(isComponentLoading);
		};
		return (
			<>
				{isLoading && <Loader message={message} />}
				<Component setLoading={updateLoadingState} isLoading={isLoading} />
			</>
		);
	}
	return LoadingComponent;
};

export default WithLoader;
