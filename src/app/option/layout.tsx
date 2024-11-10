import React, { ReactNode } from "react";

const OptionsLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="h-[100dvh] w-screen px-5 pt-3 py-3 !pb-8">{children}</div>
	);
};

export default OptionsLayout;
