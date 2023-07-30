import { Typography, TypographyProps } from '@mui/material';

const TitleText = ({ children, ...props }: TypographyProps) => {
	return (
		<Typography {...props}>
			{children}
		</Typography>
	);
};

export default TitleText;