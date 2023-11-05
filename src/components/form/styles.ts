import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

export const PaperForm = styled(Paper)({
	background: blue[50],
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '4rem'
});
