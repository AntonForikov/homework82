import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {AlbumFromDb, AlbumMutation, ArtistFromDb} from '../../types';


export const addAlbum = createAsyncThunk(
  'addAlbum/post',
  async (album: AlbumMutation) => {

    const formData = new FormData();

    const keys = Object.keys(album) as (keyof AlbumMutation)[];

    keys.forEach(key => {
      const value = album[key];
      if (value !== null) formData.append(key, value);
    });
    await axiosApi.post('/albums', formData);
  }
);
export const getAlbums = createAsyncThunk(
  'getAlbums/get',
  async (id: string) => {
    try {
      const {data} = await axiosApi.get<AlbumFromDb[]>(`/albums?artist=${id}`);
      if (data) {
        console.log(data);
        return data;
      } else {
        return [];
      }
    } catch (e) {
      console.error(e);
    }
  }
);

export const getAlbumArtist = createAsyncThunk(
  'getAlbumArtist/get',
  async (id: string) => {
    const {data} = await axiosApi.get<ArtistFromDb>(`/artists/${id}`);
    return data;
  }
);