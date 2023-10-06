import { Avatar } from '@mui/material';
import * as Styled from './styles';
import { formatDistanceToNow } from 'date-fns';
import { PostProps } from '@/contexts/post';

export function Post({ message, date_created }: PostProps ) {
	const currentDate = new Date(date_created);
	const formattedPostDateTimeToNow = formatDistanceToNow(currentDate, { addSuffix: true });

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
			</Styled.CommentContainerDateTime>
		</Styled.CommentContainer>
	);
}