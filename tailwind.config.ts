import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				typography: "rgb(0, 0, 0)",
				typography_gray: "rgb(99, 99, 96)",
				button_primary_background: "#1d1d1b",
				button_primary_color: "#ffffff",
				button_secondary_background: "#ffffff",
				button_secondary_color: "#1d1d1b",
				typography_unfocus: "#636360",
			},
			fontFamily: {
				polySans: ["var(--poly-sans)"],
			},
			content: {
				card: 'url("./src/assests/card.svg")',
				wallet: 'url("./src/assests/wallet.svg")',
			},
		},
	},
	plugins: [],
};
export default config;
