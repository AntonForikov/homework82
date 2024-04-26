import {Alert, CircularProgress, Grid, Paper, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {selectAlbumInfo, selectTrackList, selectTrackLoading} from '../../store/track/trackSlice';
import {getTracks} from '../../store/track/truckThunk';


const Tracks = () => {
  const {albumId} = useParams();
  const trackList = useAppSelector(selectTrackList);
  const albumInfo = useAppSelector(selectAlbumInfo);
  const loading = useAppSelector(selectTrackLoading);
  const dispatch = useAppDispatch();

  const getAlbum = useCallback(async () => {
    if (albumId) {
      await dispatch(getTracks(albumId));
    }
  }, [dispatch, albumId]);

  useEffect( () => {
    void getAlbum();
  }, [getAlbum]);

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" gap={3}>
        <Grid container justifyContent='center' marginTop={3}><Typography variant="h4">{albumInfo.artist}: {albumInfo.title}</Typography></Grid>
        {loading
          ? <CircularProgress/>
          : !loading && trackList.length < 1
            ? <Alert severity="warning">There is no tracks with such artist and album in database</Alert>
            : trackList.map((track) => {
              return (
                <Paper
                  elevation={3}
                  key={track._id}
                  sx={{padding: 2}}
                >
                  {track.indexNumber}. {track.title} {track.duration}
                </Paper>
              )
            })
        }
      </Grid>
    </>

  );
};

export default Tracks;