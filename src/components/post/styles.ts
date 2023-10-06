import { Container, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const CommentContainer = styled(Container)({
	display: 'flex',
	justifyContent: 'space-between',
	border: '1px solid gray',
	borderRadius: '0.2rem',
	padding: '1rem 0'
});

export const CommentInfo = styled(Container)({
	display: 'flex',
	alignItems: 'center',
	gap: '1rem'
});

export const CommentText = styled(Typography)({
	fontFamily: 'inherit',
	fontWeight: 'lighter'
});

export const CommentContainerDateTime = styled(Container)({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
});

export const CommentDateTime = styled(Typography)({
	fontFamily: 'inherit',
	fontWeight: 'lighter'
});