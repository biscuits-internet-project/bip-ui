import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Tracklist from "./Tracklist";
import { IShow } from "./Show";
import Moment from "react-moment";
import { Typography, Link, Card, CardHeader, CardContent, Avatar, Grid, Chip, Tooltip } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import SawItSwitch from "./SawItSwitch";
import Rating from "./Rating";
import FavoriteSwitch from "./FavoriteSwitch";
import { AppContext } from "../../context/AppProvider";
import RateReviewIcon from "@material-ui/icons/RateReview";

export interface ISetlist {
  show: IShow;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: 20,
    },
    title: {
      fontSize: 22,
    },
    subheader: {
      fontSize: 18,
      marginTop: 2,
      paddingBottom: 0,
      marginBottom: 0,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    avatar: {
      width: theme.spacing(2.5),
      height: theme.spacing(2.5),
      marginTop: 4,
      marginLeft: 2,
      marginRight: 2,
      display: "inline-block",
    },
    interaction: {
      textAlign: "center",
      marginBottom: 4,
      //height: 100
    },
  })
);

const Setlist: React.FC<ISetlist> = ({ show }) => {
  const { state } = useContext(AppContext);
  const { currentUser } = state;
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{
          title: classes.title,
          subheader: classes.subheader,
        }}
        title={
          <Grid container direction="row" justify="space-between">
            <Grid item>
              <Link component={RouterLink} to={`/shows/${show.slug}`}>
                <Moment format="M/D/YY">{show.date}</Moment>
              </Link>
            </Grid>
            <Grid item>
              <div style={{ textAlign: "right" }}>
                {show.average_rating > 0 && (
                  <Chip
                    icon={<StarIcon />}
                    label={Math.round(show.average_rating * 100) / 100}
                    size="small"
                    style={{ marginRight: 4, marginTop: -8 }}
                  />
                )}

                {(show.show_youtubes_count > 0 ||
                  show.relisten_url ||
                  show.reviews_count > 0 ||
                  show.show_photos_count > 0) && (
                  <>
                    {show.relisten_url && (
                      <Link target="blank" href={show.relisten_url}>
                        <Tooltip title="Relisten">
                          <Avatar alt="relisten" src="/icons/relisten.png" className={classes.avatar} />
                        </Tooltip>
                      </Link>
                    )}
                    {show.show_youtubes_count > 0 && (
                      <Tooltip title="Youtube">
                        <Avatar alt="youtube" src="/icons/youtube.png" className={classes.avatar} />
                      </Tooltip>
                    )}
                    {show.reviews_count > 0 && (
                      <Tooltip title="Reviews">
                        <RateReviewIcon className={classes.avatar} />
                      </Tooltip>
                    )}
                    {show.show_photos_count > 0 && (
                      <Tooltip title="Photos">
                        <Avatar alt="photos" src="/icons/photos.png" className={classes.avatar} />
                      </Tooltip>
                    )}
                  </>
                )}
              </div>
            </Grid>
          </Grid>
        }
        subheader={
          show.venue && (
            <>
              <Link component={RouterLink} to={`/venues/${show.venue.slug}`}>
                {show.venue.name} - {show.venue.city}, {show.venue.state}
              </Link>
            </>
          )
        }
      />
      <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
        {show.notes && <Typography variant="body2" dangerouslySetInnerHTML={{ __html: show.notes }} />}
        <Tracklist show={show}></Tracklist>

        {currentUser ? (
          <Grid container alignItems="center" justify="flex-end" spacing={4} dir="row">
            <Grid item className={classes.interaction}>
              <Typography>Rating</Typography>
              <Rating rateable_id={show.id} rateable_type="Show" currentUser={currentUser} />
            </Grid>
            <Grid item className={classes.interaction}>
              <Typography>Saw it</Typography>
              <SawItSwitch showId={show.id} currentUser={currentUser} />
            </Grid>
            <Grid item className={classes.interaction}>
              <Typography>Favorite</Typography>
              <FavoriteSwitch showId={show.id} currentUser={currentUser} />
            </Grid>
          </Grid>
        ) : (
          <div style={{ height: 15 }}></div>
        )}
      </CardContent>
    </Card>
  );
};

export default Setlist;
