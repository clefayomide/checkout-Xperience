import { ButtonPropType } from "@/types";
import { classnames } from "@/utils";

export const Button = (props: ButtonPropType) => {
	const { variant, className = "", children, disabled, ...rest } = props;
	const classNames = classnames(
		`${variant === "primary" && "bg-blue-600 text-button_primary_color"} ${
			variant === "secondary" &&
			"bg-button_secondary_background text-button_secondary_color"
		}`,
		`h-[48px] disabled:!bg-blue-400 disabled:!cursor-not-allowed rounded-md px-5 font-normal text-base outline-none border-none focus:outline-none focus:border-none`,

		className
	);
	return (
		<button disabled={disabled} className={classNames} {...rest}>
			{children}
		</button>
	);
};
