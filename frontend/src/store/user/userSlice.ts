
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {register} from './userThunk';
import {RegisterResponse, ValidationError} from '../../types';


interface UserState {
  user: RegisterResponse | null;
  registerLoading: boolean;
  registerError: ValidationError | null
}

const initialState: UserState = {
  user: null,
  registerLoading: false,
  registerError: null
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    }).addCase(register.fulfilled, (state, {payload: user}) => {
      state.registerLoading = false;
      state.user = user;
    }).addCase(register.rejected, (state, {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });
  }
});

export const userReducer = userSlice.reducer;
export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;