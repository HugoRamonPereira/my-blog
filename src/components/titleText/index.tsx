import { TypographyProps } from '@mui/material';
import * as Styled from './styles';

const TitleText = ({ children, ...props }: Omit<TypographyProps, 'sx'>) => {
	return (
		<Styled.Title {...props}>
			{children}
		</Styled.Title>
	);
};

export default TitleText;