
import React from 'react';
import { ButtonProps } from '@mui/material';
import * as Styled from './styles';

const CustomButton = ({ children, ...props }: ButtonProps) => {
	return (
		<Styled.CustomButton {...props}>
			{children}
		</Styled.CustomButton>
	);
};

export default CustomButton;