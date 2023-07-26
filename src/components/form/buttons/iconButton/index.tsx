import { IconButton as IconButtonMui, IconButtonProps } from '@mui/material';

function IconButton( { children, ...props} : IconButtonProps) {
	return (
		<IconButtonMui {...props}>
			{children}
		</IconButtonMui>
	);
}

export default IconButton;