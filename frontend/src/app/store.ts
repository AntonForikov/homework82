import {configureStore} from '@reduxjs/toolkit';
import {artistReducer} from '../store/artist/artistSlice';
import {albumReducer} from '../store/album/albumSlice';
import {trackReducer} from '../store/track/trackSlice';
import {userReducer} from '../store/user/userSlice';

export const store = configureStore({
  reducer: {
    artists: artistReducer,
    albums: albumReducer,
    tracks: trackReducer,
    users: userReducer

  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;