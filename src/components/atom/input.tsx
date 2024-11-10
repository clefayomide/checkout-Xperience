import { InputPropType } from "@/types";
import { Montserrat } from "next/font/google";
import { classnames } from "@/utils";
import React, { forwardRef } from "react";

const montserrat = Montserrat({
	subsets: ["latin"],
	display: "swap",
});

const Input = forwardRef(
	(props: InputPropType, ref: React.ForwardedRef<HTMLInputElement>) => {
		const {
			labelClassName = "",
			className = "",
			label,
			errorMessage,
			id,
			...rest
		} = props;
		return (
			<label
				htmlFor={id}
				className={classnames(
					"flex relative flex-col gap-[3px] font-medium",
					labelClassName,
					montserrat.className
				)}
			>
				{label}
				<input
					ref={ref}
					id={id}
					className={classnames(
						"h-[46px] rounded-[10px] border outline-none focus:outline-none px-3",
						errorMessage ? "border-red-500" : "border-inputBorder focus:border-blue-600",
						montserrat.className,
						className
					)}
					{...rest}
				/>
				{errorMessage && (
					<small
						className={`!text-red-500 absolute top-[68px] bottom-0 ${montserrat.className}`}
					>
						{errorMessage}
					</small>
				)}
			</label>
		);
	}
);

Input.displayName = "Input";

export default Input;
