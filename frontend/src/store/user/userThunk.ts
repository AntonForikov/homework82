import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {RegisterResponse, UserMutation, ValidationError} from '../../types';
import {isAxiosError} from 'axios';
export const register = createAsyncThunk<RegisterResponse, UserMutation, {rejectValue: ValidationError}>(
  'register/post',
  async (registerMutation, {rejectWithValue}) => {
    try {
      const {data} = await axiosApi.post<RegisterResponse>(`/users`, registerMutation);
      return data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        // console.log(e.response.data);
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);