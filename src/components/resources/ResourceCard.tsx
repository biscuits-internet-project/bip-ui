import React from 'react'
import { Link as ResourceLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, CardActionArea, CardMedia, Link } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
      height: "auto"
    },
    media: {
      maxHeight: 250,
      minHeight: 250,
    }
});

const ResourceCard = ({title, content, image, url}) => {
    const classes = useStyles()
    return (
        <Link underline="none" component={ResourceLink} to={url}>
            <Card className={classes.root} style={{height: "100%"}}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        component="img"
                        alt={title}
                        image={image}
                        title={title}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h2" component="h2">
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