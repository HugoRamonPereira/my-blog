import { LinkProps } from 'next/link';
import * as Styled from './styles';
import { ReactNode } from 'react';

interface CustomLinkProps extends LinkProps {
  children: ReactNode;
}

const CustomLink = ({ children, ...props }: CustomLinkProps) => {
	return (
		<Styled.LinkCustom
			{...props}
			href='/signup'
		>
			{children}
		</Styled.LinkCustom>
	);
};

export default CustomLink;