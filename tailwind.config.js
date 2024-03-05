/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,jsx,ts,tsx,css}"],
	theme: {
		extend: {
			colors: {
				amazon: {
					background: "#EAEDED",
					light_blue: "#232F3A",
					yellow: "#FEB069",
					DEFAULT: "#131921",
				},
			},
		},
	},
	plugins: [],
};
