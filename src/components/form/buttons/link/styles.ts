import { Link } from '@mui/material';
import { styled } from '@mui/system';

export const LinkCustom = styled(Link)({
	textDecoration: 'none',
	'&:hover': {
		textDecoration: 'underline',
	}
});