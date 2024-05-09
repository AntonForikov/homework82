import {Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import FileInput from './FileInput';
import {useNavigate} from 'react-router-dom';
import {selectUser} from '../../store/user/userSlice';
import {AlbumMutation, ArtistFromDb} from '../../types';
import {addAlbum} from '../../store/album/albumThunk';

interface Props {
  arrayForSelectInput?: ArtistFromDb[];
}

const initial: AlbumMutation = {
  title: '',
  image: null,
  artist: '',
  year: ''
};
const AddForm: React.FC<Props> = ({arrayForSelectInput}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [album, setAlbum] = useState<AlbumMutation>(initial);
  const [fileName, setFileName] = useState('');
  const resetButtonRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [disabler, setDisabler] = useState(false);

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  const resetFileInput = () => {
    if (resetButtonRef.current) {
      resetButtonRef.current.click();
    }
  };

  const changeProductHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setAlbum((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const changeSelectHandler = (e: SelectChangeEvent) => {
    const {name, value} = e.target;
    setAlbum((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setAlbum(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
    }
    if (files && files[0]) {
      setFileName(files[0].name);
    } else {
      setFileName('');
    }
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (fileName === '') {
    //   alert('Please choose an image of product');
    // } else if (album.name[0] === ' ') {
    //   alert('Product title can not begins from whitespace');
    // } else if (album.description[0] === ' ') {
    //   alert('Product description can not begins from whitespace');
    // } else {
      try {
        setDisabler(true);
        await dispatch(addAlbum(album));
        setDisabler(false);
        navigate('/');
      } catch (e) {
        console.error(e);
      } finally {
        resetFileInput();
        setAlbum(initial);
        setFileName('');
      }
    // }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Grid container direction="column" spacing={2} marginBottom={2} width={500} margin="auto">
        <Grid item xs>
          <TextField
            fullWidth
            variant="outlined"
            label="Title"
            name="title"
            value={album.title}
            onChange={changeProductHandler}
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            type='number'
            fullWidth
            variant="outlined"
            label="Year"
            name="year"
            value={album.year}
            onChange={changeProductHandler}
            required
          />
        </Grid>
        <Grid item xs>
          <FileInput
            onChange={fileInputChangeHandler}
            fileName={fileName}
            name="image"
            label="Image"
          />
        </Grid>
        <Grid item xs>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Artist</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={album.artist}
              name="artist"
              label="Artist"
              onChange={changeSelectHandler}
              required
            >
              {arrayForSelectInput &&
                arrayForSelectInput.map((item) => {
                  return <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>;
                })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs>
          <Button type="submit" variant="contained" endIcon={<SendIcon/>} disabled={disabler}>
            Send
          </Button>
        </Grid>
      </Grid>
      <input
        style={{display: 'none'}}
        ref={resetButtonRef}
        type="reset"
      />
    </form>
  );
};

export default AddForm;