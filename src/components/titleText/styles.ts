import { Typography } from '@mui/material';
import { styled } from '@mui/system';
// import theme from '../themeRegistry/theme';

export const Title = styled(Typography)(({ theme }) => ({
	fontFamily: 'inherit',
	fontSize: '2rem',
	fontWeight: 'bold',
	display: 'flex',
	gap: '0.5rem',
	color: theme.palette.primary.main,
	marginBottom: '1rem'
}));