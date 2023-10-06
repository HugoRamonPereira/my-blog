import { styled } from '@mui/system';
import { Container, Stack } from '@mui/material';

export const DashboardContainer = styled(Container)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	// backgroundColor: 'red',
	width: '100vw',
	height: '100vh'
});

export const HeaderContainer = styled(Container)({
	display: 'flex',
	justifyContent: 'space-between',
	padding: '1rem 0'
});

export const DashboardName = styled(Stack)({
	alignSelf: 'center'
});

export const DashboardInfo = styled(Stack)({

});

export const AvatarContainer = styled(Stack)({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	gap: '1rem'
});

export const DividerContainer = styled(Container)({
	margin: '1rem 0 2rem'
});

export const CommentContainer = styled(Container)({
	display: 'flex',
	flexDirection: 'column',
});