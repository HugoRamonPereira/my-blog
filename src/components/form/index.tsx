import { Container } from '@mui/material';
import { Box } from '@mui/material';

const Form = ({ children }: { children: React.ReactNode }) => {
	return (
		<Container maxWidth='sm'>
			<Box
				component="form"
				sx={{
					'& .MuiTextField-root': {
						m: 1,
						width: '25ch',
						display: 'flex',
						flexDirection: 'column'
					}
				}}
				noValidate
				autoComplete="off"
			>
				<div>
					{children}

				</div>
			</Box>
		</Container>
	);
};

export default Form;