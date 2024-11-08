import { ButtonPropType } from "@/types";
import { classnames } from "@/utils";

export const Button = (props: ButtonPropType) => {
	const { variant, className = "", children, ...rest } = props;
	const classNames = classnames(
		`${
			variant === "primary" &&
			"bg-button_primary_background text-button_primary_color"
		} ${
			variant === "secondary" &&
			"bg-button_secondary_background text-button_secondary_color"
		}`,
		`h-[48px] rounded-[.25rem] px-5 font-normal text-base outline-none border-none focus:outline-none focus:border-none`,

		className
	);
	return (
		<button className={classNames} {...rest}>
			{children}
		</button>
	);
};
