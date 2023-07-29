import Link, {LinkProps} from 'next/link';

interface CustomLinkProps extends LinkProps {
  children: string
}

const CustomLink = ({ children, ...props }: CustomLinkProps) => {
	return (
		<Link {...props}>
			{children}
		</Link>
	);
};

export default CustomLink;