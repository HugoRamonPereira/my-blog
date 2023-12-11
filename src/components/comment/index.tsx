import UserAvatar from '@/components/avatar';
import * as S from './styles';

export interface CommentProps {
  id: number;
  message: string;
}

export function Comment({ message }: CommentProps) {
  return (
    <S.CommentContainer>
      <UserAvatar
        alt='user profile picture'
        src='https://www.mockofun.com/wp-content/uploads/2019/12/circle-profile-pic.jpg'
      />
      <p>{message}</p>
    </S.CommentContainer>
  );
}
