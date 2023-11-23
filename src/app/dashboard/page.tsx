'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/auth';
import { usePost } from '@/contexts/post';
import useHttp from '@/services/useHttp';
import UserAvatar from '@/components/avatar';
import CustomButton from '@/components/form/buttons/button';
import PostInput from '@/components/postInput';
import PaginationRounded from '@/components/pagination';
import { Post } from '@/components/post/post';
import { Container, Divider, Stack, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import * as Styled from './styles';

function Dashboard() {
	const { signOut } = useAuth();
	const { posts, resetPosts } = usePost();
	const { Get, isLoading } = useHttp({ url: 'agenda/post' });
	const { session } = useAuth();
	const userName = session.data!.fullName;
	const params = useRef({ page: 1, limit: 10, count: 1 });
	const totalPagesCount = Math.ceil(
		params.current.count / params.current.limit
	);

	function userNameCapitalized(username: string) {
		return username.charAt(0).toUpperCase() + username.slice(1);
	}

	async function getPosts(pageNumber?: number) {
		const res = await Get({
			params: {
				...params.current,
				...(pageNumber ? { page: pageNumber } : {}),
			},
		});
		params.current = { page: res.page, limit: res.limit, count: res.count };
		resetPosts(res.data);
	}

	function onChangePage(pageNumber: number) {
		getPosts(pageNumber);
	}

	async function reloadPage() {
		await getPosts(params.current.page);
	}

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<Styled.DashboardContainer>
			<Styled.HeaderContainer>
				<Styled.DashboardName>
					<DashboardRoundedIcon
						color='primary'
						fontSize='large'
					/>
					<Styled.DashboardTitle>
            Dashboard
					</Styled.DashboardTitle>
				</Styled.DashboardName>

				<Stack direction="row" spacing={5}>
					<Styled.AvatarContainer>
						<UserAvatar
							alt="user profile picture"
							src="https://www.mockofun.com/wp-content/uploads/2019/12/circle-profile-pic.jpg"
						/>
						<Typography>{userNameCapitalized(userName)}</Typography>
					</Styled.AvatarContainer>
					<CustomButton
						variant="contained"
						onClick={signOut}
						endIcon={<LogoutIcon />}
					>
            Log out
					</CustomButton>
				</Stack>
			</Styled.HeaderContainer>

			<Styled.DividerContainer>
				<Divider />
			</Styled.DividerContainer>

			<Styled.CommentContainer>
				<PostInput />

				{/* Comment Box */}
				<Container>
					{posts.map((post) => (
						<Post
							{...post}
							key={post.id}
							reloadPage={reloadPage}
							isLoading={isLoading}
						/>
					))}
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
