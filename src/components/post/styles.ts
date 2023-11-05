import { Button, Container, Dialog, IconButton, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const CommentContainer = styled(Container)({
	display: 'flex',
	justifyContent: 'space-between',
	border: '1px solid gray',
	borderRadius: '0.5rem',
	padding: '1rem 0',
	marginBottom: '0.8rem'
});

export const CommentInfo = styled(Container)({
	alignItems: 'center',
	display: '-webkit-box',
	'-webkit-line-clamp': '3',
	'-webkit-box-orient': 'vertical',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	wordBreak: 'break-all'
});

export const CommentText = styled(Typography)({
	fontFamily: 'inherit',
	fontWeight: 'lighter'
});

export const CommentContainerDateTime = styled(Container)({
	width: 400,
	display: 'flex',
	alignItems: 'flex-start',
	justifyContent: 'flex-end',
	textAlign: 'center',
	gap: '1rem'
});

export const CommentDateTime = styled(Typography)({
	fontFamily: 'inherit',
	fontWeight: 'lighter',
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'nowrap',
});

export const EditCommentContainer = styled(Stack)({
	marginTop: '-7px',
});

export const EditButton = styled(IconButton)({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

export const ActionsText = styled(Typography)({
	fontFamily: 'inherit',
	marginLeft: '0.8rem',
});

export const EditDialog = styled(Dialog)(({ theme }) => ({

	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	}
}));

export const SaveEditButton = styled(Button)({
	padding: '0.8rem 2rem',
	display: 'flex',
	alignSelf: 'flex-end',
	borderRadius: '1.5rem'
});

export const DisabledButton = styled('span')({
	cursor: 'not-allowed'
});
