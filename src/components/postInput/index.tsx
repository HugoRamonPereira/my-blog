import { Box, InputAdornment, TextField } from '@mui/material';
import UserAvatar from '../avatar';
import CustomButton from '../form/buttons/button';
import { useForm } from 'react-hook-form';
import SendIcon from '@mui/icons-material/Send';
import * as Styled from './styles';
import useHttp from '@/services/useHttp';
import { usePost } from '@/contexts/post';

interface PostInputProps {
  message: string;
}

function PostInput() {
	const { Post } = useHttp({ url: 'agenda' }, );
	const { createPost } = usePost();

	const {
		handleSubmit,
		register,
		formState: { isDirty, isValid }
	} = useForm<PostInputProps>({ mode: 'onChange' });

	async function onSubmit(data: PostInputProps) {


		const response = await Post({ body: {...data}});

		createPost(response.data);
	}

	return (
		<Styled.InputContainer>
			<Box
				component="form"
				noValidate
				autoComplete="off"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Styled.InputCommentBox direction="column">
					<TextField
						multiline
						rows={3}
						{...register('message')}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start' sx={{ display: 'flex', alignItems: 'flex-end' }}>
									<UserAvatar
										alt="Natalia"
										src="https://www.mockofun.com/wp-content/uploads/2019/12/circle-profile-pic.jpg"
									/>
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position='end'>
									<CustomButton
										variant="outlined"
										type="submit"
										disabled={!isDirty || !isValid }
										endIcon={<SendIcon />}
									>
                    Post
									</CustomButton>
								</InputAdornment>
							)
						}}
					/>
				</Styled.InputCommentBox>
			</Box>
		</Styled.InputContainer>
	);
}

export default PostInput;