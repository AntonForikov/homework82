import {Button, Menu, MenuItem} from '@mui/material';
import {UserFromDb} from '../../types';
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../app/hooks';
import {logout} from '../../store/user/userThunk';

interface Props {
  user: UserFromDb
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = async () => {
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      await dispatch(logout());
      navigate('/');
    } else {
      handleClose();
    }
  };

  return (
    <>
      <Button
        color='inherit'
        onClick={handleClick}
      >
        Hello {user.username}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to='/newArtist' onClick={handleClose}>Add Artist</MenuItem>
        <MenuItem component={Link} to='/newAlbum' onClick={handleClose}>Add Album</MenuItem>
        <MenuItem component={Link} to='/newTrack' onClick={handleClose}>Add Track</MenuItem>
        <MenuItem component={Link} to='/trackHistory' onClick={handleClose}>Track History</MenuItem>
        <MenuItem onClick={logoutUser}>Log Out</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;