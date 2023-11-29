import { Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PaperForm = styled(Paper)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	justifyContent: 'center',
	boxShadow: 'none',
	gap: '1.5rem',
	padding: '0.5rem 0'
});

export const InputForm = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	padding: '1rem 0'
});


