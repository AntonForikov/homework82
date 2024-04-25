import {TrackFromDb} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {getTracks} from './truckThunk';

interface TrackState {
  trackList: TrackFromDb[],
  trackLoading: boolean,
}

const initialState: TrackState = {
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
      if (trackList) state.trackList = trackList;
    }).addCase(getTracks.rejected, (state) => {
      state.trackLoading = false;
    });
  }
});

export const trackReducer = trackSlice.reducer;
export const selectTrackList = (state: RootState) => state.tracks.trackList;
export const selectTrackLoading = (state: RootState) => state.tracks.trackLoading;