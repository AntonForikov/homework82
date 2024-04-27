import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link as RouterLink} from 'react-router-dom'

const initialFields = {
  username: '',
  password: ''
}
const Register = () => {
  const [user, setUser] = useState(initialFields);

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };



  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            value={user.username}
            onChange={changeEventHandler}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            value={user.password}
            label="Password"
            type="password"
            onChange={changeEventHandler}
          />
          <Grid container justifyContent="space-between" alignItems="center">
            <FormControlLabel
              control={<Checkbox value="remember" color="primary"/>}
              label="Remember me"
            />
            <Grid item>
              <Link component={RouterLink} to='/login' variant="body2">
                {'Already have an account?'}
              </Link>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;