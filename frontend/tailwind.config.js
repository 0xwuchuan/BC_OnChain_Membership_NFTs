/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#141D48",
				secondary: "#3E497A",
				offwhite: "ece7e5",
			},
		},
	},
	plugins: [],
};
