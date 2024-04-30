import {Alert, CircularProgress, Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {selectAlbumInfo, selectTrackList, selectTrackLoading} from '../../store/track/trackSlice';
import {getTracks} from '../../store/track/truckThunk';
import TrackItem from '../../components/CardItem/TrackItem';


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
      <Grid container  justifyContent="center" alignItems="center" gap={3}>
        {
          (albumInfo.artist !== '' && albumInfo.title !== '')
          && <Grid container justifyContent='center' marginTop={3}><Typography variant="h4">{albumInfo.artist}: {albumInfo.title}</Typography></Grid>
        }
        <Grid container direction='column' maxWidth='md'>
          {loading
            ? <CircularProgress/>
            : !loading && trackList.length < 1
              ? <Alert severity="warning">There is no tracks with such artist and album in database</Alert>
              : trackList.map((track) => {
                return <TrackItem
                    key={track._id}
                    trackId={track._id}
                    title={track.title}
                    indexNumber={track.indexNumber}
                    duration={track.duration}
                  />;
              })
          }
        </Grid>
      </Grid>
    </>

  );
};

export default Tracks;