import { FieldsetType } from "@/types";
import React from "react";

const Fieldset = (props: FieldsetType) => {
	const { legend, children, ...rest } = props;
	return (
		<fieldset {...rest}>
			<legend className="text-lg font-semibold">{legend}</legend>
			<div className="mt-5">{children}</div>
		</fieldset>
	);
};

export default Fieldset;
