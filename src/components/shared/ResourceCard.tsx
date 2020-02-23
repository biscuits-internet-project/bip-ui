import React from 'react'
import { Link as ResourceLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, CardActionArea, CardMedia, Link } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
      maxWidth: 450,
    },
    media: {
      maxHeight: 250,
      minHeight: 200
    }
});

const ResourceCard = ({title, content, image, url}) => {
    const classes = useStyles()
    return (
        <Link underline="none" component={ResourceLink} to={url}>
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
            </Card>
        </Link>
    )
}

export default ResourceCard