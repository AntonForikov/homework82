import {AlbumFromDb} from '../../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {getAlbums} from './albumThunk';

interface AlbumState {
  artistName: string
  albumList: AlbumFromDb[],
  albumLoading: boolean,
}

const initialState: AlbumState = {
  artistName: '',
  albumList: [],
  albumLoading: false,
};

const albumSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    getArtistName: (state, action: PayloadAction<string>) => {
      state.artistName = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAlbums.pending, (state) => {
      state.albumLoading = true;
    }).addCase(getAlbums.fulfilled, (state, {payload: artistList}) => {
      state.albumLoading = false;
      if (artistList) state.albumList = artistList;
    }).addCase(getAlbums.rejected, (state) => {
      state.albumLoading = false;
    });
  }
});

export const {getArtistName} = albumSlice.actions;
export const albumReducer = albumSlice.reducer;
export const selectAlbumList = (state: RootState) => state.albums.albumList;
export const selectAlbumLoading = (state: RootState) => state.albums.albumLoading;
export const selectAlbumArtist = (state: RootState) => state.albums.artistName;