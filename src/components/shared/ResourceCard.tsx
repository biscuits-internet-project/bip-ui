import React from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, CardActionArea, CardMedia, CardActions, Button } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
      maxWidth: 450,
    },
    media: {
      maxHeight: 200
    }
});

const ResourceCard = ({title, content, image, url}) => {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    component="img"
                    alt={title}
                    image={image}
                    title={title}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {content}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    View
                </Button>
            </CardActions>
        </Card>
    )
}

export default ResourceCard