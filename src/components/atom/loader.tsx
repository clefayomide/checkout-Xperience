import React from "react";

const Loader = ({ message }: { message?: string }) => {
	return (
		/* From Uiverse.io by devAaus */ <div className="fixed top-0 z-20 bg-slate-50 flex-col gap-4 w-screen h-[100dvh] flex items-center justify-center">
			<div className="w-20 h-20 border-4 border-transparent text-blue-600 text-4xl animate-spin flex items-center justify-center border-t-blue-600 rounded-full">
				<div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
			</div>
			<div>{message}</div>
		</div>
	);
};

export default Loader;
