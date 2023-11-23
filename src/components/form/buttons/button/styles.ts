import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const CustomButton = styled(Button)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	padding: '0.8rem 2rem',
	borderRadius: '1.5rem',
	fontFamily: 'inherit',
	fontWeight: 'light',
	width: '80%',
	margin: '1.5rem 0',

	'&:hover': {
		backgroundColor: theme.palette.primary.dark,
	}
}));