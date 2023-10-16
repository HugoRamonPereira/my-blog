import { Container, Dialog, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const CommentContainer = styled(Container)({
	display: 'flex',
	justifyContent: 'space-between',
	border: '1px solid gray',
	borderRadius: '0.2rem',
	padding: '1rem 0',
	marginBottom: '0.8rem'
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
	width: 216,
	display: 'flex',
	alignItems: 'center',
	textAlign: 'center',
	gap: '1rem'
});

export const CommentDateTime = styled(Typography)({
	fontFamily: 'inherit',
	fontWeight: 'lighter',
	width: 170
});

export const EditCommentContainer = styled(Container)({
	width: 30,
	marginRight: '1rem'
});

export const EditButton = styled(IconButton)({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
});

export const ActionsText = styled(Typography)({
	fontFamily: 'inherit',
	marginLeft: '0.8rem'
});

export const EditDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));