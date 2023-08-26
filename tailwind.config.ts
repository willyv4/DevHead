export default {
	content: ["./app/**/*.{js,jsx,ts,tsx}"],
	daisyui: {
		themes: ["night"],
	},
	plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
