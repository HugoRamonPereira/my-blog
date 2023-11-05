import { styled } from '@mui/system';
import { Container, Stack, TextField } from '@mui/material';

export const InputContainer = styled(Container)({
	height: '150px'
});

export const InputCommentBox = styled(Stack)({
	display: 'flex',
	flexDirection: 'column'
});

export const InputTextField = styled(TextField)({
	'& fieldset': { border: 'none' },
	borderRadius: '0.5rem',

	border: '1px solid #808080',
	'&:hover': {
		border: '1px solid black'
	}
});