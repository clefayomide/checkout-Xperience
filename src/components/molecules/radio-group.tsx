import { RadioGroupType } from "@/types";
import React from "react";
import Radio from "../atom/radio";
import Fieldset from "../atom/fieldset";
import { classnames } from "@/utils";

const RadioGroup = (props: RadioGroupType) => {
	const {
		options,
		name,
		legend,
		fieldsetClassName = "",
		wrapperClassName = "",
	} = props;
	return (
		<Fieldset className={classnames("", fieldsetClassName)} legend={legend}>
			{options.map(
				({ id, label, labelClassName = "", iconBefore: Icon }, index) => (
					<div
						key={`${name}-${index}`}
						className="flex gap-5 h-[60px] rounded has-[:checked]:border has-[:checked]:bg-indigo-50 has-[:checked]:!font-bold has-[:checked]:ring-indigo-200 p-5 items-center mt-3"
					>
						{Icon && <Icon />}
						<Radio
							labelClassName={classnames(
								"has-[:checked]:!text-indigo-900 ",
								labelClassName
							)}
							wrapperClassName={classnames("", wrapperClassName)}
							id={id}
							name={name}
							label={label}
						/>
					</div>
				)
			)}
		</Fieldset>
	);
};

export default RadioGroup;
