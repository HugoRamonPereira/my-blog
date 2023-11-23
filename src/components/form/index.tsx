import { Container } from '@mui/material';
import { ReactNode } from 'react';
import * as Styled from './styles';

interface FormProps {
  children: ReactNode | ReactNode[];
  onSubmit: () => void;
}

const Form = ({ children, ...props }: FormProps) => {
	return (
		<Container maxWidth="sm" >
			<Styled.FormBox
				component="form"
				{...props}
			>
				<Styled.PaperForm>
					{children}
				</Styled.PaperForm>
			</Styled.FormBox>
		</Container>
	);
};

export default Form;