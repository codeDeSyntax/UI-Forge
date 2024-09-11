/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const content = [
	"./pages/**/*.{js,ts,jsx,tsx,mdx}",
	"./components/**/*.{js,ts,jsx,tsx,mdx}",
	"./app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
	extend: {
		colors: {
			background: "#0c0d0e",

			primary: {
				DEFAULT: "#151718",
			},
			secondary: {
				DEFAULT: "#202425",
			},
			accent: {
				DEFAULT: "#151718",
			},
			text: {
				DEFAULT: "#f0f0f0",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
