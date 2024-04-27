import {AppBar, Button, Grid, Toolbar, Typography} from '@mui/material';
import {Link, NavLink} from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Grid container justifyContent='space-between' alignItems='center'>
          <Typography variant='h5' padding={2} component={Link} to='/' sx={{color: 'inherit', textDecoration: 'none'}}>
            Spotify
          </Typography>
          <Grid>
            <Button component={NavLink} to='/login' sx={{color: 'inherit'}}>
              login
            </Button>
            <Button component={NavLink} to='/register' sx={{color: 'inherit'}}>
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;