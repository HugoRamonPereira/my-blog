import { Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

export const PaperForm = styled(Paper)({
	background: grey[100],
	display: 'flex',
	flexDirection: 'column',
	gap: '1.5rem',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '3rem',
	boxShadow: 'none',
	border: '1px solid',
	borderColor: grey[300],
	borderRadius: '1rem'
});

export const FormBox = styled(Box)({
	'& .MuiTextField-root': {
		width: '35ch',
	},
});