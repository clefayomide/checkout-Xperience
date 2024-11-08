export const classnames = (...args: string[]) => {
	let ret = "";
	args.forEach((classes) => {
		ret += `${classes} `;
	});
	return ret.trimEnd();
};
