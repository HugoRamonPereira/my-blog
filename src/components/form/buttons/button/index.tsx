import React from 'react';
import { ButtonProps } from '@mui/material';
import * as Styled from './styles';

export default function CustomButton({ children, ...props }: Omit<ButtonProps, 'sx'>){
	return (
		<Styled.CustomButton {...props}>
			<>{children}</>
		</Styled.CustomButton>
	);
}
