import { Container } from '@mui/material';
import { Box } from '@mui/material';
import { ReactNode } from 'react';
import * as Styled from './styles';

interface FormProps {
  children: ReactNode | ReactNode[];
  onSubmit: () => void;
}

const Form = ({ children, ...props }: FormProps) => {
	return (
		<Container maxWidth="sm" >
			<Box
				component="form"
				{...props}
				sx={{
					'& .MuiTextField-root': {
						m: 1,
						width: '35ch'
					},
				}}
			>
				<Styled.PaperForm>
					{children}
				</Styled.PaperForm>
			</Box>
		</Container>
	);
};

export default Form;