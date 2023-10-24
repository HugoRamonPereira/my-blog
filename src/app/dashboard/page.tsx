'use client';

import UserAvatar from '@/components/avatar';
import CustomButton from '@/components/form/buttons/button';
import PostInput from '@/components/postInput';
import TitleText from '@/components/titleText';
import { useAuth } from '@/contexts/auth';
import { Container, Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import * as Styled from './styles';
import { Post } from '@/components/post/post';
import { usePost } from '@/contexts/post';
import useHttp from '@/services/useHttp';
import { useEffect, useRef } from 'react';
import PaginationRounded from '@/components/pagination';

function Dashboard() {
	const { signOut } = useAuth();
	const { posts, resetPosts } = usePost();
	const { Get } = useHttp({ url: 'agenda/post' });
	const { session } = useAuth();
	const userName = session.data!.fullName;
	const params = useRef({ page: 1, limit: 10, count: 1 });
	const totalPagesCount = Math.ceil(params.current.count / params.current.limit);

	function userNameCapitalized(username: string) {
		return username.charAt(0).toUpperCase() + username.slice(1);
	}

	function getPosts(pageNumber?: number) {
		Get({ params: {...params.current, ...(pageNumber ? {page: pageNumber} : {})}})
			.then((res) => {
				params.current = { page: res.page, limit: res.limit, count: res.count };
				resetPosts(res.data);
			});
	}

	function onChangePage(pageNumber: number) {
		getPosts(pageNumber);
	}

	function reloadPage() {
		getPosts(params.current.page);
	}

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<Styled.DashboardContainer>
			<Styled.HeaderContainer>
				<Styled.DashboardName>
					<TitleText>Dashboard Page</TitleText>
				</Styled.DashboardName>

				<Styled.DashboardInfo direction="row" spacing={5}>
					<Styled.AvatarContainer>
						<UserAvatar
							alt="user profile picture"
							src="https://www.mockofun.com/wp-content/uploads/2019/12/circle-profile-pic.jpg"
						/>
						<TitleText>{userNameCapitalized(userName)}</TitleText>
					</Styled.AvatarContainer>
					<CustomButton
						variant="contained"
						onClick={signOut}
						endIcon={<LogoutIcon />}
					>
            Log out
					</CustomButton>
				</Styled.DashboardInfo>
			</Styled.HeaderContainer>

			<Styled.DividerContainer>
				<Divider />
			</Styled.DividerContainer>

			<Styled.CommentContainer>
				<PostInput />

				{/* Comment Box */}
				<Container>
					{posts.map((post) => <Post {...post} key={post.id} reloadPage={reloadPage} />)}
				</Container>
				<PaginationRounded
					totalPages={totalPagesCount}
					onChangePage={onChangePage}
				/>
			</Styled.CommentContainer>
		</Styled.DashboardContainer>
	);
}

export default Dashboard;
