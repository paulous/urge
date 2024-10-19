/** @type {import('tailwindcss').Config} */

//RUN ------>   npx tailwindcss -i ./src/global.css -o ./public/globaloutput.css --watch

export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
	theme: {
		extend: {
			keyframes: {

				jiggle: {
					"0%": {
						transform: "scale3d(1, 1, 1)",
					},
					"30%": {
						transform: "scale3d(1.25, 0.75, 1)",
					},
					"40%": {
						transform: "scale3d(0.75, 1.25, 1)",
					},
					"50%": {
						transform: "scale3d(1.15, 0.85, 1)",
					},
					"65%": {
						transform: "scale3d(0.95, 1.05, 1)",
					},
					"75%": {
						transform: "scale3d(1.05, 0.95, 1)",
					},
					"100%": {
						transform: "scale3d(1, 1, 1)",
					},
				},
				"fly-out-up": {

					"0%": {
						opacity: "0",
						transform: "translate3d(0, 15px, 0)",
					},
					"50%": {
						opacity: "1",
						transform: "translate3d(0, 50px, 0)",
					},
					"100%": {
						opacity: "0",
						transform: "translate3d(0, 100px, 0)",
					},
				},
				"fly-out-down": {

					"0%": {
						opacity: "0",
						transform: "translate3d(0, -15px, 0)",
					},
					"50%": {
						opacity: "1",
						transform: "translate3d(0, -50px, 0)",
					},
					"100%": {
						opacity: "0",
						transform: "translate3d(0, -100px, 0)",
					},
				},
				"fly-out-left": {

					"0%": {
						opacity: "0",
						transform: "translate3d(15px, 0, 0)",
					},
					"50%": {
						opacity: "1",
						transform: "translate3d(50px, 0, 0)",
					},
					"100%": {
						opacity: "0",
						transform: "translate3d(100px, 0, 0)",
					},
				},
				"fly-out-right": {

					"0%": {
						opacity: "0",
						transform: "translate3d(-15px, 0, 0)",
					},
					"50%": {
						opacity: "1",
						transform: "translate3d(-50px, 0, 0)",

					},
					"100%": {
						opacity: "0",
						transform: "translate3d(-100px, 0, 0)",
					},
				},

			},
			animation: {

				jiggle: "jiggle 0.6s ease-in-out 0.25s 1",
				flyoutup: "fly-out-up 0.45s ease-out var(--fly-up-del) var(--fly-up-rep) both running",
				flyoutdown: "fly-out-down 0.45s ease-out var(--fly-down-del) var(--fly-down-rep) both running",
				flyoutleft: "fly-out-left 0.45s ease-out var(--fly-left-del) var(--fly-left-rep) both running",
				flyoutright: "fly-out-right 0.45s ease-out var(--fly-right-del) var(--fly-right-rep) both running",

			},
		},
	},

	plugins: [require("daisyui"), require("@tailwindcss/typography")],
	daisyui: {
		themes: ["light", "dark", "cupcake"],
	},
};
