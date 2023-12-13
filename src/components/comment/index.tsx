import UserAvatar from '@/components/avatar';
import * as S from './styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { MenuItem, ListItemIcon, Menu } from '@mui/material';

export interface CommentProps {
  id: number;
  message: string;
  onDelete: (id: number) => void;
}

export function Comment({ id, message, onDelete }: CommentProps) {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);
  function handleActions(event: React.MouseEvent<HTMLElement>) {
    setAnchor(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchor(null);
  }

  return (
    <S.CommentContainer>
      <UserAvatar
        alt='user profile picture'
        src='https://www.mockofun.com/wp-content/uploads/2019/12/circle-profile-pic.jpg'
      />
      <p>{message}</p>
      <S.EditButton onClick={handleActions}>
        <MoreHorizIcon />
        <Menu
          anchorEl={anchor}
          id='actions-menu'
          open={open}
          onClose={handleCloseMenu}
          onClick={handleCloseMenu}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => onDelete(id)}>
            <ListItemIcon>
              <DeleteIcon />
              <S.ActionsText>Delete comment</S.ActionsText>
            </ListItemIcon>
          </MenuItem>
        </Menu>
      </S.EditButton>
    </S.CommentContainer>
  );
}
