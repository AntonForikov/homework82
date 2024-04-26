import {TrackFromDb} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {getTracks} from './truckThunk';

interface TrackState {
  albumInfo: {
    title: string;
    artistId: string
  }
  trackList: TrackFromDb[],
  trackLoading: boolean,
}

const initialState: TrackState = {
  albumInfo: {
    title: '',
    artistId: ''
  },
  trackList: [],
  trackLoading: false,
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTracks.pending, (state) => {
      state.trackLoading = true;
    }).addCase(getTracks.fulfilled, (state, {payload: trackList}) => {
      state.trackLoading = false;
      if (trackList) {
        state.trackList = trackList;
        state.albumInfo.artistId = trackList[0].album.artistId
        state.albumInfo.title = trackList[0].album.title
      }
    }).addCase(getTracks.rejected, (state) => {
      state.trackLoading = false;
    });
  }
});

export const trackReducer = trackSlice.reducer;
export const selectTrackList = (state: RootState) => state.tracks.trackList;
export const selectTrackLoading = (state: RootState) => state.tracks.trackLoading;
export const selectAlbumInfo = (state: RootState) => state.tracks.albumInfo;