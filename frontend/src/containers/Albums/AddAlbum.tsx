import {Grid, Typography} from '@mui/material';
import AddForm from '../../components/AddForm/AddForm';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectArtistList} from '../../store/artist/artistSlice';
import {getArtists} from '../../store/artist/artistThunk';

const AddAlbum = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtistList);

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  return (
    <Grid container direction='column' alignItems='center' mt={2}>
      <Typography variant='h4'>Add New Album</Typography>
      <AddForm arrayForSelectInput={artists}/>
    </Grid>
  );
};

export default AddAlbum;