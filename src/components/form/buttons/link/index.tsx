import * as Styled from './styles';
import { PropsWithChildren, ReactNode } from 'react';

interface CustomLinkProps extends PropsWithChildren {
  children: ReactNode;
  href: string;
}

const CustomLink = ({ children, href, ...props }: CustomLinkProps) => {
	return (
		<Styled.LinkCustom
			{...props}
			href={href}
		>
			{children}
		</Styled.LinkCustom>
	);
};

export default CustomLink;