/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					"Lexend",
					"ui-sans-serif",
					"system-ui",
					"-apple-system",
					"BlinkMacSystemFont",
					"Segoe UI",
					"Roboto",
					"Helvetica Neue",
					"Arial",
					"Noto Sans",
					"sans-serif",
					"Apple Color Emoji",
					"Segoe UI Emoji",
					"Segoe UI Symbol",
					"Noto Color Emoji",
				],
				serif: [
					"Lexend",
					"ui-serif",
					"Georgia",
					"Cambria",
					"Times New Roman",
					"Times",
					"serif",
				],
			},
			colors: {
				primary: {
					DEFAULT: "#64748b",
					light: "#a2acb9",
					dark: "#334155",
					100: "#e0e3e8",
					200: "#c1c7d1",
					300: "#a2acb9",
					400: "#8390a2",
					500: "#64748b",
					600: "#505d6f",
					700: "#334155",
					800: "#282e38",
					900: "#14171c",
				},
				secondary: {
					DEFAULT: "#ed5623",
					light: "#fbddd3",
					dark: "#8e3415",
					100: "#f8bba7",
					200: "#f6ab91",
					300: "#f49a7b",
					400: "#f1784f",
					500: "#ed5623",
					600: "#be451c",
					700: "#8e3415",
					800: "#772b12",
					900: "#5f220e",
				},
				background: {
					DEFAULT: "#E6E8F1",
					light: "#FFFFFF",
					dark: "#F1F5F9",
				},
				text: {
					DEFAULT: "#2D3D45",
					light: "#4A6979",
					dark: "#414141",
				},
			},
		},
		screens: {
			xs: "375px",
			sm: "640px",
			// => @media (min-width: 640px) { ... }

			md: "768px",
			// => @media (min-width: 768px) { ... }

			lg: "1024px",
			// => @media (min-width: 1024px) { ... }

			xl: "1280px",
			// => @media (min-width: 1280px) { ... }

			"2xl": "1536px",
			// => @media (min-width: 1536px) { ... }
		},
	},
	plugins: [],
	important: true,
};
