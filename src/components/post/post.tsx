import { useState } from 'react';
import * as Styled from './styles';
import { useAuth } from '@/contexts/auth';
import {
	Avatar,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	ListItemIcon,
	Menu,
	MenuItem,
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { PostProps, usePost } from '@/contexts/post';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';
import useHttp from '@/services/useHttp';
import Form from '../form';
import { useForm } from 'react-hook-form';
import InputBase from '../form/inputs/inputBase';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type PostEditProps = Pick<PostProps, 'message'>

interface ComponentPostProps extends PostProps {
  reloadPage(): void;
}

const postMessageSchema = z.object({
	message: z.string().min(5),
});

export function Post({ id, message, date_created, id_creator, reloadPage }: ComponentPostProps ) {
	const { posts, deletePost } = usePost();
	console.log({ posts });
	const { session } = useAuth();
	const isPostOwner = session.data?.id === id_creator;
	const { Put, isLoading } = useHttp({ url: 'agenda/post' });
	const { Delete } = useHttp({ url: 'agenda/post' });
	const { handleSubmit, control } = useForm<PostEditProps>({
		resolver: zodResolver(postMessageSchema),
		defaultValues: {
			message
		}
	});

	const [anchor, setAnchor] = useState<null | HTMLElement>(null);
	const [openEditDialog, setOpenEditDialog] = useState(false);
	const open = Boolean(anchor);
	const currentDate = new Date(date_created);
	const formattedPostDateTimeToNow = formatDistanceToNow(currentDate, { addSuffix: true });

	function handleActions(event: React.MouseEvent<HTMLElement>) {
		setAnchor(event.currentTarget);
	}

	function handleCloseMenu() {
		setAnchor(null);
	}

	function handleOpenEditDialog() {
		setOpenEditDialog(true);
	}

	function handleCloseEditDialog() {
		setOpenEditDialog(false);
	}

	async function onSubmitPost({ message: messageEdit}: PostEditProps) {
		try {
			// First the request to the backend, if the request is successful, then the editPost from the context
			const response = await Put({
				body: { message: messageEdit },
				pathParams: id.toString()
			});
			console.log('response', response);
			if (response) {
				reloadPage();
				// editPost({ id , message });
			}
			// Now is the request where we change in the frontend the text
			// Or would it be to get the new value and show it here?
			// editPost({ id, message, date_created, id_creator });
		} catch (error) {
			toast('Error when saving message');
		}
	}

	async function deletePostComment() {
		try {
			const response = await Delete({
				pathParams: id.toString()
			});

			if (response) {
				deletePost({ id });
				toast.success(`Post ${id} deleted successfully!`);
			}

		} catch (error) {
			toast('Error when trying to delete post');
		}
	}

	return (
		<Styled.CommentContainer>
			<Styled.CommentInfo>
				<Avatar
					alt="Felipe"
					src="https://www.mockofun.com/wp-content/uploads/2019/12/circle-profile-pic.jpg"
				/>
				<Styled.CommentText>
					{message}
				</Styled.CommentText>
			</Styled.CommentInfo>
			<Styled.CommentContainerDateTime>
				<Styled.CommentDateTime>
					{formattedPostDateTimeToNow}
				</Styled.CommentDateTime>
				{isPostOwner && (
					<Styled.EditCommentContainer>
						<Styled.EditButton
							onClick={handleActions}
						>
							<MoreHorizIcon />
						</Styled.EditButton>
						<Menu
							anchorEl={anchor}
							id='actions-menu'
							open={open}
							onClose={handleCloseMenu}
							onClick={handleCloseMenu}
							PaperProps={{
								elevation: 0,
								sx: {
									overflow: 'visible',
									filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
									mt: 1.5,
									'& .MuiAvatar-root': {
										width: 32,
										height: 32,
										ml: -0.5,
										mr: 1,
									},
									'&:before': {
										content: '""',
										display: 'block',
										position: 'absolute',
										top: 0,
										right: 14,
										width: 10,
										height: 10,
										bgcolor: 'background.paper',
										transform: 'translateY(-50%) rotate(45deg)',
										zIndex: 0,
									},
								},
							}}
							transformOrigin={{ horizontal: 'right', vertical: 'top' }}
							anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
						>
							<MenuItem onClick={handleOpenEditDialog}>
								<ListItemIcon>
									<EditIcon />
									<Styled.ActionsText>
										Edit post
									</Styled.ActionsText>
								</ListItemIcon>
							</MenuItem>
							<MenuItem onClick={deletePostComment}>
								<ListItemIcon>
									<DeleteIcon />
									<Styled.ActionsText>
                    Delete post
									</Styled.ActionsText>
								</ListItemIcon>
							</MenuItem>
						</Menu>

						<Styled.EditDialog
							onClose={handleCloseEditDialog}
							open={openEditDialog}
							aria-labelledby="edit-dialog"
							fullWidth
							maxWidth='sm'
							PaperProps={{
								sx: {
									height: 250
								}
							}}
						>
							<DialogTitle id="edit-dialog">
                Edit post {id}
							</DialogTitle>
							<IconButton
								aria-label="close"
								onClick={handleCloseEditDialog}
								sx={{
									position: 'absolute',
									right: 8,
									top: 8,
									color: (theme) => theme.palette.grey[500],
								}}
							>
								<CloseIcon />
							</IconButton>
							<Form
								onSubmit={handleSubmit(onSubmitPost)}
							>
								<DialogContent dividers>
									<InputBase
										control={control}
										name='message'
										InputProps={{
											disabled: isLoading
										}}
									/>
								</DialogContent>
								<DialogActions>
									<Button
										autoFocus
										type='submit'
										disabled={isLoading}
									>
                    Save changes
									</Button>
								</DialogActions>
							</Form>
						</Styled.EditDialog>
					</Styled.EditCommentContainer>
				)}
			</Styled.CommentContainerDateTime>
		</Styled.CommentContainer>
	);
}