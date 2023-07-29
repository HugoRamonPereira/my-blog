import { Button, ButtonProps } from '@mui/material';

const CustomButton = ({ children, ...props }: ButtonProps) => {
	return (
		<Button {...props}>
			{children}
		</Button>
	);
};

export default CustomButton;