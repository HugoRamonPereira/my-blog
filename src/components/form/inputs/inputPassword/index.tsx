'use client';

import { useState } from 'react';
import IconButton from '../../buttons/iconButton';
import InputBase, { InputBaseProps } from '../inputBase';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function InputPassword( props : InputBaseProps ) {
	const [showPassword, setShowPassword] = useState(false);

	function handleClickShowPassword() {
		setShowPassword((show) => !show);
	}

	return (
		<InputBase
			{...props}
			type={showPassword ? 'text' : 'password'}
			InputProps={
				{
					endAdornment: (
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							edge="end"
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					)
				}
			}
		/>
	);
}

export default InputPassword;