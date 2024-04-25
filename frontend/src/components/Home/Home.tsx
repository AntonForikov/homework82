
import {Alert, CircularProgress, Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectArtistLoading, selectArtistList} from '../../store/artistSlice';
import {useEffect} from 'react';
import {getArtists} from '../../store/artistThunk';
import CardItem from '../CardItem/CardItem';


const Home = () => {
  const artistList = useAppSelector(selectArtistList);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectArtistLoading);

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" gap={3}>
        <Grid container justifyContent='center' marginTop={3}><Typography variant="h4">Artists</Typography></Grid>
        {loading
          ? <CircularProgress/>
          : !loading && artistList.length < 1
            ? <Alert severity="warning">There is no artists in database</Alert>
            : artistList.map((artist) => {
              return (
                  <CardItem
                    key={artist._id}
                    id={artist._id}
                    title={artist.name}
                    image={artist.image}
                  />
              )
            })
        }
      </Grid>
    </>

  );
};

export default Home;