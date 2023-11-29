import { Typography } from '@mui/material';
import { styled } from '@mui/system';

export const Title = styled(Typography)(({ theme }) => ({
	color: theme.palette.primary.main,
	fontFamily: 'inherit',
	fontWeight: 'bold',
	marginBottom: '2rem'
}));
