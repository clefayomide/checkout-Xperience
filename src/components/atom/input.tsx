import { InputPropType } from "@/types";
import { Montserrat } from "next/font/google";
import { classnames } from "@/utils";
import React, { forwardRef, useState } from "react";

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
			endContent,
			...rest
		} = props;

		const [touched, setTouched] = useState(false);
		const hasError = touched && errorMessage;

		const handleBlur = () => {
			setTouched(true);
		};

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
				<div className="relative">
					<input
						ref={ref}
						id={id}
						aria-describedby={`input-${id}`}
						onBlur={handleBlur}
						className={classnames(
							"h-[46px] rounded-[10px] border outline-none focus:outline-none px-3",
							hasError
								? "border-red-500 text-red-500"
								: "border-inputBorder focus:border-blue-600",
							montserrat.className,
							className
						)}
						{...rest}
					/>
					{endContent && (
						<div
							className={`absolute top-1/2 translate-y-[-50%] right-5 ${
								hasError && "!text-red-500"
							}`}
						>
							{endContent}
						</div>
					)}
				</div>
				{hasError && (
					<small
						id={`input-${id}`}
						aria-live="assertive"
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
