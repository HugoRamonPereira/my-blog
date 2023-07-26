import TextField, { TextFieldProps } from '@mui/material/TextField';

export type InputBaseProps = TextFieldProps

const InputBase = (props : InputBaseProps) => {
	return (
		<>
			<TextField
				id="outlined-basic"
				variant="outlined"
				{...props}
			/>
		</>
	);
};

export default InputBase;