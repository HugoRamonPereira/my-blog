import { useState } from 'react';
import * as Styled from './styles';
import { useAuth } from '@/contexts/auth';
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { PostProps, usePost } from '@/contexts/post';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageIcon from '@mui/icons-material/Message';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';
import useHttp from '@/services/useHttp';
import EditForm from '../form/editForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputEdit from '../form/inputs/inputEdit';
import SaveIcon from '@mui/icons-material/Save';
import Spinner from '@/assets/loading-spinner.svg';
import Image from 'next/image';
import { Comment, CommentProps } from '../comment';

type PostEditProps = Pick<PostProps, 'message'>;

interface ComponentPostProps extends PostProps {
  reloadPage(): Promise<void>;
  isLoading: boolean;
}

const postMessageSchema = z.object({
  message: z.string().min(5)
});

export function Post({
  id,
  message,
  date_created,
  id_creator,
  reloadPage,
  isLoading: isLoadingReloadPage
}: ComponentPostProps) {
  const { deletePost } = usePost();
  const { Put, isLoading } = useHttp({ url: 'agenda/post' });
  const { session } = useAuth();
  const { Delete } = useHttp({ url: 'agenda/post' });
  const isPostOwner = session.data?.id === id_creator;
  const { Get, isLoading: isLoadingComments } = useHttp<CommentProps>({
    url: 'comment/v2_post'
  });

  const { handleSubmit, control } = useForm<PostEditProps>({
    resolver: zodResolver(postMessageSchema),
    defaultValues: {
      message
    }
  });

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [postComments, setPostComments] = useState<CommentProps[]>([]);
  // Make a ref for postHasComments to avoid Derived State
  const [commentsVisible, setCommentsVisible] = useState(false);
  const open = Boolean(anchor);
  const currentDate = new Date(date_created);
  const formattedPostDateTimeToNow = formatDistanceToNow(currentDate, {
    addSuffix: true
  });
  const showCommentsWhenNotLoading = !isLoadingComments && commentsVisible;

  // const showCommentsWhenNotLoadingAndHasNoComments =
  //   postHasComments.length === 0 && isLoadingComments;

  const isLoadingEdit = isLoading || isLoadingReloadPage;
  const hasComments = postComments.length > 0;

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

  async function onSubmitPost({ message: messageEdit }: PostEditProps) {
    try {
      // First the request to the backend, if the request is successful, then the editPost from the context
      const response = await Put({
        body: { message: messageEdit },
        pathParams: id.toString()
      });
      if (response) {
        await reloadPage();
        handleCloseEditDialog();
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

  async function listComments() {
    if (!commentsVisible) {
      const response = await Get({
        pathParams: id.toString()
      });

      setPostComments(response.data);
    } else {
      setPostComments([]);
    }
    setCommentsVisible((oldState) => !oldState);
  }

  return (
    <Styled.CommentContainer>
      <Styled.PostContainer>
        <Avatar
          alt='Felipe'
          src='https://www.mockofun.com/wp-content/uploads/2019/12/circle-profile-pic.jpg'
        />

        <Styled.CommentInfo>
          <Styled.CommentText>{message}</Styled.CommentText>
        </Styled.CommentInfo>

        <Styled.CommentContainerDateTime>
          <Styled.CommentDateTime>
            {formattedPostDateTimeToNow}
          </Styled.CommentDateTime>

          <Styled.EditCommentContainer>
            {isPostOwner ? (
              <Styled.EditButton onClick={handleActions}>
                <MoreHorizIcon />
              </Styled.EditButton>
            ) : (
              <Tooltip
                title='Actions limited to post owner only'
                placement='right'
              >
                <Styled.DisabledButton>
                  <Styled.EditButton onClick={handleActions} disabled>
                    <MoreHorizIcon />
                  </Styled.EditButton>
                </Styled.DisabledButton>
              </Tooltip>
            )}

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
                    mr: 1
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
                    zIndex: 0
                  }
                }
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleOpenEditDialog}>
                <ListItemIcon>
                  <EditIcon />
                  <Styled.ActionsText>Edit post</Styled.ActionsText>
                </ListItemIcon>
              </MenuItem>

              <MenuItem onClick={deletePostComment}>
                <ListItemIcon>
                  <DeleteIcon />
                  <Styled.ActionsText>Delete post</Styled.ActionsText>
                </ListItemIcon>
              </MenuItem>

              <MenuItem onClick={listComments}>
                <ListItemIcon>
                  <MessageIcon />
                  <Styled.ActionsText>
                    {commentsVisible ? 'Hide comments' : 'See comments'}
                  </Styled.ActionsText>
                </ListItemIcon>
              </MenuItem>
            </Menu>

            <Styled.EditDialog
              onClose={handleCloseEditDialog}
              open={openEditDialog}
              aria-labelledby='edit-dialog'
              fullWidth
              maxWidth='sm'
              PaperProps={{
                sx: {
                  height: 250
                }
              }}
            >
              <Styled.EditDialogTitle id='edit-dialog'>
                Edit post {id}
              </Styled.EditDialogTitle>
              <Divider />
              <IconButton
                aria-label='close'
                onClick={handleCloseEditDialog}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500]
                }}
              >
                <CloseIcon />
              </IconButton>

              <EditForm onSubmit={handleSubmit(onSubmitPost)}>
                <InputEdit
                  control={control}
                  name='message'
                  InputProps={{
                    disabled: isLoadingEdit
                  }}
                />
                <Styled.SaveEditButton
                  disableRipple
                  disableElevation
                  variant='contained'
                  type='submit'
                  size='large'
                  loading={isLoadingEdit}
                  loadingIndicator={
                    <Image src={Spinner} width={25} height={25} alt='spinner' />
                  }
                  startIcon={<SaveIcon />}
                >
                  Save changes
                </Styled.SaveEditButton>
              </EditForm>
            </Styled.EditDialog>
          </Styled.EditCommentContainer>
        </Styled.CommentContainerDateTime>
      </Styled.PostContainer>

      {showCommentsWhenNotLoading && (
        <Styled.CommentsListContainer>
          {hasComments ? (
            postComments.map((comment) => (
              <Comment key={comment.id} {...comment} />
            ))
          ) : (
            <p>This post has no comments yet</p>
          )}
        </Styled.CommentsListContainer>
      )}
    </Styled.CommentContainer>
  );
}
