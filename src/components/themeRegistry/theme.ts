import { Inter } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red, deepPurple } from '@mui/material/colors';

export const inter = Inter({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
	fallback: ['Heebo', 'Arial', 'sans-serif'],
});

const theme = createTheme({
	palette: {
		primary: {
			main: deepPurple.A400,
			light: deepPurple.A200,
			dark: deepPurple.A700
		},
		error: {
			main: red.A400,
		},
	},
	typography: {
		fontFamily: inter.style.fontFamily,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700
	},
});

export default theme;
