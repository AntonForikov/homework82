
import {Alert, CircularProgress, Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useEffect} from 'react';
import CardItem from '../../components/CardItem/CardItem';
import {getAlbums} from '../../store/album/albumThunk';
import {selectAlbumArtist, selectAlbumList, selectAlbumLoading} from '../../store/album/albumSlice';
import {useParams} from 'react-router-dom';


const Albums = () => {
  const {id} = useParams();
  const albumList = useAppSelector(selectAlbumList);
  const artistName = useAppSelector(selectAlbumArtist);
  const loading = useAppSelector(selectAlbumLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(getAlbums(id));
  }, [dispatch]);

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" gap={3}>
        <Grid container justifyContent='center' marginTop={3}><Typography variant="h4">{artistName}</Typography></Grid>
        {loading
          ? <CircularProgress/>
          : !loading && albumList.length < 1
            ? <Alert severity="warning">There is no artists in database</Alert>
            : albumList.map((album) => {
              return (
                <CardItem
                  key={album._id}
                  id={album._id}
                  title={album.title}
                  image={album.image}
                  trackQuantity={album.trackQuantity}
                  releaseYear={album.year}
                />
              )
            })
        }
      </Grid>
    </>

  );
};

export default Albums;