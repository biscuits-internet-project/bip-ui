import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    heading:{
        fontSize: 26,
        marginBottom: 30,
    }
});

const PageHeading = ({text}) => {
    const classes = useStyles()
    return (
        <Typography className={classes.heading} variant="h1">{text}</Typography>
    )
}

export default PageHeading