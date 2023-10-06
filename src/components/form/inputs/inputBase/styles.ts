import { TextField } from '@mui/material';
import { styled } from '@mui/system';

export const TextInput = styled(TextField)({
	fontFamily: 'inherit',
	display: 'flex',
	flexDirection: 'column',
	columnGap: '1rem',
});