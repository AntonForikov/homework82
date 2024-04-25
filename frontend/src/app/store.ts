import {configureStore} from '@reduxjs/toolkit';
import {artistReducer} from '../store/artist/artistSlice';
import {albumReducer} from '../store/album/albumSlice';

export const store = configureStore({
  reducer: {
    artists: artistReducer,
    albums: albumReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;