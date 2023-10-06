import { Avatar } from  '@mui/material';

interface AvatarProps {
  alt: string;
  src: string;
}

function UserAvatar({ alt, src }: AvatarProps) {
	return (
		<Avatar
			alt={alt}
			src={src}
		/>
	);
}

export default UserAvatar;