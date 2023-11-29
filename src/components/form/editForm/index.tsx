import { Container } from '@mui/material';
import { ReactNode } from 'react';
import * as Styled from './styles';

interface FormProps {
  children: ReactNode | ReactNode[];
  onSubmit: () => void;
}

const EditForm = ({ children, ...props }: FormProps) => {
	return (
		<Container>
			<Styled.InputForm
				component="form"
				{...props}
			>
				<Styled.PaperForm>
					{children}
				</Styled.PaperForm>
			</Styled.InputForm>
		</Container>
	);
};

export default EditForm;