import {configureStore} from '@reduxjs/toolkit';
import {artistReducer} from '../store/artist/artistSlice';
import {albumReducer} from '../store/album/albumSlice';
import {trackReducer} from '../store/track/trackSlice';

export const store = configureStore({
  reducer: {
    artists: artistReducer,
    albums: albumReducer,
    tracks: trackReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;