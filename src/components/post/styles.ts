import { LoadingButton } from '@mui/lab';
import { Container, Dialog, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
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
	'WebkitLineClamp': '3',
	'WebkitBoxOrient': 'vertical',
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

export const EditDialogTitle = styled(DialogTitle)(({ theme }) => ({
	fontWeight: 'bold',
	color: theme.palette.primary.main,
}));

export const SaveEditButton = styled(LoadingButton)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	padding: '0.8rem 2rem',
	display: 'flex',
	alignSelf: 'flex-end',
	borderRadius: '1.5rem',

	'&:hover': {
		backgroundColor: theme.palette.primary.dark,
	}
}));

export const DisabledButton = styled('span')({
	cursor: 'not-allowed'
});
