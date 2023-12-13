import { Container, IconButton, Typography, styled } from '@mui/material';

export const CommentContainer = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
});

export const EditButton = styled(IconButton)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

export const ActionsText = styled(Typography)({
  fontFamily: 'inherit',
  marginLeft: '0.8rem'
});
