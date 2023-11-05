import { LoadingButtonProps } from '@mui/lab/LoadingButton';
import * as Styled from './styles';

export function LoadingBtn({ children, ...props }: Omit<LoadingButtonProps, 'sx'>) {
	return (
		<Styled.LoadingBtn {...props}>
			{children}
		</Styled.LoadingBtn>
	);
}