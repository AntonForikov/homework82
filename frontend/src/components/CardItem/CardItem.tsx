import {
  Card, CardContent,
  CardHeader,
  CardMedia,
  Grid,
  styled, Typography,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import no_image_available from '../../../assets/no_image_available.png';
import React from 'react';
import {apiUrl} from '../../constants';
import {useNavigate} from 'react-router-dom';

interface Props {
  id: string,
  title: string,
  image: string | null,
  releaseYear?: string,
  trackQuantity?: string,
  artistCard?: boolean,
  albumCard?: boolean,
  isPublished: boolean
}

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%'
});

const CardItem: React.FC<Props> = ({
  id,
  title,
  image,
  trackQuantity,
  releaseYear,
  artistCard = false,
  albumCard = false,
  isPublished
}) => {
  const navigate = useNavigate();
  let cardImage = no_image_available;

  if (image) cardImage = `${apiUrl}/${image}`;
  const onCardClick = () => {
    if (artistCard) navigate(`/artist/${id}`);
    if (albumCard) navigate(`/album/${id}`);
  };

  return (
    <Grid item xs md={3} lg={3} sx={{cursor: 'pointer'}} onClick={onCardClick}>
      <Card>
        <Grid container justifyContent='flex-end' padding={1}>
          {isPublished
            ? <><Typography color='green' marginRight={1}>Published</Typography> <DoneIcon color='success'/></>
            : <><Typography color='red' marginRight={1}>Unpublished</Typography><UnpublishedIcon color='error'/></>
          }
        </Grid>
        <CardHeader title={title} sx={{textAlign: 'center'}}/>
        <ImageCardMedia image={cardImage} title={title}/>
        {albumCard &&
          <CardContent>
            <Typography>
              Release: {releaseYear}
            </Typography>
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