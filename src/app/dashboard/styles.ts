import { styled } from '@mui/system';
import { Container, Stack, Typography } from '@mui/material';

export const DashboardContainer = styled(Container)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	width: '100vw',
	height: '100vh'
});

export const DashboardTitle = styled(Typography)(({ theme }) => ({
	fontFamily: 'inherit',
	fontSize: '1.3rem',
	fontWeight: 'bold',
	display: 'flex',
	gap: '0.5rem',
	color: theme.palette.primary.main,
}));


export const HeaderContainer = styled(Container)({
	display: 'flex',
	justifyContent: 'space-between',
	padding: '1rem 0'
});

export const DashboardName = styled(Stack)({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
	gap: '0.5rem'
});

export const AvatarContainer = styled(Stack)({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	gap: '0.5rem'
});

export const DividerContainer = styled(Container)({
	margin: '1rem 0 2rem'
});

export const CommentContainer = styled(Container)({
	display: 'flex',
	flexDirection: 'column',
});