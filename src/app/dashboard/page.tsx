'use client';

import CustomButton from '@/components/form/buttons/button';
import TitleText from '@/components/titleText';
import { useAuth } from '@/contexts/auth';
import { Container } from '@mui/material';

function Dashboard() {
	const { signOut } = useAuth();

	return (
		<Container
			sx={{
				display: 'flex',
				justifyContent: 'space-between'
			}}
		>
			<TitleText>Dashboard Page</TitleText>
			<CustomButton
				variant='outlined'
				onClick={signOut}
			>
        Log out
			</CustomButton>
		</Container>
	);
}

export default Dashboard;