import React from "react";

const Recaptcha = ({ showV2Checkbox }: { showV2Checkbox: boolean }) => {
	return (
		<div
			id="recaptcha-container"
			className={`absolute bg-slate-50 ${
				showV2Checkbox ? "z-10" : "-z-10 hidden"
			}  top-0 left-0 flex justify-center items-center w-screen h-[100dvh]`}
		></div>
	);
};

export default Recaptcha;
