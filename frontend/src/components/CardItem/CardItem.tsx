import {
  Card, CardContent,
  CardHeader,
  CardMedia,
  Grid,
  styled, Typography,
} from '@mui/material';
import no_image_available from '../../../assets/no_image_available.png'
import React from 'react';
import {apiUrl} from '../../constants';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../app/hooks';
import {getArtistName} from '../../store/album/albumSlice';

interface Props {
  id: string,
  title: string,
  image: string | null,
  trackQuantity?: string,
  albumCard?: boolean
}

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%'
})

const CardItem: React.FC<Props> = ({id, title, image, trackQuantity, albumCard = false}) => {
  const dispatch = useAppDispatch();
  // const loading = useAppSelector(selectLoading);
  const navigate = useNavigate();
  let cardImage = no_image_available;

  if (image) {
    cardImage = `${apiUrl}/${image}`;
  }

  const onCardClick = () => {
    if (albumCard) dispatch(getArtistName(title));
    navigate(`/artist/${id}`);
  };

  return (
    <Grid item xs md={3} lg={3} onClick={onCardClick}>
      <Card>
        <CardHeader title={title} sx={{textAlign: 'center'}}/>
        <ImageCardMedia image={cardImage} title={title}/>
        {trackQuantity &&
          <CardContent>
            <Typography>
              Track quantity: {trackQuantity}
            </Typography>
          </CardContent>
        }
      </Card>
    </Grid>
  );
};

export default CardItem;