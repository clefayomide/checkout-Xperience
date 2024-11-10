import { RadioType } from "@/types";
import { classnames } from "@/utils";
import React from "react";

const Radio = (props: RadioType) => {
	const {
		label,
		id,
		name,
		labelClassName = "",
		className = "",
		wrapperClassName = "",
		reverse,
		...rest
	} = props;
	return (
		<div
			className={classnames(
				`${reverse && "flex-row-reverse"} flex gap-3 items-center w-fit`,
				wrapperClassName
			)}
		>
			<label
				htmlFor={id}
				className={classnames(
					"font-medium text-base h-full  w-full text-typography",
					labelClassName
				)}
			>
				{label}
			</label>
			<input
				id={id}
				name={name}
				type="radio"
				className={classnames(
					"w-[20px] checked:accent-blue-600 h-[20px]",
					className
				)}
				{...rest}
			/>
		</div>
	);
};

export default Radio;
