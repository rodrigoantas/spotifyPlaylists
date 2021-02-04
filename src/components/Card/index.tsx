import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

interface ICard {
    playlist: {
      id: string;
      name: string;
      description: string;
      images: Array<{url: string;}>;
      tracks: {
         total: number;
      }
      external_urls: {
      spotify: string;
      }
    }
}

const PlaylistCard: React.FC<ICard> = ({ playlist }) =>{
  const classes = useStyles();

  return (
    <Card id={playlist.id} className={classes.root}>
      <CardActionArea target="blank" href={playlist.external_urls.spotify}>
        <CardMedia
          className={`${classes.media} imageTarget`}
          image={playlist.images[0].url}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {playlist.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {playlist.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="default">
          Total tracks: {playlist.tracks.total}
        </Button>
        <Button className="linkTarget" size="small" color="primary">
          <a target="blank" href={playlist.external_urls.spotify}> Listen </a>
        </Button>
      </CardActions>
    </Card>
  );
}

export default PlaylistCard;